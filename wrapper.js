'use strict';

function Wrapper(s, m, e) {
  // separators
  // s - start - '\x00\x00'
  // m - middle - '\x00'
  // e - end '\x0d0a'

  var startSep = s;
  var midSep = m;
  var endSep = e;

  this.wrap = function(msg) {
    var str = String(msg);
    var len = msg.length;
    return startSep + len + midSep + str + endSep;
  };

  this.unwrap = function(msg) {

  };
}

exports.Wrapper = Wrapper;