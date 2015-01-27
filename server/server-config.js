var express = require('express');
var partials = require('express-partials');
var https = require('https');
var http = require('http');
var fs = require('fs');

var OAuth = require('oauth');

// var handler = require('./lib/request-handler');
// var util = require('./lib/utility');

var app = express();

var router = express.Router();

app.use( express.static(__dirname + '../public') );


// Redirects after each Google and Dropbox authorization
  // FIXME: change this path to '/google-auth'
app.use('/auth-google', function(req, res) {
  console.log(res);
  res.redirect('/');
});
app.use('/dropbox-auth', function(req, res, next) {
  console.log(res);
  res.redirect('/');
});



OAuth.callback('dropbox')
.done(function(result) {
    //use result.access_token in your API request
    //or use result.get|post|put|del|patch|me methods (see below)
})
.fail(function (err) {
    //handle error with err
    if (err) {
      return err;
    }
});








module.exports = app;




// POPUP
//Using popup (option 1)
// OAuth.popup('dropbox')
// .done(function(result) {
//   //use result.access_token in your API request
//   //or use result.get|post|put|del|patch|me methods (see below)
// })
// .fail(function (err) {
//   //handle error with err
// });

