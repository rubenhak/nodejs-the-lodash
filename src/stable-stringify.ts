import stringify from 'fast-json-stable-stringify';

function stableStringify(x: any): string {
    return stringify(x);
}

export { stableStringify };
