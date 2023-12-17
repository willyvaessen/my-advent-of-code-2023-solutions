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

function createGraph(input) {
    const graph = {};

    //  Loop through each row of the input
    for (let i = 0; i < input.length; i++) {
        const row = input[i].split("").map(Number);

        //  Add node en distances to graph
        graph[String(i)] = {};
        for (let j = 0; j < row.length; j++) {
            if (row[j] !== 0) {
                graph[String(i)][String(j)] = row[j];
            }
        }
    }
    return graph;
}


module.exports = {
    readInputFile,
    createMap,
    createGraph,

    // Add more utility functions as needed
};
