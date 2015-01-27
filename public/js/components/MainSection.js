/** @jsx React.DOM */
var React = require('react');
var AppActions = require('../actions/appActions.js');
var Dropbox = require('./Dropbox.js');
var Google = require('./Google.js');

var MainSection = React.createClass({

  // Ajax calls are not really React methods, so they're supposed to go into the statics object (below). This difference doesn't do much, but might be better for performance, complies with the React documentation, AND causes you to have to call these methods in the following format: MainSection.getAllFiles()
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> more updates to react files, syntax errors & basic debugging
  statics: {
    getAllFiles: function () {
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
<<<<<<< HEAD

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
          // Need to update the Store
          this.setState({data: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    },
    
  },

  render: function(){
    return (
      <div id="main-section">
        <Dropbox
          dropboxFileList={this.props.allFiles.dropboxFileList} />
        <Google
          class="files-container"
          id="google-container"
          googleFileList={this.props.allFiles.googleFileList} />
      </div>
    );
  }

});

=======
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

      // Need to set the
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
=======
>>>>>>> more updates to react files, syntax errors & basic debugging

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
          // Need to update the Store
          this.setState({data: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    },
    
  },

  render: function(){
    return (
      <div id="main-section">
        <Dropbox
          dropboxFileList={this.props.allFiles.dropboxFileList} />
        <Google
          class="files-container"
          id="google-container"
          googleFileList={this.props.allFiles.googleFileList} />
      </div>
    );
  }

});

<<<<<<< HEAD
      )
    }
  });
>>>>>>> building out flux/react files
=======
>>>>>>> more updates to react files, syntax errors & basic debugging
module.exports = MainSection;
