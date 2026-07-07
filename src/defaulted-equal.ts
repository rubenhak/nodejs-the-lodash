import * as _ from 'lodash';
import { isNullOrUndefined } from './null';
import { makeDict } from './make-dict';
import { stableStringify } from './stable-stringify';

interface DefaultedEquatorPropMeta {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- consumers select on arbitrary item shapes
    keySelector?: (item: any) => any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- consumers select on arbitrary item shapes
    valueSelector?: (item: any) => any;
}

function defaultKeySelector(x: unknown): string | number {
    if (typeof x === 'undefined') {
        return 'not-defined';
    }
    if (x && typeof x == 'object') {
        return stableStringify(x);
    }
    return x as string | number;
}

function defaultValueSelector(x: unknown): unknown {
    return x;
}

function equal(
    a: unknown,
    b: unknown,
    path: string,
    arrayMeta: Record<string, DefaultedEquatorPropMeta>,
    skipAddPath?: boolean,
): boolean {
    if (a === b) return true;

    if (a && typeof a == 'object') {
        if (isNullOrUndefined(b)) {
            return true;
        }
        if (b && typeof b == 'object') {
            var arrA = _.isArray(a),
                arrB = _.isArray(b),
                i,
                key;

            if (arrA && arrB) {
                var arrayA = a as unknown[];
                var arrayB = b as unknown[];
                if (arrayA.length != arrayB.length) {
                    return false;
                }
                if (path in arrayMeta) {
                    var propMeta = arrayMeta[path];
                    if (!propMeta) {
                        propMeta = {};
                    }
                    var keySelector;
                    if (propMeta.keySelector) {
                        keySelector = propMeta.keySelector;
                    } else {
                        keySelector = defaultKeySelector;
                    }
                    var valueSelector;
                    if (propMeta.valueSelector) {
                        valueSelector = propMeta.valueSelector;
                    } else {
                        valueSelector = defaultValueSelector;
                    }
                    var dictA = makeDict(arrayA, keySelector, valueSelector);
                    var dictB = makeDict(arrayB, keySelector, valueSelector);
                    let currPath;
                    if (path) {
                        currPath = path + '.[]';
                    } else {
                        currPath = '[]';
                    }
                    return equal(dictA, dictB, currPath, arrayMeta, true);
                }
                for (i = arrayA.length; i-- !== 0; ) if (!equal(arrayA[i], arrayB[i], path, arrayMeta)) return false;
                return true;
            }

            if (arrA != arrB) {
                return false;
            }

            var dateA = a instanceof Date,
                dateB = b instanceof Date;
            if (dateA != dateB) return false;
            if (dateA && dateB) return (a as Date).getTime() == (b as Date).getTime();

            var regexpA = a instanceof RegExp,
                regexpB = b instanceof RegExp;
            if (regexpA != regexpB) return false;
            if (regexpA && regexpB) return (a as RegExp).toString() == (b as RegExp).toString();

            var objA = a as Record<string, unknown>;
            var objB = b as Record<string, unknown>;

            var keysA = _.keys(objA);
            for (i = keysA.length; i-- !== 0; ) {
                key = keysA[i];
                if (Object.prototype.hasOwnProperty.call(objB, key)) {
                    let currPath;
                    if (skipAddPath) {
                        currPath = path;
                    } else {
                        if (path) {
                            currPath = path + '.' + key;
                        } else {
                            currPath = key;
                        }
                    }
                    if (!equal(objA[key], objB[key], currPath, arrayMeta)) {
                        return false;
                    }
                }
            }

            var keysB = _.keys(objB);
            for (i = keysB.length; i-- !== 0; ) {
                key = keysB[i];
                if (!Object.prototype.hasOwnProperty.call(objA, key)) {
                    return false;
                }
            }

            return true;
        }
    }

    return a !== a && b !== b;
}

function isDefaultedEqual(current: unknown, desired: unknown, arrayMeta?: Record<string, DefaultedEquatorPropMeta>): boolean {
    if (isNullOrUndefined(current) && isNullOrUndefined(desired)) {
        return true;
    }
    if (!arrayMeta) {
        arrayMeta = {};
    }
    return equal(current, desired, '', arrayMeta);
}

export { isDefaultedEqual, DefaultedEquatorPropMeta };
