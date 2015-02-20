'use strict';

var tutils = require( './tutils' );
var splitIdent = tutils.splitIdent;

function ClientPool() {
  var pool = [];

  this.addClient = function( client ) {
    pool.push( client );
  };

  this.removeClient = function( client ) {
    var  index = this.getClientIndex( client );
    try {
      pool.splice( index, 1);
    } catch ( err ) {
      console.log( err );
      console.log( '[ERROR] Client is not found.' );
    }
  };

  this.getClientById = function( ident ) {
    var id = splitIdent( ident );
    for ( var i = 0; i < pool.length; i++ ) {
      if ( pool[ i ].getIP() == id[ 0 ] ) {
        if ( pool[ i ].getPort() == id[ 1 ] ) { return pool[ i ]; }
      } else {
        return null;
      }
    }
  };

  this.getClientIndex = function( ident ) {
    var id = splitIdent( ident );
    for ( var i = 0; i < pool.length; i++ ) {
      if ( pool[ i ].getIP() == id[0]) {
        if (pool[i].getPort() == id[1]) { return i; }
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
