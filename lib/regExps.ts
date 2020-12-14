import { message as regExps } from "./message";

export const min = (min: number) => (v: string) => {
  if (typeof v !== "string") {
    return (k: string, lang: "zh" | "en") =>
      regExps[lang].typeError(k, "string");
  }
  if (v.length < min) {
    return (k: string, lang: "zh" | "en") => regExps[lang].minError(k, min);
  }
};

export const max = (max: number) => (v: string) => {
  if (typeof v !== "string") {
    return (k: string, lang: "zh" | "en") =>
      regExps[lang].typeError(k, "string");
  }
  if (v.length > max) {
    return (k: string, lang: "zh" | "en") => regExps[lang].maxError(k, max);
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
export const password = (nums: number[]) => {
  const [min = 6, max = 30] = nums;
  return new RegExp(
    `^\S*(?=\S{${min},${max}})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$`
  );
};

/** 账号 */
export const account = (nums: number[]) => {
  const [min = 6, max = 30] = nums;
  return new RegExp(`^[a-zA-Z]\w{${min},${max}}$`);
};

/** 国内座机 */
export const cnTelPhone = () => /^(?:\d{3}-)?\d{8}$|^(?:\d{4}-)?\d{7,8}$/;
/** 国内手机 */
export const cnPhone = () => /^(?:(?:\+|00)86)?1\d{10}$/;
/** 微信 */
export const wechat = () => /^[a-zA-Z][-_a-zA-Z0-9]{5,19}$/;
/** 字母和数字 */
export const azAZ09 = () => /^[A-Za-z0-9]+$/;
/** 国内身份证号 支持 15位和18位 */
export const cnId = () =>
  /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0[1-9]|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/;
/** 国内企业机构代码证 */
export const cnCompany = () =>
  /^(([0-9A-Za-z]{15})|([0-9A-Za-z]{18})|([0-9A-Za-z]{20}))$/;
/** 网址 */
export const url = () =>
  /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/;
/** 版本号 */
export const version = () => /^\d+(?:\.\d+){2}$/;
/** ip 子网掩码 */
export const ip = () =>
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
