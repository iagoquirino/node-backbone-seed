'use strict';

var Client = require('./client.model');
var schemaValidator = require('is-my-json-valid/require');
var validator = schemaValidator('./client.validation.json');

 /*
  * GET
  */
 exports.list = function(req, res){
   return Client.find(function(err, item) {
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
   console.log('[CLIENT] Receiving object');
   var isValid = validator(req.body);
   if(isValid) {
       var model = new Client(req.body);
       model.save(function(err,doc){
           if(!err){
               return res.status(201).send("{'status':'Client sucessfull registered.'}");
           }else{
               return res.status(500).send(err);
           }
       });
   }
   else {
       return res.status(404).send(validator.errors);
   }
 };
