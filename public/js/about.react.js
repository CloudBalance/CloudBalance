/*** @jsx React.DOM */
var ABOUT = require('./components/about.react');
var React = require('react');
window.React = React; // export for http://fb.me/react-devtools  -  maybe not needed

//we don't have a createComponent in here. 

React.render(
  <ABOUT />,
  document.getElementById('about')
);
 