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

// Initialize the array to track the status of the RPI GPIO Pins
var test_array = [
    // Arrays have the following format
    // [Pin Number, Net Name, GPIO Number, GPIO Value ]
    [1, "3V3 Power", "N/A", "N/A"],
    [2, "5V Power",  "N/A", "N/A"],
    [3,"SDA", 2, 0],
    [4, "5V Power", "N/A", "N/A"],
    [5,  "SCL", 3, 0],
    [6, "GND", "N/A", "N/A"],
    [7, "GPCLK0", 4,  0],
    [8, "TXD", 4, 0],
    [9, "GND", "N/A", "N/A"],
    [10, "RXD", 15, 0],
    [11, "N/A", 17, 0],
    [12, "PCM_CLK", 18, 0],
    [13, "N/A", 27, 0],
    [14, "GND", "N/A", "N/A"],
    [15, "N/A", 22, 0],
    [16, "N/A", 23, 0],
    [17, "3V3 Power", "N/A", "N/A"],
    [18, "N/A", 24, 0],
    [19, "MOSI", 10, 0],
    [20, "GND", "N/A", "N/A"],
    [21, "MISO", 9, 0],
    [22, "N/A", 25, 0],
    [23, "SCLK", 11, 0],
    [24, "CE0", 8, 0],
    [25, "GND", "N/A", "N/A"],
    [26, "CE1", 7, 0],
    [27, "ID_SD", 0, 0],
    [28, "ID_SC", 1, 0],
    [29, "N/A", 5, 0],
    [30, "GND", "N/A", "N/A"],
    [31, "N/A", 6, 0],
    [32, "PWM0", 12, 0],
    [33, "PWM1", 13, 0],
    [34, "GND", "N/A", "N/A"],
    [35, "PCM_FS", 19, 0],
    [36, "N/A", 16, 0],
    [37, "N/A", 26, 0],
    [38, "PCM_DIN", 20, 0],
    [39, "GND", "N/A", "N/A"],
    [40, "PCM_DOUT", 21, 0] 
];

/*
The following functions preform operations on the array
*/
// Return the dimensions of the array
function array_dimensions(test_array) {
    /*
    This block prints out the dimensions of the array.
    */
    // This block sends out the correct dimensions
    console.log('\nList the Dimensions of the test array');
    console.log('X Dimension = ' + test_array.length);
    console.log('Y Dimension = ' + test_array[0].length);
}

//Replace an emelent in the array
function replace_array_element_rpi(test_array, index_off, index_val, new_val){
    /*
    This works
    Take the array and replace an element in it based off of the pin value or GPIO address.
    To index off of pin number index = 0
    To index off of GPIO number index = 1
    */

    // Create a variable to sweep over
    var i;

    // Text header for the console
    console.log('\nReplace an array element');

    // Sweep through the array
    for (i=0; i < test_array.length; i++){
        // Operation for if it is indexing off of the pin number
        // index = 0

        // Debug statments
        /*
        console.log('Test array value: ' + test_array[i]);
        console.log('Index off stated value: ' + index_off);
        console.log('Index off array value: ' + test_array[i][0]);
        console.log('Index off array value: ' + test_array[i][2]);
        */

        if (index_off == 0){
            // Check to see if the current value in the array is the one specified
            if (test_array[i][0] == index_val) {
                // If it is on the correct index preform the following operation
                test_array[i][3] = new_val;

                // Debug text
                //console.log("Replaced Element");
            }
        }

        // Operation for if it is indexing off of the GPIO number
        // index = 1
        else if (index_off == 1){
            // Check to see if the current value in the array is the one specified
            if (test_array[i][2] == index_val) {
                // If it is on the correct index preform the following operation
                test_array[i][3] = new_val;

                // Debug Text
                //console.log("Replaced Element");
            }
        }

        // If the index value is incorrect return an error message
        else {
            // Error out if the index value is wrong
            throw "Index value of " + index_off + " is wrong, needs to be 0 or 1."
        }
    }

    // Return the test_array so that it can be used
    return test_array;
}

/*
All of the communication with the webpage happens in this block of text.
Everything is just text string messages between the website and server.
*/
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