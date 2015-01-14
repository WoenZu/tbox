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

	// all variables of configuration file config.json
	// configuration example
	// {
	// 	"configuration":
	// 		{
	// 			"MOTD": "Hello to trollbox server...",
	// 			"test": "test property"
	// 		}
	// }

	//default configuration:
	var defaultConfig = {};
	defaultConfig.motd = 'Hello Chat World';
	defaultConfig.test = 'test property';

	this.writeDefaultSettings = function() {
		return JSON.stringify( defaultConfig );
	};

	/**
	 *
	 * @param file
	 */
	this.setConfigurationFromFile = function( file ) {
		config = JSON.parse( file );
	};

	/**
	 *
	 * @param file - path to configuration file with name( process.cwd() )
	 * @param varForFile - variable for loading configuration file from disc
	 */
	this.checkForFileExistence = function ( file, varForFile ) {
		try {
			varForFile = fs.readFileSync( file );
			this.setConfigurationFromFile( varForFile );
		} catch( e ) {
			console.log( e );
			// возможно понадобится обрабатывать ситуационные ошибки и в
			// зависимости от конкретной ошибки выполнять соответствующие действаия
			notify( 'create a configuration file with the default settings' );
			fs.writeFileSync( file, this.writeDefaultSettings() );

			// запустить рекурсивно??
			//checkForFileExistence( filename, varForFile )
		}
	};

	this.getAllProperties = function() {
		return config;
	};

	//check for file existance
	//checkForFileExistence( filename, defaultContent)
}

module.exports.Config = Config;

console.log('config module is loaded...');
