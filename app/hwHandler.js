var m      = require('mraa');
var socket = require('./socket');

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
            for(var i = 0; i < _config.length; i++) {
                var pin = new m.Gpio(_config[i].mraa);
                var gpio = pinMap(_config[i].mraa);

                if (_config[i].direction === m.DIR_IN) {
                    pin.isr(m.EDGE_BOTH, isr(gpio));
                } else {
                    pin.dir(_config[i].direction);
                }

                _gpios[gpio] = pin;

                var bool = (_gpios[gpio].read()) ? true : false;
                setState(gpio, bool);

                
            }
        } catch (ex) {
            console.error("This system does not support mraa");
        }
    },

    getStates: function() {
        return _states;
    },

    getState: function(gpio) {
        var index = getIndexByGPIO(gpio);
        return _states[index];
    },

    toggle: function(gpio, noWrite) {
        var index = getIndexByGPIO(gpio);
        var value = !_states[index].value;
        var bit = (value) ? 1 : 0;
        if (!noWrite) _gpios[gpio].write(bit);
        setState(gpio, value);
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

function isr(gpio){
    return function() {
        hwHandler.toggle(gpio, true);
        socket.broadcast("btnPressed", hwHandler.getState(gpio));
    };
}


// ----------------------------------------------------------

module.exports = hwHandler;