var express = require('express');

var apiRouter = express.Router();

apiRouter.use('/1/getAllFiles', function(req,res) {

  res.end('working');
});

module.exports = apiRouter;
