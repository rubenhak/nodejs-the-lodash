var _ = require('lodash');

_.mixin({ 'isNullOrUndefined' : function(obj) {
    return _.isNull(obj) || _.isUndefined(obj);
}});

_.mixin({ 'isNotNullOrUndefined' : function(obj) {
    return !_.isNull(obj) && !_.isUndefined(obj);
}})

_.mixin({ 'makeDict' : function(obj, cbKey, cbValue) {
    var result = {};
    for(var x of obj) {
        var key = cbKey(x);
        var value = x;
        if (cbValue) {
            value = cbValue(value);
        }
        result[key] = value;
    }
    return result;
}})

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

module.exports = _;
