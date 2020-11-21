// Messing around with arrays
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

//var x = 8;
//var new_val = 42;

function array_dimensions(test_array) {
    /*
    This block prints out the dimensions of the array.
    */
    // This block sends out the correct dimensions
    console.log('\nList the Dimensions of the test array');
    console.log('X Dimension = ' + test_array.length);
    console.log('Y Dimension = ' + test_array[0].length);
}

function list_array_individual(test_array){
    // This block correctly displays the array correctly
    var i;
    var j;
    console.log('\nList the contents of the test_array')
    for (i = 0; i < test_array.length; i++){
        for (j = 0; j < test_array[0].length; j++){
            console.log('['+i+','+j+'] = '+test_array[i][j]);
        }
    }
}

function replace_array_element(test_array, x, new_val){
    // Take the test array and replace an element with a new value
    var i;
    console.log('\nReplace a value in the test array')
    for (i = 0; i < test_array.length; i++){
        //Check to see if the correct index value is displayed
        if (test_array[i][0] == x) {
            //If the correct index value is found replace the value
            test_array[i][1] = new_val;
        }
    }  
    //Return the altered array
    return test_array
}

function list_array_dict(test_array){
    // Create a variable to iterate over
    var i;

    // Text header for the console
    console.log('\nArray Listed in Dict Format');

    // Sweep through the array
    for (i=0; i < test_array.length; i++){
        console.log(test_array[i]);
    }
}

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

array_dimensions(test_array);
list_array_dict(test_array);
test_array = replace_array_element_rpi(test_array, 0, 39, "Replace 1");
test_array = replace_array_element_rpi(test_array, 1, 21, "Replace 2");
list_array_dict(test_array);
test_array = replace_array_element_rpi(test_array, 2, 21, "Replace 2");