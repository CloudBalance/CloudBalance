/** @jsx React.DOM */
var React = require('react');
var AppActions = require('../actions/appActions');
var AppStore = require('../stores/appStore');
var File = require('./File');

var Dropbox = React.createClass({

  render:function(){

    var fileListToDisplay = [];

    this.props.dropboxFileList.forEach(function(file) {
      if (file.fileName.indexOf(this.props.filterText) === -1) {
        return;
      }
      fileListToDisplay.push(<li><File data={file} /></li>);
    }.bind(this));

      return (
        <div className="files-container" id="dropbox-container">
          <h3 className='service-title'>Dropbox</h3>
          <ul className="file-list">
            {fileListToDisplay}
          </ul>
        </div>
      );

  }

});

module.exports = Dropbox;
