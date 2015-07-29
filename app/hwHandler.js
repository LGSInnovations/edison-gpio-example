var m = require('mraa');

var _map = [
    { mraa: 31, gpio:44 },
    { mraa: 45, gpio:45 },
    { mraa: 32, gpio:46 },
    { mraa: 46, gpio:47 },
    { mraa: 33, gpio:48 },
    { mraa: 47, gpio:49 },
    { mraa: 48, gpio:15 }
];

var _config = [
    { mraa:31, direction: m.DIR_OUT },
    { mraa:45, direction: m.DIR_OUT },
    { mraa:32, direction: m.DIR_OUT },
    { mraa:46, direction: m.DIR_OUT },
    { mraa:33, direction: m.DIR_OUT },
    { mraa:47, direction: m.DIR_OUT },
    { mraa:48, direction: m.DIR_IN }
];

var _states = [
    { gpio:44, value:false },
    { gpio:45, value:false },
    { gpio:46, value:false },
    { gpio:47, value:false },
    { gpio:48, value:false },
    { gpio:49, value:false },
    { gpio:15, value:false }
];

var _gpios = {};

// ----------------------------------------------------------
// Public Methods
// ----------------------------------------------------------

hwHandler = {
    initStates: function() {
        try {
            for(var i = 0; i < _config.length; i++){
                var pin = new m.Gpio(_config[i].mraa);
                pin.dir(_config[i].direction);

                var gpio = pinMap(_config[i].mraa);

                _gpios[gpio] = pin;
                setState(gpio, _gpios[gpio].read());
            }
        } catch (ex) {
            console.error("This system does not support mraa");
        }
    },

    getStates: function() {
        return _states;
    }
};

// ----------------------------------------------------------
// Private Methods
// ----------------------------------------------------------

function getIndexByGPIO(gpio) {
    for (var i=0; i<_states.length; i++) {
        if (gpio === _states[i].gpio) {
            return i;
        }
    }
    return -1;
}

function setState(gpio, value) {
    var index = getIndexByGPIO(gpio);
    _states[index].value = value;
}

function pinMap(mraa){
    for (var i = 0; i < _map.length; i++) {
        if (mraa === _map[i].mraa) {
            return _map[i].gpio;
        }
    }
    return -1;
}

// ----------------------------------------------------------

module.exports = hwHandler;