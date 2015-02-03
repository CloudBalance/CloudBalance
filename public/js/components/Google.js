/** @jsx React.DOM */
var React = require('react');
var AppActions = require('../actions/appActions');
var AppStore = require('../stores/appStore');
var File = require('./File');


var Google = React.createClass({

<<<<<<< HEAD

  render:function(){
    //The file lists we are are getting are different for each service. For Google, the root directory just says 'root', and has a children property, while for Dropbox, the root directory actually holds the files/folders that are in the root directoyr. 
    //before we get data back, we do not have a .children property, so this will choke and stop execution. Thus, we have the .children check here. 
    if(this.props.displayedGoogleFileList.children) {
      var fileListToDisplay = 
        this.props.displayedGoogleFileList.children.map(function(file) {
          return (
            <li>
              <File data={file} />
            </li>
          );
        }
      );
        //still within if(children)
      return (
        <div className="files-container" id="google-container">
          <h3 className='service-title'>Google Drive</h3>
          <ul className="file-list">
            {fileListToDisplay}
          </ul>
        </div>
      );

    } else {
      //this is hacky duplicate code to handle the initial case where a <Google /> React component is created before we have data from the ajax call. Could probably promisify our getInitialData call within MainSection to prevent this from happening. 
=======
  //try wrapping what is being returned in parens
  // Need this, but throwing errors...
    // var fileListItems = this.props.googleFileList.map(function(item) {
    //   return <li><File data={item} /></li>;
    // });
        // This should go inside the ul, instead of just <File />
          // {fileListItems}

          
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
>>>>>>> gets search working
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

<<<<<<< HEAD
=======
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

>>>>>>> gets search working
module.exports = Google;
