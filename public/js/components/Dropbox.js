/** @jsx React.DOM */
var React = require('react');
var AppActions = require('../actions/appActions');
var AppStore = require('../stores/appStore');
var File = require('./File');


var getStateFromStore = function() {
  return {
    dropboxFileList: AppStore.getAll().dropboxFileList
  };
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

    // Need this, but throwing errors...
      // var fileListItems = this.state.googleFileList.map(function(item) {
      //   return <li><File data={item} /></li>;
      // });
  render:function(){
    return (
      <div className="files-container" id="dropbox-container">
        <h3 className='service-title'>Dropbox</h3>
        <ul className="file-list">
          <File fileIcon='./asset/folder-icon-65.png' fileType='folder' fileName='example-folder' />
        </ul>
      </div>
    );
  },
          // This should go inside the ul, but throwing error right now
          // {fileListItems}

  /**
   * Event handler for 'change' events coming from the AppStore
   */
  _onChange: function() {
    this.setState(getStateFromStore());
  }
});

module.exports = Dropbox;
