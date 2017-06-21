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

    collection.count({}, function(err,count){
    totalitems = count; 
    console.log(totalitems);
    res.render('index', { title: totalitems.toString() });
    })
  
    */
    collection.find({}).toArray(function(err, result){
      
      if (err){
        res.send(err); 
      } else if (result.length){
        res.render('index', {"results" : result});
      } else {
        res.send('No documents found');
      }
    })
    db.close();
  });
});

module.exports = router; 