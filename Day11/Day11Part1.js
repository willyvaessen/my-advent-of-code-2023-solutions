//  First get the input:
const fs = require('fs');
const INPUT = fs.readFileSync('./Day11_Input', 'utf-8').split('\n');
// const INPUT = fs.readFileSync('./Day11_Input_Example', 'utf-8').split('\n');
console.log(INPUT)
// ;
// ;

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


//  Check the map for empty galaxies
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


const emptyGalaxyRows = checkRows('.');
const emptyGalaxyCols = checkColumns('.');

console.log(emptyGalaxyRows);
console.log(emptyGalaxyCols);
