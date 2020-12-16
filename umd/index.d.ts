import * as regExps from "./regExps";
import { message } from "./message";
import { Soke } from "./types";
export { regExps, message };
/**
 * # 入口函数
 *
 *  ## 例子
 * ```ts
 * soke.baseLangaue = "zh"; // zh ｜ en, default: en
 *
 * const schema = soke({
 *   name: {
 *     minLength: 4,
 *     maxLength: 12,
 *     check: /Abc/,
 *   },
 *   age: {
 *     minNum: 0,
 *     maxNum: 100,
 *     type: "number",
 *   },
 *   phone: {
 *     cnIphone: 1,
 *   },
 *   user: {
 *     message: (key, value) => `字段 ${key} 错误`,
 *     account: [6, 20],
 *   },
 * });
 * ```
 */
declare function soke<S extends Soke>(schema: S): (obj: any, lang?: "zh" | "en") => {
    [K in keyof S]: S[K] | any;
};
declare namespace soke {
    var baseLangaue: string;
    var createSchema: <S extends Soke>(schema: S) => { [K in keyof S]: S[K]; };
}
export default soke;
