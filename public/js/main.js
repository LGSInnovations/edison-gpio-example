var API_GPIO = "/api/gpio/";
var _pins = [];

$(document).ready(function() {
    // Initialize the GUI board with the current state of the HW
    initBoard();
});

// 
function initBoard() {
    // when the AJAX request gets back, setup the board
    // using the `_states`variable on the backend 
    var setupBoard = function(result) {
        for(var i = 0; i < result.length; i++){
            var gpio = result[i].gpio;
            var value = result[i].value;
            var pin = new Pin(gpio, value);

            // store the pin for later use.
            _pins.push(pin);

            // attach a click listener that will call the
            // toggle() method of the specific pin
            $("#btn" + gpio).click(pin.toggle);
        }
    };

    // Get list of current GPIO states
    $.ajax({
        url: API_GPIO, 
        type: 'GET',
        success: setupBoard
    });
}