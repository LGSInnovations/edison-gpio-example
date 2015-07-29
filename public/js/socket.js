var socket = io.connect();

socket.on('connect', function() {
    console.log("I've connected!")
});

socket.on("some event", function(data) {
    // Log the data I received
    console.log(data);
 
    // Send a message to the server
    socket.emit("other event", {some: "data"});
});