'use strict';

function Protocol() {
  var msg = {};

  this.parseString = function(str) {
    try {
      return JSON.parse(str);
    } catch(e) {
      console.log(e.message);
      return this.error('protocol parse error: ' + str);
    }
  };

  this.register = function(id, nickName) {
    msg.cmd = 'REGISTER';
    msg.id = id;
    msg.prm = [nickName];
    return JSON.stringify(msg);
  };

  this.registered = function(str) {
    msg.cmd = 'REGISTERED';
    msg.id = '';
    msg.prm = [str];
    return JSON.stringify(msg);
  };

  this.motd = function(str) {
    msg.cmd = 'MOTD';
    msg.id = '';
    msg.prm = [str];
    return JSON.stringify(msg);
  };

  this.text = function(id, dest, str) {
    msg.cmd = 'TEXT';
    msg.id = id;
    msg.prm = [dest, str];
    return JSON.stringify(msg);
  };

  this.error = function(str) {
    msg.cmd = 'ERROR';
    msg.id = '';
    msg.prm = [str];
    return JSON.stringify(msg);
  };
}

exports.Protocol = Protocol;
