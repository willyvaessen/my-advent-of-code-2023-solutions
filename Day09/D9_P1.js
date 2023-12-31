//  First get the input:
const fs = require('fs');
const INPUT = fs.readFileSync('./Day9_Input', 'utf-8').split('\n');
// const INPUT = fs.readFileSync('./Day9_Input_Example', 'utf-8').split('\n');
// console.log(INPUT);  //  Just testing if INPUT logs correctly.
// const sequence = INPUT[0].split(' ');
let run = 0;
let allZeros = false;
let sumOfExtraPolatedValues = 0;
let sumOfPreviousValues = 0;

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
        if (collection[run].every(value => value === 0)) {
            valueToAdd = 0;
            collection[run].push(valueToAdd);
        } else {
            let currentLastValue = collection[run][collection[run].length - 1];
            valueToAdd = collection[run + 1][collection[run + 1].length - 1] + currentLastValue;
            collection[run].push(valueToAdd);
        }
        run--;
    }
    let currentLastValue = collection[run][collection[run].length - 1];
    valueToAdd = collection[run + 1][collection[run + 1].length - 1] + currentLastValue;
    collection[run].push(valueToAdd);
    let predictedValue = collection[run][collection[run].length-1];
    sumOfExtraPolatedValues += predictedValue;
}



function getPreviousValue(collection) {
    let valueToAddInFront;
    while (run > 0) {
        if (collection[run].every(value => value === 0)) {
            valueToAddInFront = 0;
            collection[run].unshift(valueToAddInFront);
        } else {
            let currentFirstValue = collection[run][0];
            valueToAddInFront = currentFirstValue - collection[run + 1][0];
            collection[run].unshift(valueToAddInFront);
        }
        run--;
    }
    let currentFirstValue = collection[run][0];
    valueToAddInFront = currentFirstValue - collection[run + 1][0];
    collection[run].unshift(valueToAddInFront);
    let predictedPreviousValue = collection[run][0];
    sumOfPreviousValues += predictedPreviousValue;
}       //  Function for part 2 of this day.


function handleSingleLine(line) {
    allZeros = false;
    run = 0;
    console.log(`Handling line ${line + 1} of the input`);
    const collection = createFirstCollection(INPUT[line].split(' '));
    while (!allZeros) {
        calcSteps(collection);
    }
    // getPrediction(collection);
    getPreviousValue(collection);
}


function main() {
    for (let i = 0; i < INPUT.length; i++) {
        handleSingleLine(i);
    }
    console.log("******************************");
}


main();

// handleSingleLine(2);
console.log(sumOfExtraPolatedValues);
console.log(sumOfPreviousValues);