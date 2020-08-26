import * as _ from 'lodash';

function deepClean(o: any): any {
    if (_.isString(o)) {
        return o;
    }

    if (_.isArray(o)) {
        let another = [];
        for (let i = 0; i < o.length; i++) {
            let val = o[i];
            if (isObjectPresent(val)) {
                another.push(deepClean(val));
            }
        }
        return another;
    }

    if (_.isObject(o)) {
        let another: Record<string, any> = {};
        for (let key of _.keys(o)) {
            let val = _.get(o, key);
            if (isObjectPresent(val)) {
                another[key] = deepClean(val);
            }
        }
        return another;
    }

    return o;
}

function isObjectPresent(o: any): boolean {
    if (_.isUndefined(o)) {
        return false;
    }
    if (_.isNaN(o)) {
        return false;
    }
    return true;
}

export { deepClean };
