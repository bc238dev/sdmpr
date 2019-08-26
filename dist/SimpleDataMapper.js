"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Simple Data Mapper
 *
 * Transform any data easily from one shape to another.
 *
 */
class SimpleDataMapper {
    constructor(reportEnabled = false) {
        this.reportEnabled = false;
        this.maps = [];
        this.collects = [];
        this.extras = [];
        this.init(reportEnabled);
    }
    static create(reportEnabled = false) {
        return new SimpleDataMapper(reportEnabled);
    }
    map(from, to, cb) {
        to = to ? to : from;
        this.maps.push({ from, to, cb });
        return this;
    }
    collect(fields, to, cb) {
        if (typeof to === "function") {
            cb = to;
            to = undefined;
        }
        else {
            to = to ? to : fields.join("_");
        }
        this.collects.push({ fields, to, cb });
        return this;
    }
    add(fieldName, data) {
        this.extras.push({ fieldName, data });
        return this;
    }
    /**
     * This will transform source data to the destination.
     *
     * @param  srcData
     */
    transform(srcData) {
        const maps = this.maps;
        let transformedData = {};
        const transformed = [];
        const skipped = [];
        const collected = [];
        const uncollected = [];
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
        const getTargetData = (transformedData, to) => {
            let target = transformedData;
            const fieldNames = to.split(".");
            const lastFieldName = fieldNames[fieldNames.length - 1];
            for (let i = 0; i < fieldNames.length - 1; i++) {
                const fieldName = fieldNames[i];
                target[fieldName] = target[fieldName] ? target[fieldName] : {};
                target = target[fieldName];
            }
            return {
                target,
                lastFieldName
            };
        };
        maps.forEach(({ from, to, cb }) => {
            const nestedData = getNestedData(from);
            if (nestedData) {
                const targetData = getTargetData(transformedData, to);
                targetData.target[targetData.lastFieldName] = cb ? cb(nestedData) : nestedData;
                transformed.push(`${from} -> ${to}`);
            }
            else {
                skipped.push(from);
            }
        });
        this.collects.forEach(({ fields, to, cb }) => {
            const vals = fields.reduce((acc, cur) => {
                const nestedData = getNestedData(cur);
                if (nestedData) {
                    acc.push(nestedData);
                    collected.push(cur);
                }
                else {
                    uncollected.push(cur);
                }
                return acc;
            }, []);
            const info = cb ? cb(vals) : vals.join(" ");
            if (info) {
                if (to && typeof to === "string") {
                    // transformedData[to] = info
                    const targetData = getTargetData(transformedData, to);
                    targetData.target[targetData.lastFieldName] = info;
                }
                else {
                    transformedData = Object.assign({}, transformedData, info);
                }
            }
        });
        // Add extra data
        this.extras.forEach(extra => {
            let extraData = {};
            extraData[extra.fieldName] = extra.data;
            transformedData = Object.assign({}, transformedData, extraData);
        });
        // Show report if enabled
        if (this.reportEnabled) {
            const dataKeys = Object.keys(srcData);
            const untransformed = [];
            dataKeys.forEach(key => {
                const found = this.maps.findIndex(m => m.from === key);
                if (found === -1) {
                    if (key !== "__reports__") {
                        untransformed.push(key);
                    }
                }
            });
            transformed.sort();
            untransformed.sort();
            skipped.sort();
            collected.sort();
            uncollected.sort();
            transformedData.__reports__ = {
                transformation: {
                    transformed,
                    untransformed,
                    skipped,
                },
                collection: {
                    collected,
                    uncollected
                }
            };
        }
        return transformedData;
    }
    reset() {
        this.init();
        return this;
    }
    report(enabled) {
        this.reportEnabled = enabled;
        return this;
    }
    // --- Private Methods ---
    init(reportEnabled = false) {
        this.reportEnabled = reportEnabled;
        this.maps = [];
        this.collects = [];
        this.extras = [];
        return this;
    }
}
exports.SimpleDataMapper = SimpleDataMapper;
