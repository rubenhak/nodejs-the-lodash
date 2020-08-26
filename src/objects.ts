import * as _ from 'lodash';
import equal from 'fast-deep-equal';
import { isNullOrUndefined, isNotNullOrUndefined } from './null';

function fastDeepEqual(a: any, b: any): boolean {
    if (isNullOrUndefined(a) && isNullOrUndefined(b)) {
        return true;
    }
    return equal(a, b);
}

export { fastDeepEqual };
