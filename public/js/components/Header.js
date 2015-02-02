/*** @jsx React.DOM */
var React = require('react');
var AppStore = require('../stores/appStore');
var AppActions = require('../actions/appActions');

var Header = React.createClass({


  statics: {
    logoutClick: function() {
      console.log('heard a logout click');
      window.sessionStorage.removeItem('driveToken');
      window.sessionStorage.removeItem('dropboxToken');
      AppActions.logout();
      window.location.reload();
    }
    
  },

  render: function() {
    return (
      <header id="header">
        <div id="banner-img"></div>
        <h1 id="title-header">CloudBalance</h1>
        <h3 id="logout-header" onClick={Header.logoutClick}>Logout</h3>
        <h3 id="username-header">marcus</h3>
      </header>
    );
  }

});

module.exports = Header;
