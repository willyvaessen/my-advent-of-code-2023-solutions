//  First get the input:
const fs = require('fs');
const INPUT = fs.readFileSync('./Day8_Input', 'utf-8').split('\n');
// const INPUT = fs.readFileSync('./Day8_Input_Example', 'utf-8').split('\n');
// console.log(INPUT);
// console.log(INPUT[0]);  //  Contains the instructions/directions [1] is an empty line
// console.log(INPUT[2]);      //  Starting from [2] is the map with nodes.


const INSTR = [];
const NETWORK = {};

function populateInstructions(input) {
    for (let j = 0; j < INPUT.length; j++) {            //  This loops through the INPUT file, to make sure that there are enough instructions to follow all steps.
        for (let i = 0; i < input[0].length; i++) { //  This loops through the instructions line of the input
            INSTR.push(input[0].split('')[i]);
        }
    }
    console.log("...");
    console.log("Instructions added.");
    // console.log(INSTR);
}   //  This function populates the instructions array.
function populateNetwork(input) {
    for (let i = 2; i < INPUT.length; i++) {
        const node = input[i];
        let sourceKey = (node.split('=')[0]).trim();
        let dstString = (node.split('=')[1]).trim();
        NETWORK[sourceKey] = {
            L: (dstString.split(',')[0]).slice(1, 4),
            R: (dstString.split(',')[1].trim()).slice(0, 3)
        };
    }
    console.log("...");
    console.log("Network map populated.");
    // console.log(NETWORK);
}       //  This function populates the network array.
function navigate(instr, map) {
    console.log(" *** Starting  navigation ***");
    const START = 'AAA';
    const FINISH = 'ZZZ';
    let from = START;
    let destination;
    let stepCounter = 1;
    //  To follow the instructions, I'll have to loop through the instructions array.
    for (let i = 0; i < instr.length; i++) {
        let step = instr[i];
        // console.log(`Current step is ${step}`);
        destination = NETWORK[from][step];
        // console.log(`Starting from ${from}, stepping ${step} to destination ${destination}. Steps taken is ${stepCounter}.`);
        if (destination === FINISH) {
            return stepCounter;
        } else {
            stepCounter++;
            from = destination;
        }
    }
}               //  This function runs the instructions over the network array.
function main() {
    populateInstructions(INPUT);
    populateNetwork(INPUT);
    let steps = navigate(INSTR, NETWORK);
    console.log(`Number of steps taken is ${steps}`)
}                       //  The main() function is the actual loop for the entire program.
console.log("|---------------------------------------------------------------------|");
console.log("|----- Run the program  ----------------------------------------------|");
console.log("|---------------------------------------------------------------------|");
main();
