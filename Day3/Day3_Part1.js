//  First get the input:
const fs = require('fs');
const INPUT = fs.readFileSync('./Day3_Input', 'utf-8').split('\n');
// const INPUT = fs.readFileSync('./Day3_Input_Example', 'utf-8').split('\n');
const SYMBOLS = ['-', '%', '+', '=', '*', '/', '$', '&', '#', '@']
//  I'll use the following regular expression, to discover all numbers in the INPUT file.
const NUMBERS_REGEX = /\b\d{1,4}\b/g;
// console.log(INPUT);
const coords = [];
const adjacentValues = [];
const adjacentCells = {}
//  The results will be stored in an array
//  I will use the function getNumbers for that.
function getNumbers(input) {
    const matchedNumbers = []
    for (let i = 0; i < input.length; i++) {
        let matches = input[i].match(NUMBERS_REGEX);
        // for (let j = 0; j < input[i].length; j++) {
        //     console.log(input[i][j]);
        // }
        // console.log(matches);
        matchedNumbers.push(matches)

    }
    return matchedNumbers;
}

function getNumberIndex(matchedNumbers, INPUT) {
    for (let i = 0; i < matchedNumbers.length; i++) {
        if (matchedNumbers[i] === null) {

        } else {
            for (let j = 0; j < matchedNumbers[i].length; j++) {
                // console.log("------------------------------");
                // console.log(`*** Checking -> ${matchedNumbers[i][j]} <- ***`);
                // console.log("Number: " + matchedNumbers[i][j] + " from matchedNumbers");

                let lineNumber = i;
                let partNumber = matchedNumbers[i][j];

                let partNumberStart = INPUT[i].indexOf(matchedNumbers[i][j]);
                let partNumberLength = matchedNumbers[i][j].length
                let partNumberEnd = (partNumberStart + partNumberLength - 1);

                // console.log("Number: " + INPUT[lineNumber][partNumberStart] + " from INPUT")
                // console.log("Partnumber is " + partNumber);
                // console.log("Line: " + lineNumber);
                // console.log("Start:     " + partNumberStart);
                // console.log("Length:    " + partNumberLength);
                // console.log("End:       " + (partNumberStart + partNumberLength -1) );

                let numberStart = lineNumber + "x" + partNumberStart;
                let numberEnd = lineNumber + "x" + partNumberEnd;
                // console.log(`Start Coordinate is ${numberStart} and End Coordinate is ${numberEnd}`)
                //
                // console.log(`This numbers is at line ${lineNumber} and position ${partNumberStart} and has a length of ${partNumberLength}`);
                // console.log(`*** End Checking -> ${matchedNumbers[i][j]} <- ***`);
                // console.log("------------------------------");
                // console.log("");
                coords.push({partNumber, numberStart, numberEnd})

            }
        }
    }
}

