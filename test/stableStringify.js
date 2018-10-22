var assert = require('assert');
var should = require('should');

var _ = require('..');

describe('stableStringify.js', function() {
    describe('_.stableStringify', function() {
        it('sample1', function () {
            var aStr = _.stableStringify({"aaa": 111, "bbb": 222});
            var bStr = _.stableStringify({"bbb": 222, "aaa": 111});
            should(aStr).be.exactly(bStr);
        });
    });
});