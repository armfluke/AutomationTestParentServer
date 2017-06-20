var express = require('express');
var request = require('request');
var router = express.Router();


router.get('/', function(req,res,next){

    request('http://10.42.87.28:3000/test',{json:{name: "EikonLight"}}, function(error, response, body){
        console.log('error:', error); // Print the error if one occurred 
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
        console.log('body:', body);
    })
  
});

module.exports = router; 