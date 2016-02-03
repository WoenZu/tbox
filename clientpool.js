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

  this.removeClient = function(client) {
    var  index = this.getClientIndex(client);
    try {
      pool.splice(index, 1);
    } catch (err) {
      console.log(err);
      console.log('[ERROR-ClientPool] Client is not found.');
    }
  };

  this.getClientById = function(id) {
    for(var i = 0; i < pool.length; i++) {
      if(pool[i].getId() === id) {
        return pool[i];
      } else {
        return null;
      }
    }
  };

  this.getClientIndex = function(client) {
    var id = client.getId();

    for(var i = 0; i < pool.length; i++) {
      if(pool[i].getId() === id) {
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
