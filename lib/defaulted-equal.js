var _ = require('lodash');

var isArray = Array.isArray;
var keyList = Object.keys;
var hasProp = Object.prototype.hasOwnProperty;

function defaultKeySelector(x)
{
    if (typeof x === 'undefined') {
        return 'not-defined';
    }
    if (x && typeof x == 'object') {
        return _.stableStringify(x);
    }
    return x;
}

function defaultValueSelector(x)
{
    return x;
}

function equal(a, b, path, arrayMeta, skipAddPath) {
    if (a === b) return true;

    if (a && typeof a == 'object') {
        if (_.isNullOrUndefined(b)) {
            return true;
        }
        if (b && typeof b == 'object') {
            var arrA = isArray(a),
                arrB = isArray(b),
                i, length, key;

            if (arrA && arrB) {
                length = a.length;
                if (length != b.length) return false;
                if (path in arrayMeta) {
                    propMeta = arrayMeta[path];
                    if (!propMeta) {
                        propMeta = {};
                    }
                    var keySelector;
                    if (propMeta.keySelector) {
                        keySelector = propMeta.keySelector
                    } else {
                        keySelector = defaultKeySelector;
                    }
                    var valueSelector;
                    if (propMeta.valueSelector) {
                        valueSelector = propMeta.valueSelector
                    } else {
                        valueSelector = defaultValueSelector;
                    }
                    var dictA = _.makeDict(a, keySelector, valueSelector);
                    var dictB = _.makeDict(b, keySelector, valueSelector);
                    var currPath;
                    if (path) {
                        currPath = path + ".[]";
                    } else {
                        currPath = "[]";
                    }
                    return equal(dictA, dictB, currPath, arrayMeta, true);
                }
                for (i = length; i-- !== 0;)
                    if (!equal(a[i], b[i], path, arrayMeta)) return false;
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

            var keysA = keyList(a);
            lengthKeysA = keysA.length;
            for (i = lengthKeysA; i-- !== 0;) {
                key = keysA[i];
                if (hasProp.call(b, key)) {
                    var currPath;
                    if (skipAddPath) {
                        currPath = path;
                    } else {
                        if (path) {
                            currPath = path + "." + key;
                        } else {
                            currPath = key;
                        }
                    }
                    if (!equal(a[key], b[key], currPath, arrayMeta)) {
                        return false;
                    }
                }
            }

            var keysB = keyList(b);
            lengthKeysB = keysB.length;
            for (i = lengthKeysB; i-- !== 0;) {
                key = keysB[i];
                if (!hasProp.call(a, key)) {
                    return false;
                }
            }
        
            return true;
        }
    }

    return a !== a && b !== b;
};

_.mixin({
    'isDefaultedEqual': function (current, desired, arrayMeta) {
        if (_.isNullOrUndefined(current) && _.isNullOrUndefined(desired)) {
            return true;
        }
        if (!arrayMeta) {
            arrayMeta = {}
        }
        return equal(current, desired, "", arrayMeta);
    }
});
