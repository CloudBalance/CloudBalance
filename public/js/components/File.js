/** @jsx React.DOM */
var React = require('react');
var AppActions = require('../actions/appActions');
var AppStore = require('../stores/appStore');

//  I don't think this is the way now, but I'll leave it just in case:
// var getFileStateFromStore = function(fileID) {
//   return {
//     fileID: fileID,
//     fileName: AppStore.getFile().fileName,
//     children: AppStore.getFile().children,
//     fileIcon: AppStore.getFile().fileIcon,
//     fileType: AppStore.getFile().fileType,
//     fileLink: AppStore.getFile().fileLink
//   };
// };

var openFile = function(id) {
  // make an $.ajax call with the fileID to get the file's contents and display within a modal 
};

var File = React.createClass({

  getInitialState: function() {
    // STUB DATA: just to have something for now:
    // return {fileIcon: '../asset/folder-icon-65.png', fileType: 'folder', fileName: 'example-folder', children: [], fileLink: '' };

    // Get the info from the props object  --  THIS COULD WORK IF WE JUST HAD SOMETHING IN THE STORE!
    return {fileIcon: this.props.fileIcon, fileName: this.props.fileName};

    // Get it directly from the store?  No.
    // return getFileStateFromStore(this.props.fileID);
  },

        // <img className='file-icon' src={this.state.fileIcon}></img>
  render:function(){
    return (
      <div className='file-container'>
        <div className='file-icon' ></div>
        <div className='fileName'>
          {this.state.fileName}
        </div> 
      </div>
    );
  }
});

module.exports = File;
