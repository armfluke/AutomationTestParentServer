var express = require('express');
var router = express.Router();
var url ="mongodb://localhost:27017/TestInstall";
var mongoclient = require('mongodb').MongoClient;
var fs = require("fs");


router.post('/', function(req,res){

    var testLogsPath = __dirname
    testLogsPath = testLogsPath.substr(0, testLogsPath.length - 7)
    fs.mkdir(testLogsPath + "/TestLogs/" + JSON.parse(req.body.result).time,function(error){
        if(error){
            console.log(error)
        }
        fs.writeFile(testLogsPath + "/TestLogs/" + JSON.parse(req.body.result).time + '/result.json', JSON.stringify(req.body), function (err) {
            if (err){
                console.log(err);
            }
        });
    });

    mongoclient.connect(url, function(err,db){
        if(err){
            console.log(err);
            res.send(err);
        }else{
            var collection = db.collection("tests");
            
            collection.insert(req.body, function (err,doc) {
                if (err) {
                    console.log(err);
                    res.send("There was an error adding the information to the database");
                } 
            });
            db.close();
            console.log(req.body);
            res.send(req.body);
        }
    });
});

module.exports = router;