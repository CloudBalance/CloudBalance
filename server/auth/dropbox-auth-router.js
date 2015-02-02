var secrets = require('./secrets/dropbox.secret');
var express = require('express');
var https = require('https');
var querystring = require('querystring');
var bPromise = require('bluebird');
var dropboxAPI = require('../externalAPI/dropbox/dropbox-api-v1.js');
var authHelper = require('./auth-helper.js');

var userAuthCode;
var userAccessToken;
var redirect = 'https://localhost:8000/auth/dropbox/callback';
var dropboxRouter = express.Router();

//retrieve access token using the authorization code
var getToken = function getToken(authCode) {
  var postData = querystring.stringify({
    'code' : authCode,
    'grant_type' : 'authorization_code',
    'client_id' : secrets.client_key,
    'client_secret' : secrets.client_secret,
    'redirect_uri' : redirect
  });

  var options = {
    hostname: 'api.dropbox.com',
    path: '/1/oauth2/token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postData.length
    }
  };

  return new bPromise(function tokenRequest(resolve, reject){
    var req = https.request(options, function(response) {
      var data = '';

      response.setEncoding('utf-8');

      response.on('data', function (chunk) {
        data += chunk;
      });

      response.on('end', function () {
        if(response.statusCode < 200 || response.statusCode >= 300) {
          reject(data);
        } else {
          resolve(data);
        }
      });
    });

    //write the POST body and send the request to dropbox.
    req.write(postData);
    req.end();
  });
};

//dropbox authorization start point. Requests the authorization code
dropboxRouter.get('/', function dropboxRedirect(req,res) {
  var pathAndQuery =  'https://www.dropbox.com/1/oauth2/authorize?' +
                      'response_type=code' +
                      '&client_id=' + secrets.client_key +
                      '&redirect_uri=' + redirect;

  res.redirect(pathAndQuery);
});

//callback function used to save the returned authorization code
dropboxRouter.get('/callback', function dropboxCallback(req,res) {
  userAuthCode = req.query.code;

  var token;
  getToken(userAuthCode)
  .then(function(data) {
    token = JSON.parse(data);
    userAccessToken = token;
    res.end(authHelper.tokenSaverMaker('dropbox', token.access_token, '/'));
  });
  // res.redirect('/auth/dropbox/listfiles');
});

//return list of files
dropboxRouter.get('/listfiles', function test(req, res) {
  // var token;
  // getToken(userAuthCode)
  //   .then(function(data) {
  //     token = JSON.parse(data);
  //     userAccessToken = token;
  //   })
    // .then(function() {
      dropboxAPI.getFileDirectories('/', -1, userAccessToken.access_token)
        .then(function(data) {
          res.set('Content-Type', 'application/json')
          .status(200).end(JSON.stringify(data));
        });
    // });
});

module.exports = dropboxRouter;
