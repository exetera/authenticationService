#

#authenticationService

A [node.js](http://nodejs.org) module for NodeJS Avanscoperta Course. authenticationService offers authentication API

	npm install @piemme/authentication-service


## Usage


``` js
var auth = require('@piemme/authentication-service')([connectionString]);
auth.put({
	username: "exetera",
	password: "pippo"
}, function (err, result) {
      console.log(result)
      });
```

## Methods

### put

A method to insert an user in a Mongo database.

``` js
var user = {
		username: "exetera12323",
		password: "pippo"
	}

	auth.put(user, function callback (err, result){
		 console.log(result)
	});
```

### get

A method to get an existing user from a Mongo database.

``` js
	var user = {
		username: "exetera2",
		password: "pippo"
    };

    auth.get(user, function(err, result){
        console.log(result)

    });

```

### close

A method to close the connection to Mongo database.

``` js
	function(){
		db.close();
	}
```

## Dependencies

Joi for validation<br>
mongojs for database connection<br>
tape for testing