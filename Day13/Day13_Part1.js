//  First get the input:
const fs = require('fs');
// const INPUT = fs.readFileSync('./Day13_Input', 'utf-8').split('\n');
const INPUT = fs.readFileSync('./Day13_Input_Example', 'utf-8').split('\n');
console.log(INPUT);
let rowMirroredLines = 0;
let colMirrorLine = 0;
const multiplier = 100;

function handleInput(input) {
    const patterns = {};
    let singlePattern = [];
    let patternCount = 0;

    for (let i = 0; i < input.length; i++) {
        if (input[i] !== '') {
            singlePattern.push(input[i]);
        } else {
            // Save the completed pattern and reset singlePattern for the next pattern
            patterns[patternCount] = singlePattern;
            singlePattern = [];
            patternCount++;
        }
    }

    // Save the last pattern if it's not empty
    if (singlePattern.length > 0) {
        patterns[patternCount] = singlePattern;
    }

    return patterns;
}

const patterns = handleInput(INPUT);
// console.log(patterns);


for (let pattern = 0; pattern < Object.keys(patterns).length; pattern++) {
    // console.log(patterns[pattern]);
    let singlePattern = patterns[pattern];
    const mirroredRow = findMirroredRow(singlePattern);
    const mirroredCol = findMirroredColumn(singlePattern);
    // console.log(`First Mirrored Row is ${mirroredRow + 1}`);    //  <-- This value is needed!!!
    // const allRowsMirrored = compareRows(singlePattern, findMirroredRow(singlePattern));
    // console.log(`All rows are mirrored?: ${allRowsMirrored}`)

    compareRows(singlePattern, mirroredRow);
    compareColumns(singlePattern, mirroredRow);

    // console.log(mirroredCol);

    if (compareRows(singlePattern, findMirroredRow(singlePattern))) {
        // console.log(`Pattern is mirrored vertically, starting from row ${mirroredRow + 1}`);
        rowMirroredLines += (mirroredRow + 1);
    }

    if (compareColumns(singlePattern, findMirroredColumn(singlePattern))) {
        // console.log(`Pattern is mirrored horizontally, starting from column ${mirroredCol +1}`)
        colMirrorLine += (mirroredCol + 1);
    }

    console.log(`Lines above: ${rowMirroredLines}, lines left ${colMirrorLine}`)

}


function findMirroredRow(pattern) {
    for (let row = 0; row < pattern.length; row++) {
        // console.log(pattern[row] === pattern[row+1]);
        if (pattern[row] === pattern[row + 1]) {
            // console.log(`Mirror line is row ${row}`);
            return row;
        }
    }
}


function compareRows(pattern, row) {
    let allMirrored = true;
    const topSideOfMirror = row;
    const bottomSideOfMirror = row + 1;
    let topSide = topSideOfMirror + 1;
    let bottomSide = pattern.length - bottomSideOfMirror;

    for (let i = 0; i < (topSide > bottomSide ? bottomSide : topSide); i++) {
        // console.log(`Counting ${i} rows.`);
        // console.log(pattern[topSideOfMirror - i] === pattern[bottomSideOfMirror + i]);
        if (pattern[topSideOfMirror - i] === pattern[bottomSideOfMirror + i]) {
            // console.log(`Checking next.`);
        } else if (pattern[topSideOfMirror - i] !== pattern[bottomSideOfMirror + i]) {
            // console.log(`Not all rows are mirrored!`);
            allMirrored = false;
        }
    }
    return allMirrored;
}

function compareColumns(pattern, col) {
    let allMirrored = true;
    const leftSideOfMirror = col;
    const rightSideOfMirror = col + 1;
    let leftSide = leftSideOfMirror +1;
    let rightSide = pattern[0].length - rightSideOfMirror;
    for (let i = 0; i < (leftSide > rightSide ? rightSide : leftSide) ; i++) {
        // console.log(`Counting ${i} columns`);
        // console.log(`Left: ${leftSide}, right ${rightSide}`);
        if (pattern.map(row => row[leftSideOfMirror - i]).join('') === pattern.map(row => row[rightSideOfMirror + i]).join('')) {
            // console.log(`Checking next.`);
        } else if (pattern.map(row => row[leftSideOfMirror - i]).join('') !== pattern.map(row => row[rightSideOfMirror + i]).join('')) {
            // console.log(`Not all rows are mirrored!`);
            allMirrored = false;
        }
    }
    return allMirrored;
}

function findMirroredColumn(pattern) {
    for (let col = 1; col < pattern[0].length; col++) {
        const currentColumn = pattern.map(row => row[col]).join('');
        const previousColumn = pattern.map(row => row[col - 1]).join('');
        if (currentColumn === previousColumn) {
            // console.log(`Mirror column is ${col - 1}`);
            return col - 1;
            // break;  // Add break to exit the loop once a mirrored column is found
        }
    }
}

// findMirroredColumn(singlePattern)
//
// const testCols = [
//   '1111111',
//   '2222222',
//   '3333333',
//   '4444444',
//   '5555555',
//   '6666666',
//   '0123321'
// ]
//
// console.log(testCols.map(row => row[2]).join(''));

// for (let col = 0; col < testCols[0].length; col++) {
//     console.log(testCols.map(row => row[col]).join(''));
// }


console.log(`Final answer: ${(rowMirroredLines * multiplier) + colMirrorLine}`)