// utils.js

const fs = require('fs');

function readInputFile(filePath) {
  try {
      return fs.readFileSync(filePath, 'utf-8').split('\n');
  } catch (error) {
    console.error(`Error reading input file: ${error.message}`);
    return [];
  }
}

function createMap(input) {
    const map = [];
    for (let row = 0; row < input.length; row++) {
        let rowArray = [];
        for (let col = 0; col < input[row].length; col++) {
            rowArray.push(input[row][col]);
        }
        map.push(rowArray);
    }
    return map;
}

module.exports = {
  readInputFile,
    createMap,
  // Add more utility functions as needed
};
