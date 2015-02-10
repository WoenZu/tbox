'use strict';
var fs = require( 'fs' );

function loadFile(filePath, defaultContent) {
	try {
		var conf = fs.readFileSync( filePath );
		console.log( '[DEBUG] configuration loading [OK]' );
		return JSON.parse( conf );
	} catch( e ) {
		console.log( e );
		// TODO понадобится обрабатывать ситуационные ошибки и в
		// зависимости от конкретной ошибки выполнять соответствующие действаия
		// в том числе если вываливается исключение на синтаксис JSON файла
		console.log( 'create a configuration with the default settings' );

		try {
			fs.writeFileSync( filePath, JSON.stringify( defaultContent ) );
			console.log( '[DEBUG] writing configuration to file [OK]' );
		} catch( e ) {
			console.log( '[DEBUG] unable to write default config.json file to disk' );
		}
		return defaultContent;
	}
}

function createPath( fileName ) {
	var path = '';
	if ( process.platform === 'win32' ) {
		path = process.cwd() + '\\' + fileName;
	} else if (process.platform === 'darwin') {
		path = process.cwd() + '/' + fileName;
	} else {
		// linux
	}
	return path;
}

function LogIt( mod ) {
	var module = mod;
	this.setModule = function( string ) {
		module = string;
	};

	this.logIt = function( string ) {
		console.log( module + ' : ' + string );
	};
}

exports.loadFile = loadFile;
exports.createPath = createPath;
exports.LogIt = LogIt;

