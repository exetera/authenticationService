
var mongojs = require('mongojs');
var joi = require ('joi');
var hasher = require('pbkdf2-password')();


module.exports = function (connectionString){
	if (connectionString==undefined) {
		connectionString = "mongodb://localhost/building";
	}
	
	console.log("connection mongo...");
	var db = mongojs(connectionString, ["users"]);

	var auth = {};

	auth.put = function(user, cb){
		// if (!validate(user)) {
		// 	cb(err);
		// }	
		var opts = {
		  password: user.password
		};

		hasher(opts, function(err, pass, salt, hash) {
		  user.salt = salt;
		  user.hash = hash;

		  var userDB={
		  	username: user.username,
		  	salt:user.salt,
		  	hash:user.hash
		  }

		  db.users.save(userDB, function(err,savedObj){
		  	 if (err) return cb(err);
		  	 cb(null, savedObj._id.toString());
		  });

		});			
	}

	auth.verify = function(){
		
	}

	auth.get = function(){
		
	}

	return auth;

}



