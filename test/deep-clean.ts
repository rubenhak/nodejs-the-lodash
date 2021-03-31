import 'mocha';
import should = require('should');

import _ from '../src';

describe('_.deepClean', function () {
    it('case-01', function () {
        let a = { aaa: 1234, bbb: { ccc: true, ddd: 'zzzz' } };
        let result = _.deepClean(a);
        should(result).be.deepEqual({ aaa: 1234, bbb: { ccc: true, ddd: 'zzzz' } });
    });

    it('case-02', function () {
        let a = { aaa: 1234, bbb: { ccc: true, ddd: ['zzzz', 1234, 'ddd'] } };
        let result = _.deepClean(a);
        should(result).be.deepEqual({ aaa: 1234, bbb: { ccc: true, ddd: ['zzzz', 1234, 'ddd'] } });
    });

    it('case-03', function () {
        let a = { aaa: 1234, kuku: undefined, bbb: { ccc: true, ddd: ['zzzz', 1234, 'ddd'] } };
        let result = _.deepClean(a);
        should(result).be.deepEqual({ aaa: 1234, bbb: { ccc: true, ddd: ['zzzz', 1234, 'ddd'] } });
    });

    it('case-03', function () {
        let a = {
            aaa: 1234,
            kuku: undefined,
            bbb: { ccc: true, ddd: ['zzzz', 1234, 'ddd', { kaka: undefined }, undefined] },
        };
        let result = _.deepClean(a);
        should(result).be.deepEqual({ aaa: 1234, bbb: { ccc: true, ddd: ['zzzz', 1234, 'ddd', {}] } });
    });
});
