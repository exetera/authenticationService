var auth = require('./')();

var user = {
	username: "exetera",
	password: "pippo"
}


auth.put(user, function callback (err, id){
	if (err) return console.error(err);
	console.log(id);
});

