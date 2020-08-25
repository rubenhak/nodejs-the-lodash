var _ = require('lodash');

_.mixin({ 'randomElement' : function(obj) {
    if (_.isNullOrUndefined(obj)) {
        return null;
    }
    if (_.isArray(obj)) {
        if (obj.length == 0) {
            return null;
        }
        return obj[_.random(obj.length - 1)];
    }
    return null;
}});