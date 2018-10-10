var assert = require('assert');
var should = require('should');

var _ = require('..');

describe('string.js', function() {
    describe('_.replaceAll', function() {
        it('sample1', function () {
            var result = _.replaceAll('Hi Fred Fred', 'Fred', 'Barney');
            should(result).be.exactly('Hi Barney Barney');
        });
    });
});