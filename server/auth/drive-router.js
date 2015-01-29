var https = require('https');
var express = require('express');
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var secrets = require('./secrets/drive.secret');
var Promise = require('bluebird');
var jsonSerialize = require('json-serialize');
var oauth2Client = new OAuth2(secrets.CLIENT_ID, secrets.CLIENT_SECRET, secrets.REDIRECT_URL);


var scopes = [
	"https://www.googleapis.com/auth/drive",
	"https://www.googleapis.com/auth/drive.file",
  "https://www.googleapis.com/auth/drive.readonly.metadata",
  "https://docs.google.com/feeds",
  "https://www.googleapis.com/auth/drive.apps.readonly",
  "https://www.googleapis.com/auth/drive.readonly",
  "https://www.googleapis.com/auth/drive.install",
  "https://www.googleapis.com/auth/drive.appdata",
  "https://www.googleapis.com/auth/drive.scripts",
	"https://www.googleapis.com/auth/userinfo.profile"
];

var callback = 'https://localhost:8000/auth/drive/callback';

var url = oauth2Client.generateAuthUrl({
  access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token)
  approval_prompt: 'force',
  scope: scopes 
});

var driveRouter = express.Router();

driveRouter.get('/', function(req, res) {
	res.redirect(url);
})

driveRouter.get('/callback', function(req, res){
	var code = req.query.code
	oauth2Client.getToken(code, function(error, tokens) {
		if (error) {res.send(error)};
		// var accessToken = tokens.access_token;
		// var refreshToken = tokens.refresh_token;

		var accessAndRefreshTokens = {
			accessToken: tokens.access_token,
			refreshToken: tokens.refresh_token
		};

		var serializedTokens = jsonSerialize.serialize(accessAndRefreshTokens);

	  res.send(serializedTokens);
		// var callback = function(error, tokens) {
		// 	res.send(token);
		// }

		// passport.serializeUser(function(tokens, callback) {
		// 	callback(null, tokens);
		// })

		// res.send(tokens)
	  // Now tokens contains an access_token and an optional refresh_token. Save them.



	});
})






module.exports = driveRouter;