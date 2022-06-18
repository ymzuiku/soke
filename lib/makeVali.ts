import { SchemaItem, Types, ValidateValue } from "./types";

export function makeVali(defType: Types, defErr?: string): SchemaItem {
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
