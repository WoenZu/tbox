'use strict';

function Protocol() {
  var msg = {};

  this.parseString = function(str) {
    try {
      return JSON.parse(str);
    } catch(e) {
      console.log(e);
      return {
        'cmd': 'ERROR',
        'prm': ['protocol parse error, string: ', str]
      }; //TODO test error message
    }
  };

  this.register = function(ident, nickName) {
    msg.cmd = 'REGISTER';
    msg.ident = ident;
    msg.prm = [nickName];
    return JSON.stringify(msg);
  };

  this.registered = function(str) {
    msg.cmd = 'REGISTERED';
    msg.ident = '';
    msg.prm = [str];
    return JSON.stringify(msg);
  };

  this.motd = function(str) {
    msg.cmd = 'MOTD';
    msg.ident = '';
    msg.prm = [str];
    return JSON.stringify(msg);
  };

  this.text = function(ident, dest, str) {
    msg.cmd = 'TEXT';
    msg.ident = ident;
    msg.prm = [dest, str];
    return JSON.stringify(msg);
  }
}

exports.Protocol = Protocol;
