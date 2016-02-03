'use strict';

function Client(socket) {
  var sock = socket;
  var IP = socket.remoteAddress;
  var port = String(socket.remotePort); // port - from number to string
  var isRegistered = false;

  //user Data Base info
  var id = '';
  var nickName = '';
  var isAdmin = false;
  var avatar = '';
  var status = '';

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

  this.setId = function(userId) {
    id = userId;
  };

  this.getId = function() {
    return id;
  };

  this.setNick = function(nick){
    nickName = nick;
  };

  this.getNick = function() {
    return nickName;
  };

  this.importUserFormDB = function(user) {
    id = user.id;
    nickName = user.nick;
    isAdmin = user.admin;
    avatar = user.avatar;
    status = user.status;
  };

  //debug function
  this.toString = function() {
    console.log(IP + '\n' + port + '\n' + id + '\n' + nickName + '\n');
  };
}

exports.Client = Client;
