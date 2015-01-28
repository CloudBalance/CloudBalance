/** @jsx React.DOM */
var React = require('react');
var AppActions = require('../actions/appActions.js');
// FIXME: Need these two below, but commented out for rendering layout until debugged
// var Dropbox = require('./Dropbox.js');
// var Google = require('./Google.js');

var MainSection = React.createClass({

  // Ajax calls are not really React methods, so they're supposed to go into the statics object (below). This difference doesn't do much, but might be better for performance, complies with the React documentation, AND causes you to have to call these methods in the following format: MainSection.getAllFiles()

  statics: {
    getAllFiles: function () {
      // TODO: put this into a component statics object
      $.ajax({
        url: '1/getAllFiles',
        dataType: 'json',
        success: function(data) {
          // this.setState({data: data});
          AppActions.updateGoogleFileList(data.googleFileList);
          AppActions.updateDropboxFileList(data.dropboxFileList);
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    },

    // Need to set the data object attributes (using methods in File class and listeners here?)
    moveFiles: function(data) {
      $.ajax({
        url: '1/moveFiles',
        dataType: 'json',
        type: 'POST',
        data: {
          fileID: data.fileID,  // Does this work for folders?
          to: data.toDirectory,   // properly
          from: data.fromDirectory,
          fromService: data.fromService,
          toService: data.toService,
        },
        success: function(data) {
          // What does this return?
          console.log(data);
          // FIXME: Need to update the Store
          this.setState({data: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    }
    
  },

  // This render method is MORE complete:
  // render: function(){
  //   return (
  //     <div id="main-section">
  //       <Dropbox
  //         className="files-container"
  //         id="dropbox-container"
  //         dropboxFileList={this.props.allFiles.dropboxFileList} />
  //       <Google
  //         className="files-container"
  //         id="google-container"
  //         googleFileList={this.props.allFiles.googleFileList} />
  //     </div>
  //   );
  // }

  // Using this version for now:
  render: function(){
    return (
      <div id="main-section">
        <div
          className="files-container"
          id="dropbox-container" >
        </div>
        <div
          className="files-container"
          id="google-container" >
        </div>
      </div>
    );
  }

});

module.exports = MainSection;
