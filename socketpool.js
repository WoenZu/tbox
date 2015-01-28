'use strict';

function SocketPool() {
  var pool = [];

  this.push = function( sock ) {
    pool.push( sock );
  };
}

exports.SocketPool = SocketPool;
