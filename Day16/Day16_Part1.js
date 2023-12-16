//  First get the input:
const inputHelpers = require('../HelperFunctions/inputHelpers');
const INPUT = inputHelpers.readInputFile('./Day16_Input_Example');

// const fs = require('fs');
// const INPUT = fs.readFileSync('./Day16_Input', 'utf-8').split('\n');
// const INPUT = fs.readFileSync('./Day16_Input_Example', 'utf-8').split('\n');
// console.log(INPUT);

//  Create a map out of that input
const caveMap = inputHelpers.createMap(INPUT);
console.log(caveMap);
// console.log(JSON.stringify(caveMap[0], null, 2));
