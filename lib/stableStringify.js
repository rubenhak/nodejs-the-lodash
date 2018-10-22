var _ = require('lodash');
const stringify = require('fast-json-stable-stringify')

_.mixin({ 'stableStringify' : function(x) {
    return stringify(x);
}});