'use strict';

exports.createPath = function createPath(fileName) {
  var path = '';
  if (process.platform === 'win32') {
    path = process.cwd() + '\\' + fileName;
  } else if (process.platform === 'darwin') {
    path = process.cwd() + '/' + fileName;
  } else {
    // linux
  }
  return path;
};
