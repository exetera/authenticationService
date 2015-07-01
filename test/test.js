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
		auth.close();
		t.end();
	});
});

test('validation username empty', function (t) {
 
	var user = {
		username: "",
		password: "pippo"
	}


	auth.put(user, function callback (err, id){
		t.ok(err, 'error');
		t.end();
	});

});

test('validation password empty', function (t) {
 
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
    t.plan(1);
    var user = {
	username: "exetera2",
	password: "pippo"
    };
    auth.put(user, function(err, data){
        auth.get(user, function(err, data){
            t.equal(data.username, 'exetera2');
        });
    });
});
