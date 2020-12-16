interface ISchema {
    minLength?: number;
    /** 最大长度，并且必须为字符串 */
    maxLength?: number;
    /** 最小值，并且必须为number */
    minNum?: number;
    /** 最大值，并且必须为number */
    maxNum?: number;
    /** 若check不通过，覆盖错误描述 */
    message?: (key: string, value: string, lang: string) => string;
    /** 最大长度，并且必须为字符串 */
    /** 可以为空 */
    optional?: number | boolean;
    /** 忽略校验 */
    pass?: number | boolean;
    /** 类型校验 */
    type?: "string" | "boolean" | "number" | "stringArray" | "booleanArray" | "numberArray";
    /** 使用正则、函数或组合进行多重校验 */
    check?: RegExp | ((v: string) => any) | (RegExp | ((v: string) => any))[];
    /** 使用其他对象、正则、函数，若其中一个校验通过，即忽略当前校验 */
    passOf?: (string | RegExp | ((v: string) => any))[];
    /** 使用其他对象、正则、函数，必须其中一个校验通过 */
    checkOf?: (string | RegExp | ((v: string) => any))[];
    /** 正则校验对象是否为时间格式 */
    time?: number | boolean;
    /** 正则校验对象是否为日期格式 */
    date?: number | boolean;
    /** 正则校验对象是否为颜色 */
    hexColor?: number | boolean;
    /** 正则校验对象是否为 base64 */
    base64?: number | boolean;
    /** 正则校验对象是否为 email */
    email?: number | boolean;
    /** 正则校验对象是否为 html-tag */
    htmlTag?: number | boolean;
    /** 正则校验对象是否为 md5 */
    md5?: number | boolean;
    /** 正则校验对象是否为 qq */
    qq?: number | boolean;
    /** 正则校验对象是否为 非字母 */
    noLetter?: number | boolean;
    /** 正则校验对象是否为 字母 */
    letter?: number | boolean;
    /** 正则校验对象是否为 密码 */
    password?: [number, number];
    /** 正则校验对象是否为 账户 */
    account?: [number, number];
    /** 正则校验对象是否为 大陆座机 */
    cnTelPhone?: number | boolean;
    /** 正则校验对象是否为 大陆手机 */
    cnPhone?: number | boolean;
    /** 正则校验对象是否为 字母和数字 */
    azAZ09?: number | boolean;
    /** 正则校验对象是否为 大陆身份证，仅支持18位二代身份证 */
    cnIdCard?: number | boolean;
    /** 正则校验对象是否为 大陆企业机构代码证 */
    cnCompany?: number | boolean;
    /** 正则校验对象是否为 url */
    url?: number | boolean;
    /** 正则校验对象是否为 版本格式，如 1.0.0 */
    version?: number | boolean;
    /** 正则校验对象是否为 子网掩码 */
    subIp?: number | boolean;
    /** 正则校验对象是否为 大陆邮编 */
    cnPostalCode?: number | boolean;
    /** 正则校验对象是否为 大陆、香港、澳门护照 */
    cnPassport?: number | boolean;
    /** 正则校验对象是否为 银行卡 */
    bankCard?: number | boolean;
    /** 校验是否为其中一个对象 */
    pick?: any[];
}
export interface Soke {
    [key: string]: ISchema;
}
export {};
