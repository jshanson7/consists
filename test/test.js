var assert = require('assert');
var consists = require('../');

var a = { a: 'a' };
var b = { a: 'a' };
var c = ['a','b'];
var d = function () {};
var e = function () {};
var f = new Date();
var g = [];
var h = [];

describe('consists', function () {
  describe('base case', function () {
    it('should return true for zero arguments', () => {
      assert(consists());
    });

    it('should return false for one argument', () => {
      assert(!consists([]));
      assert(!consists([1,2,3]));
    });
  });

  describe('empty arrays', function () {
    it('should return true for empty arrays', function () {
      assert(consists([], []));
      assert(consists([], [], []));
    });
  });

  describe('primitives', function () {
    it('should return true equivalent arrays with primitives', function () {
      assert(consists([1,1,2,3], [3,1,2,1], [2,1,3,1]));
      assert(consists(['a','a','b','c'], ['b','a','a','c']));
      assert(consists(
        [true,'a',false,'c',0,true, undefined,0,-0,NaN,'a',1,2,-1,false],
        [0,2,undefined,true,-1,0,NaN,'a',1,-0,false,true,false,'c','a']
      ));
    });
    it('should return false inequivalent arrays with primitives', function () {
      assert(!consists([1,1,2,3], [1,2,3,3]));
      assert(!consists(['a','a','b','c'], ['a','b','c']));
      assert(!consists(
        [true,'a',undefined,false,'c',0,true,0,-0,NaN,'a',1,2,-1,false],
        [0,2,true,-1,0,NaN,'a',1,-0,false,false,'c','a',undefined]
      ));
    });
  });

  describe('non-primitives', function () {
    it('should return true equivalent arrays with non-primitives', function () {
      assert(consists([a,b,c,d,e,f,g,h], [h,a,g,c,b,f,e,d]));
      assert(consists([a,a,b], [a,b,a]));
      assert(consists([a,h,h], [h,a,h]));
    });
    it('should return false inequivalent arrays with non-primitives', function () {
      assert(!consists([a,a,b,c,d,e,f,g,h], [h,a,g,c,b,b,f,e,d]));
      assert(!consists([d,e], [d,d]));
      assert(!consists([g,h], [g,g]));
    });
  });
});
