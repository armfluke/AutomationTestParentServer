var express = require('express');
var request = require('request');
var ipgetter = require('./init.js');
var router = express.Router();
var ips = [];


router.get('/', function(req,res,next){
    res.send({status: "OK"});
    var name = req.query.name;
    var url = req.query.url;
    var test = req.query.test;
    var c = 0;
    ips = ipgetter.get();
    while(c < ips.length){
        var childurl = 'http://' + ips[c].ip + '/test'
        console.log(childurl);
        request(childurl ,{json:{name: name, url: url, test: test}}, function(error, response, body){
            console.log('error:', error); // Print the error if one occurred
            if(error){
                for(let i=0;i<ips.length;i++){
                    if(ips[i].ip == error.address+':'+error.port){
                        ips.pop(i);
                        break;
                    }
                }
                c--;
                console.log("Remove "+error.address+" from ips");
            }
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
            console.log('body:', body);
            console.log('***********');
        })
        c++
    }  
});

router.get('/:ip', function(req,res,next){
    res.send({status: "OK"});
    var ip = req.params.ip;
    var name = req.query.name;
    var url = req.query.url;
    var childurl = 'http://' + ip + '/test'
    console.log(childurl);
    request(childurl ,{json:{name: name,url: url}}, function(error, response, body){
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
        console.log('body:', body);
        console.log('***********');
    })
  
});

module.exports = router; 