var express = require('express');
var request = require('request');
var ipgetter = require('./init.js');
var router = express.Router();
var ips = [];


router.get('/', function(req,res,next){

    var c = 0;
    ips = ipgetter.get();
    while(c < ips.length){
        request('http://'+ips[c].ip+'/test',{json:{name: "EikonLight"}}, function(error, response, body){
        console.log('error:', error); // Print the error if one occurred 
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
        console.log('body:', body);
        console.log('***********');
    })
    c++
    }  
});

module.exports = router; 