'use strict';

var os = require('os');

function UserInfo() {
  var IP = '';
  var userName = '';
  var host = '';

  if (process.platform === 'win32') {

    IP = os.networkInterfaces().Ethernet[1].address;
    userName = process.env.USERNAME;
    host = os.hostname();

  } else if (process.platform === 'darwin') {
    IP = os.networkInterfaces().en0[1].address;
    userName = process.env.USER;
    host = os.hostname();

  } else {
    // linux
    // P =
    // userName =
    // host =
  }

  this.getUserName = function () {
    return userName;
  };

  this.getIP = function () {
    return IP;
  };

  this.getHostName = function () {
    return host;
  };

  this.getUserInfo = function () {
    return IP + '/' + host + '/' + userName;
  };
}

exports.UserInfo = UserInfo;
