var _ = require('lodash');

_.mixin({ 'replaceAll' : function(str, search, replacement) {
    return str.replace(new RegExp(search, 'g'), replacement);
}});