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

  clearSearch: function() {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.CLEAR_SEARCH
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
    console.log('heard a logout in appActions');
    AppDispatcher.handleViewAction({
      actionType: AppConstants.LOGOUT
    })
  }

};

module.exports = AppActions;
