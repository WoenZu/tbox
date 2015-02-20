'use strict';

var fs = require( 'fs' );
var tutils = require( './tutils' );
var splitIdent = tutils.splitIdent;

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

  this.createUser = function( ident, userName ) {
    var id = splitIdent( ident );
    var newUser = {};
    newUser.IP = id[ 0 ];
    newUser.nickname = userName;
    newUser.admin = false;
    newUser.avatar = '';
    newUser.status = 'pending'; // pending, active, banned

    //TODO проверка валидности ip адреса и никнейма

    return newUser;
  };

  this.createAdmin = function( userIP ) {
    var admin = {};
    admin = this.createUser( userIP, 'admin' );
    admin.admin = true;
    admin.status = 'active';
    return admin;
  };

  this.addUser = function( user ) {
    userDB.users.push( user );
    this.saveDB();
  };

  this.removeUser = function( user ) {
    // a  is index for delete
    // userDB.users.splice( a, 1 );
  };

  this.createDefaultDB = function() {
    this.addUser( this.createAdmin( '127.0.0.1' ) );
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

  this.checkForUser = function( ident, nick ) {//TODO repeating code
    var ip = splitIdent( ident );

    for ( var i = 0; i < userDB.users.length; i++) {
      if ( userDB.users[ i ].IP == ip[ 0 ] ) {
        if ( userDB.users[ i ].nickname == nick ) { return true; }
      } else {
        return false;
      }
    }
  };
}

exports.UserDB = UserDB;
