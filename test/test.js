var test = require('tape');
var auth = require('../')();

test('test add user', function (t) {
    t.plan(1);
    t.equal(auth.addUser(), true);
});
