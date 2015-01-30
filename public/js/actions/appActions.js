// app-actions.js

var AppConstants = require('../constants/appConstants.js');
var AppDispatcher = require('../dispatcher/appDispatcher.js')

var AppActions = {
  // HAVE THESE ACTIONS ALIGN WITH CLIENT-SERVER API
  //FIX: modify to be 'move item'
  addItem: function(item) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.ADD_ITEM,
      item: item
    })
  },

  //FIX: I don't think we need this. check out our client/server
  //api endpoints, but I suspect this is superfluous
  increaseItem:function(index){
    AppDispatcher.handleViewAction({
      actionType: AppConstants.INCREASE_ITEM,
      index: index
    })
  },

  //FIX: modify to be getAlLFiles
  updateFileLists: function(data) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.UPDATE_FILE_LISTS,
      data: data
    })
  },

  logout: function() {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.LOGOUT
    });
  }

};

module.exports = AppActions;
