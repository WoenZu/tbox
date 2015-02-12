'use strict';

var fs = require( 'fs' );

function UserDB( filePath ) {
  var path = filePath;
  var userDB = {
    'users':[]
  };

  this.setDBPath = function( p ) {
    path = p;
  };

  this.getDBPath = function() {
    return path;
  };

  this.createUser = function( userIP, userName ) {
    var newUser = {};
    newUser.IP = userIP;
    newUser.nickname = userName;
    newUser.access = 3; // 0-admin, 1 - , 2 - , 3 - common user
    newUser.avatar = '';
    newUser.status = 'pending'; // pending, active, banned

    if ( userName == 'admin' ) {
      newUser.access = 3;
      newUser.status = 'active';
    }

    //TODO проверка валидности ip адреса и никнейма

    return newUser;
  };

  this.addUser = function( user ) {
    userDB.users.push( user );
    this.saveDB();
  };

  this.createDefaultDB = function() {
    this.addUser( this.createUser( '127.0.0.1', 'admin' ) );
    return userDB;
  };

  this.loadDB = function() {
    try {
      userDB = JSON.parse( fs.readFileSync( path ) );
      console.log( '[DEBUG] DB loading [OK]' );
    } catch( e ) {
      console.log( e );
      // TODO понадобится обрабатывать ситуационные ошибки и в
      // зависимости от конкретной ошибки выполнять соответствующие действаия
      // в том числе если вываливается исключение на синтаксис JSON файла
      console.log( 'create default DB' );
      userDB = this.createDefaultDB();
      this.tryToWrite( 'default DB' );
    }
  };

  this.saveDB = function() {
    //TODO необходимо сделать асинхронную запсь
    this.tryToWrite( 'userDB' );
  };

  this.tryToWrite = function( str ) {
    try {
      fs.writeFileSync( path, JSON.stringify( userDB ) );
      console.log('[DEBUG] %s successfully saved!', str );
    } catch ( err ) {
      console.log( err );
      console.log( '[DEBUG] unable to save %s with path: %j', str, path );
    }
  };

  this.checkDBForUser = function( ip, nick ) {
    for ( var i = 0; i < userDB.users.length; i++) {

      if ( userDB.users[ i ].IP == ip ) {
        if ( userDB.users[ i ].nickname == nick ) { return true; }
      } else {
        return false;
      }
    }
  };
}

exports.UserDB = UserDB;
