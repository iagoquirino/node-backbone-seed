'use strict';

var express = require('express');
var controller = require('./client.controller');
//var config = require('../../config/environment');
//var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/api/clients', controller.list);
router.post('/api/clients/', controller.create);

module.exports = router;
