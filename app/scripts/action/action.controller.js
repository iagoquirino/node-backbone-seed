'use strict';

var Action = require('./action.model');
var schemaValidator = require('is-my-json-valid/require');
var validator = schemaValidator('./action.validation.json');
/*
 * GET
 */
exports.list = function(req, res){
  return Action.find(function(err, item) {
      if(err) {
          console.log(err);
          res.status(500).send();
      }
      else {
          if(item.length === 0) {
              res.status(404).send();
          }
          else {
              res.send(item);
          }
      }
  });
};

exports.create = function(req,res){
  console.log('[ACTIONS] Receiving object');
  var isValid = validator(req.body);
  if(isValid) {
      var model = new Action(req.body);
      model.save(function(err,doc){
          if(!err){
              return res.status(201).send("{'status':'Action sucessfull registered.'}");
          }else{
              return res.status(500).send(err);
          }
      });
  }
  else {
      return res.status(404).send(validator.errors);
  }
};
