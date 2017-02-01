# Consists [![NPM version][npm-image]][npm-url] [![Build status][travis-image]][travis-url]

Test if arrays consist of the same members. Handles:
 - 2 or more arrays
 - arrays with multiple equivalent values
 - primitive & non-primitive array value types (uses [SameValueZero](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero) for equality comparisons)
 - `NaN` values

```javascript
import consists from 'consists';

consists([1,1,2,3], [3,1,2,1], [2,1,3,1]);
// => true

consists([1,1,2,3], [3,1,2]);
// => false

const a = { a: 'a' };
const b = { b: 'b' };
const c = { c: 'c' };
const a2 = { a: 'a' };

consists([a, b, c], [c, a, b]);
// => true

consists([a, b, c], [a2, b, c]);
// => false
```

## Installation

```
npm i --save consists
```

## Usage

```javascript
import consists from 'consists';

consists([1,1,2,3], [3,1,2,1], [2,1,3,1]);
// => true
```

Lodash mixin:

```javascript
import _ from 'lodash';
import consists from 'consists';

_.mixin({consists});
_.consists([1,1,2,3], [3,1,2,1], [2,1,3,1]);
// => true
```

## License

MIT

[npm-image]: https://badge.fury.io/js/consists.svg
[npm-url]: https://npmjs.org/package/consists
[travis-image]: https://travis-ci.org/jshanson7/consists.svg
[travis-url]: https://travis-ci.org/jshanson7/consists
