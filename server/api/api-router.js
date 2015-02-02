var express = require('express');
var apiRouter = express.Router();
var v1Router = require('./1/api-router.js');

apiRouter.use('/1', v1Router);

module.exports = apiRouter;
