'use strict';

function Protocol() {
  var msg = {};

  this.parseString = function( str ) {
    try {
      return JSON.parse( str );
    } catch( e ) {
      console.log( e );
      return {
        'cmd': 'ERROR',
        'prm': [ 'protocol parse error' ]
      }; //TODO test error message
    }
  };

  this.register = function( ipAddress, nickName ) {
    msg.cmd = 'REGISTER';
    msg.id = { ip: ipAddress, nick: nickName };
    msg.prm = [];
    return JSON.stringify( msg );
  };

  this.registered = function( str ) {
    msg.cmd = 'REGISTERED';
    msg.id = {};
    msg.prm = [ str ];
    return JSON.stringify( msg );
  };
}

exports.Protocol = Protocol;
