'use strict';

var fs = require('fs');

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

  this.load = function() {
    try {
      config = JSON.parse(fs.readFileSync(path));
      console.log('[CONFIG] configuration loading [OK]');
    } catch(e) {
      console.log('[CONFIG] ' + e.message);
      console.log('[CONFIG] creating default configuration');
      config = this.createDefaultConfig();
      this.tryToWrite('default configuration');
    }
  };

  this.save = function() {
    //TODO необходимо сделать асинхронную запсь
    this.tryToWrite('configuration');
  };

  this.tryToWrite = function(str) {
    try {
      fs.writeFileSync(path, JSON.stringify(config));
      console.log('[CONFIG] %s successfully saved!', str);
    } catch (err) {
      console.log(err.message);
      console.log('[CONFIG] unable to save %s with path: %j', str, path);
    }
  };
}

exports.Config = Config;
