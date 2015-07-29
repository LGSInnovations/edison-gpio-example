module.exports = function socket(io) {

    io.sockets.on('connection', function(socket) {
        console.log("You've got a new connection!")
    });
    
};