export const message = {
  zh: {
    bodyIsNotObject: () => "参数对象不能为空",
    paramsIsEmpty: (k: string) => `参数 ${k} 未传递`,
    paramsIsError: (k: string) => `参数 ${k} 格式不正确`,
    ignoreNeedParams: (k: string) => `缺少必要参数 ${k}`,
    typeError: (k: string, t: string) => `参数 ${k} 的类型应该为 ${t}`,
    minLengthError: (k: string, len: number) =>
      `参数 ${k} 长度应不小于 ${len} 位`,
    maxLengthError: (k: string, len: number) =>
      `参数 ${k} 长度应不大于 ${len} 位`,
    minNumError: (k: string, len: number) => `参数 ${k} 应不小于 ${len}`,
    maxNumError: (k: string, len: number) => `参数 ${k} 应不大于 ${len}`,
    pickError: (k: string, list: any[]) =>
      `参数 ${k} 的值不属于 ${list.join(", ")} 中的一位`,
  },
  en: {
    bodyIsNotObject: () => "Body is not a object",
    paramsIsEmpty: (k: string) => `Param ${k} is empty`,
    paramsIsError: (k: string) => `Param ${k} is error`,
    ignoreNeedParams: (k: string) => `Ignore param: ${k}`,
    typeError: (k: string, t: string) => `Param ${k} typeof need is ${t}`,
    minLengthError: (k: string, len: number) =>
      `Param ${k} length need not less than ${len}`,
    maxLengthError: (k: string, len: number) =>
      `Param ${k} length need not longer than ${len}`,
    minNumError: (k: string, len: number) =>
      `Param ${k} length need not less than ${len}`,
    maxNumError: (k: string, len: number) =>
      `Param ${k} length need not more than ${len}`,
    pickError: (k: string, list: any[]) =>
      `Param ${k} is value need to be included in ${list.join(", ")} 中的一位`,
  },
};
