export declare const minNum: (min: number) => (v: string) => ((k: string, lang: "zh" | "en") => string) | undefined;
export declare const maxNum: (max: number) => (v: string) => ((k: string, lang: "zh" | "en") => string) | undefined;
export declare const minLength: (min: number) => (v: string) => ((k: string, lang: "zh" | "en") => string) | undefined;
export declare const maxLength: (max: number) => (v: string) => ((k: string, lang: "zh" | "en") => string) | undefined;
/** 时间 */
export declare const time: () => RegExp;
/** 日期 */
export declare const date: () => RegExp;
/** 颜色 */
export declare const hexColor: () => RegExp;
/** base64文件 */
export declare const base64: () => RegExp;
/** 邮箱 */
export declare const email: () => RegExp;
/** html 标签 */
export declare const htmlTag: () => RegExp;
/** md5 32位 */
export declare const md5: () => RegExp;
/** qq */
export declare const qq: () => RegExp;
/** 不包含字母 */
export declare const noLetter: () => RegExp;
/** 仅包含字母 */
export declare const letter: () => RegExp;
/** 密码 */
export declare const password: (nums: number[]) => RegExp;
/** 账号 */
export declare const account: (nums: number[]) => RegExp;
/** 国内座机 */
export declare const cnTelPhone: () => RegExp;
/** 国内手机 */
export declare const cnPhone: () => RegExp;
/** 微信 */
export declare const wechat: () => RegExp;
/** 字母和数字 */
export declare const azAZ09: () => RegExp;
/** 国内身份证号 仅支持18位 */
export declare const cnIdCard: () => (val: any) => true | ((k: string, lang: "zh" | "en") => never);
/** 国内企业机构代码证 */
export declare const cnCompany: () => RegExp;
/** 网址 */
export declare const url: () => RegExp;
/** 版本号 */
export declare const version: () => RegExp;
/** 子网掩码 */
export declare const subIp: () => RegExp;
/** 仅允许数字 */
export declare const number: () => RegExp;
/** 国内邮箱 */
export declare const cnPostalCode: () => RegExp;
/** 大陆、香港、澳门护照 */
export declare const cnPassport: () => RegExp;
/** 银行卡 */
export declare const bankCard: () => RegExp;
