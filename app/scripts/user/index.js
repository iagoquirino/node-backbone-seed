'use strict';

var express = require('express');
var controller = require('./user.controller');
//var config = require('../../config/environment');
//var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/api/users', controller.list);
router.post('/api/users/', controller.create);

module.exports = router;
