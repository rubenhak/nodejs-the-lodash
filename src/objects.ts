import equal from 'fast-deep-equal';
import { isNullOrUndefined } from './null';

function fastDeepEqual(a: unknown, b: unknown): boolean {
    if (isNullOrUndefined(a) && isNullOrUndefined(b)) {
        return true;
    }
    return equal(a, b);
}

export { fastDeepEqual };
