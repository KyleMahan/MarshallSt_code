// This line would require the HTTP server
// This also creates a server with function handler()
var http = require('http').createServer(handler); 

// Require the filesystem module
var fs = require('fs');

// Require the socket.io module and pass the http object (server)
var io = require('socket.io')(http)

// Listen to port 8080 on the localhost
http.listen(8080);

// Create the server
function handler(req, res) {
    // Read the file intex.html in the public folder
    fs.readFile(__dirname + '/public/index.html', function (err, data){
        // If the page errors out display an error message
        if (err){
            res.writeHead(404, {'Content-Type': 'text/html'}); // Display the error message
            return res.end("404 Not Found")
        }

        // If the page does not error out display the index.html content
        res.writeHead(200, {'Content-Type': 'text/html'}); // Write the HTML
        res.write(data); // Actually write the data from index.html
        return res.end();
    }
    );
}

// Create the WebSocket Connection
io.sockets.on('connection', function(socket) {
    // Inside the function(socket)
    // Create a variable for the status of the button
    var button_status = 0;
    console.log('Starting button status')
    console.log(button_status)

    // Communicate with the client
    socket.on('checkbox_test', function(data) {
        // Get the status of the button from the client
        button_status = data;

        // Excecute this if statement anytime button_status returns something
        if (button_status) {
            // Display the status of the button in the console log
            console.log('Button Status Changed');
            console.log(button_status);
        }
    });

});