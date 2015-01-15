// to log it module

function LogIt( module ) {
	this.module = module;
}

LogIt.prototype.setModule = function( string ) {
	this.module = string;
};

LogIt.prototype.toLogIt = function( string ) {
	console.log( this.module + ' : ' + string );
};

exports.LogIt = LogIt;
