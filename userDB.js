'use strict';
var utils = require( './utils' );

var checkFile = utils.checkFile;

function UserDB( filePath ) {
  // if filePath= null then filepath ?????
  var path = filePath;
  var userDB = {};

  var defaultDB = {};
  defaultDB.users = [
    {
      'IP': '127.0.0.1',
      'nickname': 'admin',
      'access': 0,
      'avatar': 'mmmm.jpg',
      'status': 'active'
    }];

  userDB = checkFile( path, defaultDB );

  this.setDBPath = function( p ) {
    path = p;
  };

  /**
   *
   * @param user - user  object, for format see defaultDB
   */
  this.addUser = function( user ) {
    userDB.users.push( usr );
  };

  this.createUser = function( userName, userIP ) {
    //TODO провурка валидности ip адреса и никнейма
    var newUser = {};
    newUser.IP = userIP;
    newUser.nickname = userName;
    newUser.access = 3; //regular user - 3, moderator - 2, administrator - 0
    newUser.avatar = '';
    newUser.status = 'pending'; // pending, active, banned
    return newUser;
  };


  // загрузка базы из файла

  // запись объекта базы в файл, асинхронно


}

exports.UserDB = UserDB;