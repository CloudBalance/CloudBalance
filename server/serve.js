var express = require('express');
var http = require('http');
var https = require('https');
var fs = require('fs');

var app = express();

app.use( express.static(__dirname + '/') );

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> works on dropbox authentication process, but not likely to use
var options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};
<<<<<<< HEAD

https.createServer(options, app).listen(8000);



// app.listen(8000);
=======
// var options = {
//   key: fs.readFileSync('key.pem'),
//   cert: fs.readFileSync('cert.pem')
// };
=======
>>>>>>> works on dropbox authentication process, but not likely to use

https.createServer(options, app).listen(8000);



<<<<<<< HEAD
// FIXME: this should go in another file, but here for testing
app.use('/auth/google/callback', function(req, res, next) {
  console.log(res);
  res.redirect('/');
});

app.listen(8000);
>>>>>>> gets basic server serve.js working, added a test to it for google api testing; removes files with leading underscores
=======
// app.listen(8000);
>>>>>>> works on dropbox authentication process, but not likely to use
console.log('listening on port 8000');
