import 'mocha';
import should = require('should');

import _ from '../src';
import _ = require('lodash');


describe('_.deepClean', function() {

    it('case-01', function () {
        var a = { "aaa": 1234, "bbb": { "ccc" : true, "ddd" : "zzzz"}}
        var result = _.deepClean(a);
        should(result).be.deepEqual({ "aaa": 1234, "bbb": { "ccc" : true, "ddd" : "zzzz"}});
    });

    it('case-02', function () {
        var a = { "aaa": 1234, "bbb": { "ccc" : true, "ddd" : ["zzzz", 1234, "ddd"]}}
        var result = _.deepClean(a);
        should(result).be.deepEqual({ "aaa": 1234, "bbb": { "ccc" : true, "ddd" : ["zzzz", 1234, "ddd"]}});
    });

    it('case-03', function () {
        var a = { "aaa": 1234, "kuku": undefined, "bbb": { "ccc" : true, "ddd" : ["zzzz", 1234, "ddd"]}}
        var result = _.deepClean(a);
        should(result).be.deepEqual({ "aaa": 1234, "bbb": { "ccc" : true, "ddd" : ["zzzz", 1234, "ddd"]}});
    });

    it('case-03', function () {
        var a = { "aaa": 1234, "kuku": undefined, "bbb": { "ccc" : true, "ddd" : ["zzzz", 1234, "ddd", {"kaka": undefined}, undefined]}}
        var result = _.deepClean(a);
        should(result).be.deepEqual({ "aaa": 1234, "bbb": { "ccc" : true, "ddd" : ["zzzz", 1234, "ddd", {}]}});
    });


});