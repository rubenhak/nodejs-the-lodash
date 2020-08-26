import 'mocha';
import should = require('should');

import _ from '../src';

    describe('_.fastDeepEqual', function() {
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

    describe('_.isEqual', function() {
        it('sample arrays mixed order', function () {
            var a = [1, 2]
            var b = [2, 1]
            var result = _.isEqual(a, b);
            should(result).be.exactly(false);
        });

        it('sample diff string-int', function () {
            var a = {
                "BERLIOZ_IDENTITY": "0"
            }
            var b = {
                "BERLIOZ_IDENTITY": 0
            }
            var result = _.isEqual(a, b);
            should(result).be.exactly(false);
        });
    });
