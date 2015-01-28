/** @jsx React.DOM */
var Footer = require('./Footer');
var React = require('react');
// var AppStore = require('../stores/appStore');


var Login = React.createClass({


  // Should we hash & salt the password before sending it???
  
  statics: {
    submitLogin: function(data) {
      $.ajax({
        url: 'this.props.url',      // Is there where we want it sent???
        dataType: 'json',
        type: 'POST',
        data: {
          username: this.refs.username.getDOMNode().value,  
          password: this.refs.password.getDOMNode().value
        },
        success: function(data) {
          console.log('Login submitted');
          // Do we keep any login info in the store?
          console.log(data);
          // clear the inputs -- like so?
          this.setState({  username: '', password: ''  });
          // Or like this?
          // this.refs.username.getDOMNode().value = '';
          // this.refs.password.getDOMNode().value = '';

          // Now the server should either redirect us to the 
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    }
  }, 

  /**  @return {object}  */
  render: function() {
    return (
      <div>
        <div className="login-box">
          <h3>Log in to CloudBalance</h3>
          <form>
            <label>Username:</label>
            <input 
              type="text" 
              className="textInput" 
              ref="username" 
              id="username"
              value={this.state.username}
              autofocus={true}  />
            <label>Password:</label>
            <input 
              type="text" 
              className="textInput" 
              ref="password" 
              id="password" 
              value={this.state.password} />
            <button type="submit" onClick={Login.submitLogin} >Submit</button>
          </form>
        </div>
        <Footer />
      </div>
    );
  }
});

module.exports = Login;
