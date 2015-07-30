var m      = require('mraa');

var socket = require('./socket');

// MRAA has different pin numbers than the GPIO block.
var _map = [
    { mraa: 31, gpio:44 },
    { mraa: 45, gpio:45 },
    { mraa: 32, gpio:46 },
    { mraa: 46, gpio:47 },
    { mraa: 33, gpio:48 },
    { mraa: 47, gpio:49 },
    { mraa: 48, gpio:15 }
];

// Setup which MRAA pins and their direction
var _config = [
    { mraa:31, direction: m.DIR_OUT },
    { mraa:45, direction: m.DIR_OUT },
    { mraa:32, direction: m.DIR_OUT },
    { mraa:46, direction: m.DIR_OUT },
    { mraa:33, direction: m.DIR_OUT },
    { mraa:47, direction: m.DIR_OUT },
    { mraa:48, direction: m.DIR_IN }
];


// Hold the current state of the hardware for
// the life of the Node server, across clients.
var _states = [
    { gpio:44, value:false },
    { gpio:45, value:false },
    { gpio:46, value:false },
    { gpio:47, value:false },
    { gpio:48, value:false },
    { gpio:49, value:false },
    { gpio:15, value:false }
];

// An object of MRAA pin objects, indexed using the
// GPIO pin number allowing easy access.
var _gpios = {};

// ----------------------------------------------------------
// Public Methods
// ----------------------------------------------------------

hwHandler = {
    initStates: function() {
        // Loop through _config to initialize the appropriate
        // pins. Add pins to _gpios indexed with GPIO number.
        try {
            for(var i = 0; i < _config.length; i++) {
                var pin = new m.Gpio(_config[i].mraa);
                var gpio = pinMap(_config[i].mraa);

                if (_config[i].direction === m.DIR_IN) {
                    // If a button, set up an ISR for that
                    // particular button
                    pin.isr(m.EDGE_BOTH, isr(gpio));
                } else {
                    pin.dir(_config[i].direction);
                }

                _gpios[gpio] = pin;

                // Decode 1:0 to true:false and save in _states
                var bool = (_gpios[gpio].read()) ? true : false;
                setState(gpio, bool);

                
            }
        } catch (ex) {
            // An exception is thrown if running app off Edison
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

    toggle: function(gpio) {
        var index = getIndexByGPIO(gpio);
        var value = !_states[index].value;  // negate current val
        var bit = (value) ? 1 : 0;          // encode to binary

        // Toggle LED in hardware
        _gpios[gpio].write(bit);

        // save in _states
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
        var oldValue = _gpios[gpio].read();

        // debounce the button
        setTimeout(function() {
            var value = _gpios[gpio].read();

            // if oldvalue is the same, this is
            // an actual button press.
            if (oldValue == value) {
                setState(gpio, value);
                socket.broadcast("btnPressed", hwHandler.getState(gpio));
            }
        }, 15); // <-- check input level again in 15ms
        
    };
}


// ----------------------------------------------------------

module.exports = hwHandler;