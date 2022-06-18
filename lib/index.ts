import { makeValiBool, makeValiNumber, makeValiString } from "./makeVali";
import { Schema, Soke, ValidateOptions } from "./types";
import { validate } from "./validate";

export const soke = {
  object: sokeSchema,
  string: (e?: string) => makeValiString("string", e),
  bool: (e?: string) => makeValiBool("boolean", e),
  array: (e?: string) => makeValiNumber("array", e),
  number: (e?: string) => makeValiNumber("number", e),
};

function sokeSchema(schema: Schema, e?: string): Soke {
  const out = {
    isSoke: true,
    schema,
    objectError: e || "Need a object",
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
      const data = {} as any;
      const cloneKeys = (theSchema: any, target: any, val: any) => {
        theSchema.schemaKeys.forEach((k: string) => {
          const subSchema = theSchema.schema[k] as any;
          if (subSchema.isSoke) {
            target[k] = {};
            cloneKeys(subSchema, target[k], val[k]);
          } else {
            target[k] = val[k];
          }
        });
      };
      cloneKeys(out, data, value);
      return data;
    },
  };
  return out;
}
