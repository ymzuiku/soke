# sock

> 轻量级快速校验数据

- 零依赖
- 支持组合校验、多选一校验、多参数交集校验
- 可自定义默认错误信息
- 支持多语言错误信息
- 错误均以 throw 方式抛出
- 支持 Typescript

## Install

```sh
$ npm install soke
```

Use in javascript

```js
import soke from "sock";
```

## Use

```js
// 设置默认语言
soke.baseLangaue = "zh"; // zh ｜ en, default: en

const schema = soke({
  name: {
    minLength: 4,
    maxLength: 12,
    check: /Abc/,
  },
  age: {
    minNum: 0,
    maxNum: 100,
    type: "number",
  },
  phone: {
    cnIphone: 1,
  },
  user: {
    message: (key, value) => `字段 ${key} 错误`,
    account: [6, 20],
  },
});
const values = schema({
  name: "Abcdefg",
  age: 50,
  phone: "13333333333",
  user: "hello123",
});
// 返回数据 {name, age, phone}

const values = schema({
  name: "Abcdefg",
  age: 50,
  phone: "50",
  user: "hello",
});
// 抛出错误： throw 字段 phone 格式错误

const values = schema(
  {
    name: "Abcdefg",
    age: 50,
    phone: "50",
    user: "hello",
  },
  "en" // 使用英文错误提示
);
// 抛出错误： throw Param phone is error

const values = schema({
  name: "Abcdefg",
  age: 50,
  phone: "13333333333",
  user: "hello",
});
// 抛出错误：字段 user 错误
```

## API

```ts
interface ISchema {
  /** 最小长度，并且必须为字符串 */
  minLength?: number;
  maxLength?: number;
  minNum?: number;
  maxNum?: number;
  message?: (key: string, value: string, lang: string) => string;
  /** 最大长度，并且必须为字符串 */
  /** 可以为空 */
  optional?: number | boolean;
  /** 忽略校验 */
  pass?: number | boolean;
  /** 类型校验 */
  type?: "string" | "boolean" | "number";
  /** 使用正则、函数或组合进行多重校验 */
  check?: RegExp | Function | (RegExp | Function)[];
  /** 使用其他对象、正则、函数，若其中一个校验通过，即忽略当前校验 */
  passOf?: (string | RegExp | Function)[];
  /** 使用其他对象、正则、函数，必须其中一个校验通过 */
  checkOf?: (string | RegExp | Function)[];
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
}

export interface Soke {
  [key: string]: ISchema;
}
```

## Test

Run test

```sh
$ npm run test-s
```

```sh
Test Suites
8 passed, 8 total

Tests
41 passed, 41 total
```
