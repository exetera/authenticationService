
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
        var schema = joi.object().keys({
            username: joi.string().alphanum().min(3).max(30).required(),
            password: joi.string().regex(/[a-zA-Z0-9]{3,30}/).required()
        });
        var result = joi.validate(user, schema);
        if (result.error != null) {
            return cb(result.error);
        } 
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
		    };
		    db.users.save(userDB, function(err,savedObj){
			if (err) return cb(err);
			cb(null, savedObj._id.toString());
		    });
		});			
    };

    auth.verify = function(){	

    };

    auth.get = function(user, cb){
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
		    };
	            console.log(userDB.username);
	            db.users.findOne({
	                username:userDB.username
	            }, function(err, doc) {
	                if (err) return cb(err);
	                console.log("#####" + doc);
	                cb(null, doc);
	            });
		});

	};
    
    auth.close = function(){
    	db.close();
    };
	
    return auth;

}



