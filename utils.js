'use strict';
var fs = require( 'fs' );

/**
 *
 * @param filePath - path to configuration file include name - process.cwd() + "/config.json"
 * @param defaultContent - object
 * @returns { object }
 */
function checkFile ( filePath, defaultContent ) {
	try {
		var conf = fs.readFileSync( filePath );
		console.log( '[DEBUG] configuration loading [OK]' );
		return JSON.parse( conf );
	} catch( e ) {
		console.log( e );
		// понадобится обрабатывать ситуационные ошибки и в
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

function LogIt( mod ) {
	var module = mod;
	this.setModule = function( string ) {
		module = string;
	};

	this.logIt = function( string ) {
		console.log( module + ' : ' + string );
	};
}

exports.LogIt = LogIt;
exports.checkFile = checkFile;
