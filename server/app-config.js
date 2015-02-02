var express = require('express');
var authRouter = require('./auth/auth-router.js');
var apiRouter = require('./api/api-router.js');
var accountRouter = require('./account/account-router.js');
var morgan = require('morgan');
var path = require('path');

var app = express();

app.use(morgan('combined'));

app.use(express.static(path.join(__dirname + '/../dist')));

app.get('/login', function (req,res) {
  res.redirect('./account/login');
});

app.use('/account', accountRouter);

//router for handling authentication
app.use('/auth', authRouter);

//router for handling api calls to our server
app.use('/api', apiRouter);

module.exports = app;
