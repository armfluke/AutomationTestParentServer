var express = require('express');
var router = express.Router();
var url ="mongodb://localhost:27017/TestInstall";
var mongoclient = require('mongodb').MongoClient;
var totalitems = 0;
var results = [];

router.get('/', function(req,res,next){

  mongoclient.connect(url, function(err,db){

    var collection = db.collection("tests");
    /*
    collection.find({})

    */
    collection.count({}, function(err,count){
    totalitems = count; 
    console.log(totalitems);
    res.render('index', { title: totalitems.toString() });
    })
    db.close();
  });
});

module.exports = router; 