/** @jsx React.DOM */
var React = require('react');
var AppActions = require('../actions/appActions');
var AppStore = require('../stores/appStore');

//     fileID: 
//     fileName: 
//     children: 
//     fileIcon: 
//     fileType: 
//     fileLink: 

var openFile = function(id) {
  // make an $.ajax call with the fileID to get the file's contents and display within a modal 
};

var File = React.createClass({

  handleClick: function() {
    if(this.props.data.children) {

    }
  },

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
      <div className='file-container' >
        <img className='file-icon' src={this.props.data.fileIcon} />
        <div className='fileName'>
          {this.props.data.fileName}
        </div> 
      </div>
    );
  }
});

module.exports = File;
