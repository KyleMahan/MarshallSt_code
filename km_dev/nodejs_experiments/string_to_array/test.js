//js code to change a text string to an array

//Set the test string
var test_string = "GPIO_Pin, 2, GPIO_Value, 0"

//Print the test string
console.log(test_string)

var split_string = test_string.split(", ")
console.log(split_string)

split_string[1] = Number(split_string[1])
split_string[3] = Number(split_string[3])
console.log(split_string)