var _ = require('lodash');

_.mixin({ 'makeArray' : function(obj, cbSelector) {
    if (!obj) {
        return [];
    }

    return _.keys(obj).filter(x => cbSelector(x, obj[x]));
}})


_.mixin({ 'makeBoolArray' : function(obj) {
    return _.makeArray(obj, (k, v) => v);
}})
