//  First get the input:
const inputHelpers = require('../HelperFunctions/inputHelpers');
const algos = require('../HelperFunctions/algos');
// const INPUT = inputHelpers.readInputFile('./Day18_Input');
const INPUT = inputHelpers.readInputFile('./Day18_Input_Example');
// const MAP = [[]];
// console.log(INPUT);
const MAP = {};
const trench = '#'
const singleInstruction = INPUT[0];
let coord = '0,0'

function execute(instruction, source) {
    // console.log(instruction);
    const direction = instruction.split(' ')[0];
    const steps = instruction.split(' ')[1];
    const color = instruction.split(' ')[2];
    // console.log(`Moving ${steps} steps ${direction} with color ${color}.`);

    const [sourceX, sourceY] = source.split(',').map(Number);
    switch (direction) {
        case 'R':
            // console.log(`Moving RIGHT ${steps} steps.`);    //  Increasing X
            for (let i = 1; i <= steps; i++) {
                const newX = sourceX + i;
                const coord = `${newX},${sourceY}`;
                setItem(newX, sourceY, trench);
                // console.log(coord);

            }
            return `${parseInt(sourceX) + parseInt(steps)},${sourceY}`;
        case 'L':
            // console.log(`Moving LEFT ${steps} steps.`);     //  Decreasing X
            for (let i = 1; i <= steps; i++) {
                const newX = sourceX - i;
                setItem(newX, sourceY, trench);
                // console.log(coord)
            }
            return `${parseInt(sourceX) - parseInt(steps)},${sourceY}`;
        case 'U':
            // console.log(`Moving UP ${steps} steps.`);       //  Increasing Y
            for (let i = 1; i <= steps; i++) {
                const newY = sourceY + i;
                const coord = `${sourceX},${newY}`;
                setItem(sourceX, newY, trench);
                // console.log(coord);
            }
            return `${sourceX},${parseInt(sourceY) + parseInt(steps)}`;
        case 'D':
            // console.log(`Moving DOWN ${steps} steps.`);     //  Decreasing y
            for (let i = 1; i <= steps; i++) {
                const newY = sourceY - i;
                const coord = `${sourceX},${newY}`;
                setItem(sourceX, newY, trench);
                // console.log(coord);
            }
            return `${sourceX},${parseInt(sourceY) - parseInt(steps)}`;
    }
    // console.log(`Coordinate is now ${coord}`)
}


function runInstructions() {
    setItem(0, 0, trench);          //  Add the starting coordinate to the map.

    for (let i = 0; i < INPUT.length; i++) {
        coord = execute(INPUT[i], coord);
    }


}

function printMap(map) {
    let minX = Infinity,
        minY = Infinity,
        maxX = -Infinity,
        maxY = -Infinity;

    // Find the range of coordinates
    for (const coord in map) {
        const [x, y] = coord.split(',').map(Number);
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
    }

    // Construct and print each row
    for (let y = maxY; y >= minY; y--) {
        let row = '';
        for (let x = minX; x <= maxX; x++) {
            const coord = `${x},${y}`;
            row += map[coord] || '.';
        }
        console.log(row);
    }
}

function createMap(map) {
    let minX = Infinity,
        minY = Infinity,
        maxX = -Infinity,
        maxY = -Infinity;

    // Find the range of coordinates
    for (const coord in map) {
        const [x, y] = coord.split(',').map(Number);
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
    }

    const resultMap = {};

    // Construct and print each row
    for (let y = maxY; y >= minY; y--) {
        for (let x = minX; x <= maxX; x++) {
            const coord = `${x},${y}`;
            resultMap[coord] = map[coord] || '.';
        }
    }

    return resultMap;
}

function getItem(x, y) {
    const key = `${x},${y}`;
    return MAP[key] || 'undefined';
}

function setItem(x, y, value) {
    const key = `${x},${y}`;
    MAP[key] = value;
}

runInstructions()
console.log(MAP);

printMap(MAP);
const grid = createMap(MAP);


console.log("****************")
console.log(grid);