/** @jsx React.DOM */
var React = require('react');
var Header = require('./Header');
var Footer = require('./Footer');
var MainSection = require('./MainSection');
var AppStore = require('../stores/appStore');

var AppActions = require('../actions/appActions.js');


var getAppState = function() {
  return {
    allFiles: AppStore.getAll()
  };
};


var APP =
  React.createClass({

    getInitialState: function() {
      return getAppState();
    },

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
