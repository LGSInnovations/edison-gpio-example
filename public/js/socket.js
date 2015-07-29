var socket = io.connect();

socket.on('connect', function() {
    console.log("I've connected!")
});

socket.on("btnPressed", function(data) {
    // Log the data I received
    console.log(data);
    
    var index = getIndexByGPIO(data.gpio);
    var pin = _pins[index];
    pin.toggle(data);
});

function getIndexByGPIO(gpio) {
    for (var i=0; i<_pins.length; i++) {
        if (gpio === _pins[i].getGPIO()) {
            return i;
        }
    }
    return -1;
}