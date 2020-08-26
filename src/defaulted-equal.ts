import * as _ from 'lodash';
import { isNullOrUndefined, isNotNullOrUndefined } from './null';
import { makeDict } from './make-dict';
import { stableStringify } from './stable-stringify';

interface DefaultedEquatorPropMeta {
    keySelector?: (item: any) => any;
    valueSelector?: (item: any) => any;
}

function defaultKeySelector(x: any): any {
    if (typeof x === 'undefined') {
        return 'not-defined';
    }
    if (x && typeof x == 'object') {
        return stableStringify(x);
    }
    return x;
}

function defaultValueSelector(x: any): any {
    return x;
}

function equal(
    a: any,
    b: any,
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
                length,
                key;

            if (arrA && arrB) {
                if (a.length != b.length) {
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
                    var dictA = makeDict(a, keySelector, valueSelector);
                    var dictB = makeDict(b, keySelector, valueSelector);
                    var currPath;
                    if (path) {
                        currPath = path + '.[]';
                    } else {
                        currPath = '[]';
                    }
                    return equal(dictA, dictB, currPath, arrayMeta, true);
                }
                for (i = a.length; i-- !== 0; ) if (!equal(a[i], b[i], path, arrayMeta)) return false;
                return true;
            }

            if (arrA != arrB) {
                return false;
            }

            var dateA = a instanceof Date,
                dateB = b instanceof Date;
            if (dateA != dateB) return false;
            if (dateA && dateB) return a.getTime() == b.getTime();

            var regexpA = a instanceof RegExp,
                regexpB = b instanceof RegExp;
            if (regexpA != regexpB) return false;
            if (regexpA && regexpB) return a.toString() == b.toString();

            var keysA = _.keys(a);
            for (i = keysA.length; i-- !== 0; ) {
                key = keysA[i];
                if (Object.prototype.hasOwnProperty.call(b, key)) {
                    var currPath;
                    if (skipAddPath) {
                        currPath = path;
                    } else {
                        if (path) {
                            currPath = path + '.' + key;
                        } else {
                            currPath = key;
                        }
                    }
                    if (!equal(a[key], b[key], currPath, arrayMeta)) {
                        return false;
                    }
                }
            }

            var keysB = _.keys(b);
            for (i = keysB.length; i-- !== 0; ) {
                key = keysB[i];
                if (!Object.prototype.hasOwnProperty.call(a, key)) {
                    return false;
                }
            }

            return true;
        }
    }

    return a !== a && b !== b;
}

function isDefaultedEqual(current: any, desired: any, arrayMeta?: Record<string, DefaultedEquatorPropMeta>): boolean {
    if (isNullOrUndefined(current) && isNullOrUndefined(desired)) {
        return true;
    }
    if (!arrayMeta) {
        arrayMeta = {};
    }
    return equal(current, desired, '', arrayMeta);
}

export { isDefaultedEqual, DefaultedEquatorPropMeta };
