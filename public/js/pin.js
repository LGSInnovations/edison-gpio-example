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

        if(data){
            sendRequest(onSuccess);
        } else {
            onSuccess(data);
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
    handlePinState(_value);
};