/*** @jsx React.DOM */
var Header = require('./Header');
var MainSection = require('./MainSection');
var Footer = require('./Footer');
var React = require('react');
var AppStore = require('../stores/appStore');

/**
 * Retrieve the current data from the Store
 */
var getAppState = function() {
  return {
    allFiles: AppStore.getAll()
  };
};

var App = React.createClass({

  //this is run automatically each time a new <App /> is created
  //the object that is returned form getInitialState is set as the state of the component, accessed through this.state.variableName
  getInitialState: function() {
    return getAppState();
  },

  //register an event listener with the store once the component has been successfully rendered/mounted on the page
  componentDidMount: function() {
    AppStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AppStore.removeChangeListener(this._onChange);
  },

  //this is where we render the component itself, as well as any subcomponents, as well as passing in data to these subcomponents, where they will access it through this.props.variableName
  render: function() {
    return (
      <div id='main-container'>
        <Header />
        <MainSection />
        <Footer />
      </div>
    );
  },

  
  //Event handler for 'change' events coming from the AppStore. 
  //we need this to prevent an error from popping up in the console, though it doesn't impact functionality currently
  _onChange: function() {
    this.setState(getAppState());
  }
});

module.exports = App;
