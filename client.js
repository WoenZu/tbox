'use strict';

function Client(socket) {
  var sock = socket;
  var IP = socket.remoteAddress;
  var port = String(socket.remotePort); // port from number to string
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

  this.getIdent = function() {
    var ident = '';
    ident = this.getIP() + ':' + this.getPort();
    return ident;
  };
}

exports.Client = Client;
