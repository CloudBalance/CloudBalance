// var secrets = require('./secrets/dropbox.secret');
var https = require('https');
var express = require('express');
var Promise = require('bluebird');

var userAuthCode;
var loginRouter = express.Router();

// var getToken = function getToken(authCode) {
//   return new Promise(function tokenRequest(resolve, reject){
//     https.request('');
//   });
// };

loginRouter.get('/loginChain', function (req,res) {
  //on the homepage, we will have a nice description of all the cool stuff our app does, to get the user interested
  //if they're interested, we have a button called 'start' that will direct the user to auth/loginChain
  //from here, we start the process of redirecting them to both cloud storage services where they will log in to each service
  //while we could redirect directly to the first service from that 'start' button, using /loginChain keeps the code more modular and flexible for future changes

  //ACTION: redirect to first cloud storage login
});

module.exports = loginRouter;
