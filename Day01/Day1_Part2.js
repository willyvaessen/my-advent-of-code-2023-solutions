const fs = require('fs');
// const INPUT = fs.readFileSync('./Day1_Input', 'utf-8').split('\n');
const INPUT = fs.readFileSync('./Day1_Part2_Input_Example', 'utf-8').split('\n');

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

console.log(DIGIT_REGEX);

let stringToTest = '';
stringToTest = 'kkeightwo14'

function cleanString(stringToClean) {
    // console.log(stringToTest);
    // console.log(DIGIT_REGEX.test(stringToTest));
    // console.log(stringToTest.match(DIGIT_REGEX));
    let match = stringToTest.match(DIGIT_REGEX);
    console.log("Match found: " + match)
    let matchIndex = stringToTest.indexOf(match[0]);

    // console.log("First match is: " + match + ". It starts at index " + matchIndex + ". The length is " + match[0].length);
    let first = stringToTest.slice(0, matchIndex);
    console.log("1. First part of string (until the found number is: " + first);
    let stringToReplace = stringToTest.slice(matchIndex, matchIndex + match[0].length);
    console.log("2. The word string to replace is: " + stringToReplace);


    let last = stringToTest.slice(matchIndex + match[0].length, stringToTest.length);
    console.log("3a. The rest of the string is: " + last);
    //  Since we know now that some strings share letters between two words, I'll have to take the last letter of the
    //  match into consideration as well.
    let rest = stringToTest.slice(matchIndex + match[0].length - 1, stringToTest.length);
    console.log("3b. Remaining string (including last letter of found word string is: " + rest)
    if (DIGIT_REGEX.test(rest) && rest.indexOf(rest.match(DIGIT_REGEX)[0]) === 0) {
        console.log("The first part of this remaining string matches a word string, so there was an overlap.");
        newString = first + DIGIT_REPLACEMENTS[match] + rest;
        console.log("New string so far is: " + newString);
        match = rest.match(DIGIT_REGEX);
        console.log(match);
        stringToReplace = rest.slice(0, rest.indexOf(match[0] + match[0].length) - 1);
        console.log("Next word string to replace is: " + stringToReplace);
        last = newString.slice(rest.indexOf(match[0] + match[0].length, rest.length));
        console.log("3c. Remaining part of the string is: " + last);
    } else {
        console.log("There was no overlap.")
        console.log("----------")
        console.log(first, stringToReplace, last);
        newString = first + DIGIT_REPLACEMENTS[match] + last;
        console.log(newString);
    }


    return stringToTest = newString;
    // console.log(stringToTest);
}

console.log(cleanString(stringToTest));     //  Testing the funtion with an "eightwo" sting


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
        // console.log("Calibration Value is " + calibrationValue);
        sumCalibrationValues += parseInt(calibrationValue);
    }
    return sumCalibrationValues;
}

// for (let i = 0; i < INPUT.length; i++) {        //  This loop eventually fills the cleanStrings array
//     stringToTest = INPUT[i];
//     while (DIGIT_REGEX.test(stringToTest)) {
//         let cleanedString = cleanString(stringToTest);
//         // console.log(cleanedString);
//         if (!DIGIT_REGEX.test(stringToTest)) {
//             cleanStrings.push(cleanedString);
//         }
//
//     }
//     // console.log(cleanStrings);
// }


// console.log(cleanStrings);
// console.log(getCalibrationValues(cleanStrings));

// const digitMatches = [...'two1nine'.matchAll(DIGIT_REGEX)];
// console.log(digitMatches.map(match => match[0]));