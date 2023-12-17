//  First get the input:
const inputHelpers = require('../HelperFunctions/inputHelpers');
const algos = require('../HelperFunctions/algos');
const INPUT = inputHelpers.readInputFile('./Day17_Input_Example');

// console.log(INPUT);

const day17Graph = inputHelpers.createGraph(INPUT);

console.log(day17Graph);

console.log(algos.dijkstra(day17Graph, 0));
