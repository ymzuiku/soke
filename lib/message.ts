export const message = {
  zh: {
    bodyIsNotObject: () => "参数对象不能为空",
    paramsIsEmpty: (k: string) => `参数 ${k} 未传递`,
    paramsIsError: (k: string) => `参数 ${k} 格式不正确`,
    ignoreNeedParams: (k: string) => `缺少必要参数 ${k}`,
    typeError: (k: string, t: string) => `参数 ${k} 的类型应该为 ${t}`,
    minError: (k: string, len: number) => `参数 ${k} 长度应不小于 ${len} 位`,
    maxError: (k: string, len: number) => `参数 ${k} 长度应不大于 ${len} 位`,
  },
  en: {
    bodyIsNotObject: () => "Body is not a object",
    paramsIsEmpty: (k: string) => `Param ${k} is empty`,
    paramsIsError: (k: string) => `Param ${k} is error`,
    ignoreNeedParams: (k: string) => `Ignore param: ${k}`,
    typeError: (k: string, t: string) => `Param ${k} typeof need is ${t}`,
    minError: (k: string, len: number) =>
      `Param ${k} length need not less than ${len}`,
    maxError: (k: string, len: number) =>
      `Param ${k} length need not longer than ${len}`,
  },
};
