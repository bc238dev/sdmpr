/**
 * Simple Data Mapper
 *
 */
export declare class SimpleDataMapper {
    private maps;
    private reportEnabled;
    constructor(reportEnabled?: boolean);
    static create(report?: boolean): SimpleDataMapper;
    map(from: string, to?: string, cb?: Function): this;
    transform(srcData: any): any;
}
