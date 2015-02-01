/** @jsx React.DOM */
var React = require('react');
var AppActions = require('../actions/appActions.js');
var Search = require('./Search.js');
var Dropbox = require('./Dropbox.js');
var Google = require('./Google.js');


var MainSection = React.createClass({

  getInitialState: function() {
    // return {allFiles: MainSection.getAllFiles()};
    // return { allFiles: {dropboxFileList: {}, googleFileList: {} } };
    return {allFiles: this.props.allFiles, googleFileList: this.props.allFiles[0], dropboxFileList: this.props.allFiles[1]}

  },

  getAllFiles: function() {
    $.ajax({
      url: 'api/1/getAllFiles',
      dataType: 'json',
      success: function(data) {
        this.setState({allFiles: data});
        this.setState({googleFileList: data[0]});
        console.log('this.state:');
        console.log(this.state);
        //these two functions don't exist yet
        // AppActions.updateGoogleFileList(data.googleFileList);
        // AppActions.updateDropboxFileList(data.dropboxFileList);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('api/1/getAllFiles', status, err.toString());
      }.bind(this)
    });
  },

// This might be useful if it would load the jQuery properly/fast enough
// i wrapped the main.js inside a document.ready statement, so we know jquery has loaded
  componentDidMount: function() {
    //the ajax call should be here to make sure it has access to 'this' and state and props
    this.getAllFiles();
  },

  displayFileList: function() {

  },

  // Ajax calls are not really React methods, so they're supposed to go into the statics object (below). This difference doesn't do much, but might be better for performance, complies with the React documentation, AND causes you to have to call these methods in the following format: MainSection.getAllFiles()
  //TODO: confirm syntax. why not MainSection.statics.getAllFiles() ?
  statics: {    

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
    }
  },

  render: function(){
    return (
      <div id="main-section">
        <Search />
        <Dropbox
          dropboxFileList={this.state.allFiles.dropboxFileList} />
        <Google
          googleFileList={this.state.allFiles.googleFileList} />
      </div>
    );
  }


  // <link rel="stylesheet" media="screen" href="http://netdna.bootstrapcdn.com/bootstrap/3.1.0/css/bootstrap.min.css">

  // Using this version for now:
  // render: function(){
  //   return (
  //     <div id="main-section">
  //       <div
  //         className="files-container"
  //         id="dropbox-container" >
  //       </div>
  //       <div
  //         className="files-container"
  //         id="google-container" >
  //       </div>
  //     </div>
  //   );
  // }

});

module.exports = MainSection;
