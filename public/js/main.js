// This file bootstraps the entire application.

/*** @jsx React.DOM */
  // So build process knows to convert from JSX to JS - needed???


var APP = require('./components/app.js');
// var CloudBalanceApp = require('./components/CloudBalanceApp.react');
var React = require('react');
window.React = React; // export for http://fb.me/react-devtools  -  maybe not needed

// var CloudBalanceExampleData = require('./CloudBalanceExampleData');
// var CloudBalanceWebAPIUtils = require('./utils/CloudBalanceWebAPIUtils');

// CloudBalanceExampleData.init(); // load example data into localstorage

// CloudBalanceWebAPIUtils.getAllData();

React.render(
  <APP />,
  document.getElementById('main')
);
