//  First get the input:
const fs = require('fs');
// const INPUT = fs.readFileSync('./Day11_Input', 'utf-8').split('\n');
const INPUT = fs.readFileSync('./Day11_Input_Example', 'utf-8').split('\n');
// console.log(INPUT)
const galaxyMarker = '#';
const galaxyMap = {};

// Check the map for empty spaces
function checkRows(targetValue) {
    const emptyRows = [];
    for (let row = 0; row < INPUT.length; row++) {
        let allEqual = true;
        for (let col = 0; col < INPUT[row].length; col++) {
            if (INPUT[row][col] !== targetValue) {
                allEqual = false;
                break; // Exit the loop early if a non-matching value is found
            }
        }
        if (allEqual) {
            // console.log(`All values in row ${row} are equal to '${targetValue}'.`);
            emptyRows.push(row);
        } else {
            // console.log(`Not all values in row ${row} are equal to '${targetValue}'.`);
        }
    }
    return emptyRows;
}

function checkColumns(targetValue) {
    const emptyCols = [];
    for (let col = 0; col < INPUT[0].length; col++) {
        let allEqual = true;

        for (let row = 0; row < INPUT.length; row++) {
            if (INPUT[row][col] !== targetValue) {
                allEqual = false;
                break; // Exit the loop early if a non-matching value is found
            }
        }
        if (allEqual) {
            // console.log(`All values in column ${col} are equal to '${targetValue}'.`);
            emptyCols.push(col);
        } else {
            // console.log(`Not all values in column ${col} are equal to '${targetValue}'.`);
        }
    }
    return emptyCols;
}

const emptyRows = checkRows('.');
const emptyCols = checkColumns('.');


function rowToArray(row) {
    //  This function takes a row as input, and converts it an array.
    //  That way, it turns an array with strings as rows into an actual 2D array.
    const arrayFromRow = [];
    for (let col = 0; col < row.length; col++) {
        arrayFromRow.push(row[col]);
    }
    return arrayFromRow;
}       //  Function to create an array out of a row (that is actually a string)
function create2DArray(array) {
    //  This function takes an array and converts it to a 2D Array, in which the rows are arrays as well.
    const twoDArray = [];
    for (let row = 0; row < INPUT.length; row++) {
        twoDArray.push(rowToArray(INPUT[row]));
    }
    return twoDArray;
}   //  Function to convert array to 2D array.

//  Expand this universe's rows now.
function expandRows(universe, emptyUniverseRows) {
    for (let i = emptyUniverseRows.length - 1; i >= 0; i--) {     //  Iterate backwards thorugh this array.
        let rowToExpand = parseInt(emptyUniverseRows[i]);
        let stringRowToAdd = '';
        let newRow = rowToExpand + 1;
        for (let col = 0; col < universe[rowToExpand].length; col++) {
            stringRowToAdd += '.';
        }
        universe.splice(rowToExpand, 0, stringRowToAdd);
    }
    return universe;
}       //  This function expands the '.' filled rows.
const universeWithRowsExpanded = expandRows(INPUT, emptyRows);

function expandCols(universe, emptyUniverseCols) {
    const expandedUniverse = [];
    let expandedRow = '';
    let finalExpandedRow = '';
    for (let row = 0; row < universe.length; row++) {
        let rowToExpand = universe[row];
        // finalExpandedRow = expandRowWithColumns(rowToExpand, emptyUniverseCols);
        expandedUniverse.push(expandRowWithColumns(rowToExpand, emptyUniverseCols))
    }
    return expandedUniverse;
}

function insertColumn(rowToExpand, column) {
    let expandedRow = '';
    let characterToAdd = '.';
    expandedRow = rowToExpand.slice(0, column + 1) + characterToAdd + rowToExpand.slice(column + 1);
    return expandedRow;
}

function expandRowWithColumns(rowToExpand, columns) {
    let expandedRow = rowToExpand;
    //
    // for (let i = 0; i < columns.length; i++) {
    //     expandedRow = insertColumn(expandedRow, columns[i]);
    // }

    for (let i = columns.length - 1; i >= 0; i--) {
        expandedRow = insertColumn(expandedRow, columns[i]);
    }

    return expandedRow;
}

