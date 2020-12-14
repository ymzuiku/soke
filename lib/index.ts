import * as regExps from "./regExps";
import { message } from "./message";
import { runChecks } from "./runChecks";
import { Soke } from "./types";

export { regExps, message };

const ignores = { optional: 1, checks: 1, ignore: 1, oneOf: 1 } as any;

function soke<S extends Soke>(
  schema: S
): (obj: any, lang?: "zh" | "en") => { [K in keyof S]: S[K] | any } {
  return (obj: any, lang: "zh" | "en" = "zh") => {
    const msg = message[lang];

    const runError = () => {
      if (typeof obj !== "object") {
        return msg.bodyIsNotObject();
      }
      const list = Object.keys(schema);
      for (let i = 0; i < list.length; i++) {
        const key = list[i];
        const value = (obj as any)[key];
        const item = (schema as any)[key];

        if (item.ignore) {
          continue;
        }
        if (item.oneOf) {
          const oneOfKeys = item.oneOf as any[];
          let haveRight = false;
          for (let i = 0; i < oneOfKeys.length; i++) {
            const _k = oneOfKeys[i];
            if (typeof _k === "string") {
              if (schema[_k]) {
                try {
                  soke({ [_k]: schema[_k] })({
                    [_k]: obj[_k],
                  });
                  haveRight = true;
                } catch (err) {}
              }
            } else {
              try {
                runChecks(_k, value, key, lang);
                haveRight = true;
              } catch (err) {}
            }

            if (haveRight) {
              break;
            }
          }

          if (haveRight) {
            continue;
          }
        }

        if (value === void 0 || value === null || value === "") {
          if (item.optional) {
            continue;
          }
          if (item.message) {
            return item.message(key, value, lang);
          }
          return msg.ignoreNeedParams(key);
        }

        if (item.type && typeof value !== item.type) {
          if (item.message) {
            return item.message(key, value, lang);
          }
          return msg.typeError(key, item.type);
        }
        if (item.checks) {
          try {
            runChecks(item.checks, value, key, lang);
          } catch (error) {
            if (item.message) {
              return item.message(key, value, lang);
            }
            return error;
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
            try {
              runChecks(subFn(item[k]), value, key, lang);
            } catch (error) {
              if (item.message) {
                return item.message(key, value, lang);
              }
              return error;
            }
          }
        }
      }
    };

    const error = runError();
    if (error) {
      throw error;
    }

    return obj;
  };
}

export default soke;
