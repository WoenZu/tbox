"use strict";

function Config( notifier ) {
	var notify = notifier; 
	//function for notifycation
	// all variables of configuration file config.json

	// example
	// {
	// 	"configuration":
	// 		{
	// 			"MOTD": "Hello to trollbox server...",
	// 			"test": "test property"
	// 		}
	// }

	var config = {};
	config.motd = 'Hello Chat World';
	config.test = 'test property';
	
	this.getAllPropertyes = function() {
		return config;
	};

	//check for file existance
	//checkForFileExistence( filename, defaultContent)
}



Config.prototype.checkForFileExistence = function ( file, varForFile) {
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
		checkForFileExistence( filename, varForFile)
	}
};

module.exports.Config = Config;

console.log('config module is loaded...');
