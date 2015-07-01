var test = require('tape');
var auth = require('../')();

/**
test('test add user', function (t) {
    t.plan(1);
    t.equal(auth.addUser(), true);
});
**/

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
