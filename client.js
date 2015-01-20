'use strict';

function Client( socket ) {
  var IP = socket.remoteAddress;
  var port = socket.remotePort;
  var nickName = '';
  var isRegistered = false;

  this.getIP = function() {
    return IP;
  };

  this.getPort = function() {
    return port;
  };
}

exports.Client = Client;
