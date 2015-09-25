(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.consists = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = consists;

/**
 * Tests if arrays consist of the same members; handles
 *  - arrays with multiple equivalent values
 *  - non-primitive array value types
 *
 * @param {...Array} [arrays] The arrays to compare.
 * @returns {boolean} Returns `true` if all unordered arrays are equivalent.
 */

function consists() {
  var arrays = Array.prototype.slice.call(arguments);

  if (!arrays.length) { return true; }
  if (arrays.length === 1) { return false; }
  if (!arrays.every(function (array) { return array.constructor === Array; })) {
    return false;
  }

  var value;
  var firstArray = arrays[0];
  var others = arrays.slice(1);
  var length = firstArray.length;
  var lengthsEqual = others.every(function (other) {
    return length === other.length;
  });

  if (!lengthsEqual) { return false; }

  while (length > 0) {
    firstArray = without(firstArray, value = firstArray[0]);
    length = firstArray.length;
    lengthsEqual = others.every(function (other, index) {
      return length === (others[index] = without(other, value)).length;
    });

    if (!lengthsEqual) { return false; }
  }
  return true;
}


function without() {
  var arr = arguments[0].slice();
  var valuesToRemove = Array.prototype.slice.call(arguments, 1);
  var numberOfValuesToRemove = valuesToRemove.length;
  var valueToRemove;
  var indexOfValueToRemove;

  while (numberOfValuesToRemove && arr.length) {
    valueToRemove = valuesToRemove[--numberOfValuesToRemove];
    while ((indexOfValueToRemove = indexOf(arr, valueToRemove)) !== -1) {
      arr.splice(indexOfValueToRemove, 1);
    }
  }
  return arr;
}

// simplified lodash indexOf, uses SameValueZero
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