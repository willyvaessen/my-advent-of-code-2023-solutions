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

// const DIGIT_REGEX = new RegExp(`\\b(${DIGITS.join('|')})\\b`, 'gi');
const DIGIT_REGEX = new RegExp(`${DIGITS.join('|')}`, 'i');

console.log(DIGIT_REGEX);

let stringToTest = '';

function cleanString(stringToClean) {
    // console.log(stringToTest);
    // console.log(DIGIT_REGEX.test(stringToTest));
    // console.log(stringToTest.match(DIGIT_REGEX));
    let match = stringToTest.match(DIGIT_REGEX);


    let matchIndex = stringToTest.indexOf(match[0]);


    // console.log("First match is: " + match + ". It starts at index " + matchIndex + ". The length is " + match[0].length);
    let first = stringToTest.slice(0, matchIndex);
    let stringToReplace = stringToTest.slice(matchIndex, matchIndex + match[0].length);
    let last = stringToTest.slice(matchIndex + match[0].length, stringToTest.length);
    // console.log("----------")
    // console.log(first, stringToReplace, last);
    let newString = first + DIGIT_REPLACEMENTS[match] + last;
    // console.log(newString);
    return stringToTest = newString;
    // console.log(stringToTest);
}

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
            console.log("First digit is: " + firstDigit);
            console.log("Last digit is: " + lastDigit);
        }
        calibrationValue = firstDigit.toString() + lastDigit.toString();
        // console.log("Calibration Value is " + calibrationValue);
        sumCalibrationValues += parseInt(calibrationValue);
    }
    return sumCalibrationValues;
}

for (let i = 0; i < INPUT.length; i++) {
    stringToTest = INPUT[i];
    while (DIGIT_REGEX.test(stringToTest)) {
        let cleanedString = cleanString(stringToTest);
        // console.log(cleanedString);
        if (!DIGIT_REGEX.test(stringToTest)) {
            cleanStrings.push(cleanedString);
        }

    }
    // console.log(cleanStrings);
}

console.log(cleanStrings);
const conten = cleanStrings.join('\n');
fs.writeFileSync('./cleanStrings.txt', conten);

// console.log(getCalibrationValues(cleanStrings));

// const digitMatches = [...'two1nine'.matchAll(DIGIT_REGEX)];
// console.log(digitMatches.map(match => match[0]));