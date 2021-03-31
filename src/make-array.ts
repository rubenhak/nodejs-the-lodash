import * as _ from 'lodash';

function makeArray<V>(
    obj: Record<string, any> | null,
    valueCb: (key: string, value: any) => V,
    filterCb?: (key: string, value: any) => boolean,
): V[] {
    if (!obj) {
        return [];
    }

    let keys = _.keys(obj);
    if (filterCb) {
        keys = keys.filter((x) => filterCb(x, obj[x]));
    }

    let res = keys.map((x) => valueCb(x, obj[x]));
    return res;
}

function makeBoolArray(obj: Record<string, any> | null): any[] {
    return makeArray(
        obj,
        (k, v) => k,
        (k, v) => v,
    );
}

export { makeArray, makeBoolArray };
