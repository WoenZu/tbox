'use strict';

function ClientPool() {
  var pool = [];

  this.add = function( sock ) {
    pool.push( sock );
  };

  this.remove = function( sock ) {
    //remove socket
    for ( var i = 0; i < pool.length; i++ ) {

    }
    pool.splice( i, 1);
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

exports.ClientPool = ClientPool;
