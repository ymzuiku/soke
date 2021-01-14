import { message, message as regExps } from "./message";

export const pick = (list: any[]) => (v: string) => {
  if (list.indexOf(v) === -1) {
    return (k: string, lang: "zh" | "en") => regExps[lang].pickError(k, list);
  }
};

export const minNum = (min: number) => (v: string) => {
  if (typeof v !== "number") {
    return (k: string, lang: "zh" | "en") =>
      regExps[lang].typeError(k, "string");
  }
  if (v < min) {
    return (k: string, lang: "zh" | "en") => regExps[lang].minNumError(k, min);
  }
};

export const maxNum = (max: number) => (v: string) => {
  if (typeof v !== "number") {
    return (k: string, lang: "zh" | "en") =>
      regExps[lang].typeError(k, "string");
  }
  if (v > max) {
    return (k: string, lang: "zh" | "en") => regExps[lang].maxNumError(k, max);
  }
};

export const minLength = (min: number) => (v: string) => {
  if (typeof v !== "string") {
    return (k: string, lang: "zh" | "en") =>
      regExps[lang].typeError(k, "string");
  }
  if (v.length < min) {
    return (k: string, lang: "zh" | "en") =>
      regExps[lang].minLengthError(k, min);
  }
};

export const maxLength = (max: number) => (v: string) => {
  if (typeof v !== "string") {
    return (k: string, lang: "zh" | "en") =>
      regExps[lang].typeError(k, "string");
  }
  if (v.length > max) {
    return (k: string, lang: "zh" | "en") =>
      regExps[lang].maxLengthError(k, max);
  }
};
/** 时间 */
export const time = () => /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;

/** 日期 */
export const date = () => /^\d{4}(-)(1[0-2]|0?\d)\1([0-2]\d|\d|30|31)$/;
/** 颜色 */
export const hexColor = () => /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;
/** base64文件 */
export const base64 = () =>
  /^\s*data:(?:[a-z]+\/[a-z0-9-+.]+(?:;[a-z-]+=[a-z0-9-]+)?)?(?:;base64)?,([a-z0-9!$&',()*+;=\-._~:@/?%\s]*?)\s*$/i;
/** 邮箱 */
export const email = () =>
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/** html 标签 */
export const htmlTag = () => /<(\w+)[^>]*>(.*?<\/\1>)?/;
/** md5 32位 */
export const md5 = () => /^([a-f\d]{32}|[A-F\d]{32})$/;
/** qq */
export const qq = () => /^[1-9][0-9]{4,10}$/;
/** 不包含字母 */
export const noLetter = () => /^[^A-Za-z]*$/;
/** 仅包含字母 */
export const letter = () => /^[a-zA-Z]+$/;
/** 密码 */
export const string = (nums: number[]) => {
  const [min = 6, max = 30] = nums;
  return new RegExp(
    `^(?![0-9]+$)(?![a-zA-Z]+$)[,.!@#$%0-9A-Za-z]{${min},${max}}$`
  );
};

/** 账号 */
export const labels = (nums: number[]) => {
  const [min = 6, max = 30] = nums;
  return new RegExp(`^[,.!@#$%a-zA-Z0-9_-]{${min},${max}}$`);
};

/** 国内座机 */
export const cnTelPhone = () => /^(?:\d{3}-)?\d{8}$|^(?:\d{4}-)?\d{7,8}$/;
/** 国内手机 */
export const cnPhone = () => /^(?:(?:\+|00)86)?1\d{10}$/;
/** 微信 */
export const wechat = () => /^[a-zA-Z][-_a-zA-Z0-9]{5,19}$/;
/** 字母和数字 */
export const azAZ09 = () => /^[A-Za-z0-9]+$/;
/** 国内身份证号 仅支持18位 */
export const cnIdCard = () => {
  return (val: any) => {
    const p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    const parity = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];
    const code = val.substring(17);
    if (p.test(val)) {
      let sum = 0;
      for (let i = 0; i < 17; i++) {
        sum += val[i] * factor[i];
      }
      if (parity[sum % 11] == code.toUpperCase()) {
        return true;
      }
    }
    return (k: string, lang: "zh" | "en") => {
      throw message[lang].paramsIsError(k);
    };
  };
};

/** 国内企业机构代码证 */
export const cnCompany = () =>
  /^(([0-9A-Za-z]{15})|([0-9A-Za-z]{18})|([0-9A-Za-z]{20}))$/;
/** 网址 */
export const url = () =>
  /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/;
/** 版本号 */
export const version = () => /^\d+(?:\.\d+){2}$/;
/** 子网掩码 */
export const subIp = () =>
  /^(?:\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(?:\.(?:\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/;
/** 仅允许数字 */
export const number = () => /^\d{1,}$/;
/** 国内邮箱 */
export const cnPostalCode = () =>
  /^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/;
/** 大陆、香港、澳门护照 */
export const cnPassport = () =>
  /(^[EeKkGgDdSsPpHh]\d{8}$)|(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\d{7}$)/;
/** 银行卡 */
export const bankCard = () => /^[1-9]\d{9,29}$/;
