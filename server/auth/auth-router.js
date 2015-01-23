var express = require('express');
var dropboxRouter = require('./dropbox-router.js');

var authRouter = express.Router();

authRouter.use('/dropbox', dropboxRouter);

authRouter.use('/test', function(req,res) {
  console.log('received');
  res.end('working');
});

module.exports = authRouter;
