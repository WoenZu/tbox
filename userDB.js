'use strict';

var fs = require('fs');
var tutils = require('./tutils');
var tbox = require('tbox');
var userInfo = require('./userinfo');
var splitIdent = tutils.splitIdent;

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

  this.createUser = function(ip, nick) {
    var newUser = {};
    newUser.IP = ip;
    newUser.nick = nick;
    newUser.admin = false;
    newUser.avatar = '';
    newUser.status = 'pending'; // pending, active, banned

    //TODO проверка валидности ip адреса и никнейма

    return newUser;
  };

  this.createAdmin = function(userIP) {
    var admin = {};
    admin = this.createUser(userIP, 'admin');
    admin.admin = true;
    admin.status = 'active';
    return admin;
  };

  this.addUser = function(user) {
    userDB.users.push(user);
    this.saveDB();
  };

  this.removeUser = function(ip, nick) {
    var index = this.getUserIndex(ip, nick);
    if (index === (-1)) {
      return false;
    }
    userDB.users.splice(index, 1);
    this.saveDB();
    return true;
  };

  this.createDefaultDB = function() {
    this.addUser(this.createAdmin('127.0.0.1'));//TODO тут должен быть адрес хоста
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
      console.log('create default DB');
      userDB = this.createDefaultDB();
      this.tryToWrite('default DB');
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

  this.checkForUser = function(ip, nick) {//TODO repeating code
    for (var i = 0; i < userDB.users.length; i++) {
      if (userDB.users[i].IP === ip) {
        if (userDB.users[i].nick === nick) { return true; }
      } else {
        return false;
      }
    }
  };

  this.getUserIndex = function(ip, nick) {
    for (var i = 0; i < pool.length; i++) {
      if (userDB.users[i].IP === ip) {
        if (userDB.users[i].nick === nick) { return i; }
      } else {
        return -1;
      }
    }
  };
}

exports.UserDB = UserDB;
