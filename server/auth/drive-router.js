var https = require('https');
var express = require('express');
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var secrets = require('./secrets/drive.secret');
var Promise = require('bluebird');
var drive = google.drive('v2');
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

var getFile = function(fileId, callback) {
	drive.files.get({fileId: fileId}, function(error, result){
		if (error) {console.log(error)};
		var file = {
			fileID: result.id,
			fileName: result.title,
			fileIcon: result.iconLink,
			fileLink: result.alternateLink,
			fileType: result.mimeType
		};
		callback(file); 
	});
};

var getChildrenList = function(folderId, callback) {
	drive.children.list({folderId: folderId}, function(error, result){
		if (error) console.log(error);
		callback(result.items);
	});
};

var getRoot = Promise.promisify(drive.about.get); //result.rootFolderId
var getFile = Promise.promisify(drive.files.get); 
var getChildren = Promise.promisify(drive.children.list);
var getFileList = Promise.promisify(drive.files.list);


var getFiles = function(req, res, params) {
	var list = [];
	var allFiles = {};

	var addFileToList = function(file) { //takes in an object with an 'id' property
		fileId = file.fileID;
		getChildren({folderId: fileId})
		.then(function(results) {
			if (list.length === 0) {list.push(file)};
			var children = results[0].items;
			file.children = [];
			children.forEach(function(child) {
				var childID = child.id
				file.children.push(allFiles[childID]);
			});
			return file.children;
		})
		.then(function(children) {
			for (var i = 0; i < children.length; i++) {
				var child = children[i];
				addFileToList(child);
			}
		})
	};

	getFileList() // adds all files to allFiles variable; each key is the fileId and each value is has the ID, name, icon, link, and type
	.then(function(result) {
		result[0].items.forEach(function(item) {
			var itemId = item.id;
			allFiles[itemId] = {
				fileID: item.id,
				fileName: item.title,
				fileIcon: item.iconLink,
				fileLink: item.alternateLink,
				fileType: item.mimeType
			}
		});
		return {};
	})
	.then(getRoot)
	.then(function(result) {
		var folderId = result[0].rootFolderId;
		return {
			fileID: folderId,
			fileName: 'Root'
		}
	})
	.delay(1000)
	.then(addFileToList)
	.delay(3000)
	.then(function() {
		res.send(list);
	})

	



	// getRoot({})
	// .then(function(result) {
	// 	var folderId = result[0].rootFolderId
	// 	return {fileId:folderId};
	// })
	// .then(getFile)
	// .then(formatFile)
	// .then(addFileToList)
	// .then(function(fileID) {
	// 	return {folderId: fileID}
	// })
	// .then(getChildren)
	// .then(function(results) {
	// 	var children = results[0].items
	// 	for (var i = 0; i < children.length; i++) {
	// 		var child = children[i];
	// 		var childId = child.id;
	// 		getFile({fileId:childId})
	// 		.then(formatFile)
	// 		.then(function(childFile) {return currentParent, childFile})
	// 		.then(addFileAsChild)
	// 		.then(function() {console.log('this is the list ', list)});
	// 	}
	// 	res.end();
	// });
	// .then(function(result){
	// 	// var file = {
	// 	// 	fileID: result.id,
	// 	// 	fileName: result.title,
	// 	// 	fileIcon: result.iconLink,
	// 	// 	fileLink: result.alternateLink,
	// 	// 	fileType: result.mimeType
	// 	// };
	// 	// list.push(file);
	// 	// console.log(file);
	// 	// res.end
	// })
	// .error(function(error) {console.log(error)});
	// drive.about.get({}).then(function(result) {console.log(result)});
	// //get children, get file of each child, get the title of that file
	// drive.about.get({}, function(error, result) {
		
	// 	var rootFolderId = result.rootFolderId;
		
	// 	drive.files.get({fileId: '0AF6S8E0_wBt-Uk9PVA'}, function(error, result) {
	// // 		list.push(file);
	// 			console.log(result)
	// 		});
	// 		drive.children.list({folderId:rootFolderId}, function(error, result) {
	// 			var children = result.items;
	// 			var childId = children[0].id;
	// 			console.log(childId);
	// 			drive.children.list({folderId: childId}, function(error, result) {
	// 				console.log(drive.children.list({folderId: result.items[1].id}, function(error, result){console.log(result)}))
	// 			});
				// drive.files.get({fileId: childId}, function(error, result) {
				// 	var file2 = {
				// 		fileID: result.id,
				// 		fileName: result.title,
				// 		fileIcon: result.iconLink,
				// 		fileLink: result.alternateLink,
				// 		fileType: result.mimeType
				// 	};
				// 	file.children = file2;
				// 	console.log(list);
				// })
	// 		})
	// 	});
		
	// })
	// res.end();
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
		var refreshToken = tokens.refresh_token;
	  // Now tokens contains an access_token and an optional refresh_token. Save them.

	  // res.send({access_token: accessToken, refresh_token: refreshToken})

	  oauth2Client.setCredentials({
	    access_token: tokens.access_token,
	    refresh_token: tokens.refresh_token
	  });

	  // drive.files.list({}, function(a,b) {console.log(b)});
	  getFiles(req, res);
	});
})






module.exports = driveRouter;