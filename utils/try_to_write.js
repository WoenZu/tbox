'use strict';

var fs = require('fs');

exports.tryToWrite = function tryToWrite(str, content, path) {
  try {
    fs.writeFileSync(path, JSON.stringify(content));
    console.log('%s successfully saved!', str);
  } catch (err) {
    console.log(err.message);
    console.log('unable to save %s with path: %j', str, path);
  }
};
