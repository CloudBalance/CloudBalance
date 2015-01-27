var express = require('express');
var http = require('http');
var https = require('https');
var fs = require('fs');

var app = express();

app.use( express.static(__dirname + '/') );

var options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

https.createServer(options, app).listen(8000);



// app.listen(8000);
console.log('listening on port 8000');
