var _ = require('lodash');

function isObjectPresent(o)
{
    if (_.isUndefined(o)) {
        return false;
    } 
    if (_.isNaN(o)) {
        return false;
    }
    return true;
}

function recursiveClean(o) {
    if (_.isString(o)) {
        return o;
    }

    if (_.isArray(o)) {
        var another = []
        for (var i = 0; i < o.length; i++) {
            var val = o[i];
            if (isObjectPresent(val)) {
                another.push(recursiveClean(val));
            }
        }
        return another;
    }
  
    if (_.isObject(o)) {
        var another = {};
        for (var key of _.keys(o)) {
            var val = o[key];
            if (isObjectPresent(val)) {
                another[key] = recursiveClean(val);
            }
        }
        return another;
    }
  
    return o;
}

_.mixin({ 'deepClean' : function(obj) {
    return recursiveClean(obj);
}});