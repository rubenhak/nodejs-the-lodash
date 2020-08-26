import * as _ from "lodash";

function replaceAll(str : string, search : string, replacement : string) : string {
    return str.replace(new RegExp(search, 'g'), replacement);
}

export { replaceAll }