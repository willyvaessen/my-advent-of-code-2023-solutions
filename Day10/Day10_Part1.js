//  First get the input:
const fs = require('fs');
// const INPUT = fs.readFileSync('./Day10_Input', 'utf-8').split('\n');
const INPUT = fs.readFileSync('./Day10_Input_Example', 'utf-8').split('\n');
// console.log(INPUT);  //  Just testing if INPUT logs correctly.
const OPPOSITE_DIRECTIONS = {'south': 'north', 'east': 'west', 'north': 'south', 'west': 'east'};
let row;    //  The horizontal index of a value in the array
let col;    //  The vertical index of a value in the array
let coord = row + 'x' + col;    //  First locate the row, then the column
let stepCounter = 0;
let origin = '';

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
    // console.log("****************************************");
    // console.log(`* Starting point is at coordinate ${coord}  *`);
    // console.log("****************************************");
    // console.log("");
    return coord
}                       //  This funtion locates 'S' in the grid, which is the starting point.
function getDirection(coord, origin) {
    // console.log(`This function gets the direction we need to go, found on this coordinate ${coord}. Origin is ${origin}`)
    let direction = 'Nog niet gedefinieerd.';
    let startRow = parseInt(coord.split('x')[0]);
    let startCol = parseInt(coord.split('x')[1]);
    // console.log(`Ik begin op rij ${startRow} en kolom ${startCol}.`);
    let instruction = INPUT[startRow][startCol];
    // console.log(`Op die positie in de input vind ik de instructie: ${instruction}.`)

    //  Als instructie = S, dan is het de eerste keer dat ik deze functie aanroep. Tijd om te bepalen waar we naartoe gaan.
    if ((instruction === 'S') && (origin === undefined)) {
        let topNeighbor = INPUT[startRow - 1][startCol];
        let bottomNeighbor = INPUT[startRow + 1][startCol];
        let leftNeighbor = INPUT[startRow][startCol - 1];
        let rightNeighbor = INPUT[startRow][startCol + 1];
        // console.log(`Up: ${topNeighbor}, Down: ${bottomNeighbor}, Left: ${leftNeighbor}, Right: ${rightNeighbor}.`);
        if ((topNeighbor === 'F') || (topNeighbor === '|') || (topNeighbor === '7')) {
            // console.log(`Instruction above is ${topNeighbor}, so the only way is up!!`);
            direction = 'north';
        } else if ((rightNeighbor === 'J') || (rightNeighbor === '-') || (rightNeighbor === '7')) {
            // console.log(`Instruction below is ${rightNeighbor}, so the only way is down!!`);
            direction = 'east';
        } else if ((bottomNeighbor === 'L') || (bottomNeighbor === '|') || (bottomNeighbor === 'J')) {
            // console.log(`Instruction below is ${bottomNeighbor}, so the only way is down!!`);
            direction = 'south';
        } else if ((leftNeighbor === 'F') || (leftNeighbor === '-') || (leftNeighbor === 'L')) {
            // console.log(`Instruction below is ${leftNeighbor}, so the only way is down!!`);
            direction = 'west';
        } else {
            console.log(`Can't move there from ${coord}.`)
        }


        // origin = direction;     //  assigning this to know where we came from.
        // console.log(direction, origin);
        return [coord, direction, origin];
    }
}


function getDestination(input) {
    // console.log(`Input received is ${input}`);
    let start = input[0];
    let direction = input[1];
    let origin = input[2];
    // console.log(`Coming from ${start}, we're heading to ${direction}`);
    let startRow = parseInt(start.split('x')[0]);
    let startCol = parseInt(start.split('x')[1]);
    // console.log(startRow, startCol);
    let toRow;
    let toCol;
    let destination;
    switch (direction) {
        case 'north':
            // console.log("Heading north.");
            toRow = startRow - 1;
            toCol = startCol;
            destination = toRow + 'x' + toCol;
            break;
        case 'south':
            // console.log("Heading south.");
            toRow = startRow + 1;
            toCol = startCol;
            destination = toRow + 'x' + toCol;
            break;
        case 'east':
            // console.log("Heading east.");
            toRow = startRow;
            toCol = startCol + 1;
            destination = toRow + 'x' + toCol;
            break;
        case 'west':
            // console.log("Heading west.");
            toRow = startRow;
            toCol = startCol + 1;
            destination = toRow + 'x' + toCol;
            break;

    }
    // console.log(destination, direction, origin);
    return [destination, direction, origin];
}

function move(target) {
    // console.log(`Target received is ${target}`);
    let destination = target[0];
    let direction = target[1];
    // console.log(`Moving to destination ${destination}, heading ${direction}`);
    let origin = direction;

    return [destination, direction, origin];
}

function main() {
    // console.log("****************************************");
    console.log("*** Running the program              ***");
    console.log("****************************************");
    console.log("");
    let coord = getStartCoord(INPUT);
    console.log(`Starting Point is ${coord}`);
    let direction = getDirection(coord);
    console.log(`Direction found: ${getDirection(coord)}`);
    console.log(direction);
    let destination = getDestination(getDirection(coord));
    console.log(`Source is ${coord},  destination found: ${getDestination(getDirection(coord))}`)
    // console.log(destination);
    console.log(`Direction found is ${direction[0]}. Heading ${direction[1]}. Coming from ${direction[2]}`);
    // move(destination);
    coord = move(destination)[0];
    console.log(coord);
    console.log(stepCounter);
    stepCounter++
    coord = move(getDestination(getDirection(coord)));
    console.log(coord);
    console.log(stepCounter);
    stepCounter++

}

//  Test Opposite Directions


//  Run the program
main();
