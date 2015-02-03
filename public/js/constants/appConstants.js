var keyMirror = require('keymirror');

module.exports = keyMirror({
  // these are all the actions that any of our client files use. having them centralized here makes sure everyone is calling them the same way.
  //keyMirror simply mirros the key into the property, overwriting null. it just saves a few keystrokes.
  UPDATE_FILE_LISTS: null,
  LOGOUT: null,
  CLEAR_SEARCH: null,

});
