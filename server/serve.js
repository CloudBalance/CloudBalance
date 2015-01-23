var express = require('express');
var http = require('http');
var https = require('https');
var fs = require('fs');

var app = express();

app.use( express.static(__dirname + '/') );

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
console.log('listening on port 8000');
