var express     = require('express');
var router      = express.Router();

var hwHandler	= require('../hwHandler');

// get current state of gpio
router.get('/gpio', function (req, res) {
    res.json(hwHandler.getStates());

});

//set current state of individual gpio
router.post('/gpio/:gpio', function (req, res) {
    var gpio = parseInt(req.params.gpio);

    hwHandler.toggle(gpio);

    res.json(hwHandler.getState(gpio));

});

module.exports = router;