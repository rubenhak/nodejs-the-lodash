import 'mocha';
import should from 'should';

import _ from '../src';

describe('_.stableStringify', function () {
    it('sample1', function () {
        let aStr = _.stableStringify({ aaa: 111, bbb: 222 });
        let bStr = _.stableStringify({ bbb: 222, aaa: 111 });
        should(aStr).be.exactly(bStr);
    });
});
