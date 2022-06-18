export type Types = "string" | "array" | "object" | "number" | "boolean";

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

export interface SchemaItem {
  required: (e?: string) => SchemaItem;
  matches: (reg: RegExp, e?: string) => SchemaItem;
  min: (min: number, e?: string) => SchemaItem;
  max: (max: number, e?: string) => SchemaItem;
  len: (len: number, e?: string) => SchemaItem;
  equal: (val: any, e?: string) => SchemaItem;
  equalByKey: (key: string, e?: string) => SchemaItem;
  pick: (list: Array<string>, e?: string) => SchemaItem;
  notPick: (list: Array<string>, e?: string) => SchemaItem;
  password: (e?: string) => SchemaItem;
  passwordStrong: (e?: string) => SchemaItem;
  email: (e?: string) => SchemaItem;
  chinaPhone: (e?: string) => SchemaItem;
  chinaId: (e?: string) => SchemaItem;
  url: (e?: string) => SchemaItem;
  bank: (e?: string) => SchemaItem;
  chinaName: (e?: string) => SchemaItem;
  chinaCar: (e?: string) => SchemaItem;
  hkId: (e?: string) => SchemaItem;
  number: (e?: string) => SchemaItem;
  username: (e?: string) => SchemaItem;
  letterOrNumber: (e?: string) => SchemaItem;
  letterAndNumber: (e?: string) => SchemaItem;
  letter: (e?: string) => SchemaItem;
  uuid: (e?: string) => SchemaItem;
  integer: (e?: string) => SchemaItem;
  date: (e?: string) => SchemaItem;
}

export type ValidateSchema = Record<string, SchemaItem>;
