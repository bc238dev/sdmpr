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
    private init;
}
