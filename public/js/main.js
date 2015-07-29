var API_GPIO = "/api/gpio/";
var _pins = [];

$(document).ready(function() {
    initBoard();
});

function initBoard() {
    var setupBoard = function(result) {
        for(var i = 0; i < result.length; i++){
            var gpio = result[i].gpio;
            var value = result[i].value;
            var pin = new Pin(gpio, value);
            _pins.push(pin);
            $("#btn" + gpio).click(pin.toggle);
        }
    };

//Get list of current GPIO states
    $.ajax({
        url: API_GPIO, 
        type: 'GET',
        success: setupBoard
    });
}