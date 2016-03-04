'use strict';

var User = require('./user.model');
var schemaValidator = require('is-my-json-valid/require');
var validator = schemaValidator('./user.validation.json');

/*
 * GET home page.
 */

exports.list = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.create = function(req,res){
  console.log('[USERS] Receiving object');
  var isValid = validator(req.body);
  if(isValid) {
      var model = new User(req.body);
      model.save(function(err,doc){
          if(!err){
              return res.status(201).send("{'status':'User sucessfull registered.'}");
          }else{
              return res.status(500).send(err);
          }
      });
  }
  else {
      return res.status(404).send(validator.errors);
  }
};
