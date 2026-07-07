import * as _ from 'lodash';
import { deepClean } from './deep-clean';
import { replaceAll } from './string';
import { isNullOrUndefined, isNotNullOrUndefined } from './null';
import { fastDeepEqual } from './objects';
import { isDefaultedEqual, DefaultedEquatorPropMeta } from './defaulted-equal';
import { makeDict, makeBoolDict } from './make-dict';
import { stableStringify } from './stable-stringify';
import { makeArray, makeBoolArray } from './make-array';
import { randomElement } from './random';

interface LoDashMixins extends _.LoDashStatic {
    deepClean(o: unknown): unknown;

    replaceAll(str: string, search: string, replacement: string): string;

    isNullOrUndefined(obj: unknown): boolean;
    isNotNullOrUndefined(obj: unknown): boolean;

    fastDeepEqual(a: unknown, b: unknown): boolean;

    isDefaultedEqual(current: unknown, desired: unknown, arrayMeta?: Record<string, DefaultedEquatorPropMeta>): boolean;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- fallback when items is null and T/V can't be inferred from a caller-supplied element type
    makeDict<T = any, V = any>(
        items: T[] | null,
        cbKey: (item: T) => string | number,
        cbValue: (item: T) => V,
    ) : Record<string | number, V>;
    makeBoolDict(items: (string | number)[] | null): Record<string | number, boolean>;

    stableStringify(x: unknown): string;

    makeArray<V>(
        obj: Record<string, unknown> | null,
        valueCb: (key: string, value: unknown) => V,
        filterCb?: (key: string, value: unknown) => boolean,
    ): V[];
    makeBoolArray(obj: Record<string, unknown> | null): string[];

    randomElement<V>(obj?: V[]): V;
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
    randomElement: randomElement,
});

const mixedLodash = forceCast<LoDashMixins>(_);

function forceCast<T>(input: unknown): T {
    // @ts-expect-error <-- forces TS compiler to compile this as-is
    return input;
}

export { Stack } from './stack';
export { Queue } from './queue';
export { PriorityQueue } from './priority-queue';
export { GenericHeap, MinHeap, MaxHeap, HeapPriorityQueue } from './heap';

export default mixedLodash;
