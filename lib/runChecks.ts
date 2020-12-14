import { message } from "./message";

export function runChecks(fn: any, value: any, key: any, lang: "zh" | "en") {
  let error: any;
  const kind = Object.prototype.toString.call(fn);
  // 计算 error
  if (kind === "[object Array]") {
    fn.forEach((v: any) => {
      const err = runChecks(v, value, key, lang);
      if (err) {
        error = err;
      }
    });
  } else if (kind === "[object RegExp]") {
    if (typeof value !== "string") {
      error = message[lang].typeError(key, "string");
    } else {
      error = fn.test(value);
    }
  } else if (typeof fn === "function") {
    error = fn(value);
    if (error === false) {
      error = message[lang].paramsIsError(key);
    }
  }
  // 检测 error
  if (typeof error === "function") {
    error = error(key, lang);
  }
  if (typeof error === "string") {
    return error;
  }
  if (error === false) {
    return message[lang].paramsIsError(key);
  }
}
