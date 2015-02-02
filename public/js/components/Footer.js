/** @jsx React.DOM */

var React = require('react');
var AppActions = require('../actions/appActions');

var Footer = React.createClass({

  render: function() {
    return (
      <footer id="footer">
        <h1 id="title-header">CloudBalance</h1>
        <p>Made at Hack Reactor... whatever we are supposed to say here...</p>
        <h3 id="aboutClick" onClick={this.openAbout}>About the Team</h3>
      </footer>
    );
  }

});

module.exports = Footer;
