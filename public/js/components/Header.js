/*** @jsx React.DOM */
var React = require('react');
var AppStore = require('../stores/appStore');
var AppActions = require('../actions/appActions');
// var TodoTextInput = require('./TodoTextInput.react');


// FIXME: I want to set the state with the AppStore, but using objects in its return statement is both required and is causing errors...
// var getUsername = function() {
  // return {
    // username: AppStore.getUsername()
  // };
// };


var Header = React.createClass({

  // getInitialState: function() {
  //   return AppStore.getUsername();
  // },

  handleClick: function() {
    AppActions.addItem('this is the item');
  },

  statics: {
    logoutClick: function() {
      
      AppActions.logout();

      $.ajax({
        url: '/logout',
        dataType: 'json',
        type: 'POST',
        data: '',           // pass any data in the logout???
        success: function(data) {
          console.log('Logged Out');
          // this.setState({data: ''data''});  
            // Might as well clear the state & store just in case--a front-end manual logout method, unless/until we're complete confident in server actions
          AppStore.clear();
          // should be routed by server to the login page
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    }
    
    
  },


  /**
   * @return {object}
   */
  render: function() {
    return (
      <header id="header">
        <div id="banner-img"></div>
        <h1 id="title-header">CloudBalance</h1>
        <h3 id="logout-header" onClick={Header.logoutClick}>Logout</h3>
        <h3 id="username-header" onClick={this.handleClick}>John</h3>
      </header>
    );
  }


});

    // This is breaking it right now:
    // <h2>{this.state.username}</h2>

module.exports = Header;
