var utils = require( './lib/utils' );
var logit = require( './logit' ).LogIt;
var config = require( './config' ).Config;

module.exports.Utils = utils;
module.exports.LogIt = logit;
module.exports.Config = config;
console.log( 'tbox is loaded...' );