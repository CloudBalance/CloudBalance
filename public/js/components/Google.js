/** @jsx React.DOM */
var React = require('react');
var AppActions = require('../actions/appActions');
var AppStore = require('../stores/appStore');
var File = require('./File');


var Google = React.createClass({

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
        </ul>
      </div>
    );
  },

});

module.exports = Google;
