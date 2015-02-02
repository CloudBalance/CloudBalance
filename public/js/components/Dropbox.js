/** @jsx React.DOM */
var React = require('react');
var AppActions = require('../actions/appActions');
var AppStore = require('../stores/appStore');
var File = require('./File');

var Dropbox = React.createClass({

    // var fileListItems = this.state.dropboxFileList.map(function(item) {
    //   return <li><File data={item} /></li>;
    // });

  render:function(){
    return (
      <div className="files-container" id="dropbox-container">
        <h3 className='service-title'>Dropbox</h3>
        <ul className="file-list">
        </ul>
      </div>
    );
  },
          // {fileListItems}
          // <File fileIcon='./asset/folder-icon-65.png' fileType='folder' fileName='example-folder' />
          // This should go inside the ul, but throwing error right now


});

module.exports = Dropbox;
