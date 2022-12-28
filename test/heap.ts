import 'mocha';
import should = require('should');

import { GenericHeap, MinHeap, MaxHeap, HeapPriorityQueue } from '../src';

describe('heap', function () {
    it('generic-case-01', function () {
        const heap = new GenericHeap<number>((a, b) => a < b);

        should(heap.pop()).be.null();

        heap.insert(10);
        heap.insert(1);
        heap.insert(20);
        heap.insert(7);

        should(heap.size).be.equal(4);
        should(heap.length).be.equal(4);
        should(heap.isEmpty).be.false();

        should(heap.pop()).be.equal(1);
        should(heap.pop()).be.equal(7);
        should(heap.pop()).be.equal(10);
        should(heap.pop()).be.equal(20);
        should(heap.pop()).be.null();

        should(heap.size).be.equal(0);
        should(heap.length).be.equal(0);
        should(heap.isEmpty).be.true();
    });

    it('minheap-case-01', function () {
        const heap = new MinHeap([30, 20, 1, 15, 3]);

        should(heap.size).be.equal(5);
        should(heap.length).be.equal(5);
        should(heap.isEmpty).be.false();

        should(heap.pop()).be.equal(1);
        should(heap.pop()).be.equal(3);
        should(heap.pop()).be.equal(15);
        should(heap.pop()).be.equal(20);
        should(heap.pop()).be.equal(30);
        should(heap.pop()).be.null();

        should(heap.size).be.equal(0);
        should(heap.length).be.equal(0);
        should(heap.isEmpty).be.true();
    });

    it('maxheap-case-01', function () {
        const heap = new MaxHeap([30, 20, 1, 15, 3]);

        should(heap.size).be.equal(5);
        should(heap.length).be.equal(5);
        should(heap.isEmpty).be.false();

        should(heap.pop()).be.equal(30);
        should(heap.pop()).be.equal(20);
        should(heap.pop()).be.equal(15);
        should(heap.pop()).be.equal(3);
        should(heap.pop()).be.equal(1);
        should(heap.pop()).be.null();

        should(heap.size).be.equal(0);
        should(heap.length).be.equal(0);
        should(heap.isEmpty).be.true();
    });

    it('pq-case-01', function () {
        const pq = new HeapPriorityQueue([{ value: 'foo', priority: 3 }]);

        pq.populate([
            'apple',
            'banana',
            'x'
        ], x => x.length);

        should(pq.size).be.equal(4);
        should(pq.length).be.equal(4);
        should(pq.isEmpty).be.false();

        should(pq.pop()?.value).be.equal('x');
        should(pq.pop()?.value).be.equal('foo');
        should(pq.pop()?.value).be.equal('apple');
        should(pq.pop()?.value).be.equal('banana');
        should(pq.pop()).be.null();

        should(pq.size).be.equal(0);
        should(pq.length).be.equal(0);
        should(pq.isEmpty).be.true();
    });

});
