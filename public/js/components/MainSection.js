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
      //sets these attributes equal to empty versions so <Google /> and <Dropbox /> don't choke before we get data in from our ajax request
      dropboxFileList: [],
      displayedDropboxFileList: [],
      googleFileList: [],
      displayedGoogleFileList: [],
      // This last attribute is for search functionality
      filterText: ''
    }
  },

  _onChange: function() {
    var allFiles = getStateFromStore().allFiles;
    //NOTE: we are resetting the displayedFileList to the root directory on every change to the store. This is ok for now, but once we are making more changes to the store, this logic will need to be rewritten. 
    this.setState({
      googleFileList: allFiles.googleFileList,
      dropboxFileList: allFiles.dropboxFileList,
      displayedDropboxFileList: allFiles.dropboxFileList,
      displayedGoogleFileList: allFiles.googleFileList[0],
      filterText: ''
    });
    //We have to force it to render after updating the state to make sure to pass the new data down to the sub components. 
    this.render();
  },


  handleSearchInput: function(filterText) {
    this.setState({
      filterText: filterText
    });
  },

  componentDidMount: function() {
    //the ajax call goes here to make sure it has access to 'this' and state and props
    AppStore.addChangeListener(this._onChange);
    this.getAllFiles();
  },

  componentWillUnmount: function() {
    AppStore.removeChangeListener(this._onChange);
  },

  getAllFiles: function() {
    $.ajax({
      url: 'api/1/getAllFiles',
      headers: {
        'driveToken': sessionStorage.getItem('driveToken'),
        'dropboxToken' : sessionStorage.getItem('dropboxToken')
      },
      dataType: 'json',
      type: 'GET',
      success: function(data) {
        //this function doesn't exist yet
        console.log('got data back in mainSection', data);
        AppActions.updateFileLists(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('api/1/getAllFiles', status, err.toString());
      }.bind(this)
    });
  },

  //moveFiles is not implemented yet
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
        <Search 
          filterText={this.state.filterText}
          onSearchInput={this.handleSearchInput}  />
        <Dropbox
          dropboxFileList={this.state.dropboxFileList}
          displayedDropboxFileList={this.state.displayedDropboxFileList} 
          filterText={this.state.filterText}  />
        <Google
          googleFileList={this.state.googleFileList}
          displayedGoogleFileList={this.state.displayedGoogleFileList} 
          filterText={this.state.filterText}  />
      </div>
    );
  }

});

module.exports = MainSection;
