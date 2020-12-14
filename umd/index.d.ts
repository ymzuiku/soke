import * as regExps from "./regExps";
import { message } from "./message";
import { Soke } from "./types";
export { regExps, message };
declare function soke<S extends Soke>(schema: S): (obj: any, lang?: "zh" | "en") => {
    [K in keyof S]: S[K] | any;
};
declare namespace soke {
    var baseLangaue: string;
}
export default soke;
