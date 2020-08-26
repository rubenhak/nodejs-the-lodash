import * as _ from "lodash";

function randomElement<V>(obj?: V[]) : V | null {
    if (obj)
    {
        if (obj.length > 0) {
            return obj[_.random(obj.length - 1)];
        }
    }
    return null;
}

export { randomElement }