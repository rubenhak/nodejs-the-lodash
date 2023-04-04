import 'mocha';
import should from 'should';

import _ from '../src';

describe('_.replaceAll', function () {
    it('sample1', function () {
        let result = _.replaceAll('Hi Fred Fred', 'Fred', 'Barney');
        should(result).be.exactly('Hi Barney Barney');
    });
});
