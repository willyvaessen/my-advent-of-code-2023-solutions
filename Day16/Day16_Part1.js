//  First get the input:
const fs = require('fs');
// const INPUT = fs.readFileSync('./Day16_Input', 'utf-8').split('\n');
const INPUT = fs.readFileSync('./Day16_Input_Example', 'utf-8').split('\n');
console.log(INPUT);
function createMap(input) {
    const map = [];
    for (let row = 0; row < input.length; row++) {
        let rowArray = [];
        for (let col = 0; col < input[row].length; col++) {
            rowArray.push(input[row][col]);

        }
        // console.log(rowArray);
        map.push(rowArray);
    }
    return map;
}

const caveMap = createMap(INPUT);

// console.log(caveMap);

// console.log(JSON.stringify(caveMap[0], null, 2));
