var React = require('react');
var TodoActions = require('../actions/TodoActions');
var TodoTextInput = require('./TodoTextInput.react');

var Header = React.createClass({

  /**
   * @return {object}
   */
  render: function() {
    return (
      <header id="header">
        <div id="banner-img"></div>
        <h1>CloudBalance</h1>
        <h2>{this.state.username}</h2>
        <h2>Logout</h2>
      </header>
    );
  }


});

module.exports = Header;
