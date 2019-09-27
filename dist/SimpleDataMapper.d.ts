import { CaseStyle, ICaseStyleOptions } from "./CaseStyle";
/**
 * Simple Data Mapper
 *
 * Transform any data easily from one shape to another.
 *
 */
export declare class SimpleDataMapper {
    private reportEnabled;
    private maps;
    private collects;
    private extras;
    private caseStyle;
    private caseStyleOptions;
    constructor(reportEnabled?: boolean);
    static create(reportEnabled?: boolean): SimpleDataMapper;
    map(from: string, to?: string, cb?: Function): this;
    collect(fields: string[], to?: string | Function, cb?: Function): this;
    add(fieldName: string, data: any): this;
    /**
     * This will transform source data to the destination.
     *
     * @param  srcData
     */
    transform(srcData: any): any;
    reset(): this;
    report(enabled: boolean): this;
    mapToCamelCase(options?: ICaseStyleOptions): this;
    mapToSnakeCase(options?: ICaseStyleOptions): this;
    static changeCase(obj: any, caseStyle: CaseStyle, options?: ICaseStyleOptions): any;
    static toCamelCase(obj: any, options?: ICaseStyleOptions): any;
    static toSnakeCase(obj: any, options?: ICaseStyleOptions): any;
    private init;
    private doChangeCase;
}
