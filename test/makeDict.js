var assert = require('assert');
var should = require('should');

var _ = require('../index');

describe('_.makeDict', function() {
    describe('makeDict function', function() {
        it('sample1', function () {
            var data = [ ["aa", 123], ["bbb", 456]];
            var result = _.makeDict(data, x => x[0], x => x[1]);
            should(result).be.deepEqual({aa: 123, bbb: 456});
        });

        it('sample2', function () {
            var data = [ ];
            var result = _.makeDict(data, x => x[0], x => x[1]);
            should(result).be.deepEqual({});
        });

        it('sample3', function () {
            var data = null;
            var result = _.makeDict(data, x => x[0], x => x[1]);
            should(result).be.deepEqual({});
        });
        
        it('sample4', function () {
            var data = null;
            var result = _.makeDict(data, x => x[0], x => x[1]);
            should(result).be.deepEqual({});
        });
    });
});