/** @jsx React.DOM */
var React = require('react');
var AppActions = require('../actions/appActions');
var AppStore = require('../stores/appStore');
var File = require('./File');

var Dropbox = React.createClass({

  render:function(){
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
