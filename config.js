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
	//	 "MOTD": "Hello to trollbox server...",
	//	 "test": "test property"
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
	
	this.getConfiguration = function() {
		return config;
	};
	
	this.getDefaultConfiguration = function() {
		return JSON.stringify( defaultConfig ); //return JSON string
	};
	
	/**
	 *
	 * @param pathToFile - path to configuration file include name - process.cwd() + "/config.json"
	 */
	this.checkForFileExistence = function ( pathToFile ) {
		try {
			var str = fs.readFileSync( pathToFile );
			this.setConfiguration( str );
		} catch( e ) {
			console.log( e );
			notify( 'create a configuration file with the default settings' );

			// TODO перед записью фийла со значениями по умолчанию проверить на возможность такой записи,
			// TODO если запись не возможна
			// TODO работа с конфигурацией по умолчанию должна быть проведена из памяти, без использования диска

			// try {
			// 		fs.writeFileSync( pathToFile, this.getDefaultConfiguration() );
			// } catch( e ) {
			// 		notify( 'unable to write default config.json file to disk' );
			//		this.setConfiguration( this.getDefaultConfiguration() );
			// TODO need to load default config in memory
			// }

			fs.writeFileSync( pathToFile, this.getDefaultConfiguration() );

			// возможно понадобится обрабатывать ситуационные ошибки и в
			// зависимости от конкретной ошибки выполнять соответствующие действаия
			// TODO накодить, действия, если запрещна запись на диск
			// TODO и если файл соотвутстует по назавнию, но не соответствует содержанию

			this.checkForFileExistence( pathToFile );
		}
	};
	//checkForFileExistence( filename )
}

module.exports.Config = Config;

//console.log('config module is loaded...');
