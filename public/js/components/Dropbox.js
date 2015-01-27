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
    dropboxFileList: AppStore.getAll().dropboxFileList
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
      key = {dropboxFileList.fileID} 
      filename = {dropboxFileList.filename} />
  );
};

var Dropbox = React.createClass({

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
    var fileListItems = this.state.dropboxFileList.map(getFile);
    return (
      <div className="files-container" id="dropbox-container">
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

module.exports = Dropbox;
