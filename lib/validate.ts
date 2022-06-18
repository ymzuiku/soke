import { rights } from "./right";
import {
  Schema,
  Soke,
  ValidateOptions,
  ValidateResponse,
  ValidateValue,
} from "./types";

export function validate(
  schema: Schema,
  values: Record<string, any>,
  { first, key, typeChange }: ValidateOptions = {}
): ValidateResponse {
  let error = "";
  let path = "";
  const errors: any = {};
  const checkKey = (key: string) => {
    if (!schema[key]) {
      return "";
    }
    let value = values[key];
    const theSchema = schema[key] as Soke;
    if (theSchema.isSoke) {
      if (typeof value !== "object") {
        return theSchema.objectError;
      }
      const err = validate(theSchema.schema, value, {
        first: true,
        typeChange,
      });
      return err.error;
    }
    const item = (schema[key] as any).__soke as ValidateValue;

    if (value !== void 0 && !rights.type(values, key, item.type, typeChange)) {
      return item.errors.type;
    }
    value = values[key];
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
    if (item.matches && item.matches.length) {
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
    error = checkKey(key)!;
    path = key;
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
