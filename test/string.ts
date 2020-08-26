import 'mocha';
import should = require('should');

import _ from '../src';

describe('_.replaceAll', function() {
    it('sample1', function () {
        var result = _.replaceAll('Hi Fred Fred', 'Fred', 'Barney');
        should(result).be.exactly('Hi Barney Barney');
    });
});