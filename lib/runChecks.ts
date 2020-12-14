import { message } from "./message";

export function runChecks(fn: any, value: any, key: any, lang: "zh" | "en") {
  let error: any;
  const kind = Object.prototype.toString.call(fn);
  if (kind === "[object Array]") {
    fn.forEach((v: any) => {
      runChecks(v, value, key, lang);
    });
  }
  if (kind === "[object RegExp]") {
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
  if (typeof error === "function") {
    error = error(key, lang);
  }
  if (typeof error === "string") {
    throw error;
  }
  if (error === false) {
    throw message[lang].paramsIsError(key);
  }
}
