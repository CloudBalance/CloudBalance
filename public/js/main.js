/**
 * @jsx React.DOM
 */
// So build process knows to convert from JSX to JS

$(document).ready(function() {
  // This file bootstraps the entire application.

  var APP = require('./components/app.js');
  var React = require('react');

  //checks if the user has logged in or not. if so, it renders our APP
  if( sessionStorage.getItem('dropboxToken') && sessionStorage.getItem('driveToken') ) {
    React.render(
      <APP />,
      document.getElementById('main')
    );
    
  } else {
    //if not, it redirects to /login where our login flow begins
    console.log('dropboxToken and driveToken have not been found and we are redirecting to /login');
    window.location = "/login";
  }

  
});
