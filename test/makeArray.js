var assert = require('assert');
var should = require('should');

var _ = require('../index');

describe('makeArray.js', function() {
    describe('_.makeArray', function() {
        it('sample1', function () {
            var data = { "aaa" : true, "bbb": false, "ccc": true};
            var result = _.makeArray(data, (k, v) => v);
            should(result).be.deepEqual(["aaa", "ccc"]);
        });

        it('sample1', function () {
            var data = { };
            var result = _.makeArray(data, (k, v) => v);
            should(result).be.deepEqual([]);
        });
    });

    describe('_.makeBoolArray', function() {
        it('sample1', function () {
            var data = { "aaa" : true, "bbb": false, "ccc": true};
            var result = _.makeBoolArray(data);
            should(result).be.deepEqual(["aaa", "ccc"]);
        });

        it('sample1', function () {
            var data = { };
            var result = _.makeBoolArray(data);
            should(result).be.deepEqual([]);
        });
    });
    
});