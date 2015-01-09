"use strict";

/**
 *
 * @param notifier - function for sending communication messages to other objects
 * @constructor
 */
function Config( notifier ) {
	var notify = notifier;

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

	/**
	 *
	 * @param file - path to configuration file with name( process.cwd() )
	 * @param varForFile - variable for loading configuration file from disc
	 */
	this.checkForFileExistence = function ( file, varForFile ) {
		try {
			varForFile = fs.readFileSync( file );
			setConfigurationFromFile( varForFile );
		} catch( e ) {
			console.log( e );
			// возможно понадобится обрабатывать ситуационные ошибки и в
			// зависимости от конкретной ошибки выполнять соответствующие действаия
			console.log( 'create a configuration file with the default settings' );
			fs.writeFileSync( file, writeDefaultSettings() );

			// запустить рекурсивно??
			//checkForFileExistence( filename, varForFile )
		}
	};

	this.getAllPropertyes = function() {
		return config;
	};

	//check for file existance
	//checkForFileExistence( filename, defaultContent)
}

module.exports.Config = Config;

console.log('config module is loaded...');
