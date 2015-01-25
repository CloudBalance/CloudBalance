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

module.exports = apiRouter;
