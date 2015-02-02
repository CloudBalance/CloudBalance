/** @jsx React.DOM */
var React = require('react');
var AppActions = require('../actions/appActions.js');
var Search = require('./Search.js');
var Dropbox = require('./Dropbox.js');
var Google = require('./Google.js');
var AppStore = require('../stores/appStore.js');

var getStateFromStore = function() {
  return {
    allFiles: AppStore.getAll()
  };
};

var MainSection = React.createClass({
  getInitialState: function() {
    return {
      dropboxFileList: {},
      displayedDropboxFileList: {},
      googleFileList: {},
      displayedGoogleFileList: {}
    }
  },

  _onChange: function() {
    var allFiles = getStateFromStore();
    //TODO: verify. we may need to adjust [0] to get to the root directory for each, depending on the format of what is returned from API calls
    //NOTE: we are resetting the displayedFileList to the root directory on every change to the store. This is ok for now, but once we are making more changes to the store, this logic will need to be rewritten. 
    this.setState({
      googleFileList: allFilses.googleFileList,
      dropboxFileList: allFiles.dropboxFileList,
      displayedDropboxFileList: allFiles.dropboxFileList[0],
      displayedGoogleFileList: allFiles.googleFileList[0]
    });

    //TODO: possibly render. see if it automatically updates the views based on changes to state
  },

  componentDidMount: function() {
    //the ajax call goes here to make sure it has access to 'this' and state and props
    AppStore.addChangeListener(this._onChange);
    
    this.getAllFiles();
  },

  componentWillUnmount: function() {
    AppStore.removeChangeListener(this._onChange);
  },

  displayFileList: function() {

  },

  getAllFiles: function() {
    $.ajax({
      url: 'api/1/getAllFiles',
      dataType: 'json',
      success: function(data) {
        //this function doesn't exist yet
        AppActions.updateFileLists(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.log('this',this);
        console.error('api/1/getAllFiles', status, err.toString());
      }.bind(this)
    });
  },

  // Need to set the data object attributes (using methods in File class and listeners here?)
      // Luckily this method is accessible from the File component
  moveFiles: function(data) {
    $.ajax({
      url: 'api/1/moveFiles',
      dataType: 'json',
      type: 'POST',
      data: {
        fileID: data.fileID,  // Does this work for folders?
        toLocation: data.toDirectory,   // properly
        fromLocation: data.fromDirectory,
        fromService: data.fromService,
        toService: data.toService,
      },
      success: function(data) {
        // What does this return?
        console.log(data);
        // FIXME: Need to update the Store
        this.setState({allFiles: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },


  render: function(){
    return (
      <div id="main-section">
        <Search />
        <Dropbox
          displayedDropboxFileList={this.state.displayedDropboxFileList} />
        <Google
          displayedGoogleFileList={this.state.displayedGoogleFileList} />
      </div>
    );
  }

});

module.exports = MainSection;
