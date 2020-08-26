import * as _ from 'lodash';

function isNullOrUndefined(obj: any): boolean {
    return _.isNull(obj) || _.isUndefined(obj);
}

function isNotNullOrUndefined(obj: any): boolean {
    return !_.isNull(obj) && !_.isUndefined(obj);
}

export { isNullOrUndefined, isNotNullOrUndefined };
