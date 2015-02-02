var Path = require('path');
var https = require('https');
var bPromise = require('bluebird');

var apiUrl = 'api.dropbox.com';
var versionUrl = '/1';

var dropboxAPI = {};

/**
*   Get the contents of one folder
*/
dropboxAPI.getFileDirectory = function getFileDirectory(path, accessToken) {
  var key;
  var options;
  var apiOptions;
  var pathUrl;

  //core API options to be put in the query string
  apiOptions = {
    'file_limit' : 25000,
    'list' : true,
  };

  //build the path
  pathUrl = versionUrl + '/metadata/auto' + path + '?';

  //add the apiOptions to the query string
  for(key in apiOptions) {
    pathUrl += key + '=' + apiOptions[key] + '&';
  }

  //remove trailing '&'
  pathUrl = pathUrl.substr(0, pathUrl.length - 1);

  //GET request options
  options = {
    hostname: apiUrl,
    path: pathUrl,
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + accessToken,
      'Content-Type': 'application/json; charset=utf-8',
    }
  };

  //promise to return the directory data
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

    req.end();
  });
};


dropboxAPI.getFileDirectories = function getFileDirectories(path, depth, accessToken) {
  var all = depth === -1 ? true : false;
  var rootDirectory = [];
  var unresolved = 0;

  return new bPromise(function directoriesPromise(resolve, reject) {

    //returns a function that parses the data
    var makeDataParser = function makeDataParser(directory, depth) {

      return function parseData(data) {
        //parse returned data structure from string to an object
        var contents = JSON.parse(data).contents;

        if(contents) {
          contents.forEach(function(child) {
            var fileObject = {
              'fileName' : Path.basename(child.path),
              'fileId' : child.path,
              'filePath' : child.path,
              'fileType' : child.is_dir ? 'folder' : 'file',
              'fileIcon' : './assets/48x48/' + child.icon + '.gif',
              'children' : child.is_dir ? [] : undefined
            };

            //send a directory request
            if((all || depth > 0) && fileObject.fileType === 'folder') {
              directoryRequest(fileObject.filePath, fileObject.children, depth - 1);
            }

            directory.push(fileObject);
          });
        }

        //check to see if all requests have been resolved
        unresolved--;
        if(unresolved === 0) {
          resolve(rootDirectory);
        }
      };

    };

    //simple rejection function
    var rejectData = function rejectData(err) {
      reject(err);
    };

    //async function to retrieve and parse directory contents
    var directoryRequest = function directoryRequest(path, directory, depth) {
        unresolved++;
        dropboxAPI.getFileDirectory(path, accessToken)
          .then(makeDataParser(directory, depth), rejectData);
    };

    //send initial directory GET
    directoryRequest(path, rootDirectory, depth);
  });
};

// dropboxAPI.removeFile = function removeFile(path) {
//
// };

module.exports = dropboxAPI;
