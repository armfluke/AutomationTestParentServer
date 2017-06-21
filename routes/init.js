var express = require('express');
var router = express.Router();

var iparray = [];
var i = 0;

var get = function getter(){
    return iparray; 
}

router.post('/', function(req,res){

    var incomingip = req.body.ip;
    var c = 0;
    var b = 0; 
    while(c < iparray.length){
        if (incomingip === iparray[c].ip){
            b = 1; 
        }
    c++; 
    }
    if (!b){
        iparray.push(req.body);
        res.json(req.body);
    } else {
        res.send("IP address registered already");
    }
    console.log(iparray);
});
module.exports.get = get;
module.exports.router = router;