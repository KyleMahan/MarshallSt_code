//node.js test file
//going to use this to listen to commands from a website hosted on the RPi

const { exec } = require('child_process')

var message = "Test Message from Javascript"
var user = "kyle"

function sendMSG(user, message){
    //Command from https://medium.com/stackfame/how-to-run-shell-script-file-or-command-using-nodejs-b9f2455cb6b7
    exec('msg '+user+' '+message, (err, stdout, stderr) => {
        if (err) {
            //some err occurred
            console.error(err)
        } 
        else {
           // the *entire* stdout and stderr (buffered)
           console.log(`stdout: ${stdout}`);
           console.log(`stderr: ${stderr}`);
        }
    });
}

sendMSG(user, message);