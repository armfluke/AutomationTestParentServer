var express = require('express');
var request = require('request');
var ipgetter = require('./init.js');
var doneips = require('./submitres.js');
var router = express.Router();
var ips = [];
var ipsrunning = [];
var idles = [];
var errors = [];
var completed = [];

var getrunip = function getrun() {
    return ipsrunning;
}

idles = ipgetter.getidle();
completed = doneips.getdone();

router.get('/executeall', function (req, res, next) {
    res.send({ status: "OK" });
    var name = req.query.name;
    var url = req.query.url;
    var test = req.query.test;
    var c = 0;
    ips = ipgetter.get();
    ipsrunning.push('000.000.000.000:3000');

    while (c < ips.length) {
        var childurl = 'http://' + ips[c].ip + '/test'
        console.log(childurl);
        console.log('value of c here: ', c);
        console.log(ipsrunning.length);
        for (var w = 0; w < ipsrunning.length; w++) {
            console.log('value of c here22, ', c);
            console.log(ipsrunning[w]);
            console.log(ips[c].ip);
            if (ips[c].ip !== ipsrunning[w]) {
                request(childurl, { json: { name: name, url: url, test: test } }, function (error, response, body) {
                    console.log('error:', error); // Print the error if one occurred
                    if (error) {
                        for (var i = 0; i < ips.length; i++) {
                            if (ips[i].ip == error.address + ':' + error.port) {
                                ips.pop(i);
                                idles.pop(i);
                                errors.push(ips[i].ip);
                                i--;
                                break;
                            }
                        }
                        c--;
                        console.log("Remove " + error.address + ":" + error.port + " from ips");
                    }
                    console.log('value of c here3, ', c);
                    if (response.statusCode == 200) {
                        ipsrunning.push(ips[c].ip);
                        ips.pop(c); //keep the ips array as a reference - invariant 
                        idles.pop(c);
                        c--;
                    } else if (response.statusCode == 500 || response.statusCode == 404) { // or any other response code pertaining to an error
                        console.log('value of c:', c);
                        errors.push(ips[c].ip);
                        ips.pop(c);
                        idles.pop(c);
                        c--;
                    }
                    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
                    console.log('body:', body);
                    console.log('***********');
                })
            }
        }
        console.log('value of c at the end: ', c);
        c++;
    }
});

router.get('/', function (req, res, next) {
    res.send({ status: "OK" });
    var name = req.query.name;
    var url = req.query.url;
    var test = req.query.test;
    var machID = req.query.id; // array of machine ID's
    var c = 0;
    ips = ipgetter.get();
    ipsrunning.push('0.0.0.0');

    while (c < ips.length) {
        var childurl = 'http://' + ips[c].ip + '/test'
        console.log(childurl);
        for (let d = 0; d < machID.length; d++) {
            console.log(0);
            console.log(machID.length);
            console.log(machID);
            console.log(machID[d]);
            if (ips[c].id == machID[d]) {
                console.log(1);

                if (ipsrunning.includes(ips[c].ip)) {
                    console.log(ips[c].ip + ' is running')
                    return;
                }
                request(childurl, { json: { name: name, url: url, test: test } }, function (error, response, body) {
                    console.log('error:', error); // Print the error if one occurred
                    if (error) {
                        for (let i = 0; i < ips.length; i++) {
                            if (ips[i].ip == error.address + ':' + error.port) {
                                errors.push(ips[i].ip);
                                ips.pop(i);
                                idles.pop(i);
                                i--;
                                break; // ? 
                            }
                        }
                        c--;
                        console.log("Remove " + error.address + ":" + error.port + " from ips");
                    }
                    if (response.statusCode == 200) {
                        ipsrunning.push(ips[c].ip);
                        ips.pop(c);
                        idles.pop(c);
                        c--;
                    } else if (response.statusCode == 500 || response.statusCode == 404) { // or any other response code pertaining to an error
                        errors.push(ips[c].ip);
                        ips.pop(c);
                        idles.pop(c);
                        c--;
                    }
                    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
                    console.log('body:', body);
                    console.log('***********');
                })
            }
        }
        c++;
    }
});

router.get('/:ip', function (req, res, next) {
    res.send({ status: "OK" });
    var ip = req.params.ip;
    var name = req.query.name;
    var url = req.query.url;
    var childurl = 'http://' + ip + '/test'
    console.log(childurl);
    request(childurl, { json: { name: name, url: url } }, function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
        console.log('body:', body);
        console.log('***********');
    })

});

router.get('/getstatus', function (req, res, next) {
    // now we have ips running, ips error, ips idle.. just need IPs finished // 
    console.log(completed);
    console.log(idles);
    console.log(errors);
    console.log(ipsrunning);

    let result = {
        complete: completed,
        idle: idles,
        error: errors,
        running: ipsrunning
    }

    res.send(result)

})

module.exports.router = router;
module.exports.getrunip = getrunip;