require('dotenv').config();
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');
var unsplash = require('unsplash-api');
var clientId = process.env.UNSPLASH_SECRET;
unsplash.init(clientId);


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
    res.send({images: user.images, edited: user.editedImages});
  });
})


router.post('/unsplash', function(req,res,next){
  let search = req.body.value
  unsplash.searchPhotos(search, null, null, null, function(error, photos, link) {
   res.send(photos)
});
})

router.post('/save', function(req,res,next){
  User.findOneAndUpdate(
    { "_id": req.body.user.id},{$push:{editedImages:req.body.src}},{new:true},
    function(err,user) {
        if(err){
          console.log(err)
        }
        user.save();
        res.send(user);
    });
});

router.post('/delete', function(req,res,next){
  let src = req.body.src;
  let subDoc = '';
  if(req.body.editOrOriginal === 'editedData'){
    subDoc = 'editedImages'
  }else{
    subDoc = 'images'
  }
    User.findOne({'_id': req.body.user.id},function(err, user){
          user[subDoc].splice(req.body.index, 1);
          user.save()
          if(err){
            console.log(err);
          }
        res.send({images: user.images, edited:user.editedImages});
      })
});






module.exports = router;
