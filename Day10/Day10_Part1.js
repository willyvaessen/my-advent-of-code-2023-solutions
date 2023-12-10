//  First get the input:
const fs = require('fs');
// const INPUT = fs.readFileSync('./Day10_Input', 'utf-8').split('\n');
const INPUT = fs.readFileSync('./Day10_Input_Example', 'utf-8').split('\n');
console.log(INPUT);  //  Just testing if INPUT logs correctly.
let row;    //  The horizontal index of a value in the array
let col;    //  The vertical index of a value in the array
let coord = row + 'x' + col;    //  First locate the row, then the column
let stepCounter = 0;

//  First let's identify the starting point (S) location.
function getStartCoord(grid) {
    for (let i = 0; i < grid.length; i++) {
        if (grid[i].indexOf('S') !== -1) {
            row = i;
        }
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j].indexOf('S') !== -1) {
                col = j;
            }
        }
    }
    coord = row + 'x' + col;
    console.log("****************************************");
    console.log(`* Starting point is at coordinate ${coord}  *`);
    console.log("****************************************");
    console.log("");
    return coord
}                       //  This funtion locates 'S' in the grid, which is the starting point.

function splitCoord(coord) {
    // console.log(coord.length);
    row = coord[0];
    col = coord[2];
    // console.log(`Row is ${row}, column is ${col}.`)
}

//  Now that we know the starting location ('S') we can go in two directions.

function getNextStep(start, direction) {
    let dest;
    //  Get the starting point split up:
    let fromRow = parseInt(start[0]);
    let fromCol = parseInt(start[2]);
    let firstRow = 0;
    let firstCol = 0;
    let lastCol = INPUT[fromRow].length - 1;
    let lastRow = INPUT.length - 1;
    let toRow;
    let toCol;

    if (direction === 'fw') {
        //  If I want to move FORWARD from the starting point, I have to increase the COL position (so 1x1 becomes 1x2)
        if (((fromRow < lastRow) && (fromCol < lastCol)) || ((fromCol === lastCol) && (fromRow < lastRow))) {
            // console.log(`It's possible to move forward.`);
            if (fromCol === lastCol) {
                toCol = 0;
                toRow = fromRow + 1;
            } else {
                toRow = fromRow;
                toCol = fromCol + 1;
            }
            dest = toRow + 'x' + toCol;
        } else {
            console.log(`Impossible to move forward.`)
        }
        // console.log(`Moving FORWARD from ${start} to ${dest}.`);
    } else if (direction === 'bw') {
        //  If I want to move BACKWARD, I have to DECREASE the COL position (so 1x1 becomes 1x0)
        if (((fromRow > firstRow) && (fromCol > firstCol)) || ((fromCol === firstCol) && (fromRow > firstRow))) {
            // console.log(`It's possible to move backward.`);
            if (fromCol === firstCol) {
                toRow = fromRow - 1;
                toCol = lastCol;
            } else {
                toRow = fromRow;
                toCol = fromCol - 1;
            }
            dest = toRow + 'x' + toCol;
        } else {
            console.log(`Impossible to move backward.`)
        }
        // console.log(`Moving BACKWARD from ${start} to ${dest}.`);

    } else {
        console.log(`Direction ${direction} is not recognized, or something else is wrong. Can't proceed.`)
    }
    console.log(`The next coordinate is ${dest}`);
    return dest;
}

function travel(start, direction) {
    let from = start;
    console.log(`Starting from ${start}, moving ${direction === 'fw' ? 'FORWARD' : 'BACKWARD'}.`);
    console.log(stepCounter);
    let nextStepCoord = getNextStep(from, direction);
    console.log(nextStepCoord);
    console.log(nextStepCoord[0])
    console.log(nextStepCoord[2])
    let nextStep = INPUT[nextStepCoord[0]][nextStepCoord[2]];
    console.log(nextStep);
    switch (nextStep) {
        case '-':
            console.log("Moving horizontal (E - W / W - E)");
            break;
        case '|':
            console.log("Moving vertical (N - S / S - N)");
            break;
        case '7':
            console.log("Connecting South and West");
            break;
        case 'J':
            console.log("Connecting North and West");
            break;
        case 'L':
            console.log("Connecting North and East ");
            break;
        case 'F':
            console.log("Connecting South and East");
            break;
        case '.':
            console.log("Hit ground, no pipe here.");
            break;
        case 'S':
            console.log("Back at start");
            break;

        default:
            console.log(`That is unknown.`)
    }

}


function main() {
    console.log("****************************************");
    console.log("*** Running the program              ***");
    console.log("****************************************");
    console.log("");
    let startCoord = getStartCoord(INPUT);
    // console.log(startCoord);
    // getNextStep(startCoord, 'bw');
    // splitCoord(startCoord);
    travel(startCoord, 'fw');
}

//  Run the program
main();
