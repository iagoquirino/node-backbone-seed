/**
 * authentication config
 */

'use strict';

var auth = require('http-auth');

module.exports = function(app) {
  //creates a basic authentication area
  var basic = auth.basic({
      realm: "Seed",
      file: "./config/environment/users.httpassword"
  });

  app.use(auth.connect(basic));
};
