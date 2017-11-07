var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');


router.post('/new', function(req,res,next){
  User.findOneAndUpdate(
    { "_id": req.body.user.id},{$push:{images:req.body.src}},{new:true},
    function(err,user) {
        if(err){
          console.log(err)
        }
        user.save();
    });
});


module.exports = router;
