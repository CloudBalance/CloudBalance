var https = require('https');
var express = require('express');
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var drive = google.drive('v2');
var secrets = require('./secrets/drive.secret');
var readline = require('readline');
var oauth2Client = new OAuth2(secrets.CLIENT_ID, secrets.CLIENT_SECRET, secrets.REDIRECT_URL);

google.options({ auth: oauth2Client });

var scopes = [
	'https://www.googleapis.com/auth/drive',
	'https://www.googleapis.com/auth/userinfo.profile'
];

var callback = 'https://localhost:8000/auth/drive/callback';

var url = oauth2Client.generateAuthUrl({
  // access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token)
  scope: scopes // If you only need one scope you can pass it as string
});

// oauth2Client.getToken(code, function(err, tokens) {
//   // Now tokens contains an access_token and an optional refresh_token. Save them.
//   if(!err) {
//     oauth2Client.setCredentials(tokens);
//   }
// });

var driveRouter = express.Router();

driveRouter.get('/', function(req, res) {
	res.redirect(url);
})

driveRouter.get('/callback', function(req, res){
	var code = req.query.code
	oauth2Client.getToken(code, function(err, tokens) {
		console.log('this is the error ', err);
		console.log('this is the token ', tokens);
	  // Now tokens contains an access_token and an optional refresh_token. Save them.

	  oauth2Client.setCredentials({
	    access_token: tokens.access_token
	    // refresh_token: 'REFRESH TOKEN HERE'
	  });

	  drive.files.list({}, function(a,b) {console.log(b)});




	  if(!err) {
	    oauth2Client.setCredentials(tokens);
	  }
	});
	res.end();
})






module.exports = driveRouter;