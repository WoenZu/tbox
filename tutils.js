'use strict';

var fs = require('fs');

function tryToWrite(str, content, path) {
	try {
		fs.writeFileSync(path, JSON.stringify(content));
		console.log('%s successfully saved!', str);
	} catch (err) {
		console.log(err.message);
		console.log('unable to save %s with path: %j', str, path);
	}
}

function createPath(fileName) {
	var path = '';
	if (process.platform === 'win32') {
		path = process.cwd() + '\\' + fileName;
	} else if (process.platform === 'darwin') {
		path = process.cwd() + '/' + fileName;
	} else {
		// linux
	}
	return path;
}

function LogIt(mod) {
	var module = mod;
	this.setModule = function(string) {
		module = string;
	};

	this.logIt = function(string) {
		console.log(module + ' : ' + string);
	};
}

exports.tryToWrite = tryToWrite;
exports.createPath = createPath;
exports.LogIt = LogIt;
