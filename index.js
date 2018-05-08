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

module.exports = _;
