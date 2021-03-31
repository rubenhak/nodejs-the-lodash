import * as _ from 'lodash';

function makeDict<T = any, V = any>(
    items: T[] | null,
    cbKey: (item: T) => string | number,
    cbValue: (item: T) => V,
) : Record<string | number, V> {
    let result: Record<string | number, V> = {};
    if (items) {
        for (let x of items) {
            let key = cbKey(x);
            let value = cbValue(x);
            result[key] = value;
        }
    }
    return result;
}

function makeBoolDict(items: any[] | null) : Record<string | number, boolean> {
    return makeDict(
        items,
        (x) => x,
        (x) => true,
    );
}

export { makeDict, makeBoolDict };
