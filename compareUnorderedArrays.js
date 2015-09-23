var every = require('lodash/collection/every');
var without = require('lodash/array/without');

// compare any number of arrays ignoring order, must handle:
//  - arrays with multiple equivalent values
//  - non-primitive array value types -- meaning we can't just build
//      up a hash of array values as keys (hash[arr[index]] = ++count)
//      since non-primitives get converted to '[object Object]', ex:
//      var hash = {};
//      var nonPrimitive = { a:'b' };
//      hash[nonPrimitive] = 1;
//      console.log(hash); // => {[object Object]: 1}

module.exports = function compareUnorderedArrays() {
  var first = arguments[0];
  var rest = Array.prototype.slice.call(arguments, 1);
  var initialFirstLength = first.length;
  var initialLengthsEqual = every(rest, function (arr) {
    return arr.length === initialFirstLength;
  });

  if (!initialLengthsEqual) { return false; }

  var currentFirstVal;
  var currentFirstLength;
  var currentRestArr;
  var lengthsEqual;

  // for each value of 'first', iteratively remove all instances
  // of the value from each array while testing if the resulting
  // arrays are equal in length
  // if any two resulting arrays differ in length, they contain
  // different numbers of the value, and are not equivalent
  while (first.length > 0) {
    currentFirstVal = first[0];
    first = without(first, currentFirstVal);
    currentFirstLength = first.length;
    lengthsEqual = every(rest, function (arr, index) {
      rest[index] = currentRestArr = without(arr, currentFirstVal);
      return currentRestArr.length === currentFirstLength;
    });

    if (!lengthsEqual) { return false; }
  }
  return true;
}
