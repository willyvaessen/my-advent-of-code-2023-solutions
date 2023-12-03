//  The code below extracts the symbols used in the input file and puts them in a set to get the unique symbols.:
//  To achieve this, I first removed all '.' and all digits from the input file. The remainder was all symbols.
//  I ended up with the set {'-', '%', '+', '=', '*', '/', '$', '&', '#', '@'} which I declare as a CONST array in my solution.
const fs = require('fs');
const INPUT = fs.readFileSync('./Day3_Input_Example', 'utf-8').split('\n');

console.log(INPUT);

const symbols = new Set();

for (let i = 0; i < INPUT.length; i++) {
    // console.log(INPUT[i]);
    for (let j = 0; j < INPUT[i].length; j++) {
        // console.log(INPUT[i][j]);
        symbols.add(INPUT[i][j]);
    }
}

console.log(symbols);