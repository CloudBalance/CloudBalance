// app-actions.js

var AppConstants = require('../constants/appConstants.js');
var AppDispatcher = require('../dispatcher/appDispatcher.js')

var AppActions = {
  // HAVE THESE ACTIONS ALIGN WITH CLIENT-SERVER API
  addItem: function(item) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.ADD_ITEM,
      item: item
    })
  },

  increaseItem:function(index){
    AppDispatcher.handleViewAction({
      actionType: AppConstants.INCREASE_ITEM,
      index: index
    })
<<<<<<< HEAD
  },

  updateFileLists: function(data) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.UPDATE_FILE_LISTS,
      data: data
    })
  }

=======
  }


>>>>>>> adds public react/flux files again, trying to complete rebase
};


module.exports = AppActions;
