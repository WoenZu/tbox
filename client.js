'use strict';

function Client( socket ) {
  var IP = socket.remoteAddress;
  var port = socket.remotePort;
  var nickName = '';

  this.getIP = function() {
    return IP;
  };

  this.getPort = function() {
    return port;
  };
}

exports.Client = Client;
