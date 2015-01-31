/** @jsx React.DOM */
var React = require('react');
var AppActions = require('../actions/appActions');
var AppStore = require('../stores/appStore');
var File = require('./File');


var getStateFromStore = function() {
  return {
    googleFileList: AppStore.getAll().googleFileList
  };
};

var getFile = function(id) {
  return (
    <File
      key = {googleFileList.fileID} 
      filename = {googleFileList.filename} />
  );
};

var Google = React.createClass({

  getInitialState: function() {
    // return getStateFromStore();
    return {googleFileList: this.props.googleFileList};
  },

  // Listen for changes from the App Store
  componentDidMount: function() {
    AppStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AppStore.removeChangeListener(this._onChange);
  },

  //I'm not sure what we're trying to accomplish with the code below. 
  //try wrapping what is being returned in parens
  //where do we define File?
  // Need this, but throwing errors...
    // var fileListItems = this.state.googleFileList.map(function(item) {
    //   return <li><File data={item} /></li>;
    // });
        // This should go inside the ul, instead of just <File />
          // {fileListItems}
  render:function(){
    return (
      <div className="files-container" id="google-container">
        <h3 className='service-title'>Google Drive</h3>
        <ul className="file-list">
          <File fileIcon='./asset/folder-icon-65.png' fileType='folder' fileName='example-folder' />
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
