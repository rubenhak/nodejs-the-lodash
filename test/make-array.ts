import 'mocha';
import should = require('should');

import _ from '../src';

describe('_.makeArray', function () {
    it('sample1', function () {
        let data = { aaa: true, bbb: false, ccc: true };
        let result = _.makeArray(
            data,
            (k, v) => k,
            (k, v) => v,
        );
        should(result).be.deepEqual(['aaa', 'ccc']);
    });

    it('sample2', function () {
        let data = {};
        let result = _.makeArray(
            data,
            (k, v) => v,
            (k, v) => v,
        );
        should(result).be.deepEqual([]);
    });

    it('sample3', function () {
        let data = { aaa: { kuku: 1234 }, bbb: { kaka: 567 }, ccc: { zizi: 89 } };
        let result = _.makeArray(data, (k, v) => v);
        should(result).be.deepEqual([{ kuku: 1234 }, { kaka: 567 }, { zizi: 89 }]);
    });
});

describe('_.makeBoolArray', function () {
    it('sample1', function () {
        let data = { aaa: true, bbb: false, ccc: true };
        let result = _.makeBoolArray(data);
        should(result).be.deepEqual(['aaa', 'ccc']);
    });

    it('sample1', function () {
        let data = {};
        let result = _.makeBoolArray(data);
        should(result).be.deepEqual([]);
    });
});
