type Types = "string" | "array" | "object" | "number" | "boolean";

type ValidateValue = {
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

export type ValidateSchema = Record<string, SchemaItem>;

export const soke = {
  object: sokeSchema,
  string: (e?: string) => makeVali("string", e),
  array: (e?: string) => makeVali("array", e),
  bool: (e?: string) => makeVali("boolean", e),
  number: (e?: string) => makeVali("number", e),
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

function sokeSchema(schema: Record<string, SchemaItem>) {
  return {
    isSoke: true,
    schema,
    schemaKeys: Object.keys(schema),
    validate: (value: Record<string, unknown>, key?: string) => {
      return validateSoke(schema, value, key);
    },
    firstError: (errors: Record<string, string>) => {
      return firstError(schema, errors);
    },
    throwFirstError: (errors: Record<string, string>) => {
      return throwFirstError(schema, errors);
    },
  };
}

function makeVali(defType: Types, defErr?: string): SchemaItem {
  const __soke = {
    type: defType,
    errors: {
      type: defErr || "Need type is: " + defType,
      matches: [],
    },
    matches: [],
  } as any as ValidateValue;

  const out = {
    __soke,
    required: (e?: string) => {
      out.__soke.errors.required = e || defErr || "Need required";
      out.__soke.requred = true;
      return out;
    },
    matches: (reg: RegExp, e?: string) => {
      out.__soke.errors.matches.push(
        e || defErr || "Matches error: " + String(reg)
      );
      out.__soke.matches.push(reg);
      return out;
    },
    len: (len: number, e?: string) => {
      out.__soke.errors.len = e || defErr || "Length no equal: " + len;
      out.__soke.len = len;
      return out;
    },
    equal: (val: any, e?: string) => {
      out.__soke.errors.equal = e || defErr || "Not equal the val";
      out.__soke.equal = val;
      return out;
    },
    equalByKey: (key: string, e?: string) => {
      out.__soke.errors.equalByKey = e || defErr || "Not equal by: " + key;
      out.__soke.equalByKey = key;
      return out;
    },
    min: (min: number, e?: string) => {
      out.__soke.errors.min = e || defErr || "Need min: " + min;
      out.__soke.min = min;
      return out;
    },
    max: (max: number, e?: string) => {
      out.__soke.errors.max = e || defErr || "Need max: " + max;
      out.__soke.max = max;
      return out;
    },
    pick: (list: Array<string>, e?: string) => {
      out.__soke.errors.pick = e || defErr || "Need in list: " + list;
      out.__soke.pick = new Set(list);
      return out;
    },
    notPick: (list: Array<string>, e?: string) => {
      out.__soke.errors.notPick = e || defErr || "Need not in list: " + list;
      out.__soke.notPick = new Set(list);
      return out;
    },
    password: (e?: string) => {
      out.matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, e);
      return out;
    },
    passwordStrong: (e?: string) => {
      out.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, e);
      return out;
    },
    email: (e?: string) => {
      out.matches(
        /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
        e
      );
      return out;
    },
    chinaPhone: (e?: string) => {
      out.matches(/^(?:(?:\+|00)86)?1\d{10}$/, e);
      return out;
    },
    chinaId: (e?: string) => {
      out.matches(
        /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/,
        e
      );
      return out;
    },
    url: (e?: string) => {
      out.matches(
        /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/,
        e
      );
      return out;
    },
    bank: (e?: string) => {
      out.matches(/^[1-9]\d{9,29}$/, e);
      return out;
    },
    chinaName: (e?: string) => {
      out.matches(/^(?:[\u4e00-\u9fa5·]{2,16})$/, e);
      return out;
    },
    chinaCar: (e?: string) => {
      out.matches(
        /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z][A-HJ-NP-Z0-9]{4,5}[A-HJ-NP-Z0-9挂学警港澳]$/,
        e
      );
      return out;
    },
    hkId: (e?: string) => {
      out.matches(/^[a-zA-Z]\d{6}\([\dA]\)$/, e);
      return out;
    },
    number: (e?: string) => {
      out.matches(/^\d+$/, e);
      return out;
    },
    username: (e?: string) => {
      out.matches(/^[a-zA-Z0-9_-]{4,16}$/, e);
      return out;
    },
    letterOrNumber: (e?: string) => {
      out.matches(/^[A-Za-z0-9]+$/, e);
      return out;
    },
    letterAndNumber: (e?: string) => {
      out.matches(/^(?=.*[a-zA-Z])(?=.*\d).+$/, e);
      return out;
    },
    letter: (e?: string) => {
      out.matches(/^[a-zA-Z]+$/, e);
      return out;
    },
    uuid: (e?: string) => {
      out.matches(/^[a-f\d]{4}(?:[a-f\d]{4}-){4}[a-f\d]{12}$/i, e);
      return out;
    },
    integer: (e?: string) => {
      out.matches(/^-?[1-9]\d*$/, e);
      return out;
    },
    date: (e?: string) => {
      out.matches(
        /^\d{4}([/:-\S])(1[0-2]|0?[1-9])\1(0?[1-9]|[1-2]\d|30|31) (?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/,
        e
      );
      return out;
    },
  };

  return out as any;
}

const rights = {
  type: (value: any, type?: Types) => {
    if (type === undefined) {
      return true;
    }
    if (type === "array" && Array.isArray(value)) {
      return true;
    }

    return typeof value === type;
  },
  min: (value: any, min?: number) => {
    if (min === undefined) {
      return true;
    }
    if (typeof value === "number") {
      return value > min;
    }
    if (value && value.length) {
      return value.length > min;
    }
    return false;
  },
  max: (value: any, max?: number) => {
    if (max === undefined) {
      return true;
    }
    if (typeof value === "number") {
      return value < max;
    }
    if (value && value.length) {
      return value.length < max;
    }
    return false;
  },
  pick: (value: any, pick?: Set<string>) => {
    if (pick === undefined) {
      return true;
    }
    if (!value) {
      return false;
    }
    if (Array.isArray(value) && value.find((v) => !pick.has(v))) {
      return false;
    }
    if (!pick.has(value)) {
      return false;
    }
    return true;
  },
  notPick: (value: any, noPick?: Set<string>) => {
    if (noPick === undefined) {
      return true;
    }
    if (!value) {
      return false;
    }
    if (Array.isArray(value) && value.find((v) => noPick.has(v))) {
      return false;
    }
    if (noPick.has(value)) {
      return false;
    }
    return true;
  },
};

function validateSoke(
  schema: Record<string, SchemaItem>,
  values: Record<string, any>,
  key?: string
): Record<string, string> {
  const errors: any = {};
  const checkKey = (key: string) => {
    if (!schema[key]) {
      return "";
    }
    const item = (schema[key] as any).__soke as ValidateValue;
    const value = values[key];
    if (value !== undefined && !rights.type(value, item.type)) {
      return item.errors.type;
    }
    if (item.requred && !value) {
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
    }
  }

  return errors;
}

function firstError(
  schema: Record<string, SchemaItem>,
  errors: Record<string, string>
) {
  const list = Object.keys(schema);
  let err = "";
  for (let i = 0; i < list.length; i++) {
    const theErr = errors[list[i]];
    if (theErr) {
      err = theErr;
      break;
    }
  }
  return err;
}

function throwFirstError(
  schema: Record<string, SchemaItem>,
  errors: Record<string, string>
) {
  const err = firstError(schema, errors);
  if (err) {
    throw new Error(err);
  }
}
