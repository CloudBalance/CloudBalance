var secrets = require('./secrets/dropbox.secret');
var https = require('https');
var express = require('express');
var Promise = require('bluebird');

var userAuthCode;
var signupRouter = express.Router();

signupRouter.post('/signup', function (req,res) {
  //From Client:
    //username
    //passowrd
  //Server Actions:
    //check to see if the user already exists.
      //if so, check if the credentials are valid
        //if so, log the user in
        //if the credentials do not match, say that the user already exists and they'll need to pick a new username
      //if the user does not exist
        //create the user in the db
        //store the password in the db
        //have them log into both services and store those tokens in the db
        //do authenticationy things
  //Final Redirect: 
    //send the user to the logged in homepage
});

module.exports = signupRouter;
