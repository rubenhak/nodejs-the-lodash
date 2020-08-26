import 'mocha';
import should = require('should');

import _ from '../src';

    describe('_.randomElement', function() {
        it('sample1', function () {
            var items = ["aa", "bb", "cc", "dd"]; 
            var result = _.randomElement(items);
            items.should.containEql(result);
        });

        it('sample2', function () {
            let items = [22, 44, 55]; 
            let result = _.randomElement(items);
            (items).should.containEql(result);
        });

        it('sample2', function () {
            let items = [11]; 
            let result = _.randomElement(items);
            (result).should.be.equal(11);
        });

        it('sample4', function () {
            var items : string[] = []; 
            var result = _.randomElement(items);
            should(result).be.exactly(null);
        });

        it('sample5', function () {
            var items : number[] = []; 
            var result = _.randomElement(items);
            should(result).be.exactly(null);
        });
    });