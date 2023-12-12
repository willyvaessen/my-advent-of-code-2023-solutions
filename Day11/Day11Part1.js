//  First get the input:
const fs = require('fs');
const INPUT = fs.readFileSync('./Day11_Input', 'utf-8').split('\n');
// const INPUT = fs.readFileSync('./Day11_Input_Example', 'utf-8').split('\n');
// console.log(INPUT)

let inputRowCol;
let inputColRow;

/*  Iteration testing
    Below are 2 loops, to test iterating over the 2D array in two ways. First row by row, then column by column.
    They are not needed for the program itself.
// ROW first, COL next
for (let row = 0; row < INPUT.length; row++) {
    for (let col = 0; col < INPUT[row].length; col++) {
        console.log(INPUT[row][col]);
    }
}       //  Check row by row
// COL first, ROW next (or at least, an attempt)
for (let col = 0; col < INPUT[0].length; col++) {
    for (let row = 0; row < INPUT.length; row++) {
        console.log(INPUT[row][col]);
    }
}   //  Check column by column
//  END of Iteration Testing part
//  ------------------------------------------------------------------------------------------------------------------*/

// Check the map for empty galaxies
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

//  Expand this galaxy's rows now.
function expandRows(galaxy, emptyGalaxyRows) {
    for (let i = emptyGalaxyRows.length - 1; i >= 0; i--) {     //  Iterate backwards thorugh this array.
        let rowToExpand = parseInt(emptyGalaxyRows[i]);
        let stringRowToAdd = '';
        let newRow = rowToExpand + 1;
        for (let col = 0; col < galaxy[rowToExpand].length; col++) {
            stringRowToAdd += '.';
        }
        galaxy.splice(rowToExpand, 0, stringRowToAdd);
    }
    return galaxy;
}       //  This function expands the '.' filled rows.
const galaxyWithRowsExpanded = expandRows(INPUT, emptyRows);

function expandCols(galaxy, emptyGalaxyCols) {
    const expandedGalaxy = [];
    let expandedRow = '';
    let finalExpandedRow = '';
    for (let row = 0; row < galaxy.length; row++) {
        let rowToExpand = galaxy[row];
        // finalExpandedRow = expandRowWithColumns(rowToExpand, emptyGalaxyCols);
        expandedGalaxy.push(expandRowWithColumns(rowToExpand, emptyGalaxyCols))
    }
    return expandedGalaxy;
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

        for (let i = columns.length -1; i >= 0 ; i--) {
        expandedRow = insertColumn(expandedRow, columns[i]);
    }

    return expandedRow;
}

const expandedGalaxy = expandCols(galaxyWithRowsExpanded, emptyCols);
console.log(expandedGalaxy);


function calculatePairs(numberOfGalaxies) {
    // Check if there are at least 2 galaxies for pairing
    if (numberOfGalaxies < 2) {
        return 0;
    }

    // Calculate the number of pairs using the formula
    return (numberOfGalaxies * (numberOfGalaxies - 1)) / 2;
}

// Example usage
const numberOfGalaxies = 9;
const numberOfPairs = calculatePairs(numberOfGalaxies);

console.log(`With ${numberOfGalaxies} galaxies, there are ${numberOfPairs} pairs.`);



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
writeArrayToFile(expandedGalaxy);