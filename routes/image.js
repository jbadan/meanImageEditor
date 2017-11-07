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
        res.send(user);
    });
});

router.post('/grid', function(req,res,next){
  User.findOne({ "_id": req.body.user.id}).
  exec(function (err, user) {
    if (err) console.log(err);
    res.send({images: user.images});
  });
})

module.exports = router;
