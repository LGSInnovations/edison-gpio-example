var express     = require('express');
var router      = express.Router();

var socket      = require('../socket');
var hwHandler	= require('../hwHandler');

// get current state of gpio
router.get('/gpio', function (req, res) {
    res.json(hwHandler.getStates());
});

//set current state of individual gpio
router.post('/gpio/:gpio', function (req, res) {
    var gpio = parseInt(req.params.gpio);

    hwHandler.toggle(gpio);

    socket.broadcast("ledPressed", hwHandler.getState(gpio));
    // send back the current state so the frontend
    // can make it the LED look pretty
    res.json(hwHandler.getState(gpio));
});

module.exports = router;