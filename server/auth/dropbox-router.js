var secrets = require('./secrets/dropbox.secret');
var https = require('https');
var express = require('express');
var Promise = require('bluebird');

var userAuthCode;
var dropboxRouter = express.Router();

// var getToken = function getToken(authCode) {
//   return new Promise(function tokenRequest(resolve, reject){
//     https.request('');
//   });
// };

dropboxRouter.get('/', function dropboxRedirect(req,res) {
  var redirect = 'https://localhost:8000/auth/dropbox/callback';
  var pathAndQuery =  'https://www.dropbox.com/1/oauth2/authorize?' +
                      'response_type=code' +
                      '&client_id=' + secrets.client_key +
                      '&redirect_uri=' + redirect;

  res.redirect(pathAndQuery);
});

dropboxRouter.get('/callback', function dropboxCallback(req,res) {
  console.log(req.query);
  userAuthCode = req.query.code;

  res.redirect('/auth/dropbox/test');
});

dropboxRouter.get('/test', function(req, res) {

});

module.exports = dropboxRouter;
