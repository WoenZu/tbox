'use strict';

var tutils = require('./tutils');
var splitIdent = tutils.splitIdent;

function ClientPool() {
  var pool = [];

  this.addClient = function(client) {
    pool.push(client);
  };

  this.removeClient = function(client) {
    var  index = this.getClientIndex(client);
    try {
      pool.splice(index, 1);
    } catch (err) {
      console.log(err);
      console.log('[ERROR] Client is not found.');
    }
  };

  this.getClientById = function(ident) {
    var id = splitIdent(ident);
    var ip = id[0];
    var port = id[1];

    for (var i = 0; i < pool.length; i++) {
      if (pool[i].getIP() === ip) {
        if (pool[i].getPort() === port) {
          return pool[i]; }
      } else {
        return null;
      }
    }
  };

  this.getClientIndex = function(client) {
    var ip = client.getIP();
    var port = client.getPort();

    for (var i = 0; i < pool.length; i++) {
      if (pool[i].getIP() === ip) {
        if (pool[i].getPort() === port) { return i; }
      } else {
        return -1;
      }
    }
  };

  this.getClientByIndex = function(index) {
    return pool[index];
  };

  this.getPool = function() {
    return pool;
  };
  this.getLength = function() {
    return pool.length;
  };
}

exports.ClientPool = ClientPool;
