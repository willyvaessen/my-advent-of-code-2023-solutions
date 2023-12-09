//  First get the input:
const fs = require('fs');
// const INPUT = fs.readFileSync('./Day9_Input', 'utf-8').split('\n');
const INPUT = fs.readFileSync('./Day9_Input_Example', 'utf-8').split('\n');
// console.log(INPUT);  //  Just testing if INPUT logs correctly.
// const sequence = INPUT[0].split(' ');
let run = 0;
let allZeros = false;
let sumOfExtraPolatedValues = 0;

function createFirstCollection(array) {
    const collection = {};
    const steps = [];
    for (let i = 0; i < array.length; i++) {
        let step = parseInt(array[i]);
        // console.log(step);
        steps.push(step);
    }
    collection[run] = steps;
    return collection;
}

// console.log(collection[0]);

function calcSteps(collection) {
    const sequence = collection[run];
    run++
    const steps = [];
    // console.log(`Handling run ${run}`);
    // console.log(sequence)
    for (let i = 0; i < sequence.length; i++) {
        const num1 = parseInt(sequence[i]);
        const num2 = parseInt(sequence[i + 1])
        let step = (sequence[i + 1] - sequence[i]);
        typeof step === 'number' && !isNaN(step) ? steps.push(step) : null;
    }
    if (steps.every(value => value === 0)) {
        allZeros = true;
    }
    collection[run] = steps;
}

function getPrediction(collection) {
    // console.log(collection);
    // console.log(run)
    let valueToAdd;
    while (run > 0) {
        // console.log(collection[run]);
        // console.log(`This collection has a length of ${collection[run].length}`);
        //  Check to see if all values are 0
        if (collection[run].every(value => value === 0)) {
            valueToAdd = 0;
            // console.log(`All values are 0. Adding a zero to the end.`);
            collection[run].push(valueToAdd);
            // console.log(collection[run]);
            // console.log(collection[run].length);

        } else {
            // console.log("We'll do something else.");
            let currentLastValue = collection[run][collection[run].length - 1];
            valueToAdd = collection[run + 1][collection[run + 1].length - 1] + currentLastValue;
            // console.log(`Last value in this collection is ${currentLastValue}. Value to add is ${valueToAdd}.`);
            collection[run].push(valueToAdd);
        }

        run--;
    }
    // console.log(`Original collection for run ${run} is:`);
    // console.log(collection[run]);
    let currentLastValue = collection[run][collection[run].length - 1];
    // console.log(`Last value in this collection is ${currentLastValue}`);
    valueToAdd = collection[run + 1][collection[run + 1].length - 1] + currentLastValue;
    // console.log(`Last value in this collection is ${currentLastValue}. Value to add is ${valueToAdd}.`);
    collection[run].push(valueToAdd);
    let predictedValue = collection[run][collection[run].length-1];


    // collection[run].push(0);
    // // console.log(collection[run].indexOf(0))
    // console.log(collection[run][4]);
    // console.log(collection[run])
    // collection[run -1].push('A')
    // console.log(collection[run -1][collection[run -1].length-1])
    // collection[run -2].push('B')
    // console.log(collection[run -1][collection[run -2].length-1])
    // console.log(collection)
    // console.log(`Prediction is: ${predictedValue}.`)
    sumOfExtraPolatedValues += predictedValue;
}


function handleSingleLine(line) {
    allZeros = false;
    run = 0;
    console.log(`Handling line ${line + 1} of the input`);
    const collection = createFirstCollection(INPUT[line].split(' '));
    while (!allZeros) {
        calcSteps(collection);
    }
    // console.log(`Until this point (run ${run}) The following collections have been created. Now to work our way back up.`)
    // console.log(collection);
    getPrediction(collection);
}


function main() {
    for (let i = 0; i < INPUT.length; i++) {
        handleSingleLine(i);
        // allZeros = false;
        // run = 0;
        // console.log(`Handling line ${i + 1} of the input`);
        // const collection = createFirstCollection(INPUT[i].split(' '));
        // // console.log(collection);
        // while (!allZeros) {
        //     calcSteps(collection);
        // }
        // console.log(`Until this point (run ${run} The following collections have been created. Now to work our way back up.`)
        // console.log(collection);
        // getPrediction(collection);

    }
    console.log("******************************");
}


main();
// handleSingleLine(2);
console.log(sumOfExtraPolatedValues);