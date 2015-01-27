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

// var printAbout = function() {
//   var request = drive.about.get();
//   request.execute(function(resp) {
//     console.log('Current user name: ' + resp.name);
//     console.log('Root folder ID: ' + resp.rootFolderId);
//     console.log('Total quota (bytes): ' + resp.quotaBytesTotal);
//     console.log('Used quota (bytes): ' + resp.quotaBytesUsed);
//   });
// }

var getFiles = function(req, res, params) {

	var list = [];
	params = params || {};
	//get children, get file of each child, get the title of that file
	// drive.about.get({}, function(error, result) {
	// 	console.log(result.rootFolderId);
	// })
	// drive.children.list({folderId: '0B16S8E0_wBt-Mjd1a0pOWmlUOFk'}, function(error, result){
	// 	console.log('this is the error ', error);
	// 	console.log('this is the result ', result);
	// })
	// result.mimeType = 'application/vnd.google-apps.folder';
	drive.files.get({fileId: '0B16S8E0_wBt-OXNQcW90SVZXaEE'}, function(error, result) {console.log(result)});
	// drive.children.get({folderId: '0B16S8E0_wBt-Mjd1a0pOWmlUOFk',
	// 									 childId:'0B16S8E0_wBt-ZkNWZl9fRnU5TlE'},function(error, result) {console.log(result)});
	// drive.files.list(params, function(error, result) {
	// 	// var items = result.items;
	// 	// for (var i = 0; i < items.length; i++) {
	// 	// 	var item = items[i];
	// 	// 	var listItem = {
	// 	// 		title: item.title,
	// 	// 		id: item.id,
	// 	// 		alternateLink: item.alternateLink,
	// 	// 		iconLink: item.iconLink,
	// 	// 		createdDate: item.createdDate
	// 	// 	};
	// 	// 	list.push(listItem);
	// 	// }
	// 	// console.log(list);
	// 	console.log(result);
	// })
	res.end();
}

var driveRouter = express.Router();

driveRouter.get('/', function(req, res) {
	res.redirect(url);
})

driveRouter.get('/callback', function(req, res){
	var code = req.query.code
	oauth2Client.getToken(code, function(error, tokens) {
		if (error) {res.send(error)};
		var accessToken = tokens.access_token;
		var refresh_token = tokens.refresh_token;
	  // Now tokens contains an access_token and an optional refresh_token. Save them.

	  oauth2Client.setCredentials({
	    access_token: tokens.access_token,
	    refresh_token: tokens.refresh_token
	  });

	  // drive.files.list({}, function(a,b) {console.log(b)});
	  getFiles(req, res);
	});
	res.end();
})






module.exports = driveRouter;