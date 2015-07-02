var test = require('tape');
var auth = require('../')();


test('test add user', function (t) {
	var user = {
		username: "exetera12323",
		password: "pippo"
	}

	auth.put(user, function callback (err, id){
		t.notOk(err, 'no error')
		t.ok(id, 'returns an id');
		t.end();
	});
});

test('put with username empty', function (t) {
 
	var user = {
		username: "",
		password: "pippo"
	}


	auth.put(user, function callback (err, id){
		t.ok(err, 'error');

		t.end();
	});

});

test('put with password empty', function (t) {
 
	var user = {
		username: "pippo",
		password: ""
	}


	auth.put(user, function callback (err, id){
		t.ok(err, 'error');
		t.end();
	});

});

test('test get user', function (t) {
    //t.plan(1);
    var user = {
		username: "exetera2",
		password: "pippo"
    };
    auth.put(user, function(err, data){
        auth.get(user.username, function(err, data){
            t.equal(data.username, user.username);
            // auth.close();
            t.end();
        });
    });
});


test('test get user not exists', function (t) {
    var user_not_exists = {
	username: "blalb",
	password: "alalal"
    };
    auth.get(user_not_exists.username, function(err, data){
        console.log(err);
        t.ok(err, 'error');
        auth.close();
        t.end();
    });


});

