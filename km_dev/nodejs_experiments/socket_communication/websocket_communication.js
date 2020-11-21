// Node.js websocket server
const http = require('http');
const { connect } = require('http2');
const WebSocketServer = require('websocket').server;

const server = http.createServer();

// Have the server listen on port 8080
server.listen(8080)

const wsServer = new WebSocketServer({
    httpServer: server
});

wsServer.on('request', function(request){
    const connection = request.accept(null, request.origin);
    var button_press_count = 0
    
    connection.on('message', function(message){
        // console.log('Recieved Message:', message.utf8Data);
        // This message is sent to the website console. Check console tab under F12
        // connection.sendUTF('Ack: Hi this is Websocket server');

        // If message says that something has connected display the following message
        if(message.utf8Data == 'WebSocket Client Connected'){
            // Print a message in the console that says a client has connected
            console.log('Client Connected');
            // Send a message to the client saying that it has connected
            connection.sendUTF('Hello you have connected to the node js server.')
        };

        // If the message says that the button has been pressed increment the button counter
        if(message.utf8Data == 'Button Pressed'){
            // Add 1 to the button pressed variable
            button_press_count += 1;
            // Print a message in the console that says how many times the button has been pressed
            console.log('Button Pressed '+button_press_count+' Times');
        };

        // If the message says that the button has been reset, reset the counter
        if(message.utf8Data == 'Button Reset'){
            // Add 1 to the button pressed variable
            button_press_count = 0;
            // Print a message in the console that says how many times the button has been pressed
            console.log('Button Reset');
        };
    });

    connection.on('close', function(reasonCode, description){
        console.log('Client has disconnected')
    });
})