var jwt = require('jwt-simple');
var jwtSecret = require('./secrets/jwt.secret');

var tokenSaverMaker = function tokenSaverMaker (thirdparty, token, redirectUrl) {
  return  '<!DOCTYPE html>' +
          '<html>' +
          '<head>' +
          '<meta charset="utf-8">' +
          '<script>' +
            'sessionStorage.setItem(\'' + thirdparty + 'Token\', \'' + jwt.encode(token, jwtSecret.secret) + '\');' +
            'window.location = \'' + redirectUrl + '\';' +
          '</script>' +
          '</head>' +
          '<body>' +
          '</body>' +
          '</html>';
};

module.exports = {
  'tokenSaverMaker' : tokenSaverMaker
};