const expandedUniverse = expandCols(universeWithRowsExpanded, emptyCols);
// console.log(expandedUniverse);

//  The code above seems to nicely expand the universe, so I can perform the rest of the tasks.
function getGalaxyCount(universe) {
    let galaxyCounter = 0;
    for (let row = 0; row < universe.length; row++) {
        for (let col = 0; col < universe[row].length; col++) {
            if (universe[row][col] === galaxyMarker) {
                galaxyCounter++;
            }
        }
    }
    return galaxyCounter;
}

function getGalaxyMap(universe) {
    const numberOfGalaxies = getGalaxyCount(expandedUniverse);
    let galaxyCounter = 1;
    for (let row = 0; row < universe.length; row++) {
        for (let col = 0; col < universe[row].length; col++) {
            if (universe[row][col] === galaxyMarker) {
                // console.log(`Galaxy ${galaxyCounter} found at ${row}x${col}.`)
                fs.appendFileSync('map.txt', `Galaxy ${galaxyCounter} found at ${row}x${col}.\n`);
                galaxyMap[galaxyCounter] = [row, col];
                galaxyCounter++;
            }
        }
    }
}

getGalaxyMap(expandedUniverse);
console.log(galaxyMap['1'][0]);

function getGalaxyPairs() {
    const galaxies = [];
    const uniquePairs = [];
    const galaxyCount = getGalaxyCount(expandedUniverse);
    for (let i = 1; i <= galaxyCount; i++) {
        galaxies.push(i);
    }
    // console.log(galaxies);
    for (let i = 0; i < galaxies.length; i++) {
        for (let j = i + 1; j < galaxies.length; j++) {
            const pair = [galaxies[i], galaxies[j]];
            uniquePairs.push(pair);
        }
    }
    // console.log(uniquePairs);
    return uniquePairs;
}

const galaxyPairs = getGalaxyPairs();


function calculateDistance(pairs, map) {
    let totalDistance = 0;
    let pair = 5;
    let from = pairs[pair][0];
    let to = pairs[pair][1];
    // const galaxyMap = getGalaxyMap(expandedUniverse);
    // // console.log(galaxyMap)


    for (let pair = 0; pair < pairs.length; pair++) {
        from = pairs[pair][0];
        to = pairs[pair][1];
        let distance = Math.abs(((map[to][1]) - (map[from][1]))) + Math.abs(((map[to][0]) - (map[from][0])));
        console.log(`Distance ${pair + 1} (${from} <-> ${to}) is ${distance}`);
        // fs.appendFileSync('distances.txt', `Distance ${pair + 1} (${from} (${map[from]},${map[from]}) <-> ${to} (${map[to]},${map[to]})) is ${distance}\n`);
        totalDistance += distance;
    }
    console.log(totalDistance);
}

calculateDistance(galaxyPairs, galaxyMap);

// console.log(`The amount of galaxies in this universe is ${numberOfGalaxies}.`)

function calculatePairs(numberOfGalaxies) {
    // Check if there are at least 2 galaxies for pairing
    if (numberOfGalaxies < 2) {
        return 0;
    }

    // Calculate the number of pairs using the formula
    return (numberOfGalaxies * (numberOfGalaxies - 1)) / 2;
}

// Example usage
// const numberOfPairs = calculatePairs(numberOfGalaxies);

// console.log(`With ${numberOfGalaxies} galaxies, there are ${numberOfPairs} pairs.`);


//  Below function writes an array to a file, for comparison or checking.
function writeArrayToFile(array) {
    const fs = require('fs');
    const dataToWrite = array;
    const outputPath = './Day11_Output_1';
// Convert the array to a string without double quotes
    const dataString = dataToWrite.map(item => item.toString()).join('\n');
// Write the string to a file
    fs.writeFileSync(outputPath, dataString);
    console.log(`Data written to ${outputPath}`);
}       //  This function writes an array to a file.
// writeArrayToFile(expandedUniverse);