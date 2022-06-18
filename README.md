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
    const errors = schema.validate({
      name: "a",
      phone: "133",
      code: "11",
      password: "123",
      passwordAgain: "456",
    });

    expect(errors.errors).toEqual({
      name: "to min",
      email: "need a email",
      phone: "phone formart error",
      code: "need input code",
      agree: "need click agree",
      password: "password is too weak",
      passwordAgain: "password again need equal to password",
    });
    expect(errors.error).toEqual("to min");
```

## Validate and dto

```ts
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

try {
  const errors = schema.dto({
    name: "a",
    phone: "133",
    code: "11",
    password: "123",
    passwordAgain: "456",
  });
} catch (err) {
  expect(err).toEqual(new Error("to min"));
}

const value = {
  name: "aaa",
  phone: "13333333333",
  email: "mail@qqq.com",
  code: "666666",
  password: "123123Qwe",
  passwordAgain: "123123Qwe",
  agree: true,
  cat: "123123Qwe",
};

let v2 = schema.dto(value);

expect(value).toEqual({
  name: "aaa",
  phone: "13333333333",
  email: "mail@qqq.com",
  code: "666666",
  password: "123123Qwe",
  passwordAgain: "123123Qwe",
  agree: true,
});

expect(v2).toEqual(value);

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


