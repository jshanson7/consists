(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.compareUnorderedArrays = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// compare any number of arrays ignoring order, must handle:
//  - arrays with multiple equivalent values
//  - non-primitive array value types -- meaning we can't just build
//      up a hash of array values as keys (hash[arr[index]] = ++count)
//      since non-primitives get converted to '[object Object]', ex:
//      var hash = {};
//      var nonPrimitive = { a:'b' };
//      hash[nonPrimitive] = 1;
//      console.log(hash); // => {[object Object]: 1}

module.exports = compareUnorderedArrays;

function compareUnorderedArrays() {
  var first = arguments[0];
  var rest = Array.prototype.slice.call(arguments, 1);
  var initialFirstLength = first.length;
  var initialLengthsEqual = rest.every(function (arr) {
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
    lengthsEqual = rest.every(function (arr, index) {
      rest[index] = currentRestArr = without(arr, currentFirstVal);
      return currentRestArr.length === currentFirstLength;
    });

    if (!lengthsEqual) { return false; }
  }
  return true;
};

function without() {
  var arr = arguments[0].slice();
  var valuesToRemove = Array.prototype.slice.call(arguments, 1);
  var numberOfValuesToRemove = valuesToRemove.length;
  var valueToRemove;
  var indexOfValueToRemove;

  while (numberOfValuesToRemove > 0 && arr.length) {
    valueToRemove = valuesToRemove[--numberOfValuesToRemove];
    while ((indexOfValueToRemove = indexOf(arr, valueToRemove)) !== -1) {
      arr.splice(indexOfValueToRemove, 1);
    }
  }
  return arr;
}

function indexOf(array, value) {
  var length = array.length;

  if (!length) { return -1; }
  if (value !== value) { return indexOfNaN(array); }

  var index = -1;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

function indexOfNaN(array) {
  var length = array.length;
  var index = -1;
  var currentValue;

  while (++index < length) {
    currentValue = array[index];
    if (currentValue !== currentValue) {
      return index;
    }
  }
  return -1;
}

},{}]},{},[1])(1)
});