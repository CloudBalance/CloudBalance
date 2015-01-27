<<<<<<< HEAD
<<<<<<< HEAD
// var Footer = require('./Footer');
=======
var Footer = require('./Footer');
>>>>>>> building out flux/react files
=======
// var Footer = require('./Footer');
>>>>>>> more updates to react files, syntax errors & basic debugging
var Header = require('./Header');
var MainSection = require('./MainSection');
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
    return (
      <div>
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

module.exports = App;
