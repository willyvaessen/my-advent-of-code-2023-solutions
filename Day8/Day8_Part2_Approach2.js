//  First get the input:
const fs = require('fs');
const INPUT = fs.readFileSync('./Day8_Input', 'utf-8').split('\n');
// const INPUT = fs.readFileSync('./Day8_Input_Example', 'utf-8').split('\n');
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

function navigate(instr, map) {
    console.log("...");
    console.log(" *** Starting  navigation ***");
    let stepCounter = 1;
    let currentIndex = 0;

    const fromObject = [];
    for (let o = 0; o < sourceObject.length; o++) {
        fromObject.push(sourceObject[o]);
    }

    while (!allDestinationsTrue()) {
        //  First a loop to iterate through the steps.
        for (let i = 0; i < instr.length; i++) {
            let step = instr[i];
            for (let j = 0; j < sourceObject.length; j++) {
                let from = fromObject[j];
                let destination = NETWORK[from][step];
                // console.log(`From source ${from} I'd have to walk ${step} to destination ${destination} in step ${stepCounter}`);
                //  Update destinationCheck
                if (destination[2] === 'Z') {
                    destinationChecks[j] = true;
                    fromObject[j] = destination;
                } else {
                    destinationChecks[j] = false;
                    fromObject[j] = destination;
                }
            }
            // console.log(fromObject);
            // console.log(destinationChecks);
            console.log(`Running step ${stepCounter}`)
            //  Check if all destinations are True
            if (allDestinationsTrue()) {
                return stepCounter;
            }
            stepCounter++;
        }
    }

    console.log("");
    console.log("**********************************************");
}               //  This function runs the instructions over the network array.


function allDestinationsTrue() {
    // Define your exit condition logic here
    // Return true to exit the loop, false otherwise

    return destinationChecks.every(value => value === true);/* your condition logic */
    ;
}


function main() {
    populateInstructions(INPUT);
    populateNetwork(INPUT);
    getStartingPoints(INPUT);
    console.log(INSTR)
    // let steps = navigate(INSTR, NETWORK);            //  Commented out, because it takes forever and does not finish.
    // console.log(`Number of steps taken is ${steps}`)
}                       //  The main() function is the actual loop for the entire program.
console.log("|---------------------------------------------------------------------|");
console.log("|----- Run the program  ----------------------------------------------|");
console.log("|---------------------------------------------------------------------|");
main();

// navigate(INSTR, NETWORK);
//  6063928 is too low. So is 58540228
// 230 000 000