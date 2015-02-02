var pathToServerRoot = '../..';
var jwt = require('jwt-simple');
var jwtSecret = require(pathToServerRoot + '/auth/secrets/jwt.secret');
var express = require('express');
var apiRouter = express.Router();
var dropboxAPI = require('../../externalAPI/dropbox/dropbox-api-v1.js');
var driveAPI = require('../../externalAPI/drive/drive-api-v2.js');

/**
drive api router is expecting a 'req.body.driveAccessToken' or a '
req.body.driveRefreshToken' to the '/driveFiles' route as specified in
externalApi/drive/drive-api-v2.js
*/
apiRouter.all('*', function(req, res, next) {
  console.log('parsing tokens');
  req.tokens = {
    drive : jwt.decode(req.headers.drivetoken, jwtSecret.secret),
    dropbox : jwt.decode(req.headers.dropboxtoken, jwtSecret.secret)
  };
  next();
});


apiRouter.get('/getAllFiles', function(req,res) {
  console.log('getting all files');
  console.log('tokens:',req.tokens);
  var fileDirectories = {};
  var unresolved = 2;



  driveAPI.getDriveFiles(req.tokens.drive)
    .then(function(data) {
      console.log(data);
      fileDirectories.google = data;
      unresolved--;
      if(unresolved === 0) {
        res.set('Content-Type', 'application/json')
        .status(200).end(JSON.stringify(fileDirectories));
      }
    });

  dropboxAPI.getFileDirectories('/', -1, req.tokens.dropbox)
  .then(function(data) {
    fileDirectories.dropbox = data;
    console.log('fileDirectories:', fileDirectories);
    unresolved--;
    if(unresolved === 0) {
      res.set('Content-Type', 'application/json')
      .status(200).end(JSON.stringify(fileDirectories));
    }
  });

  //From Client: nothing
  //To Client: an array of length two, where the 0th index of the array is the google file list, and the 1st index of the array is the dropbox file list
    //These file lists will be formatted in the exact same way so the client can just use the same function to render them, no matter which service the file list is coming from
    //Format: roughly the same as here:
    //http://stackoverflow.com/questions/11194287/convert-a-directory-structure-in-the-filesystem-to-json-with-node-js
    //keys:
      //fileID: set it to null if it doesn't exist
      //filename
      //children: an array that holds objects that are either folders or files themselves. this obviously gets recursive
      //fileIcon
      //fileLink (though this won't be used by the client for MVP)
});

apiRouter.get('/moveFiles', function(req,res) {
  //From Client:
    //fromService
    //fromLocation
    //toService
    //toLocation
    //fileID
    //fileLink: Optional for now. i assume the fileID is what we need to find the file, not hte fileLink.
  //server Actions:
    //lookup api object associated with fromService
    //download file, save in memory temporarily
    //lookup api object associated with toService
    //post the file to that service
    //on success, delete the file from it's original location.
      //this prevents us from deleting the file when we have network errors that interrupt saving it to the new location
    //on success from that, redirect to /1/getAllFiles

    //this is designed to be modular enough to allow us to move the file from the same service to itself.
    //it may be easier to build in some logic to see if fromService and toService are the same. if they are, we can then issue a move command to that api, rather than the steps outlined above.
    //however, MVP is whichever is easiest, and I have a feeling that the path outlined above is going to easiest since it will work for all cases.
  });

module.exports = apiRouter;
