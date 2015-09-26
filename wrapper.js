'use strict';

function Wrapper(s, m, e) {
  // separators
  // s - start
  // m - middle
  // e - end

  var startSep = '';
  var midSep = '';
  var endSep = '';

  this.wrap = function(msg) {
    var str = String(msg);
    var len = msg.length;
    return startSep + len + midSep + str + endSep;
  };

  this.unwrap = function(msg) {

  };
}

exports.Wrapper = Wrapper;