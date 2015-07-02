var Readable = require ('stream').Readable
var Writable = require ('stream').Writable
var auth = require ('./')()
var namesgenerator = require('docker-namesgenerator')
var through = require('through2')
var pump = require ('pump')
  // , names = {}
  // , i
  // , name
  // ;

// var checker = function(name) {
//   return names.hasOwnProperty(name);
// };


var readable = new Readable({ objectMode: true });
var writable = new Writable({ objectMode: true });

readable.counter = 0;
var names = {};


var checker = function(name) {
  return names.hasOwnProperty(name);
};


readable._read = function (size) {
 	 
  for (; this.counter < 50 ; this.counter ++) {
        var name = namesgenerator(checker);
    	console.log('READING -->', name)  
  		this.push(name);
  	}
  	this.push(null);
 }


//readable.pipe(through.obj(transf)).pipe(writable);
pump(readable,through.obj(transf), writable, function(err){
	console.log("Stream finished");
	auth.close();

});
 

function transf (chunk, enc, cb) {
  var username = chunk.toString().replace("_","");
  var password = username.split("").reverse().join("");
  // console.log(username);
  // console.log(password);
  var user = {username:username, password:password};
  this.push(user, 'utf8');
  cb()
}

writable._write = function(chunk, enc, cb){
	console.log(chunk);
	auth.put(chunk, function(err, data){
		if (err) console.error("ERRORE");
		cb()

	});
}	

