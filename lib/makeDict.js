var _ = require('lodash');

_.mixin({ 'makeDict' : function(obj, cbKey, cbValue) {
    var result = {};
    if (obj) {
        for(var x of obj) {
            var key = cbKey(x);
            var value = x;
            if (cbValue) {
                value = cbValue(value);
            }
            result[key] = value;
        }
    }
    return result;
}})
