'use strict';

function Protocol() {
  var msg = {};

  this.parseString = function( str ) {

    var splStr = str.split(/\s/);

    msg.command = splStr[0];
    msg.param = splStr[1];


    return msg;
  };
}

exports.Protocol = Protocol;
