import { errors } from ".";

export function runChecks(fn: any, value: any, key: any, lang: "zh" | "en") {
  let error: any;
  const kind = Object.prototype.toString.call(fn);
  if (kind === "[object Array]") {
    fn.forEach((v: any) => {
      runChecks(v, value, key, lang);
    });
  }
  if (kind === "[object RegExp]") {
    if (value === void 0 || value === "" || value === null) {
      error = errors[lang].paramsIsEmpty(key);
    } else {
      error = fn.test(value);
      if (error === false) {
        throw errors[lang].paramsIsError(key);
      }
    }
  } else if (typeof fn === "function") {
    error = fn(value);
  }
  if (typeof error === "function") {
    error = error(key, lang);
  }
  if (typeof error === "string") {
    throw error;
  }
}
