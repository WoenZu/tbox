'use strict';
var fs = require( 'fs' );
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

  this.getDBPath = function () {
    return path;
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

  this.addUser = function( user ) {
    userDB.users.push( user );
    console.log('%j', userDB );
    this.saveDB();
  };

  this.createDefaultDB = function () {
    this.addUser( this.createUser( 'admin', '127.0.0.1' ) );
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
      try {
        fs.writeFileSync( path, JSON.stringify( userDB ) );
        console.log( '[DEBUG] writing DB to file [OK]' );
      } catch( e ) {
        console.log('[DEBUG] unable to write default DB file to disk');
      }
    }
  };

  this.saveDB = function() {
    //TODO необходимо сделать асинхронную запсь
    try {
      fs.writeFileSync( path, JSON.stringify( userDB ) );
        console.log('[DEBUG] UserDB successfully saved!');
    } catch ( err ) {
      console.log( err );
      console.log( '[DEBUG] unable to save userDB with path: %j', path );
    }
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
