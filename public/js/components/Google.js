/** @jsx React.DOM */
var React = require('react');
var AppActions = require('../actions/appActions');
var AppStore = require('../stores/appStore');
var File = require('./File');


var Google = React.createClass({


          // var fileListToDisplay = 
          //   this.props.displayedGoogleFileList.children.map(function(file) {
          //     return (
          //       <li>
          //         <File data={file} />
          //       </li>
          //     );
          //   }
          // );

          // } else {

  render:function(){

    console.log('googleFileList[0].children');
    console.log(this.props.googleFileList);

    if(this.props.googleFileList[0]) {
      if(this.props.googleFileList[0].children) {

        var fileListToDisplay = [];

          this.props.displayedGoogleFileList.children.forEach(function(file) {
            if (file.fileName.indexOf(this.props.filterText) === -1) {
              return;
            }
            fileListToDisplay.push(<li><File data={file} /></li>);
          }.bind(this));


          //still within if(children)
        return (
          <div className="files-container" id="google-container">
            <h3 className='service-title'>Google Drive</h3>
            <ul className="file-list">
              {fileListToDisplay}
            </ul>
          </div>
        );
      }

    } else {
      // handle the initial case where a <Google /> React component is created before we have data from the ajax call
      return (
        <div className="files-container" id="google-container">
          <h3 className='service-title'>Google Drive</h3>
          <ul className="file-list">
            {fileListToDisplay}
          </ul>
        </div>
      );
    }
  }

});

          // <img className='loading-img' src='../assets/loading.gif' />

//example pattern from tutorial: 
// render: function() {
//   var commentNodes = this.props.data.map(function (comment) {
//     return (
//       <Comment author={comment.author}>
//         {comment.text}
//       </Comment>
//     );
//   });
//   return (
//     <div className="commentList">
//       {commentNodes}
//     </div>
//   );
// }

module.exports = Google;
