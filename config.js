'use strict';

var fs = require('fs');
var tryToWrite = require('./utils/try_to_write').tryToWrite;

function Config(filePath) {
  var path = filePath;
  var config = {};

  this.setConfigPath = function(p) {
    path = p;
  };

  this.getConfigPath = function() {
    return path;
  };

  this.createDefaultConfig = function() {
    config.MOTD = 'hi, this is config.js module of tbox library';
    config.Port = '6666';
    config.ip = '';
    return config;
  };

  //this.setProperty = function()

  this.getProperty = function(prop) {
    return config[prop];
  };

  this.getConfig = function() {
    return config;
  };

  this.load = function() {
    try {
      config = JSON.parse(fs.readFileSync(path));
      console.log('[CONFIG] configuration loading [OK]');
    } catch(e) {
      console.log('[CONFIG] ' + e.message);
      console.log('[CONFIG] creating default configuration');
      config = this.createDefaultConfig();
      tryToWrite('default configuration', config, path);
    }
  };

  this.save = function() {
    tryToWrite('configuration', config, path);
  };

}

exports.Config = Config;
