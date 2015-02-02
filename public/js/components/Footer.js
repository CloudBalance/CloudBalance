/** @jsx React.DOM */

var React = require('react');
var AppActions = require('../actions/appActions');

var Footer = React.createClass({

  openAbout: function() {
    //placeholder to open an 'About Us' page if you choose to
  },

  render: function() {
    return (
      <footer id="footer">
        <p className="project-info">Made at Hack Reactor... whatever we are supposed to say here...</p>
        <h3 id="aboutClick" onClick={this.openAbout}>About the Team</h3>
        <div className="team-info">
          <div href='http://csreyes.com' className="profile">
            <img className='profile-pic' src='../assets/christian-reyes.jpg' />
            <h4>Christian Reyes</h4>
          </div>
          <div href='http://csreyes.com' className="profile">
            <img className='profile-pic' src='../assets/alan-sun.jpg' />
            <h4>Alan Sun</h4>
          </div>
          <div href='http://csreyes.com' className="profile">
            <img className='profile-pic' src='../assets/preston-parry.jpg' />
            <h4>Preston Parry</h4>
          </div>
          <div href='http://csreyes.com' className="profile">
            <img className='profile-pic' src='../assets/matt-conrad.jpg' />
            <h4>Matt Conrad</h4>
          </div>
        </div>
      </footer>
    );
  }

});

module.exports = Footer;
