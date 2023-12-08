//  First get the input:
const fs = require('fs');
// const INPUT = fs.readFileSync('./Day8_Input', 'utf-8').split('\n');
const INPUT = fs.readFileSync('./Day8_Input_Example', 'utf-8').split('\n');
// console.log(INPUT);
// console.log(INPUT[0]);  //  Contains the instructions/directions [1] is an empty line
// console.log(INPUT[2]);      //  Starting from [2] is the map with nodes.


const INSTR = [];
const NETWORK = [];

function populateInstructions(input) {
    for (let j = 0; j < INPUT.length; j++) {            //  This loops through the INPUT file, to make sure that there are enough instructions to follow all steps.
        for (let i = 0; i < input[0].length; i++) { //  This loops through the instructions line of the input
            INSTR.push(input[0].split('')[i]);
        }
    }
    console.log("...");
    console.log("Instructions added.");
    // console.log(INSTR);
}

function populateNetwork(input) {
    for (let i = 2; i < INPUT.length; i++) {
        const node = input[i];
        let dstString = (node.split('=')[1]).trim();
        NETWORK.push({
            Source: (node.split('=')[0]).trim(),
            l_Dest: (dstString.split(',')[0]).slice(1, 4),
            r_Dest: (dstString.split(',')[1].trim()).slice(0, 3)
        });
    }
    console.log("...");
    console.log("Network map populated.");
    // console.log(NETWORK);
}

function main() {
    populateInstructions(INPUT);
    populateNetwork(INPUT);

}

function navigate(instr, map) {

}

console.log("|---------------------------------------------------------------------|");
console.log("|----- Run the program  ----------------------------------------------|");
console.log("|---------------------------------------------------------------------|");
main();


