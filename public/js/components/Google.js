/** @jsx React.DOM */
var React = require('react');
var AppActions = require('../actions/appActions');
<<<<<<< HEAD
<<<<<<< HEAD
var AppStore = require('../stores/appStore');
=======
var AppStore = require('../store/appStore');
>>>>>>> building out flux/react files
=======
var AppStore = require('../stores/appStore');
>>>>>>> more updates to react files, syntax errors & basic debugging

var getStateFromStore = function() {
  return {
    googleFileList: AppStore.getAll().googleFileList
  }
};

<<<<<<< HEAD
<<<<<<< HEAD
var getFile = function(id) {
=======
var getFile(id) {
>>>>>>> building out flux/react files
=======
var getFile = function(id) {
>>>>>>> more updates to react files, syntax errors & basic debugging
  return (
    <File
      key = {googleFileList.fileID} 
      filename = {googleFileList.filename} />
  );
};

var Google = React.createClass({

  getInitialState: function() {
    return getStateFromStore();
  },

  // Listen for changes from the App Store
  componentDidMount: function() {
    AppStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AppStore.removeChangeListener(this._onChange);
  },

  render:function(){
    var fileListItems = this.state.googleFileList.map(getFile);
    return (
      <div className="files-container" id="google-container">
        <ul className="file-list">
          {fileListItems}
        </ul>
      </div>
    );
  },

  /**
   * Event handler for 'change' events coming from the AppStore
   */
  _onChange: function() {
    this.setState(getStateFromStore());
  }
});

module.exports = Google;
