var express = require('express');
var request = require('request');
var ipgetter = require('./init.js');
var router = express.Router();
var ips = [];


router.get('/', function(req,res,next){
    res.send({status: "OK"});
    var c = 0;
    ips = ipgetter.get();
    while(c < ips.length){
        var url = 'http://' + ips[c].ip + '/test'
        console.log(url);
        request(url ,{json:{name: "EikonLight"}}, function(error, response, body){
            console.log('error:', error); // Print the error if one occurred
            if(error){
                for(let i=0;i<ips.length;i++){
                    if(ips[i].ip == error.address+':3000'){
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

module.exports = router; 