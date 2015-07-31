var socket = io.connect();

socket.on('connect', function() {
    console.log("I've connected!")
});

var socketHandler = function(data){
    console.log(data);
    
    var index = getIndexByGPIO(data.gpio);
    var pin = _pins[index];
    pin.toggle(data);
};

socket.on("btnPressed", socketHandler);

socket.on("ledPressed", socketHandler);


function getIndexByGPIO(gpio) {
    for (var i=0; i<_pins.length; i++) {
        if (gpio === _pins[i].getGPIO()) {
            return i;
        }
    }
    return -1;
}

