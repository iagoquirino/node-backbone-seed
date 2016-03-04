
/**
* Main application routes
*/
'use strict';

var errors = require('./app/scripts/components/errors');

module.exports = function(app) {
  app.use('/', require('./public/javascripts/app').index);
  // Insert routes below
  app.use('/api/actions', require('./app/scripts/action'));
  app.use('/api/clients', require('./app/scripts/client'));
  app.use('/api/users', require('./app/scripts/user'));

  //app.use('/auth', require('./auth'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*').get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
      .get(function(req, res) {
          res.sendfile(app.get('appPath') + '/');
  });
};
