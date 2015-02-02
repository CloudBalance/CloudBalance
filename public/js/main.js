/**
 * @jsx React.DOM
 */
// So build process knows to convert from JSX to JS

$(document).ready(function() {
  // This file bootstraps the entire application.

  var APP = require('./components/app.js');
  var React = require('react');
  window.React = React; // export for http://fb.me/react-devtools  -  maybe not needed
  // var CloudBalanceWebAPIUtils = require('./utils/CloudBalanceWebAPIUtils');
  // CloudBalanceWebAPIUtils.getAllData();

  if( sessionStorage.getItem('dropboxToken') && sessionStorage.getItem('driveToken') ) {
    console.log('dropboxToken and driveToken have been found');
    React.render(
      <APP />,
      document.getElementById('main')
    );
    
  } else {
    console.log('dropboxToken and driveToken have not been found and we are redirecting to /login');
    window.location = "/login";
  }

  
});
