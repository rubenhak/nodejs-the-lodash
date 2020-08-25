var _ = require('lodash');

_.mixin({ 'isNullOrUndefined' : function(obj) {
    return _.isNull(obj) || _.isUndefined(obj);
}});

_.mixin({ 'isNotNullOrUndefined' : function(obj) {
    return !_.isNull(obj) && !_.isUndefined(obj);
}})