import stringify from 'fast-json-stable-stringify';

function stableStringify(x: unknown): string {
    return stringify(x);
}

export { stableStringify };
