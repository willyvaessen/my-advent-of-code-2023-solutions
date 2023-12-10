// //  First get the input:
// const fs = require('fs');
// // const INPUT = fs.readFileSync('./Day10_Input', 'utf-8').split('\n');
// const INPUT = fs.readFileSync('./Day10_Input_Example', 'utf-8').split('\n');
// console.log(INPUT);  //  Just testing if INPUT logs correctly.
// let row;    //  The horizontal index of a value in the array
// let col;    //  The vertical index of a value in the array
// let coord = row + 'x' + col;    //  First locate the row, then the column
// let stepCounter = 0;
//
// //  First let's identify the starting point (S) location.
// function getStartCoord(grid) {
//     for (let i = 0; i < grid.length; i++) {
//         if (grid[i].indexOf('S') !== -1) {
//             row = i;
//         }
//         for (let j = 0; j < grid[i].length; j++) {
//             if (grid[i][j].indexOf('S') !== -1) {
//                 col = j;
//             }
//         }
//     }
//     coord = row + 'x' + col;
//     console.log("****************************************");
//     console.log(`* Starting point is at coordinate ${coord}  *`);
//     console.log("****************************************");
//     console.log("");
//     return coord
// }                       //  This funtion locates 'S' in the grid, which is the starting point.
//
// function splitCoord(coord) {
//     // console.log(coord.length);
//     row = coord[0];
//     col = coord[2];
//     // console.log(`Row is ${row}, column is ${col}.`)
// }
//
// //  Now that we know the starting location ('S') we can go in two directions.
//
// function getNextStepCoord(start, direction) {
//     let dest;
//     //  Get the starting point split up:
//     let fromRow = parseInt(start[0]);
//     let fromCol = parseInt(start[2]);
//     let firstRow = 0;
//     let firstCol = 0;
//     let lastCol = INPUT[fromRow].length - 1;
//     let lastRow = INPUT.length - 1;
//     let toRow;
//     let toCol;
//
//     if (direction === 'fw') {
//         //  If I want to move FORWARD from the starting point, I have to increase the COL position (so 1x1 becomes 1x2)
//         if (((fromRow < lastRow) && (fromCol < lastCol)) || ((fromCol === lastCol) && (fromRow < lastRow))) {
//             // console.log(`It's possible to move forward.`);
//             if (fromCol === lastCol) {
//                 toCol = 0;
//                 toRow = fromRow + 1;
//             } else {
//                 toRow = fromRow;
//                 toCol = fromCol + 1;
//             }
//             dest = toRow + 'x' + toCol;
//         } else {
//             console.log(`Impossible to move forward.`)
//         }
//         // console.log(`Moving FORWARD from ${start} to ${dest}.`);
//     } else if (direction === 'bw') {
//         //  If I want to move BACKWARD, I have to DECREASE the COL position (so 1x1 becomes 1x0)
//         if (((fromRow > firstRow) && (fromCol > firstCol)) || ((fromCol === firstCol) && (fromRow > firstRow))) {
//             // console.log(`It's possible to move backward.`);
//             if (fromCol === firstCol) {
//                 toRow = fromRow - 1;
//                 toCol = lastCol;
//             } else {
//                 toRow = fromRow;
//                 toCol = fromCol - 1;
//             }
//             dest = toRow + 'x' + toCol;
//         } else {
//             console.log(`Impossible to move backward.`)
//         }
//         // console.log(`Moving BACKWARD from ${start} to ${dest}.`);
//
//     } else {
//         console.log(`Direction ${direction} is not recognized, or something else is wrong. Can't proceed.`)
//     }
//     console.log(`The next coordinate is ${dest}`);
//     return dest;
// }
//
// function travel(firstStepCoord, direction) {
//     console.log("****************************************");
//     console.log(`*** Taking step ${stepCounter + 1}                    ***`);
//     console.log("****************************************");
//     console.log("");
//     let nextStepCoord = getNextStepCoord(firstStepCoord, direction);
//     const pipeGrid = {};
//     let start = [0, 0];
//     let gridPoint = [0, 0];
//     pipeGrid[stepCounter] = start;
//     // console.log(start)
//     stepCounter++;
//
//     console.log(`Step ${stepCounter}: Starting from ${start}, moving ${direction === 'fw' ? 'FORWARD' : 'BACKWARD'} to ${nextStepCoord}.`);
//     let nextStep = INPUT[nextStepCoord[0]][nextStepCoord[2]];
//     console.log(nextStep);
//
//     let fromCoord = nextStepCoord;
//     console.log(pipeGrid);
//     console.log(gridPoint);
//     let gridX = gridPoint[0];
//     let gridY = gridPoint[1];
//     switch (nextStep) {
//         case '-':
//             console.log("Moving horizontal (E - W / W - E)");
//             console.log(gridPoint);
//             console.log(`Moving from ${gridX},${gridY}.`);
//             gridX++
//             console.log(`Step ${stepCounter}: Moving to ${gridX},${gridY}.`);
//             pipeGrid[stepCounter] = [gridX, gridY];
//             break;
//         case '|':
//             console.log("Moving vertical (N - S / S - N)");
//             console.log(gridPoint);
//             console.log(`Moving from ${gridX},${gridY}.`);
//             break;
//         case '7':
//             console.log("Connecting South and West");
//             console.log(gridPoint);
//             console.log(`Moving from ${gridX},${gridY}.`);
//             break;
//         case 'J':
//             console.log("Connecting North and West");
//             console.log(gridPoint);
//             console.log(`Moving from ${gridX},${gridY}.`);
//             break;
//         case 'L':
//             console.log("Connecting North and East ");
//             console.log(gridPoint);
//             console.log(`Moving from ${gridX},${gridY}.`);
//             break;
//         case 'F':
//             console.log("Connecting South and East");
//             console.log(gridPoint);
//             console.log(`Moving from ${gridX},${gridY}.`);
//             break;
//         case '.':
//             console.log("Hit ground, no pipe here.");
//             break;
//         case 'S':
//             console.log("Back at start");
//             break;
//
//         default:
//             console.log(`That is unknown.`)
//     }
//     console.log(`Finished step ${stepCounter}.`)
//     console.log(pipeGrid);
// }
//
//
// function main() {
//     console.log("****************************************");
//     console.log("*** Running the program              ***");
//     console.log("****************************************");
//     console.log("");
//     let startCoord = getStartCoord(INPUT);
//     // console.log(startCoord);
//     // getNextStepCoord(startCoord, 'bw');
//     // splitCoord(startCoord);
//     travel(startCoord, 'fw');
// }
//
// //  Run the program
// main();
//
//
//
// //  Second attempt:
//
// //  First get the input:
// const fs = require('fs');
// // const INPUT = fs.readFileSync('./Day10_Input', 'utf-8').split('\n');
// const INPUT = fs.readFileSync('./Day10_Input_Example', 'utf-8').split('\n');
// // console.log(INPUT);  //  Just testing if INPUT logs correctly.
// const OPPOSITE_DIRECTIONS = {'south': 'north', 'east': 'west', 'north': 'south', 'west': 'east'};
// let row;    //  The horizontal index of a value in the array
// let col;    //  The vertical index of a value in the array
// let coord = row + 'x' + col;    //  First locate the row, then the column
// let stepCounter = 0;
//
// //  First let's identify the starting point (S) location.
// function getStartCoord(grid) {
//     for (let i = 0; i < grid.length; i++) {
//         if (grid[i].indexOf('S') !== -1) {
//             row = i;
//         }
//         for (let j = 0; j < grid[i].length; j++) {
//             if (grid[i][j].indexOf('S') !== -1) {
//                 col = j;
//             }
//         }
//     }
//     coord = row + 'x' + col;
//     // console.log("****************************************");
//     // console.log(`* Starting point is at coordinate ${coord}  *`);
//     // console.log("****************************************");
//     // console.log("");
//     return coord
// }                       //  This funtion locates 'S' in the grid, which is the starting point.
// function getDirection(coord, origin = 'new') {
//     console.log(`Current step is ${stepCounter}, coordinate is ${coord}.`);
//     let direction;
//     // console.log(coord);
//     let startRow = parseInt(coord[0]);
//     let startCol = parseInt(coord[2]);
//     if ((stepCounter === 0) && origin === 'new') {
//         let topNeighbor = INPUT[startRow - 1][startCol];
//         let bottomNeighbor = INPUT[startRow + 1][startCol];
//         let leftNeighbor = INPUT[startRow][startCol - 1];
//         let rightNeighbor = INPUT[startRow][startCol + 1];
//
//         if ((topNeighbor === 'F') || (topNeighbor === '|') || (topNeighbor === '7')) {
//             // console.log(`Instruction above is ${topNeighbor}, so the only way is up!!`);
//             direction = 'north';
//         } else if ((bottomNeighbor === 'L') || (bottomNeighbor === '|') || (bottomNeighbor === 'J')) {
//             // console.log(`Instruction below is ${bottomNeighbor}, so the only way is down!!`);
//             direction = 'south';
//         } else if ((leftNeighbor === 'F') || (leftNeighbor === '-') || (leftNeighbor === 'L')) {
//             // console.log(`Instruction below is ${leftNeighbor}, so the only way is down!!`);
//             direction = 'west';
//         } else if ((rightNeighbor === 'J') || (rightNeighbor === '-') || (rightNeighbor === '7')) {
//             // console.log(`Instruction below is ${rightNeighbor}, so the only way is down!!`);
//             direction = 'east';
//         } else {
//             console.log(`Can't move there.`);
//         }
//     } else {
//         console.log(`|--------------------------------------|`);
//         console.log(`|--- Step is ${stepCounter}. Getting instruction ---|`);
//         console.log(`|--------------------------------------|`);
//         let instruction = INPUT[startRow][startCol];
//         let fromDirection = OPPOSITE_DIRECTIONS[origin];
//         console.log(`The instruction on ${coord} is ${instruction}. We were coming from ${fromDirection}`);
//         startRow = parseInt(coord[0]);
//         startCol = parseInt(coord[2]);
//         console.log(`Current row is ${startRow}, current col is ${startCol}`);
//         switch (instruction) {
//             case 'F':
//                 console.log(`We came from ${fromDirection}`);
//                 direction = (fromDirection === 'east' ? 'south' : 'east');
//                 break;
//             case '7':
//                 console.log('7');
//                 console.log(`We came from ${fromDirection}`);
//                 direction = (fromDirection === 'west' ? 'south' : 'west');
//                 break;
//             case 'L':
//                 console.log('L');
//                 direction = (fromDirection === 'north' ? 'west' : 'north');
//                 break;
//             case 'J':
//                 console.log(`We came from ${fromDirection}`);
//                 direction = (fromDirection === 'west' ? 'north' : 'west');
//
//                 console.log(`Moving ${direction}.`);
//                 break;
//             case '|':
//                 direction = OPPOSITE_DIRECTIONS[fromDirection];
//                 console.log(`Moving ${direction}.`);
//                 break;
//             case '-':
//                 direction = OPPOSITE_DIRECTIONS[fromDirection];
//                 console.log(`Moving ${direction}.`);
//                 break;
//             case '.':
//                 console.log('You hit the ground. No pipe here.');
//                 break;
//             case 'S':
//                 console.log('That looks like the starting point.');
//                 break;
//             default:
//                 console.log(`Not sure what you're doing, but it's not right.`)
//         }
//
//     }
//     return direction;
// }                       //  This function gets the possible directions and returns one.
//
// // function travel(start, direction) {
// //     console.log("****************************************");
// //     console.log("*** Travelling                       ***");
// //     console.log("****************************************");
// //     console.log("");
// //     // Declare some variables, to make life a little easier.
// //     let fromDirection = OPPOSITE_DIRECTIONS[direction];
// //     console.log(`Coming from ${fromDirection}, we're heading to ${direction}`);
// //     let startRow = parseInt(start[0]);
// //     let startCol = parseInt(start[2]);
// //     let toRow;
// //     let toCol;
// //     let destination;
// //     console.log(`Starting in row ${startRow}, col ${startCol}`);
// //     console.log(destination)
// //
// //     //  Time to decide where we are going:
// //     switch (direction) {
// //         case 'north':
// //             console.log("Heading north.");
// //             toRow = startRow - 1;
// //             toCol = startCol;
// //             destination = toRow + 'x' + toCol;
// //             break;
// //         case 'south':
// //             console.log("Heading south.");
// //             toRow = startRow + 1;
// //             toCol = startCol;
// //             destination = toRow + 'x' + toCol;
// //             break;
// //         case 'east':
// //             console.log("Heading east.");
// //             toRow = startRow;
// //             toCol = startCol + 1;
// //             destination = toRow + 'x' + toCol;
// //             break;
// //         case 'west':
// //             console.log("Heading west.");
// //             toRow = startRow;
// //             toCol = startCol + 1;
// //             destination = toRow + 'x' + toCol;
// //             break;
// //
// //     }
// //     console.log(`Step ${stepCounter}: We are starting on ${start}, heading ${direction} to ${destination} .`);
// //     console.log(`Destination is ${destination}.`)
// //     stepCounter++
// //     return destination;
// // }
//
//
// function travel(start, direction = 'new') {
//     console.log(`In order to travel, I need to know where I am (starting point) and I need to know my direction.`);
//     console.log(`My starting point is ${start} and my direction is ${direction}`);
//     let destination;
//     if (direction === 'new') {
//         console.log(`Looks like the first step, so getting a direction now.`);
//         direction = getDirection(start);
//         console.log(direction);
//     } else {
//         direction = getDirection(start, direction);
//         console.log(direction);
//     }
//
//     //  Now that we know where we are and what our direction is, we can find the destination.
//     destination = getDestination(start, direction);
//     stepCounter++;
//     console.log(`Going to ${destination}`);
//     console.log("********************************************************************************");
// return destination;
// }
//
// function getDestination(start, direction) {
//
//     console.log(`Coming from ${start}, we're heading to ${direction}`);
//     let startRow = parseInt(start[0]);
//     let startCol = parseInt(start[2]);
//     let toRow;
//     let toCol;
//     let destination;
//             switch (direction) {
//         case 'north':
//             console.log("Heading north.");
//             toRow = startRow - 1;
//             toCol = startCol;
//             destination = toRow + 'x' + toCol;
//             break;
//         case 'south':
//             console.log("Heading south.");
//             toRow = startRow + 1;
//             toCol = startCol;
//             destination = toRow + 'x' + toCol;
//             break;
//         case 'east':
//             console.log("Heading east.");
//             toRow = startRow;
//             toCol = startCol + 1;
//             destination = toRow + 'x' + toCol;
//             break;
//         case 'west':
//             console.log("Heading west.");
//             toRow = startRow;
//             toCol = startCol + 1;
//             destination = toRow + 'x' + toCol;
//             break;
//
//     }
//     return destination;
// }
// function main() {
//     // console.log("****************************************");
//     console.log("*** Running the program              ***");
//     console.log("****************************************");
//     console.log("");
//     let coord = getStartCoord(INPUT);
//     let destination;
//
//     destination = travel(coord);
//     console.log(`Step: ${stepCounter}, ${destination}`);
//     destination = travel(destination);
//     console.log(`Step: ${stepCounter}, ${destination}`);
//     destination = travel(destination);
//     console.log(`Step: ${stepCounter}, ${destination}`);
//
// }
//
// //  Test Opposite Directions
//
//
// //  Run the program
// main();
