import 'mocha';
import should = require('should');

import _ from '../src';

describe('_.stableStringify', function() {
        it('sample1', function () {
            var aStr = _.stableStringify({"aaa": 111, "bbb": 222});
            var bStr = _.stableStringify({"bbb": 222, "aaa": 111});
            should(aStr).be.exactly(bStr);
        });
    });