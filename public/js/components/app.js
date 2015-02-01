/*** @jsx React.DOM */
var Header = require('./Header');
var MainSection = require('./MainSection');
var Footer = require('./Footer');
var React = require('react');
var AppStore = require('../stores/appStore');

/**
 * Retrieve the current TODO data from the TodoStore
 */
var getAppState = function() {
  return {
    allFiles: AppStore.getAll()
  };
};

var App = React.createClass({

  getInitialState: function() {
    return getAppState();
  },

  componentDidMount: function() {
    AppStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AppStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function() {
    //TODO: check if this is the correct syntax for this
    //TODO: make sure we're handling allFiles propertly in MainSection, since it includes two different types of files
    return (
      <div id='main-container'>
        <Header />
        <MainSection
          allFiles={this.state.allFiles} />
        <Footer />
      </div>
    );
  },

  /**
   * Event handler for 'change' events coming from the AppStore
   */
  _onChange: function() {
    this.setState(getAppState());
  }
});

//TODO: investigate if we need a React.render() function here to attach this to the DOM. 

module.exports = App;
