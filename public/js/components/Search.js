/** @jsx React.DOM */
var React = require('react');
var AppActions = require('../actions/appActions');
var AppStore = require('../stores/appStore');

// var search = function(name) {
//   return (
//   );
// };

var Search = React.createClass({

  handleChange: function() {
    this.props.onSearchInput(this.refs.filterTextInput.getDOMNode().value);
  },

  render:function(){

    return (
      <form id="search-container">
          <input 
            id="search-box" 
            type="text" 
            placeholder="Search for files..." 
            value={this.props.filterText} 
            ref="filterTextInput"
            onChange={this.handleChange}  />
      </form>
    );
  },

  /**
   * Event handler for 'change' events coming from the AppStore
   */
  _onChange: function() {

  }
});

module.exports = Search;
