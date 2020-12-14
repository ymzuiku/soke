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
const schema = soke({
  name: {
    min: 4,
    max: 12,
    check: /Abc/,
  },
  age: {
    type: "number",
  },
});
const { name, age } = schema({ name: "Abcdefg", age: 50 });
```
