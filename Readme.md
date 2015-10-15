# Consists [![NPM version][npm-image]][npm-url] [![Build status][travis-image]][travis-url]

Test if arrays consist of the same members. Handles:
 - 2 or more arrays
 - arrays with multiple equivalent values
 - primitive & non-primitive array value types (uses [SameValueZero](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero) for equality comparisons)
 - `NaN` values

```javascript
var consists = require('consists');

consists([1,1,2,3], [3,1,2,1], [2,1,3,1]);
// => true

consists([1,1,2,3], [3,1,2]);
// => false

var a = { a: 'a' };
var b = { b: 'b' };
var c = { c: 'c' };
var a2 = { a: 'a' };

consists([a, b, c], [c, a, b]);
// => true

consists([a, b, c], [a2, b, c]);
// => false
```

## Installation

```
npm install consists --save
```
or add `/dist/consists.min.js` to your html.

## Usage

Browser:

```javascript
var consists = window.consists;
consists([1,1,2,3], [3,1,2,1], [2,1,3,1]);
// => true
```

Node:

```javascript
var consists = require('consists');
consists([1,1,2,3], [3,1,2,1], [2,1,3,1]);
// => true
```

Lodash mixin:

```javascript

var _ = require('lodash');
_.mixin({ 'consists': require('consists') });
_.consists([1,1,2,3], [3,1,2,1], [2,1,3,1]);
// => true
```

## Contributing

Clone repo, cd into it, then
```
npm install && npm run test-watch
```

## Building

```
npm run build
```

## Testing

```
npm test
```
For live retesting:
```
npm run test-watch
```
Browser:
```
npm run build && open test/test.html
```

## Linting

```
npm run lint
```

[npm-image]: https://badge.fury.io/js/consists.svg
[npm-url]: https://npmjs.org/package/consists
[travis-image]: https://travis-ci.org/jshanson7/consists.svg
[travis-url]: https://travis-ci.org/jshanson7/consists