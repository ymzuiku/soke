import { rights } from "./right";
import { SchemaItem, ValidateValue } from "./types";

export interface ValidateOptions {
  key?: string;
  first?: boolean;
}

export interface ValidateResponse {
  errors: Record<string, string>;
  error: string;
  path: string;
}

export function validate(
  schema: Record<string, SchemaItem>,
  values: Record<string, any>,
  { first, key }: ValidateOptions = {}
): ValidateResponse {
  let error = "";
  let path = "";
  const errors: any = {};
  const checkKey = (key: string) => {
    if (!schema[key]) {
      return "";
    }
    const item = (schema[key] as any).__soke as ValidateValue;
    const value = values[key];
    if (value !== void 0 && !rights.type(value, item.type)) {
      return item.errors.type;
    }
    if (item.requred && !value && typeof value !== "number") {
      return item.errors.required;
    }
    if (!rights.min(value, item.min)) {
      return item.errors.min;
    }
    if (!rights.max(value, item.max)) {
      return item.errors.max;
    }
    if (item.len && typeof value === "string" && value.length !== item.len) {
      return item.errors.len;
    }
    if (item.equal && value !== item.equal) {
      return item.errors.equal;
    }
    if (item.equalByKey && value !== values[item.equalByKey]) {
      return item.errors.equalByKey;
    }
    if (item.matches.length) {
      for (let i = 0; i < item.matches.length; i++) {
        const re = item.matches[i];
        if (!re.test(value)) {
          return item.errors.matches[i];
        }
      }
    }
    if (!rights.pick(value, item.pick)) {
      return item.errors.pick;
    }
    if (!rights.notPick(value, item.notPick)) {
      return item.errors.notPick;
    }
    return "";
  };
  if (key) {
    errors[key] = checkKey(key);
  } else {
    const list = Object.keys(schema);
    for (let i = 0; i < list.length; i++) {
      const key = list[i];
      const err = checkKey(key);
      errors[key] = err;
      if (err && !error) {
        error = err;
        path = key;
      }
      if (err && first) {
        break;
      }
    }
  }

  return { errors, error, path };
}
