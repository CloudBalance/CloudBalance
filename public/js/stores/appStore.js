var AppDispatcher = require('../dispatcher/appDispatcher');
var AppConstants = require('../constants/appConstants');
var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;


// Non-Flux-related items
var CHANGE_EVENT = 'change';

<<<<<<< HEAD
<<<<<<< HEAD
var _dropboxFileList = {};
var _googleFileList = {};


var AppStore = assign({}, EventEmitter.prototype, {
  // adding methods to the EventEmitter

  /**
   * Get the entire collection of files.
   * @return {object}
   */
  getAll: function() {
    return {
      _dropboxFileList,
      _googleFileList
    };
  },

  updateFileLists: function(data) {
    _dropboxFileList = data.dropboxFileList;
    _googleFileList = data.googleFileList;
    emitChange();
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
      // CHANGE_EVENT is just a string ('change')
=======
// From shopping cart example
var _cartItems = [];
var _addItem = function(item) {
  if (!item.inCart) {
    item['qty'] = 1;
    item['inCart'] = true;
    _cartItems.push(item);
  } else {
    _cartItems.forEach(function(cartItem, i) {
      if (cartItem.id === item.id) {
        _increaseItem(i);
      }
    });
  }
};
var _increaseItem = function(index){
  _cartItems[index].qty++;
};


=======
var _dropboxFileList = {};
var _googleFileList = {};
>>>>>>> building out flux/react files


var AppStore = assign({}, EventEmitter.prototype, {
  // adding methods to the EventEmitter

  /**
   * Get the entire collection of files.
   * @return {object}
   */
  getAll: function() {
    return {
      _dropboxFileList,
      _googleFileList
    };
  },

  updateFileLists: function(data) {
    _dropboxFileList = data.dropboxFileList;
    _googleFileList = data.googleFileList;
    emitChange();
  },

  emitChange: function() {
<<<<<<< HEAD
    this.emit(CHANGE_EVENT);   // CHANGE_EVENT is just a string ('change')
>>>>>>> adds public react/flux files again, trying to complete rebase
=======
    this.emit(CHANGE_EVENT);
      // CHANGE_EVENT is just a string ('change')
>>>>>>> building out flux/react files
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
    // This method allows components to register events with the Store -- and causes Store to execute this callback in response.

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  // register callback with dispatcher
    // give it a key in case one store has to wait for another store
  dispatcherIndex:AppDispatcher.register(function(payload){
    var action = payload.action; // this is our action from handleViewAction
    switch(action.actionType){
      // determine which method matches from AppConstants
      case AppConstants.ADD_ITEM:
      // invoke correlating method stored above
        _addItem(payload.action.item);
        break;

      case AppConstants.INCREASE_ITEM:
        _increaseItem(payload.action.index);
        break;

    }
    AppStore.emitChange();

    return true;
  })

});


module.exports = AppStore;



