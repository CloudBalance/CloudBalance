/*** @jsx React.DOM */
var LOGIN = require('./components/login.js');
var React = require('react');
window.React = React; // export for http://fb.me/react-devtools  -  maybe not needed

React.render(
  <LOGIN />,
  document.getElementById('login')
);
 