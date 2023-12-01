const fs = require('fs');
const INPUT = fs.readFileSync('./Day1_Input', 'utf-8').split('\n');
// const INPUT = fs.readFileSync('./Day1_Input_Example', 'utf-8').split('\n');
// console.log(INPUT);

/*
The newly-improved calibration document consists of lines of text;
each line originally contained a specific calibration value that the Elves now need to recover.
On each line, the calibration value can be found by combining the first digit and the last digit
(in that order) to form a single two-digit number.

For example:

1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet

In this example, the calibration values of these four lines are 12, 38, 15, and 77.
Adding these together produces 142.

Consider your entire calibration document. What is the sum of all the calibration values?
 */

//  So, what it comes down to, is to iterate through the input fle line by line.


// Then, iterate through each string, character by character
//  See if the character is a digit (numeric value) and store it in a temporary variable.
//  The on to the next character, assigning the last value to another temp variable.

let firstDigit = 0;
let firstDigitAssigned = false;
let lastDigit = 0;
let calibrationValue = '';

// let lastDigitAssigned = false;

//  Once we have the first and last digit, I need to concatenate them (so treat them as strings)
//  and then parse the result as an integer, to add its total to a variable.

let sumCalibrationValues = 0;

for (let i = 0; i < INPUT.length; i++) {
    let stringToProcess = INPUT[i];
    // console.log("String to process is: " + stringToProcess);
    firstDigit = 0;
    firstDigitAssigned = false;
    lastDigit = 0;
    for (let j = 0; j < stringToProcess.length; j++) {

        let characterToCheck = stringToProcess[j];
        // console.log("Now checking: '" + characterToCheck + "'");
        if (parseInt(characterToCheck)) {
            if (!firstDigitAssigned) {
                firstDigit = characterToCheck;
                firstDigitAssigned = true;
                lastDigit = characterToCheck;
            } else if (firstDigitAssigned) {
                lastDigit = characterToCheck;
            }
        }
        // console.log("First digit is: " + firstDigit);
    // console.log("Last digit is: " + lastDigit);
    }
    calibrationValue = firstDigit.toString()+lastDigit.toString();
    // console.log("Calibration Value is " + calibrationValue);
    sumCalibrationValues += parseInt(calibrationValue);
}

console.log("The sum of all Calibration Values is: " + sumCalibrationValues);
