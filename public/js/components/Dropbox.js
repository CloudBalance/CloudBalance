/** @jsx React.DOM */
var React = require('react');
var AppActions = require('../actions/appActions');
var AppStore = require('../stores/appStore');
var File = require('./File');

var Dropbox = React.createClass({

<<<<<<< HEAD
=======
    // var fileListItems = this.props.displayedDropboxFileList.map(function(item) {
    //   return <li><File data={item} /></li>;
    // });

// if (this.props.filterText === '') {
//   fileListToDisplay = 
//     this.props.displayedDropboxFileList.map(
//       function(file) {
//         return (
//           <li>
//             <File data={file} />
//           </li>
//         );
//       }
//     );


>>>>>>> gets search working
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

// if (this.props.displayedDropboxFileList.length > 1) {
// return (
//   <div className="files-container" id="dropbox-container">
//     <h3 className='service-title'>Dropbox</h3>
//     <ul className="file-list">
//       {fileListToDisplay}

//   </div>
// );
          // <img className='loading-img' src='../assets/loading.gif' />

module.exports = Dropbox;
