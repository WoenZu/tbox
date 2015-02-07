'use strict';
var utils = require( './utils' );

var loadFile = utils.loadFile;

function UserDB( filePath ) {
  var path = filePath;
  var userDB = {
    'users':[]
  };

  this.setDBPath = function( p ) {
    path = p;
  };

  this.createUser = function( userName, userIP ) {
    var newUser = {};
    newUser.IP = userIP;
    newUser.nickname = userName;
    newUser.access = 3; // 0-admin, 1 - , 2 - , 3 - common user
    newUser.avatar = '';
    newUser.status = 'pending'; // pending, active, banned

    if( userName == 'admin' ) {
      newUser.access = 3;
      newUser.status = 'active';
    }

    //TODO проверка валидности ip адреса и никнейма

    return newUser;
  };

  this.createDefaultDB = function () {
    this.addUser( this.createUser( 'admin', '127.0.0.1' ) );
    return userDB;
  };

  this.addUser = function( user ) {
    userDB.users.push( user );
    this.saveDB();
  };

  this.loadDB = function( path, defaultDB) {
    userDB = loadFile( path, defaultDB );//TODO refactor (loadFile func)
  };

  this.saveDB = function() {
    // запись объекта базы в файл, асинхронно
    //saveFile( userDB );
  };

  this.checkDBForUser = function( ip, nick ) {
    for ( var i = 0; i < userDB.users.length; i++) {
      if ( userDB.users[ i ].nickname == nick && userDB.users[ i ].IP == ip ) {
        return true;
      } else {
        return false;
      }
    }
  };
}

exports.UserDB = UserDB;
