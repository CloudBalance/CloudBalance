var app = require('./app-config.js');
var https = require('https');
var http = require('http');
var fs = require('fs');
var morgan = require('morgan');


var port = 8000;

// Options is the main difference between http & https create server calls
var options = {
  key: fs.readFileSync('./auth/secrets/key.pem'),
  cert: fs.readFileSync('./auth/secrets/cert.pem')
};

http.createServer(app).listen(8001);
// Create an HTTPS service
https.createServer(options, app).listen(port);


console.log('Server now listening on port ' + port);
