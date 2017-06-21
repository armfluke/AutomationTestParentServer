var express = require('express');
var router = express.Router();
var url ="mongodb://localhost:27017/TestInstall";
var mongoclient = require('mongodb').MongoClient;


router.post('/', function(req,res){


    mongoclient.connect(url, function(err,db){

    var collection = db.collection("tests");
    
    collection.insert(req.body, function (err,doc) {
        if (err) {
           console.log(err);
           res.send("There was an error adding the information to the database");
        } 
    });
    db.close();
});
console.log(req.body);
res.send(req.body);
});

module.exports = router;