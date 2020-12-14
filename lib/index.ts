import * as regExps from "./regExps";
import { message } from "./message";
import { runChecks } from "./runChecks";
import { Soke } from "./types";

export { regExps, message };

const ignores = { optional: 1, checks: 1, pass: 1, oneOf: 1 } as any;

function arrayOf(
  schema: any,
  obj: any,
  fn: any,
  key: string,
  lang: "zh" | "en"
) {
  const value = obj[key];
  let haveRight = false;
  let error = "";

  for (let i = 0; i < fn.length; i++) {
    const _k = fn[i];
    if (typeof _k === "string") {
      if (schema[_k] && key !== _k) {
        try {
          soke({ [_k]: schema[_k] })({
            [_k]: obj[_k],
          });
          haveRight = true;
          break;
        } catch (err) {
          error = err;
        }
      }
    } else {
      const err = runChecks(_k, value, key, lang);
      if (!err) {
        haveRight = true;
        break;
      } else {
        error = err;
      }
    }
  }
  return [haveRight, error];
}

function soke<S extends Soke>(
  schema: S
): (obj: any, lang?: "zh" | "en") => { [K in keyof S]: S[K] | any } {
  return (obj: any, lang: "zh" | "en" = soke.baseLangaue as any) => {
    const msg = message[lang];

    if (!obj || typeof obj !== "object") {
      throw msg.bodyIsNotObject();
    }
    const list = Object.keys(schema);
    for (let i = 0; i < list.length; i++) {
      const key = list[i];
      const value = (obj as any)[key];
      const item = (schema as any)[key];

      if (item.pass) {
        continue;
      }

      if (item.checkOf) {
        const [haveRight] = arrayOf(schema, obj, item.checkOf, key, lang);
        if (!haveRight) {
          if (item.message) {
            throw item.message(key, value, lang);
          }
          throw msg.paramsIsError(key);
        }
      }

      if (item.passOf) {
        const [haveRight] = arrayOf(schema, obj, item.passOf, key, lang);
        if (haveRight) {
          continue;
        }
      }

      if (value === void 0 || value === null || value === "") {
        if (item.optional) {
          continue;
        }
        if (item.message) {
          throw item.message(key, value, lang);
        }
        throw msg.ignoreNeedParams(key);
      }

      if (item.type && typeof value !== item.type) {
        if (item.message) {
          throw item.message(key, value, lang);
        }
        throw msg.typeError(key, item.type);
      }
      if (item.check) {
        const error = runChecks(item.check, value, key, lang);
        if (error) {
          if (item.message) {
            throw item.message(key, value, lang);
          }
          throw error;
        }
      }
      const keys = Object.keys(item);
      for (let i = 0; i < keys.length; i++) {
        const k = keys[i];
        if (ignores[k]) {
          continue;
        }
        const subFn = (regExps as any)[k];
        if (subFn) {
          const error = runChecks(subFn(item[k]), value, key, lang);
          if (error) {
            if (item.message) {
              throw item.message(key, value, lang);
            }
            throw error;
          }
        }
      }
    }

    return obj;
  };
}

soke.baseLangaue = "en";

export default soke;
