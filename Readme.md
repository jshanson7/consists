# Compare Unordered Arrays

Test equality of arrays ignoring order. Handles:
 - 2 or more arrays
 - arrays with multiple equivalent values
 - primitive & non-primitive array value types (uses [SameValueZero](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero) for equality comparisons)
 - `NaN` values

```javascript
var compareUnorderedArrays = require('compare-unordered-arrays');

compareUnorderedArrays([1,1,2,3], [3,1,2,1], [2,1,3,1]);
// => true

compareUnorderedArrays([1,1,2,3], [3,1,2]);
// => false

var a = { a: 'a' };
var b = { b: 'b' };
var c = { c: 'c' };
var a2 = { a: 'a' };

compareUnorderedArrays([a, b, c], [c, a, b]);
// => true

compareUnorderedArrays([a, b, c], [a2, b, c]);
// => false
```

## Installation

```
npm install compareUnorderedArrays --save
```
or add `/dist/compareUnorderedArrays.min.js` to your html.

## Usage

Browser:

```javascript
var compareUnorderedArrays = window.compareUnorderedArrays;
compareUnorderedArrays([1,1,2,3], [3,1,2,1], [2,1,3,1]);
// => true
```

Node:

```javascript
var compareUnorderedArrays = require('compare-unordered-arrays');
compareUnorderedArrays([1,1,2,3], [3,1,2,1], [2,1,3,1]);
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