export declare const errors: {
    zh: {
        bodyIsNotObject: () => string;
        paramsIsEmpty: (k: string) => string;
        paramsIsError: (k: string) => string;
        ignoreNeedParams: (k: string) => string;
    };
    en: {
        bodyIsNotObject: () => string;
        paramsIsEmpty: (k: string) => string;
        paramsIsError: (k: string) => string;
        ignoreNeedParams: (k: string) => string;
    };
};
declare function soke<S>(schema: S, lang?: "zh" | "en"): (obj: any) => {
    [K in keyof S]: S[K] | any;
};
export default soke;
