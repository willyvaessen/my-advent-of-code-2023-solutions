//  First get the input:
const inputHelpers = require('../HelperFunctions/inputHelpers');
const algos = require('../HelperFunctions/algos');
// const INPUT = inputHelpers.readInputFile('./Day19_Input');
const PARTS_INPUT = inputHelpers.readInputFile('./D19_Parts_Example');
const WORKFLOWS_INPUT = inputHelpers.readInputFile('./D19_Workflows_Example');
// const PARTS_INPUT = inputHelpers.readInputFile('./D19_Parts_Example');
// const WORKFLOWS_INPUT = inputHelpers.readInputFile('./D19_Workflows_Example');
// console.log(PARTS_INPUT);
// console.log(WORKFLOWS_INPUT);
const WORKFLOWS = {};
const PARTS = [];


//  Let's split the input files into the Workflows and Parts
//  Parts
for (let i = 0; i < PARTS_INPUT.length; i++) {
    const partXRating = PARTS_INPUT[i].split(',')[0];
    const partMRating = PARTS_INPUT[i].split(',')[1];
    const partARating = PARTS_INPUT[i].split(',')[2];
    const partSRating = PARTS_INPUT[i].split(',')[3];
    PARTS.push({
        'X': parseInt(partXRating.split('=')[1]),
        'M': parseInt(partMRating.split('=')[1]),
        'A': parseInt(partARating.split('=')[1]),
        'S': parseInt(partSRating.split('=')[1])
    });
}

//  Workflows
for (let i = 0; i < WORKFLOWS_INPUT.length; i++) {
    const rules = [];
    // console.log(WORKFLOWS_INPUT[i]);
    const wfName = WORKFLOWS_INPUT[i].split("{")[0];
    // console.log(wfName);
    const wfRules = WORKFLOWS_INPUT[i].slice(WORKFLOWS_INPUT[i].indexOf("{")+1, WORKFLOWS_INPUT[i].length-1);
    const ruleSplit = wfRules.split(',');
    for (let r = 0; r < ruleSplit.length; r++) {
        rules.push(ruleSplit[r]);
    }
    // console.log(WORKFLOWS_INPUT[i].indexOf("{"));
    console.log(wfRules);




    WORKFLOWS[wfName] = rules;
}


console.log(WORKFLOWS);





// console.log(PARTS[0].X);
