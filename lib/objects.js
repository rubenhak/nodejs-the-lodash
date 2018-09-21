var _ = require('lodash');
var equal = require('fast-deep-equal');

_.mixin({ 'fastDeepEqual' : function(a, b) {
    if (_.isNullOrUndefined(a) && _.isNullOrUndefined(b)) {
        return true;
    }
    return equal(a, b);
}});

_.mixin({ 'isDefaultedEqual' : function(current, desired) {
    if (_.isNullOrUndefined(current) && _.isNullOrUndefined(desired)) {
        return true;
    }
    var desired = _.cloneDeep(desired)
    var finalDesired = _.defaultsDeep(desired, current);
    return equal(current, finalDesired);
}});