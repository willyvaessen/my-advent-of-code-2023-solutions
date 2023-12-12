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

// Display the result
// console.log(emptyRows);
// console.log(emptyCols);

//  The above code identifies those rows and columns that contain only '.' characters and adds those to a set of arrays.
//  Next up is a way to "copy" each of these rows and insert that copy next to the existing ones.
//  The approach that I used yesterday, didn't work (did not produce the output that it should and I think that is
//  because of the fact that rows are actually strings.  So, my INPUT is an array of strings, rather than an actual
//  multi-dimensional array.
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


const galaxy2D = create2DArray(INPUT);
console.log(galaxy2D);







//  Once I have a true multi-dimensinal array, I can start working on "copying" those "empty" rows and columns.
//  TODO: Figure out how to copy an entire row or column and insert it next to it's original.


//  TODO: Remove below code snippets once above works.
/*  My code, which is clearly not working so far.
function insertExtraColumn(array) {
    const columnsWithAllDots = findColumnsWithAllDots(array);
    console.log(columnsWithAllDots)
    const newArray = [...array];

    columnsWithAllDots.forEach(columnIndex => {
        newArray.forEach((row, rowIndex) => {
            newArray[rowIndex] = [...row.slice(0, columnIndex + 1), '.', ...row.slice(columnIndex + 1)];
        });
    });

    return newArray;
}

function findColumnsWithAllDots(array) {
    const columnsWithAllDots = [];

    for (let col = 0; col < array[0].length; col++) {
        const allDots = array.every(row => row[col] === '.');
        if (allDots) {
            columnsWithAllDots.push(col);
        }
    }

    return columnsWithAllDots;
}
function rowsToStrings(array){
    let rowString = '';
    const arrayOfStrings = [];
    for (let i = 0; i < array.length; i++) {
        rowString = '';
        for (let j = 0; j < array[i].length; j++) {
            rowString += array[i][j];
        }
        arrayOfStrings.push(rowString);
    }
    return arrayOfStrings
}

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

//  And add them to their respective arrays to use later on.
const emptyGalaxyRows = checkRows('.');
// const emptyGalaxyCols = checkColumns('.');

function expandRows(galaxy, emptyGalaxyRows) {
    for (let i = 0; i < emptyGalaxyRows.length; i++) {
        let rowToExpand = parseInt(emptyGalaxyRows[i]);

        // Create a new row by adding a dot in the new column
        let stringRowToAdd = galaxy[rowToExpand] + '.';

        // Insert the new row at the specified position
        galaxy.splice(rowToExpand, 0, stringRowToAdd);
    }
    return galaxy;
}



//  Expand this galaxy now.
// function expandRows(galaxy, emptyGalaxyRows) {
//     // console.log(`Expanding galaxy rows.`)
//     for (let i = 0; i < emptyGalaxyRows.length; i++) {
//         let rowToExpand = parseInt(emptyGalaxyRows[i]);
//         let stringRowToAdd = '';
//         let newRow = rowToExpand + 1;
//         for (let col = 0; col < galaxy[rowToExpand].length; col++) {
//             stringRowToAdd += '.';
//         }
//         galaxy.splice(rowToExpand, 0, stringRowToAdd);
//     }
//     return galaxy;
// }



let galaxyColsExpanded = rowsToStrings(insertExtraColumn(INPUT));
// let galaxyRowsExpanded = expandRows(galaxyColsExpanded, emptyGalaxyRows);


console.log(galaxyColsExpanded);

function writeArrayToFile(array) {
    const fs = require('fs');
    const dataToWrite = array;
    const outputPath = './Day11_Output_1';
// Convert the array to a string without double quotes
    const dataString = dataToWrite.map(item => item.toString()).join('\n');


// Write the string to a file
    fs.writeFileSync(outputPath, dataString);

    console.log(`Data written to ${outputPath}`);
}

// writeArrayToFile(galaxyRowsExpanded);
// writeArrayToFile(galaxyColsExpanded);
*/

