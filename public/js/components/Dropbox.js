/** @jsx React.DOM */
var React = require('react');
var AppActions = require('../actions/appActions');
var AppStore = require('../stores/appStore');

var getStateFromStore = function() {
  return {
    dropboxFileList: AppStore.getAll().dropboxFileList
  }
};

var getFile = function(id) {
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
