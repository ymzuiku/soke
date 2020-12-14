import * as regExps from "./regExps";
import { message } from "./message";
import { Soke } from "./types";
export { regExps, message };
declare function soke<S extends Soke>(schema: S): (obj: any, lang?: "zh" | "en") => {
    [K in keyof S]: S[K] | any;
};
declare namespace soke {
    var baseLangaue: string;
    var createSchema: <S extends Soke>(schema: S) => { [K in keyof S]: S[K]; };
}
export default soke;
