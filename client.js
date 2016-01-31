'use strict';

function Client(socket) {
  var sock = socket;
  var IP = socket.remoteAddress;
  var port = String(socket.remotePort); // port - from number to string
  var id = '';
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

  this.isRegistered = function() {
    return isRegistered;
  };

  this.getSocket = function() {
    return sock;
  };

  this.setId = function(i) {
    id = i;
  };

  this.getId = function() {
    return id;
  };
}

exports.Client = Client;
