var express = require('express');
var dropboxRouter = require('./dropbox-router.js');
var driveRouter = require('./drive-router.js')
var secrets = require('./secrets/drive.secret')
var authRouter = express.Router();

authRouter.use('/dropbox', dropboxRouter);
authRouter.use('/drive', driveRouter);

authRouter.use('/test', function(req,res) {
  console.log('received');
  res.end('working');
});

authRouter.get('/logout', function(req, res) {
  //log the user out of both services
  //make sure we aren't storing the tokens anywhere
})

module.exports = authRouter;
