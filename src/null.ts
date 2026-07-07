import * as _ from 'lodash';

function isNullOrUndefined(obj: unknown): boolean {
    return _.isNull(obj) || _.isUndefined(obj);
}

function isNotNullOrUndefined(obj: unknown): boolean {
    return !_.isNull(obj) && !_.isUndefined(obj);
}

export { isNullOrUndefined, isNotNullOrUndefined };
