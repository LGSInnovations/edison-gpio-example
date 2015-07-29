var express     = require('express');
var router      = express.Router();   

var gpioStates  = [{pin:31, value:0}];

// get current state of gpio
router.get('/gpio', function (req, res) {
    res.send(gpioStates);

});

//set current state of individual pin
router.post('/gpio/:pin', function (req, res) {
    var pin = req.params.pin;
    res.send(pin);

});

module.exports = router;