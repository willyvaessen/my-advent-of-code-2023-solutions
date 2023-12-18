//  First get the input:
const inputHelpers = require('../HelperFunctions/inputHelpers');
const algos = require('../HelperFunctions/algos');
//  const INPUT = inputHelpers.readInputFile('./Day18_Input');
const INPUT = inputHelpers.readInputFile('./Day18_Input_Example');
// const MAP = [[]];
// console.log(INPUT);
const MAP = {};
const trench = '#'
const singleInstruction = INPUT[0];


function execute(instruction) {
    console.log(instruction);
    const direction = instruction.split(' ')[0];
    const steps = instruction.split(' ')[1];
    const color = instruction.split(' ')[2];
    console.log(`Moving ${steps} steps ${direction} with color ${color}.`);
    switch (direction) {
        case 'R':
            console.log(`Moving RIGHT ${steps} steps.`);    //  Increasing X
            break;
        case 'L':
            console.log(`Moving LEFT ${steps} steps.`);     //  Decreasing X
            break;
        case 'U':
            console.log(`Moving UP ${steps} steps.`);       //  Increasing Y
            break;
        case 'D':
            console.log(`Moving DOWN ${steps} steps.`);     //  Decreasing y
            break;
    }
}

setItem(0, 0, trench);  //  Starting at 0,0
setItem(1, 0, trench);
setItem(2, 0, trench);
setItem(3, 0, trench);
setItem(4, 0, trench);
setItem(5, 0, trench);
setItem(6, 0, trench);


execute(singleInstruction);
console.log(MAP)

function getItem(x, y) {
    const key = `${x},${y}`;
    return MAP[key] || 'undefined';
}

function setItem(x, y, value) {
    const key = `${x},${y}`;
    MAP[key] = value;
}

// Add some items to the map
// setItem(0, 0, '#');
// setItem(0, 1, '1');
// setItem(0, -1, 'A');
// setItem(-1, 0, 'B');

// Retrieve items from the map
// console.log(getItem(0, 0));   // Outputs: '#'
// console.log(getItem(0, 1));   // Outputs: '1'
// console.log(getItem(0, -1));  // Outputs: 'A'
// console.log(getItem(-1, 0));  // Outputs: 'B'
// console.log(getItem(1, 1));   // Outputs: 'undefined'

function printMap(centerX, centerY, width, height) {
    let output = '';

    for (let y = centerY - height / 2; y <= centerY + height / 2; y++) {
        let row = '';
        for (let x = centerX - width / 2; x <= centerX + width / 2; x++) {
            row += getItem(x, y);
        }
        output += row + '\n';
    }

    console.log(output);
}

// Assuming you've set items in the map as described in the previous example

// Print a 3x3 portion of the map centered at (0, 0)
printMap(0, 0, 3, 3);
