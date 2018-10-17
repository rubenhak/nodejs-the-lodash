var _ = require('lodash');

_.mixin({ 'makeArray' : function(obj, filterCb, valueCb) {
    if (!obj) {
        return [];
    }

    var res = _.keys(obj);
    if (filterCb) {
        res = res.filter(x => filterCb(x, obj[x]));
    }
    if (valueCb) {
        res = res.map(x => valueCb(x, obj[x]));
    }
    return res;
}})


_.mixin({ 'makeBoolArray' : function(obj) {
    return _.makeArray(obj, (k, v) => v);
}})
