# Lodash Extender

[![Build Status](https://travis-ci.org/rubenhak/nodejs-the-lodash.svg?branch=master)](https://travis-ci.org/rubenhak/nodejs-the-lodash)

Library meant to extend capabilites of NodeJS Lodash library.

## _.makeDict
Create a dictionary object from array.




**Signature:**

_.makeDict(array, cbKey, cbValue) : returns dict.

**array**: array of items

**cbKey**: function to return key of each item.

**cbValue**: optional callback to set value for each item. if not set the value would be the item itself.

**Usage 1:**
```js
var items = ['cat', 'dog', 'elephant']
var dict = _.makeDict(items, x => x, x => x.length);
console.log(dict);
```

Outputs:
```
{
    "cat": 3,
    "dog": 3,
    "elephant": 8,
}
```

**Usage 2:**
```js
var items = [
    { id: 1, name: 'cat' }, 
    { id: 3, name: 'dog' }, 
    { id: 4, name: 'elephant' }
]
var dict = _.makeDict(items, x => x.id, x => ({ name: x.name }));
console.log(dict);
```

Outputs:
```
{
    1: {
        "name": "cat"
    },
    3: {
        "name": "dog"
    },
    4: {
        "name", "elephant"
    }
}
```


## Publishing

```sh
$ ./publish.sh
```

### Updating NPM Key
```sh
$ travis encrypt <NPM-KEY-GOES-HERE> --add deploy.api_key
```