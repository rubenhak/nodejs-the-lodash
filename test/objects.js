var assert = require('assert');
var should = require('should');

var _ = require('../index');

describe('_.objects', function() {

    describe('fastDeepEqual function', function() {
        it('sample positive 1', function () {
            var a = { "aaa": 1234, "bbb": { "ccc" : true, "ddd" : "zzzz"}}
            var b = { "aaa": 1234, "bbb": { "ddd" : "zzzz", "ccc" : true}}
            var result = _.fastDeepEqual(a, b);
            should(result).be.exactly(true);
        });

        it('sample negative 1', function () {
            var a = { "aaa": 1234, "bbb": { "ccc" : true, "ddd" : "zzzz"}}
            var b = { "aaa": 123, "bbb": { "ddd" : "zzzz", "ccc" : true}}
            var result = _.fastDeepEqual(a, b);
            should(result).be.exactly(false);
        });

        it('sample negative 2', function () {
            var a = { "aaa": 1234, "bbb": { "ccc" : true, "ddd" : "zzzz"}}
            var b = { "bbb": { "ddd" : "zzzz", "ccc" : true}}
            var result = _.fastDeepEqual(a, b);
            should(result).be.exactly(false);
        });

        it('sample nulls', function () {
            var a = null;
            var b = null;
            var result = _.fastDeepEqual(a, b);
            should(result).be.exactly(true);
        });

        it('sample undefineds', function () {
            var a;
            var b;
            var result = _.fastDeepEqual(a, b);
            should(result).be.exactly(true);
        });

        it('sample null & undefined', function () {
            var a = null;
            var b;
            var result = _.fastDeepEqual(a, b);
            should(result).be.exactly(true);
        });
    });


    describe('isDefaultedEqual function', function() {
        it('sample positive 1', function () {
            var a = { "aaa": 1234, "bbb": { "ccc" : true, "ddd" : "zzzz"}}
            var b = { "aaa": 1234, "bbb": { "ddd" : "zzzz", "ccc" : true}}
            var result = _.isDefaultedEqual(a, b);
            should(result).be.exactly(true);
        });

        it('sample positive missing prop 1', function () {
            var a = { "aaa": 1234, "bbb": { "ccc" : true, "ddd" : "zzzz", "eee": [1, 3, 4]}}
            var b = { "bbb": { "ddd" : "zzzz", "ccc" : true}}
            var result = _.isDefaultedEqual(a, b);
            should(result).be.exactly(true);
        });

        it('sample positive missing prop 2', function () {
            var a = { "aaa": 1234, "bbb": { "ccc" : true, "ddd" : "zzzz"}}
            var b = { "bbb": { "ddd" : "zzzz"}}
            var result = _.isDefaultedEqual(a, b);
            should(result).be.exactly(true);
        });

        it('sample negative 1', function () {
            var a = { "aaa": 1234, "bbb": { "ccc" : true, "ddd" : "zzzz"}}
            var b = { "aaa": 123, "bbb": { "ddd" : "zzzz", "ccc" : true}}
            var result = _.isDefaultedEqual(a, b);
            should(result).be.exactly(false);
        });

        it('sample negative 2', function () {
            var a = { "aaa": 1234, "bbb": { "ccc" : true, "ddd" : "zzzz", "eee": [1, 3, 4]}}
            var b = { "aaa": 1234, "bbb": { "ddd" : "zzzz", "ccc" : true, "eee": [1, 3, 5]}}
            var result = _.isDefaultedEqual(a, b);
            should(result).be.exactly(false);
        });

        it('sample negative arrays 1', function () {
            var a = { "aaa": 1234, "bbb": { "ccc": [1, 2, 3]}}
            var b = { "aaa": 1234, "bbb": { "ccc": [1, 3, 2]}}
            var result = _.isDefaultedEqual(a, b);
            should(result).be.exactly(false);
        });

        it('sample negative 2', function () {
            var a = { "bbb": { "ccc" : true, "ddd" : "zzzz"}}
            var b = { "aaa": 123, "bbb": { "ddd" : "zzzz", "ccc" : true}}
            var result = _.isDefaultedEqual(a, b);
            should(result).be.exactly(false);
        });

        it('sample negative 3', function () {
            var a = { "aaa": 123, "bbb": { "ddd" : "zzzz"}}
            var b = { "aaa": 123, "bbb": { "ddd" : "zzzz", "ccc" : true}}
            var result = _.isDefaultedEqual(a, b);
            should(result).be.exactly(false);
        });


        it('sample nulls', function () {
            var a = null;
            var b = null;
            var result = _.isDefaultedEqual(a, b);
            should(result).be.exactly(true);
        });

        it('sample undefineds', function () {
            var a;
            var b;
            var result = _.isDefaultedEqual(a, b);
            should(result).be.exactly(true);
        });

        it('sample null & undefined', function () {
            var a = null;
            var b;
            var result = _.isDefaultedEqual(a, b);
            should(result).be.exactly(true);
        });
    });


    describe('isEqual function', function() {
        it('sample arrays mixed order', function () {
            var a = [1, 2]
            var b = [2, 1]
            var result = _.isEqual(a, b);
            should(result).be.exactly(false);
        });
    });

});