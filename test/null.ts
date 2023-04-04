import 'mocha';
import should from 'should';

import _ from '../src';

describe('_.isNullOrUndefined', function () {
    it('null value', function () {
        let result = _.isNullOrUndefined(null);
        should(result).be.exactly(true);
    });
    it('undefined value', function () {
        let result = _.isNullOrUndefined(undefined);
        should(result).be.exactly(true);
    });
    it('undefined value', function () {
        let x;
        let result = _.isNullOrUndefined(x);
        should(result).be.exactly(true);
    });
    it('string value', function () {
        let result = _.isNullOrUndefined('kuku');
        should(result).be.exactly(false);
    });
    it('number value', function () {
        let result = _.isNullOrUndefined(123);
        should(result).be.exactly(false);
    });
    it('empty array', function () {
        let result = _.isNullOrUndefined([]);
        should(result).be.exactly(false);
    });
    it('non empty array', function () {
        let result = _.isNullOrUndefined(['aa', 123]);
        should(result).be.exactly(false);
    });
    it('empty object', function () {
        let result = _.isNullOrUndefined({});
        should(result).be.exactly(false);
    });
    it('non empty object', function () {
        let result = _.isNullOrUndefined({ aaa: 1234 });
        should(result).be.exactly(false);
    });
    it('function object', function () {
        let result = _.isNullOrUndefined(function () {});
        should(result).be.exactly(false);
    });
});

describe('_.isNotNullOrUndefined', function () {
    it('null value', function () {
        let result = _.isNotNullOrUndefined(null);
        should(result).be.exactly(false);
    });
    it('undefined value', function () {
        let result = _.isNotNullOrUndefined(undefined);
        should(result).be.exactly(false);
    });
    it('undefined value', function () {
        let x;
        let result = _.isNotNullOrUndefined(x);
        should(result).be.exactly(false);
    });
    it('string value', function () {
        let result = _.isNotNullOrUndefined('kuku');
        should(result).be.exactly(true);
    });
    it('number value', function () {
        let result = _.isNotNullOrUndefined(123);
        should(result).be.exactly(true);
    });
    it('empty array', function () {
        let result = _.isNotNullOrUndefined([]);
        should(result).be.exactly(true);
    });
    it('non empty array', function () {
        let result = _.isNotNullOrUndefined(['aa', 123]);
        should(result).be.exactly(true);
    });
    it('empty object', function () {
        let result = _.isNotNullOrUndefined({});
        should(result).be.exactly(true);
    });
    it('non empty object', function () {
        let result = _.isNotNullOrUndefined({ aaa: 1234 });
        should(result).be.exactly(true);
    });
    it('function object', function () {
        let result = _.isNotNullOrUndefined(function () {});
        should(result).be.exactly(true);
    });
});
