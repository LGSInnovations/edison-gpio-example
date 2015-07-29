var express     = require('express');
var router      = express.Router();   

var gpioStates  = [
	{ gpio:44, value:false },
	{ gpio:45, value:true },
	{ gpio:46, value:false },
	{ gpio:47, value:true },
	{ gpio:48, value:false },
	{ gpio:49, value:false },
	{ gpio:15, value:true }
];

// get current state of gpio
router.get('/gpio', function (req, res) {
    res.send(gpioStates);

});

//set current state of individual gpio
router.post('/gpio/:gpio', function (req, res) {
    var gpio = req.params.gpio;
    res.json({gpio:gpio, value:true});

});

module.exports = router;