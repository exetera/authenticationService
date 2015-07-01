
var mongojs = require('mongojs');

module.exports = function(connectionString){
	if (connectionString==undefined) {
		connectionString = "";
	}
	
	var db = mongojs(connectionString, [collections]);
	var auth = {};

	auth.addUser = function(){
		
	}

	auth.verifyUser = function(){
		
	}

	auth.userDetail = function(){

	}

	return auth;

}