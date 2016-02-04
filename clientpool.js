'use strict';

function ClientPool() {
  var pool = [];

  this.addClient = function(client) {
    var id = client.getId();
    if(this.getClientById(id) !== null) {
      console.log('[ERROR-ClientPool] User ' + id + ' already exist.');
      return false;
    }
    pool.push(client);
    return true;
  };

  this.checkForClient = function(clientObj) {
    for(var i = 0; i < pool.length; i++) {
      if(pool[i] === clientObj) {
        return true;
      }
    }
    return false;
  };

  this.removeClient = function(client) {
    var  index = this.getClientIndex(client);
    try {
      pool.splice(index, 1);
    } catch (err) {
      console.log(err);
      console.log('[ERROR-ClientPool] Client is not found.');
    }
  };

  this.getClientById = function(userId) {
    for(var i = 0; i < pool.length; i++) {
      if(pool[i].getId() === userId) {
        return pool[i];
      }
    }
    return null;
  };

  this.getClientIndex = function(client) { //client is object of client.js
    var id = client.getId();
    for(var i = 0; i < pool.length; i++) {
      if(pool[i].getId() === id) {
        return i;
      }
    }
    return -1;
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
