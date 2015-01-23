var express = require('express');
var http = require('http');
var https = require('https');
var fs = require('fs');

var app = express();

app.use( express.static(__dirname + '/') );

<<<<<<< HEAD
var options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

https.createServer(options, app).listen(8000);



// app.listen(8000);
=======
// var options = {
//   key: fs.readFileSync('key.pem'),
//   cert: fs.readFileSync('cert.pem')
// };

// https.createServer(options, app).listen(8000);



// FIXME: this should go in another file, but here for testing
app.use('/auth/google/callback', function(req, res, next) {
  console.log(res);
  res.redirect('/');
});

app.listen(8000);
>>>>>>> gets basic server serve.js working, added a test to it for google api testing; removes files with leading underscores
console.log('listening on port 8000');
