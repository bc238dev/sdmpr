export declare enum CaseStyle {
    ASIS = 0,
    CAMEL = 1,
    SNAKE = 2,
    LOWER = 3,
    UPPER = 4
}
export interface ICaseStyleOptions {
    keep?: string[];
    keepChildNodes?: boolean;
}
