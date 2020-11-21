/*
Website side javascript that will communicate with the nodejs webserver
*/

// Set the address of the websocket connection
// This points it at the local host on port 8080
const ws = new WebSocket('ws://localhost:8080/');

// Websocket open message
ws.onopen = function(){
    // This posts a message to the web browser console. Can be found by hitting F12
    console.log('Websocket Client Connected');

    // This sends messages to the node.js server
    ws.send('WebSocket Client Connected')
    ws.send('Hi this is the web client.');
};

/*
This code will decide what happens when the website gets a message from the server.
Needs to parse the message and use it to update the graphics
*/
ws.onmessage = function(e){
    // Display the recieved data in the website console
    console.log("Received: '" + e.data + "'")

    // See if the recieved text matches any preset messages

    if(e.data == ""){

    }
};

/*
The following code will modify aspects of the website based off of messages from the server
*/
function update_button_color(pin_number){
    
};


// Send a message to the node js server
// This works
function msg_nodejs(){
    ws.send('Button Pressed')
};

function rst_msg_nodejs(){
    ws.send('Button Reset')
};