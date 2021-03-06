'use strict';

var fs = require('fs');
var tryToWrite = require('./utils/try_to_write').tryToWrite;

function UserDB(filePath) {
  var path = filePath;
  var userDB = {
    'users':[]
  };

  this.setDBPath = function(p) {
    path = p;
  };

  this.getDBPath = function() {
    return path;
  };

  this.createUser = function(id, nick) {
    var newUser = {};
    newUser.id = id;
    newUser.nick = nick;
    newUser.admin = false;
    newUser.avatar = '';
    newUser.status = 'pending'; // pending, active, banned
    return newUser;
  };

  this.createAdmin = function(id, nick) {
    var admin = {};
    admin = this.createUser(id, nick);
    admin.admin = true;
    admin.status = 'active';
    return admin;
  };

  this.addUser = function(user) { // user is object like { id: 'TEST'}
    if(!this.checkForUser(user.id)) {
      userDB.users.push(user);
      return true;
    } else {
      return false;
    }
  };

  this.getUser = function(userId) {
    for(var i = 0; i < userDB.users.length; i++) {
      if(userDB.users[i].id === userId) {
        return userDB.users[i];
      }
    }
  };

  this.getAllUsers = function() {
    return userDB.users;
  };

  this.removeUser = function(userId) {
    var index = this.getUserIndex(userId);
    if (index !== (-1)) {
      userDB.users.splice(index, 1);
      return true;
    }
    return false;
  };

  this.checkForUser = function(userId) {
    for(var i = 0; i < userDB.users.length; i++) {
      if(userDB.users[i].id === userId) {
        return true;
      }
    }
    return false;
  };

  this.getUserIndex = function(userId) {
    for(var i = 0; i < userDB.users.length; i++) {
      if(userDB.users[i].id === userId) {
        return i;
      }
    }
    return (-1);
  };

  this.createDefaultDB = function() {
    this.addUser(this.createAdmin('ADMIN', 'admin'));
    return userDB;
  };

  this.loadDB = function() {
    try {
      userDB = JSON.parse(fs.readFileSync(path));
      console.log('[USERDB] user data base loading [OK]');
    } catch(e) {
      console.log('[USERDB] ' + e.message);
      console.log('[USERDB] create default DB');
      userDB = this.createDefaultDB();
      tryToWrite('default DB', userDB, path);
    }
  };

  this.saveDB = function() {
    tryToWrite('userDB', userDB, path);
  };

}

exports.UserDB = UserDB;
