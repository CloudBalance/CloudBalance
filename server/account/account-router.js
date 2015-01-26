var express = require('express');
var loginRouter = require('./login-router.js');
var signupRouter = require('./signup-router.js');

var accountRouter = express.Router();

accountRouterRouter.use('/login', loginRouter);
accountRouterRouter.use('/signup', signupRouter);


accountRouter.get('/logout', function(req, res) {
  //log the user out of both services
  //make sure we aren't storing the tokens anywhere
})

module.exports = accountRouter;
