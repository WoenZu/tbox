"use strict";
var fs = require( 'fs' );

/**
*
* @param notifier - function for sending communication messages to other objects
* @constructor
*/
function Config( notifier ) {
	var notify = notifier;
	var config = {};

	// configuration file example
	// config.json:
	// {
	// "MOTD": "Hello to trollbox server...",
	// "test": "test property"
	// }

	var defaultConfig = {};
	defaultConfig.motd = 'Hello Chat World';
	defaultConfig.test = 'test property';

	/**
	*
	* @param str - JSON format string
	*/
	this.setConfiguration = function( str ) {
		config = JSON.parse( str );
	};

	/**
	 *
	 * @returns { config object }
	 */
	this.getConfiguration = function() {
		return config;
	};

	/**
	 *
	 * @returns { JSON string }
	 */
	this.getDefaultConfiguration = function() {
		return JSON.stringify( defaultConfig );
	};

	/**
	*
	* @param filePath - path to configuration file include name - process.cwd() + "/config.json"
	*/
	this.checkForFileExistence = function ( filePath ) {
		try {
			var str = fs.readFileSync( filePath );
			this.setConfiguration( str );
			notify( '[DEBUG] configuration loading [OK]' );
		} catch( e ) {
			console.log( e );

			// понадобится обрабатывать ситуационные ошибки и в
			// зависимости от конкретной ошибки выполнять соответствующие действаия
			// в том числе если вываливается исключение на синтаксис JSON файла
			notify( 'create a configuration with the default settings' );
			this.setConfiguration( this.getDefaultConfiguration() );

			try {
				fs.writeFileSync( filePath, this.getDefaultConfiguration() );
				notify( '[DEBUG] writing configuration to file [OK]' );
			} catch( e ) {
				notify( 'unable to write default config.json file to disk' );
			}
		}
	};
	//checkForFileExistence( filePath );
}
module.exports.Config = Config;
