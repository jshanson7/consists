var assert = require('assert');
var compareUnorderedArrays = require('../');

var a = { a: 'a' };
var b = { a: 'a' };
var c = ['a','b'];
var d = function () {};
var e = function () {};
var f = new Date();
var g = [];
var h = [];

describe('compareUnorderedArrays', function () {
  it('should return true for equivalent arrays', function () {
    // empty
    assert(compareUnorderedArrays([], []));
    assert(compareUnorderedArrays([], [], []));
    // primitives
    assert(compareUnorderedArrays([1,1,2,3], [3,1,2,1], [2,1,3,1]));
    assert(compareUnorderedArrays(['a','a','b','c'], ['b','a','a','c']));
    assert(compareUnorderedArrays(
      [true,'a',false,'c',0,true, undefined,0,-0,NaN,'a',1,2,-1,false],
      [0,2,undefined,true,-1,0,NaN,'a',1,-0,false,true,false,'c','a']
    ));
    // non-primitives
    assert(compareUnorderedArrays([a,b,c,d,e,f,g,h], [h,a,g,c,b,f,e,d]));
    assert(compareUnorderedArrays([a,a,b], [a,b,a]));
    assert(compareUnorderedArrays([a,h,h], [h,a,h]));
  });

  it('should return false for inequivalent arrays', function () {
    // primitives
    assert(!compareUnorderedArrays([1,1,2,3], [1,2,3,3]));
    assert(!compareUnorderedArrays(['a','a','b','c'], ['a','b','c']));
    assert(!compareUnorderedArrays(
      [true,'a',undefined,false,'c',0,true,0,-0,NaN,'a',1,2,-1,false],
      [0,2,true,-1,0,NaN,'a',1,-0,false,false,'c','a',undefined]
    ));
    // non-primitives
    assert(!compareUnorderedArrays([a,a,b,c,d,e,f,g,h], [h,a,g,c,b,b,f,e,d]));
    assert(!compareUnorderedArrays([d,e], [d,d]));
    assert(!compareUnorderedArrays([g,h], [g,g]));
  });
});
