'use strict';

function SocketPool() {
  var pool = [];

  this.push = function( sock ) {
    pool.push( sock );
  };

  this.getClientById = function( id ) {
    var ip = id.ip.split( /\:/ ); //127.0.0.1:6666

    for ( var i = 0; i < pool.length; i++ ) {
      if ( pool[ i ].getIP() == ip[ 0 ] ) {
        if ( pool[ i ].getPort() == ip[ 1 ] ) { return pool[i]; }
      } else {
        return null;
      }
    }
  };

  this.getPool = function() {
    return pool;
  };
}

exports.SocketPool = SocketPool;
