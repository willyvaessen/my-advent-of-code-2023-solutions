//  First get the input:
const fs = require('fs');
// const INPUT = fs.readFileSync('./Day8_Input', 'utf-8').split('\n');
const INPUT = fs.readFileSync('./Day8_Input_Example', 'utf-8').split('\n');
// console.log(INPUT);
// console.log(INPUT[0]);  //  Contains the instructions/directions [1] is an empty line
// console.log(INPUT[2]);      //  Starting from [2] is the map with nodes.


const INSTR = [];
const NETWORK = {};
const sourceObject = [];
const destinationChecks = [];

function populateInstructions(input) {
    for (let i = 0; i < input[0].length; i++) { //  This loops through the instructions line of the input
        INSTR.push(input[0].split('')[i]);
    }
    console.log("...");
    console.log("Instructions added.");
    // console.log(INSTR.length);
}   //  This function populates the instructions array.
function populateNetwork(input) {
    for (let i = 2; i < INPUT.length; i++) {
        const node = input[i];
        let sourceKey = (node.split('=')[0]).trim();
        // console.log(sourceKey)
        let dstString = (node.split('=')[1]).trim();
        NETWORK[sourceKey] = {
            L: (dstString.split(',')[0]).slice(1, 4), R: (dstString.split(',')[1].trim()).slice(0, 3)
        };
    }
    console.log("...");
    console.log("Network map populated.");
    // console.log(NETWORK);
}       //  This function populates the network array.

//  We want to be able to start at every node that ends with A, so we need all sources that end with A.
function getStartingPoints(input) {
    const SOURCES = [];
    for (let i = 2; i < INPUT.length; i++) {
        const node = input[i];
        let sourceKey = (node.split('=')[0]).trim();
        if (sourceKey[2] === 'A') {
            sourceObject.push(sourceKey);
            destinationChecks.push(false);
        }
    }   //  Populate the SOURCES array
    // console.log(SOURCES);

}


function main() {
    populateInstructions(INPUT);
    populateNetwork(INPUT);
    getStartingPoints(INPUT);
    // console.log(INSTR)              //  Output:[ 'L', 'R' ]
    // console.log(NETWORK)                //  Output: {'11A': { L: '11B', R: 'XXX' },'11B': { L: 'XXX', R: '11Z' },'11Z': { L: '11B', R: 'XXX' },'22A': { L: '22B', R: 'XXX' },'22B': { L: '22C', R: '22C' },'22C': { L: '22Z', R: '22Z' },'22Z': { L: '22B', R: '22B' },XXX: { L: 'XXX', R: 'XXX' }}
    console.log(sourceObject)           //  Output: [ '11A', '22A' ]


}                       //  The main() function is the actual loop for the entire program.
console.log("|---------------------------------------------------------------------|");
console.log("|----- Run the program  ----------------------------------------------|");
console.log("|---------------------------------------------------------------------|");
main();

// navigate(INSTR, NETWORK);
//  6063928 is too low. So is 58540228
// 230 000 000