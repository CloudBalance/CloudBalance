var app = require('./server-config.js');
var https = require('https');
var http = require('http');
var fs = require('fs');

var port = 8000;

// Options is the main difference between http & https create server calls
var options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

// Create an HTTPS service
https.createServer(options, app).listen(port);

console.log('Server now listening on ports ' + port);
