# soke

> 轻量级快速校验数据

- 零依赖
- 支持组合校验、多选一校验、多参数交集校验
- 为每个校验自定定义错误
- 正则可以组合使用
- 支持 Typescript

## Install

```sh
$ npm install soke
```

Use in Javascript / Typescript

```js
import { soke } from "sock";
```

## Use

```js
// 创建一个草稿
const schema = soke.object({
name: soke.string().min(2, "to min").max(10, "to max"),
email: soke.string().email("need a email"),
phone: soke
  .string()
  .required("need input phone")
  .chinaPhone("phone formart error"),
code: soke.string("need input code").required().matches(/^\d+$/).len(6),
agree: soke.bool().required("need click agree"),
password: soke
  .string()
  .required("need input password")
  .passwordStrong("password is too weak"),
passwordAgain: soke
  .string("password again need equal to password")
  .required()
  .equalByKey("password"),
});

// 使用草稿去校验一个对象，得到一个错误对象
const errors = schema.validate({
  name: "a",
  phone: "133",
  code: "11",
  password: "123",
  passwordAgain: "456",
});

// 错误对象是所有的错误集合
expect(errors).toEqual({
  name: "to min",
  email: "need a email",
  phone: "phone formart error",
  code: "need input code",
  agree: "need click agree",
  password: "password is too weak",
  passwordAgain: "password again need equal to password",
});

// 获取错误对象中，以草稿声明顺序的第一个错误字符串
const err = schema.firstError(errors);
expect(err).toEqual("to min");

// 或者抛出错误对象中的第一个错误
try {
  schema.throwFirstError(errors);
} catch (err) {
  expect(err).toEqual(Error("password is too weak"));
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
