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

    hwHandler.setState(gpio, true);

    res.json(hwHandler.getStates());

});

module.exports = router;