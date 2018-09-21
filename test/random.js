var assert = require('assert');
var should = require('should');

var _ = require('..');

describe('random.js', function() {
    describe('_.randomElement', function() {
        it('sample1', function () {
            var items = ["aa", "bb", "cc", "dd"]; 
            var result = _.randomElement(items);
            items.should.containEql(result);
        });

        it('sample2', function () {
            var items = []; 
            var result = _.randomElement(items);
            should(result).be.exactly(null);
        });
    });
});