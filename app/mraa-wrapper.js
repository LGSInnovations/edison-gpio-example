module.exports = (function() {
    try {
        return require('mraa');
    } catch (ex) {
        console.log('MRAA is not supported on this platform.');

        // create an object that has all the stuff we need
        return {
            DIR_OUT: 0,
            DIR_IN: 1,
            Gpio: function(pin) {
                this.dir = function(dir) { return 0; };
                this.read = function() { return 0; };
                this.write = function(bit) { return 0; };
                this.isr = function(mode, isr) { return 0; };
            }
        }
    }
    
})();