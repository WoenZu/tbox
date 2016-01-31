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

  this.getClientById = function(_id) {
    var id = _id;

    for (var i = 0; i < pool.length; i++) {
      if (pool[i].getId === id) {
        return pool[i];
      } else {
        return null;
      }
    }
  };

  this.getClientIndex = function(client) {
    var id = client.getId();

    for (var i = 0; i < pool.length; i++) {
      if (pool[i].getId() === id) {
        return i;
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
