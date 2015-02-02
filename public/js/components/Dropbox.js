/** @jsx React.DOM */
var React = require('react');
var AppActions = require('../actions/appActions');
var AppStore = require('../stores/appStore');
var File = require('./File');

var Dropbox = React.createClass({

    // var fileListItems = this.props.displayedDropboxFileList.map(function(item) {
    //   return <li><File data={item} /></li>;
    // });

  render:function(){
    console.log('displayedDropboxFileList inside of Dropbox.js');
    console.log(this.props.displayedDropboxFileList);
    var fileListToDisplay = 
      this.props.displayedDropboxFileList.map(
        function(file) {
          return (
            <li>
              <File data={file} />
            </li>
          );
        }
      );
    return (
      <div className="files-container" id="dropbox-container">
        <h3 className='service-title'>Dropbox</h3>
        <ul className="file-list">
          {fileListToDisplay}
        </ul>
      </div>
    );
  },

});

module.exports = Dropbox;
