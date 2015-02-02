/** @jsx React.DOM */
var React = require('react');
var AppActions = require('../actions/appActions');
var AppStore = require('../stores/appStore');

// var search = function(name) {
//   return (
//   );
// };

var Search = React.createClass({

  handleClear: function() {
    AppActions.clearSearch();
  },

  render:function(){
    return (
      <div id="search-container">
        <form>
          <input id="search-box" type="text" placeholder="Search for files..." />
          <button id="search-button" type="submit">Search</button>
          <button id="clear-button" onClick={this.handleClear}>Clear</button>
        </form>
      </div>
    );
  },

  /**
   * Event handler for 'change' events coming from the AppStore
   */
  _onChange: function() {

  }
});

module.exports = Search;
