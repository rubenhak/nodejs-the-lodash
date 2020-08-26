import * as _ from "lodash";
import { deepClean } from './deep-clean';
import { replaceAll } from './string';
import { isNullOrUndefined, isNotNullOrUndefined } from './null';
import { fastDeepEqual } from './objects';
import { isDefaultedEqual, DefaultedEquatorPropMeta } from './defaulted-equal';
import { makeDict, makeBoolDict } from './make-dict';
import { stableStringify } from './stable-stringify';
import { makeArray, makeBoolArray } from './make-array';
import { randomElement } from './random'

interface LoDashMixins extends _.LoDashStatic {
    deepClean(o : any) : any,

    replaceAll(str : string, search : string, replacement : string) : string,

    isNullOrUndefined(obj : any) : boolean,
    isNotNullOrUndefined(obj : any) : boolean,

    fastDeepEqual(a: any, b: any) : boolean,

    isDefaultedEqual(current : any, desired : any, arrayMeta? : Record<string, DefaultedEquatorPropMeta>) : boolean,

    makeDict<V>(items : any[] | null, cbKey: (item: any) => string | number, cbValue: (item: any) => V) : Record<string | number, V>,
    makeBoolDict(items : any[] | null) : Record<string | number, boolean>,

    stableStringify(x: any) : string,

    makeArray<V>(obj : Record<string, any> | null, 
        valueCb : (key: string, value: any) => V,
        filterCb? : (key: string, value: any) => boolean
        ) : V[],
    makeBoolArray(obj : Record<string, any> | null) : any[],

    randomElement<V>(obj?: V[]) : V
}

_.mixin({ 
    deepClean: deepClean,
    replaceAll: replaceAll,
    isNullOrUndefined: isNullOrUndefined,
    isNotNullOrUndefined: isNotNullOrUndefined,
    fastDeepEqual: fastDeepEqual,
    isDefaultedEqual: isDefaultedEqual,
    makeDict: makeDict,
    makeBoolDict: makeBoolDict,
    stableStringify: stableStringify,
    makeArray: makeArray,
    makeBoolArray: makeBoolArray,
    randomElement: randomElement
});

const mixedLodash = forceCast<LoDashMixins>(_);

function forceCast<T>(input: any): T {
    // @ts-ignore <-- forces TS compiler to compile this as-is
    return input;
}

export default mixedLodash;
