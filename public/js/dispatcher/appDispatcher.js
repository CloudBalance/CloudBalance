var Dispatcher = require('./dispatcher.js');
var assign = require('object-assign');

var AppDispatcher = assign({}, Dispatcher.prototype, {

  // bridge function between the views and the dispatcher
  handleViewAction: function(action) {
    console.log('action', action);
    this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    })
  }
});

module.exports = AppDispatcher;
