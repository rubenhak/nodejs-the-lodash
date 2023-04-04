import 'mocha';
import should from 'should';

import _ from '../src';

describe('_.makeDict', function () {
    it('sample1', function () {
        let data = [
            ['aa', 123],
            ['bbb', 456],
        ];
        let result = _.makeDict(
            data,
            (x) => x[0],
            (x) => x[1],
        );
        should(result).be.deepEqual({ aa: 123, bbb: 456 });
    });

    it('sample2', function () {
        let data: string[] = [];
        let result = _.makeDict(
            data,
            (x) => x[0],
            (x) => x[1],
        );
        should(result).be.deepEqual({});
    });

    it('sample3', function () {
        let data = null;
        let result = _.makeDict(
            data,
            (x) => x[0],
            (x) => x[1],
        );
        should(result).be.deepEqual({});
    });

    it('sample4', function () {
        let data = null;
        let result = _.makeDict(
            data,
            (x) => x[0],
            (x) => x[1],
        );
        should(result).be.deepEqual({});
    });


    it('sample5', function () {
        let data : Contact[] = [
            {
                name: 'john',
                phone: '1234'
            },
            {
                name: 'jane',
                phone: '6789'
            },
        ];
        let result = _.makeDict(
            data,
            (x) => x.name,
            (x) => x.phone,
        );
        should(result).be.deepEqual({
            "jane": "6789",
            "john": "1234"
        });
    });
});

describe('_.makeBoolDict', function () {
    it('sample1', function () {
        let data = ['aaa', 'bbb'];
        let result = _.makeBoolDict(data);
        should(result).be.deepEqual({ aaa: true, bbb: true });
    });
});


interface Contact
{
    name: string,
    phone: string
}