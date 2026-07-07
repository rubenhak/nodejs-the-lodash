import * as _ from 'lodash';

function makeArray<V>(
    obj: Record<string, unknown> | null,
    valueCb: (key: string, value: unknown) => V,
    filterCb?: (key: string, value: unknown) => boolean,
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

function makeBoolArray(obj: Record<string, unknown> | null): string[] {
    return makeArray(
        obj,
        (k) => k,
        (k, v) => !!v,
    );
}

export { makeArray, makeBoolArray };
