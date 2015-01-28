/** @jsx React.DOM */
var React = require('react');
var Header = require('./Header');
var Footer = require('./Footer');
var MainSection = require('./MainSection');
var AppActions = require('../actions/appActions.js');

var APP =
  React.createClass({

    render:function(){
      return (
        <div>
          <Header />
          <MainSection />
          <Footer />
        </div>
      )
    }
  });
module.exports = APP;
