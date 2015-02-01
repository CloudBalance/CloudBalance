/** @jsx React.DOM */
var React = require('react');
var AppActions = require('../actions/appActions');
var AppStore = require('../stores/appStore');
var File = require('./File');

var googleData = [{"fileID":"0AF6S8E0_wBt-Uk9PVA","fileName":"Root","children":[{"fileID":"0B16S8E0_wBt-Mjd1a0pOWmlUOFk","fileName":"testing","fileIcon":"https://ssl.gstatic.com/docs/doclist/images/icon_11_collection_list.png","fileLink":"https://docs.google.com/folderview?id=0B16S8E0_wBt-Mjd1a0pOWmlUOFk&usp=drivesdk","fileType":"application/vnd.google-apps.folder","children":[{"fileID":"0B16S8E0_wBt-OXNQcW90SVZXaEE","fileName":"aziz2.html","fileIcon":"https://ssl.gstatic.com/docs/doclist/images/icon_10_generic_list.png","fileLink":"https://docs.google.com/file/d/0B16S8E0_wBt-OXNQcW90SVZXaEE/edit?usp=drivesdk","fileType":"text/html","children":[]},{"fileID":"0B16S8E0_wBt-ZkNWZl9fRnU5TlE","fileName":"testing2","fileIcon":"https://ssl.gstatic.com/docs/doclist/images/icon_11_collection_list.png","fileLink":"https://docs.google.com/folderview?id=0B16S8E0_wBt-ZkNWZl9fRnU5TlE&usp=drivesdk","fileType":"application/vnd.google-apps.folder","children":[{"fileID":"0B16S8E0_wBt-NEdGMkpfdUktdU0","fileName":"ChatBuilder 2.html","fileIcon":"https://ssl.gstatic.com/docs/doclist/images/icon_10_generic_list.png","fileLink":"https://docs.google.com/file/d/0B16S8E0_wBt-NEdGMkpfdUktdU0/edit?usp=drivesdk","fileType":"text/html","children":[]},{"fileID":"0B16S8E0_wBt-Rl9jeHRnMVZiaHM","fileName":"testing3","fileIcon":"https://ssl.gstatic.com/docs/doclist/images/icon_11_collection_list.png","fileLink":"https://docs.google.com/folderview?id=0B16S8E0_wBt-Rl9jeHRnMVZiaHM&usp=drivesdk","fileType":"application/vnd.google-apps.folder","children":[{"fileID":"0B16S8E0_wBt-Q2dmVldrc2lqZ2M","fileName":"google-oauth-server.js","fileIcon":"https://ssl.gstatic.com/docs/doclist/images/icon_10_generic_list.png","fileLink":"https://docs.google.com/file/d/0B16S8E0_wBt-Q2dmVldrc2lqZ2M/edit?usp=drivesdk","fileType":"application/x-javascript","children":[]}]}]}]}]}];

// //we shouldn't need this. this data should be passed in as a prop by MainSection when we create a new <Google />
// var getStateFromStore = function() {
//   return {
//     googleFileList: AppStore.getAll().googleFileList
//   };
// };

// //I'm not sure what this does. we'd want to do all the rendering in render below. 
// var getFile = function(id) {
//   return (
//     <File
//       key = {googleFileList.fileID} 
//       filename = {googleFileList.filename} />
//   );
// };

var Google = React.createClass({

  getInitialState: function() {
    // return getStateFromStore();
    console.log('this.props from within Google', this.props);
    //currently we don't have any data the first time we create a new <Google />, so all the props are blank. 
    return {googleFileList: this.props.googleFileList};
  },

  // Listen for changes from the App Store
  componentDidMount: function() {
    AppStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AppStore.removeChangeListener(this._onChange);
  },

  //I'm not sure what we're trying to accomplish with the code below. 
  //try wrapping what is being returned in parens
  // Need this, but throwing errors...
    // var fileListItems = this.state.googleFileList.map(function(item) {
    //   return <li><File data={item} /></li>;
    // });
        // This should go inside the ul, instead of just <File />
          // {fileListItems}
  render:function(){
    return (
      <div className="files-container" id="google-container">
        <h3 className='service-title'>Google Drive</h3>
        <ul className="file-list">
          <File fileIcon='./asset/folder-icon-65.png' fileType='folder' fileName='example-folder' />
        </ul>
      </div>
    );
  },

  /**
   * Event handler for 'change' events coming from the AppStore
   */
  _onChange: function() {
    this.setState(getStateFromStore());
  }
});

module.exports = Google;
