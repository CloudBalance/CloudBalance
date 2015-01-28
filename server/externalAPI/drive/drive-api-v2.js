var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var secrets = require('./secrets/drive.secret');
var Promise = require('bluebird');
var drive = google.drive('v2');
var oauth2Client = new OAuth2(secrets.CLIENT_ID, secrets.CLIENT_SECRET, secrets.REDIRECT_URL);

google.options({ auth: oauth2Client });

var getRoot = Promise.promisify(drive.about.get); //result.rootFolderId
var getFile = Promise.promisify(drive.files.get); 
var getChildren = Promise.promisify(drive.children.list);
var getFileList = Promise.promisify(drive.files.list);

var getFiles = function(req, res) {
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
	.then(addFileToList) // recursive call to establish parent/child relationship between all files
	.delay(3000) 
	.then(function() {
		res.send(JSON.stringify(list));
	})
}


var driveRouter = express.Router();

driveRouter.get('/driveFiles', function(req, res) {
	var access_token;
	var refresh_token = req.body.driveRefreshToken;
	if (req.body.driveRefreshToken) {
		access_token = getNewDriveToken(refresh_token)
	} else {
		access_token = req.body.driveAccessToken;
	}

	oauth2Client.setCredentials({
	  access_token: access_token
	});

	getFiles(req, res);

})





