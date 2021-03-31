import 'mocha';
import should = require('should');

import _ from '../src';

describe('_.isDefaultedEqual', function () {
    it('sample positive empty', function () {
        let a = {};
        let b = {};
        let result = _.isDefaultedEqual(a, b);
        should(result).be.exactly(true);
    });

    it('sample positive 1', function () {
        let a = { aaa: 1234, bbb: { ccc: true, ddd: 'zzzz' } };
        let b = { aaa: 1234, bbb: { ddd: 'zzzz', ccc: true } };
        let result = _.isDefaultedEqual(a, b);
        should(result).be.exactly(true);
    });

    it('sample positive missing prop 1', function () {
        let a = { aaa: 1234 };
        let b = {};
        let result = _.isDefaultedEqual(a, b);
        should(result).be.exactly(true);
    });

    it('sample positive missing prop 2', function () {
        let a = { aaa: { bbb: 1234 } };
        let b = {};
        let result = _.isDefaultedEqual(a, b);
        should(result).be.exactly(true);
    });

    it('sample positive missing prop 3', function () {
        let a = { aaa: { bbb: 1234 } };
        let b = { aaa: {} };
        let result = _.isDefaultedEqual(a, b);
        should(result).be.exactly(true);
    });

    it('sample positive missing prop 4', function () {
        let a = { aaa: 1234, bbb: { ccc: true, ddd: 'zzzz' } };
        let b = { bbb: { ddd: 'zzzz' } };
        let result = _.isDefaultedEqual(a, b);
        should(result).be.exactly(true);
    });

    it('sample positive missing prop 5', function () {
        let a = { aaa: 1234, bbb: { ccc: true, ddd: 'zzzz', eee: [1, 3, 4] } };
        let b = { bbb: { ddd: 'zzzz', ccc: true } };
        let result = _.isDefaultedEqual(a, b);
        should(result).be.exactly(true);
    });

    it('sample args const check 1', function () {
        let a = { aaa: 1234 };
        let b = {};
        let result = _.isDefaultedEqual(a, b);
        should(result).be.exactly(true);
        should(a).be.eql({ aaa: 1234 });
        should(b).be.eql({});
    });

    it('sample args const check 2', function () {
        let a = {};
        let b = { aaa: 1234 };
        let result = _.isDefaultedEqual(a, b);
        should(result).be.exactly(false);
        should(a).be.eql({});
        should(b).be.eql({ aaa: 1234 });
    });

    it('sample negative 1', function () {
        let a = { aaa: 1234, bbb: { ccc: true, ddd: 'zzzz' } };
        let b = { aaa: 123, bbb: { ddd: 'zzzz', ccc: true } };
        let result = _.isDefaultedEqual(a, b);
        should(result).be.exactly(false);
        should(a.aaa).be.exactly(1234);
        should(b.aaa).be.exactly(123);
    });

    it('sample negative 2', function () {
        let a = { bbb: { ccc: true, ddd: 'zzzz' } };
        let b = { aaa: 123, bbb: { ddd: 'zzzz', ccc: true } };
        let result = _.isDefaultedEqual(a, b);
        should(result).be.exactly(false);
    });

    it('sample negative 3', function () {
        let a = { aaa: 123, bbb: { ddd: 'zzzz' } };
        let b = { aaa: 123, bbb: { ddd: 'zzzz', ccc: true } };
        let result = _.isDefaultedEqual(a, b);
        should(result).be.exactly(false);
    });

    it('sample nulls', function () {
        let a = null;
        let b = null;
        let result = _.isDefaultedEqual(a, b);
        should(result).be.exactly(true);
    });

    it('sample undefineds', function () {
        let a;
        let b;
        let result = _.isDefaultedEqual(a, b);
        should(result).be.exactly(true);
    });

    it('sample null & undefined', function () {
        let a = null;
        let b;
        let result = _.isDefaultedEqual(a, b);
        should(result).be.exactly(true);
    });

    it('sample type diff', function () {
        let a = {
            BERLIOZ_IDENTITY: '0',
        };
        let b = {
            BERLIOZ_IDENTITY: 0,
        };
        let result = _.isDefaultedEqual(a, b);
        should(result).be.exactly(false);
    });

    /*** ARRAY TESTS ***/
    it('sample negative array order', function () {
        let a = { aaa: 1234, bbb: { ccc: true, ddd: 'zzzz', eee: [1, 3, 4] } };
        let b = { aaa: 1234, bbb: { ddd: 'zzzz', ccc: true, eee: [1, 3, 5] } };
        let result = _.isDefaultedEqual(a, b);
        should(result).be.exactly(false);
    });

    it('sample negative arrays 1', function () {
        let a = { aaa: 1234, bbb: { ccc: [1, 2, 3] } };
        let b = { aaa: 1234, bbb: { ccc: [1, 3, 2] } };
        let result = _.isDefaultedEqual(a, b);
        should(result).be.exactly(false);
    });

    it('string array same', function () {
        let a = { aaa: ['a', 'b', 'c'] };
        let b = { aaa: ['a', 'b', 'c'] };
        let result = _.isDefaultedEqual(a, b);
        should(result).be.exactly(true);
    });

    it('string array different order', function () {
        let a = { aaa: ['a', 'b', 'c'] };
        let b = { aaa: ['a', 'b'] };
        let result = _.isDefaultedEqual(a, b);
        should(result).be.exactly(false);
    });

    it('string array different order', function () {
        let a = { aaa: ['a', 'b', 'c'] };
        let b = { aaa: ['a', 'c', 'b'] };
        let result = _.isDefaultedEqual(a, b);
        should(result).be.exactly(false);
    });

    it('string array different order, arrayMetaCorrector', function () {
        let a = { aaa: ['a', 'b', 'c'] };
        let b = { aaa: ['a', 'c', 'b'] };
        let result = _.isDefaultedEqual(a, b, {
            aaa: {
                keySelector: (x) => x,
                valueSelector: (x) => x,
            },
        });
        should(result).be.exactly(true);

        result = _.isDefaultedEqual(a, b);
        should(result).be.exactly(false);
    });

    it('string array different order, arrayMetaCorrector default', function () {
        let a = { aaa: ['a', 'b', 'c'] };
        let b = { aaa: ['a', 'c', 'b'] };

        let result = _.isDefaultedEqual(a, b, {
            aaa: {},
        });
        should(result).be.exactly(true);

        result = _.isDefaultedEqual(a, b);
        should(result).be.exactly(false);
    });

    it('string array different order, arrayMetaCorrector default deep', function () {
        let a = { aaa: { bbb: ['a', 'b', 'c'] } };
        let b = { aaa: { bbb: ['a', 'c', 'b'] } };

        let result = _.isDefaultedEqual(a, b, {
            'aaa.bbb': {},
        });
        should(result).be.exactly(true);

        result = _.isDefaultedEqual(a, b);
        should(result).be.exactly(false);
    });

    it('string array different order, arrayMetaCorrector default deep negative 1', function () {
        let a = { aaa: { bbb: ['a', 'c'] } };
        let b = { aaa: { bbb: ['a', 'c', 'b'] } };

        let result = _.isDefaultedEqual(a, b, {});
        should(result).be.exactly(false);

        result = _.isDefaultedEqual(a, b);
        should(result).be.exactly(false);
    });

    it('string array different order, arrayMetaCorrector default deep negative 2', function () {
        let a = { aaa: { bbb: ['a', 'c', 'b'] } };
        let b = { aaa: { bbb: ['a', 'c'] } };

        let result = _.isDefaultedEqual(a, b);
        should(result).be.exactly(false);

        result = _.isDefaultedEqual(a, b);
        should(result).be.exactly(false);
    });

    it('object array different order, arrayMetaCorrector default deep', function () {
        let a = { aaa: { bbb: [{ name: 'a', desc: 'kuku' }, { name: 'b' }] } };
        let b = { aaa: { bbb: [{ name: 'b' }, { name: 'a' }] } };

        let result = _.isDefaultedEqual(a, b, {
            'aaa.bbb': {
                keySelector: (x) => x.name,
            },
        });
        should(result).be.exactly(true);

        result = _.isDefaultedEqual(a, b);
        should(result).be.exactly(false);
    });

    it('object array different order, arrayMetaCorrector default deep extra inner base props', function () {
        let a = { aaa: { bbb: [{ name: 'a', desc: 'kuku' }] } };
        let b = { aaa: { bbb: [{ name: 'a' }] } };

        let result = _.isDefaultedEqual(a, b);
        should(result).be.exactly(true);

        result = _.isDefaultedEqual(a, b);
        should(result).be.exactly(true);
    });

    it('object array different order, arrayMetaCorrector default deep extra inner base props', function () {
        let a = { aaa: { bbb: [{ mimi: 1234, name: 'a', desc: 'kuku' }] } };
        let b = { aaa: { bbb: [{ name: 'a' }] } };

        let result = _.isDefaultedEqual(a, b);
        should(result).be.exactly(true);

        result = _.isDefaultedEqual(a, b);
        should(result).be.exactly(true);
    });

    it('object array different order, arrayMetaCorrector default deep extra inner base ', function () {
        let a = {
            aaa: {
                bbb: [
                    { name: 'b', lala: 'lulu' },
                    { mimi: 1234, name: 'a', desc: 'kuku' },
                ],
            },
        };
        let b = { aaa: { bbb: [{ name: 'a' }, { name: 'b' }] } };

        let result = _.isDefaultedEqual(a, b, {
            'aaa.bbb': {
                keySelector: (x) => x.name,
            },
        });
        should(result).be.exactly(true);

        result = _.isDefaultedEqual(a, b);
        should(result).be.exactly(false);
    });

    it('object array different order, arrayMetaCorrector default deep extra inner base ', function () {
        let a = {
            aaa: {
                bbb: [
                    { name: 'b', lala: 'lulu' },
                    { mimi: 1234, name: 'a', desc: 'kuku' },
                ],
            },
        };
        let b = { aaa: { bbb: [{ name: 'a' }, { name: 'c' }] } };

        let result = _.isDefaultedEqual(a, b, {
            'aaa.bbb': {
                keySelector: (x) => x.name,
            },
        });
        should(result).be.exactly(false);

        result = _.isDefaultedEqual(a, b);
        should(result).be.exactly(false);
    });

    it('object array different order, arrayMetaCorrector default deep extra inner base props negative', function () {
        let a = { aaa: { bbb: [{ mimi: 1234, name: 'a', desc: 'kuku' }] } };
        let b = { aaa: { bbb: [{ name: 'a', mama: 1234 }] } };

        let result = _.isDefaultedEqual(a, b, {
            'aaa.bbb': {
                keySelector: (x) => x.name,
            },
        });
        should(result).be.exactly(false);

        result = _.isDefaultedEqual(a, b);
        should(result).be.exactly(false);
    });

    it('object array different order, arrayMetaCorrector default deep extra inner base props negative', function () {
        let a = { aaa: { bbb: [{ mimi: 1234, name: 'a', desc: 'kuku' }] } };
        let b = { aaa: { bbb: [{ name: 'b' }] } };

        let result = _.isDefaultedEqual(a, b, {
            'aaa.bbb': {
                keySelector: (x) => x.name,
            },
        });
        should(result).be.exactly(false);

        result = _.isDefaultedEqual(a, b);
        should(result).be.exactly(false);
    });

    it('object array different order, arrayMetaCorrector default deep negative', function () {
        let a = { aaa: { bbb: [{ name: 'a', desc: 'kuku' }] } };
        let b = { aaa: { bbb: [{ name: 'a', desc: 'kaka' }] } };

        let result = _.isDefaultedEqual(a, b, {
            'aaa.bbb': {},
        });
        should(result).be.exactly(false);

        result = _.isDefaultedEqual(a, b);
        should(result).be.exactly(false);
    });

    it('nested array', function () {
        let a = {
            aaa: {
                bbb: [
                    {
                        name: 'a',
                        data: [
                            {
                                id: 111,
                            },
                            {
                                id: 222,
                            },
                        ],
                    },
                    {
                        name: 'b',
                        data: [
                            {
                                id: 333,
                            },
                            {
                                id: 444,
                            },
                        ],
                    },
                ],
            },
        };
        let b = {
            aaa: {
                bbb: [
                    {
                        name: 'b',
                        data: [
                            {
                                id: 444,
                            },
                            {
                                id: 333,
                            },
                        ],
                    },
                    {
                        name: 'a',
                        data: [
                            {
                                id: 222,
                            },
                            {
                                id: 111,
                            },
                        ],
                    },
                ],
            },
        };

        let result = _.isDefaultedEqual(a, b, {
            'aaa.bbb': {
                keySelector: (x) => x.name,
            },
            'aaa.bbb.[].data': {
                keySelector: (x) => x.id,
            },
        });
        should(result).be.exactly(true);

        result = _.isDefaultedEqual(a, b);
        should(result).be.exactly(false);
    });

    it('nested array 2', function () {
        let a = {
            aaa: {
                bbb: [
                    {
                        name: 'a',
                        data: [
                            {
                                id: 111,
                            },
                            {
                                id: 222,
                            },
                        ],
                    },
                    {
                        name: 'b',
                        data: [
                            {
                                id: 333,
                            },
                            {
                                id: 444,
                            },
                        ],
                    },
                ],
            },
        };
        let b = {
            aaa: {
                bbb: [
                    {
                        name: 'b',
                        data: [
                            {
                                id: 445,
                            },
                            {
                                id: 333,
                            },
                        ],
                    },
                    {
                        name: 'a',
                        data: [
                            {
                                id: 222,
                            },
                            {
                                id: 111,
                            },
                        ],
                    },
                ],
            },
        };

        let result = _.isDefaultedEqual(a, b, {
            'aaa.bbb': {
                keySelector: (x) => x.name,
            },
            'aaa.bbb.[].data': {
                keySelector: (x) => x.id,
            },
        });
        should(result).be.exactly(false);

        result = _.isDefaultedEqual(a, b);
        should(result).be.exactly(false);
    });

    it('nested array 3', function () {
        let a = {
            aaa: {
                bbb: [
                    {
                        name: 'a',
                        data: [
                            {
                                id: 111,
                            },
                            {
                                id: 222,
                            },
                        ],
                    },
                    {
                        name: 'b',
                        data: [
                            {
                                id: 333,
                            },
                            {
                                id: 444,
                            },
                        ],
                    },
                ],
            },
        };
        let b = {
            aaa: {
                bbb: [
                    {
                        name: 'b',
                        data: [
                            {
                                id: 444,
                            },
                            {
                                id: 333,
                            },
                            {
                                id: 555,
                            },
                        ],
                    },
                    {
                        name: 'a',
                        data: [
                            {
                                id: 222,
                            },
                            {
                                id: 111,
                            },
                        ],
                    },
                ],
            },
        };

        let result = _.isDefaultedEqual(a, b, {
            'aaa.bbb': {
                keySelector: (x) => x.name,
            },
            'aaa.bbb.[].data': {
                keySelector: (x) => x.id,
            },
        });
        should(result).be.exactly(false);

        result = _.isDefaultedEqual(a, b);
        should(result).be.exactly(false);
    });

    it('nested array 4', function () {
        let a = {
            aaa: {
                bbb: [
                    {
                        name: 'a',
                        data: [
                            {
                                id: 111,
                            },
                            {
                                id: 222,
                            },
                        ],
                    },
                    {
                        name: 'b',
                        data: [
                            {
                                id: 333,
                            },
                            {
                                id: 444,
                            },
                        ],
                    },
                ],
            },
        };
        let b = {
            aaa: {
                bbb: [
                    {
                        name: 'b',
                        data: [
                            {
                                id: 444,
                            },
                        ],
                    },
                    {
                        name: 'a',
                        data: [
                            {
                                id: 222,
                            },
                            {
                                id: 111,
                            },
                        ],
                    },
                ],
            },
        };

        let result = _.isDefaultedEqual(a, b, {
            'aaa.bbb': {
                keySelector: (x) => x.name,
            },
            'aaa.bbb.[].data': {
                keySelector: (x) => x.id,
            },
        });
        should(result).be.exactly(false);

        result = _.isDefaultedEqual(a, b);
        should(result).be.exactly(false);
    });

    it('nested array 5', function () {
        let a = {
            aaa: {
                bbb: [
                    {
                        name: 'a',
                        data: [
                            {
                                id: 111,
                                desc: 'zzz',
                            },
                            {
                                id: 222,
                            },
                        ],
                    },
                    {
                        name: 'b',
                        data: [
                            {
                                id: 333,
                            },
                            {
                                id: 444,
                            },
                        ],
                    },
                ],
            },
        };
        let b = {
            aaa: {
                bbb: [
                    {
                        name: 'b',
                        data: [
                            {
                                id: 444,
                            },
                            {
                                id: 333,
                            },
                        ],
                    },
                    {
                        name: 'a',
                        data: [
                            {
                                id: 222,
                            },
                            {
                                id: 111,
                            },
                        ],
                    },
                ],
            },
        };

        let result = _.isDefaultedEqual(a, b, {
            'aaa.bbb': {
                keySelector: (x) => x.name,
            },
            'aaa.bbb.[].data': {
                keySelector: (x) => x.id,
            },
        });
        should(result).be.exactly(true);

        result = _.isDefaultedEqual(a, b);
        should(result).be.exactly(false);
    });

    it('nested array 6', function () {
        let a = {
            aaa: {
                bbb: [
                    {
                        name: 'a',
                        data: [
                            {
                                id: 111,
                            },
                            {
                                id: 222,
                            },
                        ],
                    },
                    {
                        name: 'b',
                        data: [
                            {
                                id: 333,
                                desc: 'aaa',
                            },
                            {
                                id: 444,
                            },
                        ],
                    },
                ],
            },
        };
        let b = {
            aaa: {
                bbb: [
                    {
                        name: 'b',
                        data: [
                            {
                                id: 444,
                            },
                            {
                                id: 333,
                                desc: 11,
                            },
                        ],
                    },
                    {
                        name: 'a',
                        data: [
                            {
                                id: 222,
                            },
                            {
                                id: 111,
                            },
                        ],
                    },
                ],
            },
        };

        let result = _.isDefaultedEqual(a, b, {
            'aaa.bbb': {
                keySelector: (x) => x.name,
            },
            'aaa.bbb.[].data': {
                keySelector: (x) => x.id,
            },
        });
        should(result).be.exactly(false);

        result = _.isDefaultedEqual(a, b);
        should(result).be.exactly(false);
    });
});
