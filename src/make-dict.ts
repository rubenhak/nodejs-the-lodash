import * as _ from "lodash";

function makeDict<V>(items : any[] | null, cbKey: (item: any) => string | number, cbValue: (item: any) => V) : Record<string | number, V> {
    let result : Record<string | number, V> = {};
    if (items) {
        for(var x of items) {
            var key = cbKey(x);
            var value = cbValue(x);
            result[key] = value;
        }
    }
    return result;
}

function makeBoolDict(items : any[] | null) : Record<string | number, boolean> {
    return makeDict(items, x => x, x => true)
}

export { makeDict, makeBoolDict }