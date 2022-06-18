export type Types = "string" | "array" | "object" | "number" | "boolean";

export interface ValidateOptions {
  key?: string;
  first?: boolean;
}

export interface ValidateResponse {
  errors: Record<string, string>;
  error: string;
  path: string;
}

export interface Soke {
  isSoke: boolean;
  schema: Schema;
  objectError: string;
  schemaKeys: string[];
  validate: (value: any, options?: ValidateOptions) => ValidateResponse;
  isValid: (value: any, key?: string) => boolean;
  dto: <T>(value: T) => T;
}

export type Schema = Record<
  string,
  SchemaItemString | SchemaItemBool | SchemaItemNumber | Soke
>;

export type ValidateValue = {
  matches: RegExp[];
  requred?: boolean;
  type?: Types;
  min?: number;
  max?: number;
  len?: number;
  equal?: any;
  equalByKey?: string;
  pick?: Set<string>;
  notPick?: Set<string>;
  errors: {
    matches: string[];
    required: string;
    type?: string;
    min: string;
    len: string;
    equal: string;
    equalByKey: string;
    max: string;
    pick: string;
    notPick: string;
  };
};

export interface SchemaItemString {
  required: (e?: string) => SchemaItemString;
  matches: (reg: RegExp, e?: string) => SchemaItemString;
  min: (min: number, e?: string) => SchemaItemString;
  max: (max: number, e?: string) => SchemaItemString;
  len: (len: number, e?: string) => SchemaItemString;
  equal: (val: any, e?: string) => SchemaItemString;
  equalByKey: (key: string, e?: string) => SchemaItemString;
  pick: (list: Array<string>, e?: string) => SchemaItemString;
  notPick: (list: Array<string>, e?: string) => SchemaItemString;
  password: (e?: string) => SchemaItemString;
  passwordStrong: (e?: string) => SchemaItemString;
  email: (e?: string) => SchemaItemString;
  chinaPhone: (e?: string) => SchemaItemString;
  chinaId: (e?: string) => SchemaItemString;
  url: (e?: string) => SchemaItemString;
  bank: (e?: string) => SchemaItemString;
  chinaName: (e?: string) => SchemaItemString;
  chinaCar: (e?: string) => SchemaItemString;
  hkId: (e?: string) => SchemaItemString;
  number: (e?: string) => SchemaItemString;
  username: (e?: string) => SchemaItemString;
  letterOrNumber: (e?: string) => SchemaItemString;
  letterAndNumber: (e?: string) => SchemaItemString;
  letter: (e?: string) => SchemaItemString;
  uuid: (e?: string) => SchemaItemString;
  integer: (e?: string) => SchemaItemString;
  date: (e?: string) => SchemaItemString;
}

export interface SchemaItemNumber {
  required: (e?: string) => SchemaItemNumber;
  min: (min: number, e?: string) => SchemaItemNumber;
  max: (max: number, e?: string) => SchemaItemNumber;
  len: (len: number, e?: string) => SchemaItemNumber;
  equal: (val: any, e?: string) => SchemaItemNumber;
  equalByKey: (key: string, e?: string) => SchemaItemNumber;
  pick: (list: Array<string>, e?: string) => SchemaItemNumber;
  notPick: (list: Array<string>, e?: string) => SchemaItemNumber;
}

export interface SchemaItemBool {
  required: (e?: string) => SchemaItemBool;
  equal: (val: any, e?: string) => SchemaItemBool;
  equalByKey: (key: string, e?: string) => SchemaItemBool;
}
