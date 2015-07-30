// A Pin object that will return a new pin on every invocation.
// Each obj keeps track of the pin state and controlls the UI.
var Pin = function Pin(gpio, value) {

    var API_GPIO = "/api/gpio/";

    var _gpio = gpio;
    var _value = value;
    var _led = $("#led" +  _gpio);
    var _button = $("#btn" + _gpio);

    // ------------------------------------------------------------------------
    // Public Methods
    // ------------------------------------------------------------------------

    this.toggle = function(data) {
        var onSuccess = function(data){
            handlePinState(data.value);
        };

        // If data is passed in, don't request more data from server,
        // just pass in the data directly to the onSuccess callback.
        if (data.gpio) {
            onSuccess(data);
        } else {
            sendRequest(onSuccess);
        }
        
    };

    this.getGPIO = function() { return _gpio; };

    // ------------------------------------------------------------------------
    // Helpers (private methods)
    // ------------------------------------------------------------------------

    function sendRequest(onSuccess){
        $.ajax({
            url: API_GPIO + _gpio, 
            type: 'POST',
            success: onSuccess
        });
    }

    function turnOn(ele){
        ele.addClass("on");
    }

    function turnOff(ele){
        ele.removeClass("on");
    }

    function handlePinState(on) {
        if(on){
            turnOn(_led);
            turnOn(_button);
            _button.html("on");
        } else {
            turnOff(_led);
            turnOff(_button);
            _button.html("off");
        }
    }
    handlePinState(_value);               // Initialize the UI on obj creation
};