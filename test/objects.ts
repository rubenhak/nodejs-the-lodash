import 'mocha';
import should = require('should');

import _ from '../src';

describe('_.fastDeepEqual', function () {
    it('sample positive 1', function () {
        let a = { aaa: 1234, bbb: { ccc: true, ddd: 'zzzz' } };
        let b = { aaa: 1234, bbb: { ddd: 'zzzz', ccc: true } };
        let result = _.fastDeepEqual(a, b);
        should(result).be.exactly(true);
    });

    it('sample negative 1', function () {
        let a = { aaa: 1234, bbb: { ccc: true, ddd: 'zzzz' } };
        let b = { aaa: 123, bbb: { ddd: 'zzzz', ccc: true } };
        let result = _.fastDeepEqual(a, b);
        should(result).be.exactly(false);
    });

    it('sample negative 2', function () {
        let a = { aaa: 1234, bbb: { ccc: true, ddd: 'zzzz' } };
        let b = { bbb: { ddd: 'zzzz', ccc: true } };
        let result = _.fastDeepEqual(a, b);
        should(result).be.exactly(false);
    });

    it('sample nulls', function () {
        let a = null;
        let b = null;
        let result = _.fastDeepEqual(a, b);
        should(result).be.exactly(true);
    });

    it('sample undefineds', function () {
        let a;
        let b;
        let result = _.fastDeepEqual(a, b);
        should(result).be.exactly(true);
    });

    it('sample null & undefined', function () {
        let a = null;
        let b;
        let result = _.fastDeepEqual(a, b);
        should(result).be.exactly(true);
    });
});

describe('_.isEqual', function () {
    it('sample arrays mixed order', function () {
        let a = [1, 2];
        let b = [2, 1];
        let result = _.isEqual(a, b);
        should(result).be.exactly(false);
    });

    it('sample diff string-int', function () {
        let a = {
            BERLIOZ_IDENTITY: '0',
        };
        let b = {
            BERLIOZ_IDENTITY: 0,
        };
        let result = _.isEqual(a, b);
        should(result).be.exactly(false);
    });
});
