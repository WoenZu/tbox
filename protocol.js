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

  this.register = function( ip, nick ) {
    msg.cmd = 'REGISTER';
    msg.prm = [ ip, nick ];
    return JSON.stringify( msg );
  };

  this.registered = function() {
    msg.cmd = 'REGISTERED';
    msg.prm = [];
    return msg;
  };
}

exports.Protocol = Protocol;
