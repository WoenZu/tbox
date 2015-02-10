'use strict';

function Client( socket ) {
  var sock = socket;
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

  this.register = function() {
    isRegistered = true;
  };

  this.getSocket = function() {
    return sock;
  };
}

exports.Client = Client;
