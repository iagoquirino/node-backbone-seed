/**
 * Express configuration
 */

 // Set default node environment to development
 process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var path = require('path');
var config = require('./environment');
var passport = require('passport');
var session = require('express-session');
var mongoose = require('mongoose');
var cors = require('cors');

module.exports = function(app) {
    // Connect to database
    mongoose.connect(config.mongo.uri, config.mongo.options);

    // Populate DB with sample data
    if (config.seedDB) {
        require('./seed');
    }

    //config authentication
    require('./auth')(app);

    app.set('port', process.env.PORT || 9999);
    app.set('views', path.join(app.get('dirname'), 'views'));
    app.set('view engine', 'jade');
    app.use(express.static(path.join(app.get('dirname'), 'public')));
    app.use(compression());
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(methodOverride());
    app.use(cookieParser());
    app.use(passport.initialize());

    // Persist sessions with mongoStore
    // We need to enable sessions for passport twitter because its an oauth 1.0 strategy
    app.use(session({
        secret: config.secrets.session,
        resave: true,
        saveUninitialized: true,
    }));

    var env = process.env.NODE_ENV;

    if ('production' === env) {
        app.use(morgan('production'));
    }

    if ('development' === env || 'test' === env) {
        app.use(morgan('dev'));
        app.use(errorHandler()); // Error handler - has to be last
    }
};
