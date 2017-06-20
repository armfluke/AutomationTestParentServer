var express = require('express');
var router = express.Router();

var iparray = [];
var i = 0;

router.post('/', function(req,res){

    iparray.push(req.body); 
    console.log(iparray);
    res.json(req.body);

});



module.exports = router; 