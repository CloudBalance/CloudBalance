/** @jsx React.DOM */
var React = require('react');
var AppActions = require('../actions/appActions');
var AppStore = require('../stores/appStore');

// Properties that are passed to File as props:
//   fileID: 
//   fileName: 
//   children: 
//   fileIcon: 
//   fileType: 
//   fileLink: 

var openFile = function(id) {
  // make an $.ajax call with the fileID to get the file's contents and display within a modal 
};

var File = React.createClass({

  handleClick: function() {
    if(this.props.data.children) {
      //map through the list of children and display them
    }
  },

  getInitialState: function() {
    return {fileIcon: this.props.fileIcon, fileName: this.props.fileName};
  },

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
