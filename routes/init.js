var express = require('express');
var router = express.Router();

var iparray = [];
var idleip = [];
var i = 0;

var get = function getter(){
    return iparray; 
}

var getidle = function getidleip(){
    return idleip;
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
        idleip.push(incomingip);
        res.json(req.body);
    } else {
        res.send("IP address registered already");
    }
    console.log(iparray);
    console.log(idleip);
});
module.exports.get = get;
module.exports.router = router;
module.exports.getidle = getidle;