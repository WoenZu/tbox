'use strict';

var fs = require('fs');
var tutils = require('./tutils');
var tbox = require('tbox');
var userInfo = require('./userinfo');

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
      this.saveDB();
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
      this.saveDB();
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
      console.log('[DEBUG] DB loading [OK]');
    } catch(e) {
      console.log(e);
      // TODO понадобится обрабатывать ситуационные ошибки и в
      // зависимости от конкретной ошибки выполнять соответствующие действаия
      // в том числе если вываливается исключение на синтаксис JSON файла
      console.log('[DEBUG] create default DB');
      userDB = this.createDefaultDB();
      this.tryToWrite('default DB');//TODO шозанах?????
    }
  };

  this.saveDB = function() {
    //TODO необходимо сделать асинхронную запсь
    this.tryToWrite('userDB');
  };

  this.tryToWrite = function(str) {
    try {
      fs.writeFileSync(path, JSON.stringify(userDB));
      console.log('[DEBUG] %s successfully saved!', str);
    } catch (err) {
      console.log(err);
      console.log('[DEBUG] unable to save %s with path: %j', str, path);
    }
  };
}

exports.UserDB = UserDB;
