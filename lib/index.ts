import { makeVali } from "./makeVali";
import { SchemaItem } from "./types";
import { validate, ValidateOptions, ValidateResponse } from "./validate";

export const soke = {
  object: sokeSchema,
  string: (e?: string) => makeVali("string", e),
  array: (e?: string) => makeVali("array", e),
  bool: (e?: string) => makeVali("boolean", e),
  number: (e?: string) => makeVali("number", e),
};

export interface Soke {
  isSoke: boolean;
  schema: Record<string, SchemaItem>;
  schemaKeys: string[];
  validate: (value: any, options?: ValidateOptions) => ValidateResponse;
  isValid: (value: any, key?: string) => boolean;
  dto: <T>(value: T) => T;
}

function sokeSchema(schema: Record<string, SchemaItem>): Soke {
  const out = {
    isSoke: true,
    schema,
    schemaKeys: Object.keys(schema),
    validate: (value: Record<string, unknown>, options?: ValidateOptions) => {
      return validate(schema, value, options);
    },
    isValid: (value: Record<string, unknown>, key?: string) => {
      const err = validate(schema, value, {
        first: true,
        key,
      });
      if (err.error) {
        throw new Error(err.error);
      }
      return true;
    },
    dto: <T>(value: T): T => {
      const err = validate(schema, value);
      if (err.error) {
        throw new Error(err.error);
      }
      let val = value as any;
      const data = {} as any;
      out.schemaKeys.forEach((k) => {
        data[k] = val[k];
      });
      return data;
    },
  };
  return out;
}
