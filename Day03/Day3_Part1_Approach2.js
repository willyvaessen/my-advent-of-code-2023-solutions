//  First get the input:
const fs = require('fs');
// const INPUT = fs.readFileSync('./Day3_Input', 'utf-8').split('\n');
const INPUT = fs.readFileSync('./Day3_Input_Example', 'utf-8').split('\n');
const SYMBOLS = ['-', '%', '+', '=', '*', '/', '$', '&', '#', '@']
//  I'll use the following regular expression, to discover all numbers in the INPUT file.
const NUMBERS_REGEX = /\b\d{1,3}\b/g;
// console.log(INPUT);
const coords = [];
const adjacentValues = [];
const adjacentCells = {}
//  The results will be stored in an array
//  I will use the function getNumbers for that.
function getNumbers(input) {
    const matchedNumbers = []
    let characterToCheck = '';
    let number = '';
    for (let i = 0; i < input.length; i++) {
        let numberMatch = input[i].match(NUMBERS_REGEX);
        console.log(`Line: ${i}, numbers ${numberMatch}`);
        if (numberMatch !== null) {
            for (let r = 0; r < numberMatch.length; r++) {
                let value = numberMatch[r];
                // console.log(`Value at index ${r}: ${value}`)
                // console.log(input[i].indexOf(value))
                let startCoord = i + 'x' + input[i].indexOf(value);
                let endCoord = i + 'x' + (input[i].indexOf(value) + value.length -1);
                // console.log(startCoord);
                // console.log(endCoord);
                coords.push({value, startCoord, endCoord});
            }
        } else {
            console.log("No numbers found on this line.");
        }


        // for (let j = 0; j < input[i].length; j++){
        //     characterToCheck = input[i][j];
        //     console.log(`Checking character ${characterToCheck}`);
        //     if (characterToCheck === '.') {
        //         console.log(`It's a dot`);
        //     } else if (parseInt(characterToCheck)) {
        //         console.log(`It's a digit.`)
        //         number += characterToCheck;
        //         console.log(number);
        //     } else {
        //         console.log(`It's not a dot and not a digit.`)
        //         console.log(characterToCheck);
        //     }
        // }

    }
}
function writeArrayToFile(array){
    const fs = require('fs');
    const dataToWrite = array;
    const outputPath = './Day3_Output_1';
    // Convert the array to a string (you can customize this based on your data structure)
const dataString = dataToWrite.map(item => JSON.stringify(item)).join('\n');

// Write the string to a file
fs.writeFileSync(outputPath, dataString);

console.log(`Data written to ${outputPath}`);
}
getNumbers(INPUT);
console.log(coords);
writeArrayToFile(coords);