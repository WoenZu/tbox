'use strict';
var utils = require( './utils' );

var loadFile = utils.loadFile;

function UserDB( filePath ) {
  var path = filePath;
  var userDB = {};

  this.setDBPath = function( p ) {
    path = p;
  };

  this.createUser = function( userName, userIP, access ) {
    if( isNaN(access) ) {
      access = 3;
    }

    //TODO проверка валидности ip адреса и никнейма

    var newUser = {};
    newUser.IP = userIP;
    newUser.nickname = userName;
    newUser.access = access;
    newUser.avatar = '';
    newUser.status = 'pending'; // pending, active, banned
    return newUser;
  };

  this.addUser = function( user ) {
    userDB.users.push( usr );
  };

  this.loadDB = function( path, defaultDB) {
    userDB = loadFile( path, defaultDB );//TODO refactor (loadFile func)
  };

  this.saveDB = function( db ) {
    // запись объекта базы в файл, асинхронно
  };

  this.checkDBForUser = function( nick, ip ) {

  };
}

exports.UserDB = UserDB;
