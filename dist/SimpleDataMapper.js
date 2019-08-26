"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Simple Data Mapper
 *
 */
class SimpleDataMapper {
    constructor(reportEnabled = false) {
        this.maps = [];
        this.reportEnabled = false;
        this.reportEnabled = reportEnabled;
    }
    static create(report = false) {
        return new SimpleDataMapper(report);
    }
    map(from, to, cb) {
        to = to ? to : from;
        this.maps.push({ from, to, cb });
        return this;
    }
    transform(srcData) {
        const maps = this.maps;
        let transformedData = {};
        const transformed = [];
        const skipped = [];
        const getNestedData = (nestedData) => {
            const paths = nestedData.split(".");
            let currentData = Object.assign({}, srcData);
            paths.forEach((p) => {
                if (currentData) {
                    // If we have array notation (somearray[n]) then capture groups
                    const matches = p.match(/(.*)\[(.*)\]/);
                    if (matches) {
                        const g1 = matches[1];
                        const g2 = matches[2];
                        currentData = currentData[g1] ? currentData[g1][g2] : undefined;
                    }
                    else {
                        currentData = currentData[p];
                    }
                }
            });
            return currentData;
        };
        maps.forEach(({ from, to, cb }) => {
            const nestedData = getNestedData(from);
            if (nestedData) {
                transformedData[to] = cb ? cb(nestedData) : nestedData;
                transformed.push(`${from} -> ${to}`);
            }
            else {
                skipped.push(from);
            }
        });
        return transformedData;
    }
}
exports.SimpleDataMapper = SimpleDataMapper;
