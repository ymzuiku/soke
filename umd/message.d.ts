export declare const message: {
    zh: {
        bodyIsNotObject: () => string;
        paramsIsEmpty: (k: string) => string;
        paramsIsError: (k: string) => string;
        ignoreNeedParams: (k: string) => string;
        typeError: (k: string, t: string) => string;
        minLengthError: (k: string, len: number) => string;
        maxLengthError: (k: string, len: number) => string;
        minNumError: (k: string, len: number) => string;
        maxNumError: (k: string, len: number) => string;
        pickError: (k: string, list: any[]) => string;
    };
    en: {
        bodyIsNotObject: () => string;
        paramsIsEmpty: (k: string) => string;
        paramsIsError: (k: string) => string;
        ignoreNeedParams: (k: string) => string;
        typeError: (k: string, t: string) => string;
        minLengthError: (k: string, len: number) => string;
        maxLengthError: (k: string, len: number) => string;
        minNumError: (k: string, len: number) => string;
        maxNumError: (k: string, len: number) => string;
        pickError: (k: string, list: any[]) => string;
    };
};
