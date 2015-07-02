
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

    auth.get = function(username, cb){	
    	db.users.findOne({
            username:username
        }, function(err, user_found) {
            if (err) return cb(err);
            if (user_found == null) return cb('User not found!');
            cb(null,user_found);
            
    	});
    }

    auth.login = function(user, cb){
        db.users.findOne({
            username:user.username
        }, function(err, user_found) {
            if (err) return cb(err);
            if (user_found == null) return cb('User not found!');
            var opts = {
                salt: user_found.salt,
                password: user.password
            };
            hasher(opts, function(err, pass, salt, hash) {
                // opts.salt = salt;
                // console.log(hash);
                user_found.hash = hash;
                db.users.findOne(
                    user_found
                , function(err, user_checked) {
                    if (err) return cb(err);
                    // console.log(user_checked);
                    cb(null, user_checked);
                });

                /**
                hasher(opts, function(err, pass, salt, hash2) {
                    // assert.deepEqual(hash2, hash);
                    // console.log(hash2);
                    // password mismatch
                    opts.password = "aaa";
                    hasher(opts, function(err, pass, salt, hash2) {
                        // assert.notDeepEqual(hash2, hash);
                        console.log("OK");
                    });
                });
                **/

            });
        });

    };
    
    auth.close = function(){
    	db.close();
    };
    
    return auth;

}


