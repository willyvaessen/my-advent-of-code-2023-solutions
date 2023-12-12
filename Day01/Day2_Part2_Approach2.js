const fs = require('fs');
const INPUT = fs.readFileSync('./Day1_Input', 'utf-8').split('\n');
// const INPUT = fs.readFileSync('./Day1_Part2_Input_Example', 'utf-8').split('\n');

const DIGITS = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const DIGIT_REPLACEMENTS = {
    'one': '1',
    'two': '2',
    'three': '3',
    'four': '4',
    'five': '5',
    'six': '6',
    'seven': '7',
    'eight': '8',
    'nine': '9'
}
const cleanStrings = [];
let sumCalibrationValues = 0;
let newString;
// const DIGIT_REGEX = new RegExp(`\\b(${DIGITS.join('|')})\\b`, 'gi');
const DIGIT_REGEX = new RegExp(`${DIGITS.join('|')}`, 'i');

//  I have the digits, a digits replacement object and my regular expression to test strings.
// console.log(DIGITS);
// console.log(DIGIT_REPLACEMENTS);
// console.log(DIGIT_REGEX);
// let stringToHandle1 = 'kkeightwo14';
// let stringToHandle2 = '7eight44';

function testString(string) {
    return DIGIT_REGEX.test(string);
}

// console.log(testString(stringToHandle1));


function matchNumber(string) {
    return string.match(DIGIT_REGEX);
}

function checkRemainingString(string) {
    // console.log("----------------------------------------")
    // console.log("The remaining string is " + string +". If at index 0 is a match with one of the numbers to replace, there is an overlap.")
    //  If the first part of this string matches with one of the numbers, the string will be returned as the rest.
    if (testString(string)) {
        // console.log(matchNumber(string));
        return string;

    } else {
        // console.log("There is no match, so no overlap.");
        return string.slice(1, string.length);
    }


}

// console.log("----------------------------------------")
// console.log("Matched string is: " + matchNumber(stringToHandle1))


function getCalibrationValues(string) {
    let firstDigit = 0;
    let firstDigitAssigned = false;
    let lastDigit = 0;
    let calibrationValue = '';

    for (let i = 0; i < string.length; i++) {
        let stringToProcess = string[i];
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
        calibrationValue = firstDigit.toString() + lastDigit.toString();
        console.log("Calibration Value is " + calibrationValue);
        sumCalibrationValues += parseInt(calibrationValue);
    }
    return sumCalibrationValues;
}


console.log("----------------------------------------")
console.log("----------------------------------------")

// console.log(stringToHandle);

function loopAndReplace(stringToHandle) {
    // stringToHandle = stringToHandle1;

    function replaceNumberString(string, match) {
        // console.log("String in which to replace a number: " + string + ". This string has a length of " + string.length);

        let matchIndex = string.indexOf(match);
        let first = string.slice(0, matchIndex);
        let rest = checkRemainingString(string.slice((matchIndex + match[0].length - 1), string.length));
        // console.log("First part of the string (up until the match) is " + first);
        // console.log("Number to replace: " + match + ". This has a length of: " + match[0].length);
        // console.log("The index of the word to replace is: " + matchIndex);
        // console.log("Rest of the string is: " + rest);
        // console.log("The New String will be: " + newString);
        return first + DIGIT_REPLACEMENTS[match] + rest;
    }


    while (testString(stringToHandle)) {
        // console.log("1. " + testString(stringToHandle));
        replaceNumberString(stringToHandle, matchNumber(stringToHandle));
        stringToHandle = replaceNumberString(stringToHandle, matchNumber(stringToHandle));
        // console.log("The new string to work with is: " + stringToHandle);
    }

    return stringToHandle;
}


for (let i = 0; i < INPUT.length; i++) {
    let stringToHandle = INPUT[i];
    cleanStrings.push(loopAndReplace(INPUT[i]));
}

console.log(cleanStrings);

writeToFile(cleanStrings, './cleanStrings.txt');

function writeToFile(input, output) {
    const content = input.join('\n');

// Specify the file path
// Write the content to the file
fs.writeFileSync(output, content);

console.log('File written successfully.');
}
