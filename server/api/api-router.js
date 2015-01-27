var express = require('express');

var apiRouter = express.Router();

apiRouter.get('/1/getAllFiles', function(req,res) {
  //From Client: nothing
  //To Client: two file lists to (one for each service)
    //These file lists will be formatted in the exact same way so the client can just use the same function to render them, no matter which service the file list is coming from
    //Format: roughly the same as here: 
    //http://stackoverflow.com/questions/11194287/convert-a-directory-structure-in-the-filesystem-to-json-with-node-js
    //keys: 
      //fileID
      //filename
      //children: an array that holds objects that are either folders or files themselves. this obviously gets recursive
      //fileIcon
      //fileLink (though this won't be used by the client for MVP)
});

apiRouter.get('/1/moveFiles', function(req,res) {
  //From Client: 
    //fromService
    //toService
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
