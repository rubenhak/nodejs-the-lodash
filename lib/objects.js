var _ = require('lodash');
var equal = require('fast-deep-equal');

_.mixin({ 'fastDeepEqual' : function(a, b) {
    if (_.isNullOrUndefined(a) && _.isNullOrUndefined(b)) {
        return true;
    }
    return equal(a, b);
}});