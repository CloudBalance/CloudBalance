// var secrets = require('./secrets/dropbox.secret');
var express = require('express');

var loginRouter = express.Router();

// var getToken = function getToken(authCode) {
//   return new Promise(function tokenRequest(resolve, reject){
//     https.request('');
//   });
// };

loginRouter.get('/', function (req,res) {
  //start off the login by redirecting to the google auth
  res.redirect('/auth/drive');
});

module.exports = loginRouter;
