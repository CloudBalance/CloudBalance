/** @jsx React.DOM */
var React = require('react');
var AppActions = require('../actions/appActions');
var AppStore = require('../stores/appStore');
var File = require('./File');


var Google = React.createClass({

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
      return (
        <div className="files-container" id="google-container">
          <h3 className='service-title'>Google Drive</h3>
          <ul className="file-list">
            {fileListToDisplay}
          </ul>
        </div>
      );
    }
  },

});

module.exports = Google;
