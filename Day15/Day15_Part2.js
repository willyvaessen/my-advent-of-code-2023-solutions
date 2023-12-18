const fs = require('fs');

let currentValue = 0;
// const inputString = 'HASH';
const INPUT = fs.readFileSync('./Day15_Input', 'utf-8').split(',');
// console.log(inputString);
// const inputString = 'HASH';
// console.log(string.charCodeAt(0));
// console.log(string.charCodeAt(0));
// console.log(string.charCodeAt(0));
// console.log(string.charCodeAt(0));
//

function holidayHelper(string) {
    console.log("**********************************************************");
    const MULTIPLIER = 17;
    const DIVIDER = 256;

    let currentValue = 0;

    let subTotal = 0;
    // console.log(string);
    for (let pos = 0; pos < string.length; pos++) {
        // console.log(string[pos]);
        let posASCIIValue = string.charCodeAt(pos);
        console.log(`The current value starts at ${currentValue}`)
        console.log(`1: The ${pos === 0 ? 'first' : 'next'} character is ${string[pos]}; its ASCII code is ${string.charCodeAt(pos)}.`)
        console.log(`2: The current value increases to ${currentValue += string.charCodeAt(pos)}.`);
        console.log(`3: The current value is multiplied by ${MULTIPLIER} to become ${currentValue * MULTIPLIER}.`);
        console.log(`4: The current value becomes ${currentValue * MULTIPLIER % DIVIDER} (the remainder of ${currentValue * MULTIPLIER} divided by ${DIVIDER}).`);
        currentValue = (currentValue * MULTIPLIER % DIVIDER);
        console.log("---------------------------------------------------");
        console.log(`Current value is now: ${currentValue}`);
        console.log("---------------------------------------------------");

    }
    console.log("**********************************************************");
return currentValue;
}
// holidayHelper('HASH');
holidayHelper('qp')   //  rn=1