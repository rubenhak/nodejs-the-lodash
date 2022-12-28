import 'mocha';
import should = require('should');

import { PriorityQueue } from '../src';

describe('priority-queue', function () {
    it('case-01', function () {
        const pq = new PriorityQueue<string>();
        
        should(pq.pop()).be.null();
        should(pq.size).be.equal(0);
        should(pq.length).be.equal(0);
        should(pq.isEmpty).be.true();

        pq.insert('foo', 10);
        pq.insert('bar', 1);
        pq.insert('zoo', 20);

        should(pq.size).be.equal(3);
        should(pq.length).be.equal(3);
        should(pq.isEmpty).be.false();

        should(pq.pop()).be.equal('bar');
        should(pq.pop()).be.equal('foo');
        should(pq.pop()).be.equal('zoo');

        should(pq.size).be.equal(0);
        should(pq.length).be.equal(0);
        should(pq.isEmpty).be.true();
    });

    it('case-02', function () {
        const pq = new PriorityQueue<string>();
        
        should(pq.size).be.equal(0);
        should(pq.length).be.equal(0);
        should(pq.isEmpty).be.true();
        should(pq.pop()).be.null();

        pq.insert('foo', 10);
        pq.insert('bar', 1);
        pq.insert('zoo', 20);
        pq.insert('moo', 7);

        should(pq.size).be.equal(4);
        should(pq.length).be.equal(4);
        should(pq.isEmpty).be.false();

        should(pq.pop()).be.equal('bar');
        should(pq.pop()).be.equal('moo');
        should(pq.pop()).be.equal('foo');
        should(pq.pop()).be.equal('zoo');

        should(pq.size).be.equal(0);
        should(pq.length).be.equal(0);
        should(pq.isEmpty).be.true();
    });

    it('case-03', function () {
        const pq = new PriorityQueue<string>();

        pq.populate([
            'apple',
            'banana',
            'x'
        ], x => x.length);

        should(pq.size).be.equal(3);
        should(pq.length).be.equal(3);
        should(pq.isEmpty).be.false();

        should(pq.pop()).be.equal('x');
        should(pq.pop()).be.equal('apple');
        should(pq.pop()).be.equal('banana');
        should(pq.pop()).be.null();

        should(pq.size).be.equal(0);
        should(pq.length).be.equal(0);
        should(pq.isEmpty).be.true();
    });

});