//  Function to check adjacent positions
function checkNeighbors(coords) {
    let neighbors = [];
    const rowMin = 0;
    const colMin = 0;
    const rowMax = INPUT.length - 1;
    const colMax = INPUT[rowMax].length - 1;
    let row = 0;
    let col = 0;
    // console.log(coords);
    // console.log(coords.length)
    // console.log(INPUT)
    for (let i = 0; i < coords.length; i++) {
        let partNumber = parseInt(coords[i].partNumber);
        let partLine = parseInt(coords[i].numberStart.split('x')[0]);
        let colStart = parseInt(coords[i].numberStart.split('x')[1]);
        let colEnd = parseInt(coords[i].numberEnd.split('x')[1]);
        // console.log("|--------------------------------------|")
        // console.log(`|-- Start finding neighbors for ${coords[i].partNumber} ---|`);
        neighbors = [];
        // console.log(`PartNumber ${partNumber}`)
        // console.log(`Line ${partLine}`);
        // console.log(`Starts at column ${colStart} and ends at column ${colEnd}`);
        // console.log(`Highest possible line is ${rowMax} and highest possible column is ${colMax}`);
        //  Start checking horizontally
        //  Left side first

        //  Check left
        // console.log("--- Checking left ---")
        if (colStart === colMin) {
            // console.log(`Part ${partNumber} has no possible neighbors on the left side.`)
        } else {

            // console.log(`On the same line: ${INPUT[partLine][colStart - 1]}`)
            neighbors.push(INPUT[partLine][colStart - 1]);
        }

        // console.log("--- Checking right ---")

        if (colEnd === colMax) {
            // console.log(`Part ${partNumber} has no possible neighbors on the right side.`)
        } else {

            // console.log(`On the same line: ${INPUT[partLine][colEnd + 1]}`)
            neighbors.push(INPUT[partLine][colEnd + 1]);
        }

        // console.log("--- Checking above ---")

        if (partLine === rowMin) {
            // console.log(`Part ${partNumber} has no possible neighbors above.`);
        } else {
            for (let i = colStart - 1; i <= colEnd + 1; i++) {
                if (i >= 0 && i <= colMax) {
                    let currentValue = INPUT[partLine - 1][i];
                    // console.log(currentValue);
                    neighbors.push(currentValue);
                }
            }
        }

        // console.log("--- Checking below ---")

        if (partLine === rowMax) {
            // console.log(`Part ${partNumber} has no possible neighbors below.`);
        } else {
            for (let i = colStart - 1; i <= colEnd + 1; i++) {
                if (i >= 0 && i <= colMax) {
                    let currentValue = INPUT[partLine + 1][i];
                    // console.log(currentValue);
                    neighbors.push(currentValue);
                }
            }
        }
        // console.log(`|---- End finding neighbors for ${coords[i].partNumber} ---|`);
        // console.log(`${partNumber}`)
        // console.log(neighbors);
        adjacentValues.push(partNumber, neighbors);
        // console.log("|--------------------------------------|")
    }

}

const validParts = [];
const invalidParts = [];

// let matchedNumbers = INPUT[0].match(NUMBERS_REGEX);
// console.log(matchedNumbers);
// console.log("--- Handle getNumbers function ---");
const matchedNumbers = getNumbers(INPUT);
// console.log(matchedNumbers);

// console.log("--- Handle getNumberIndex function ---");
getNumberIndex(matchedNumbers, INPUT);

// console.log("--- Testing coordinates ---")
// console.log(INPUT[6][2], INPUT[6][3], INPUT[6][4]);
// console.log(INPUT[2][6],INPUT[2][7],INPUT[2][8])

// console.log("--- Checking the coordinates array ---")
// console.log(coords);

checkNeighbors(coords);

// console.log(adjacentValues);

for (let i = 0; i < adjacentValues.length; i+=2) {
    // let validPart = false
    // console.log(adjacentValues[i]);
    // console.log(adjacentValues[i+1]);
    const partNumber = adjacentValues[i];
    const neighbors = adjacentValues[i + 1];
    // console.log(neighbors);
    // console.log(`Checking neighbors for part ${partNumber}:`)
    for (let j = 0; j < neighbors.length; j++) {
        // console.log(validPart);
        // console.log(neighbors[j]);
        if (SYMBOLS.includes(neighbors[j])){
            // validPart = true;
            validParts.push(partNumber);
        } else {
            invalidParts.push(partNumber);
        }
    }

}

// console.log(validParts.length);
// console.log(validParts);
// console.log(invalidParts.length);
// console.log(invalidParts);


function calculateSumOfPartnumbers(validParts) {
    let sum = 0;
    for (let i = 0; i < validParts.length; i++){
        sum += validParts[i];

    }return sum
}

// console.log(matchedNumbers.length);
// console.log(matchedNumbers[0]);
// console.log("Final Answer is:")
// console.log(calculateSumOfPartnumbers(validParts));
function writeArrayToFile(array){
    const fs = require('fs');
    const dataToWrite = array;
    const outputPath = './Day3_Output_2';
    // Convert the array to a string (you can customize this based on your data structure)
const dataString = dataToWrite.map(item => JSON.stringify(item)).join('\n');

// Write the string to a file
fs.writeFileSync(outputPath, dataString);

console.log(`Data written to ${outputPath}`);
}
console.log(coords);
// writeArrayToFile(coords)
