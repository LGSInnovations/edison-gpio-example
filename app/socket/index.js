var _io;

module.exports.handle = function handle(io) {

    _io = io;

    io.sockets.on('connection', function(socket) {
        console.log("You've got a new connection!")
    });

};

module.exports.broadcast = function broadcast(event, message) {
    _io.sockets.emit(event, message);
}