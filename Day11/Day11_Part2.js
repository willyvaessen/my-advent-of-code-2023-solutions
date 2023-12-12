//  First get the input:
const fs = require('fs');
// const INPUT = fs.readFileSync('./Day11_Input', 'utf-8').split('\n');
const INPUT = fs.readFileSync('./Day11_Input_Example', 'utf-8').split('\n');
// console.log(INPUT)
const galaxyMarker = '#';
const galaxyMap = {};
const expansion = 1;

// Check the map for empty spaces
function checkRows(targetValue) {
    const emptyRows = [];
    for (let row = 0; row < INPUT.length; row++) {
        let allEqual = true;
        for (let col = 0; col < INPUT[row].length; col++) {
            if (INPUT[row][col] !== targetValue) {
                allEqual = false;
                break; // Exit the loop early if a non-matching value is found
            }
        }
        if (allEqual) {
            // console.log(`All values in row ${row} are equal to '${targetValue}'.`);
            emptyRows.push(row);
        } else {
            // console.log(`Not all values in row ${row} are equal to '${targetValue}'.`);
        }
    }
    return emptyRows;
}

function checkColumns(targetValue) {
    const emptyCols = [];
    for (let col = 0; col < INPUT[0].length; col++) {
        let allEqual = true;

        for (let row = 0; row < INPUT.length; row++) {
            if (INPUT[row][col] !== targetValue) {
                allEqual = false;
                break; // Exit the loop early if a non-matching value is found
            }
        }
        if (allEqual) {
            // console.log(`All values in column ${col} are equal to '${targetValue}'.`);
            emptyCols.push(col);
        } else {
            // console.log(`Not all values in column ${col} are equal to '${targetValue}'.`);
        }
    }
    return emptyCols;
}

const emptyRows = checkRows('.');
const emptyCols = checkColumns('.');


function getGalaxyCount(universe) {
    let galaxyCounter = 0;
    for (let row = 0; row < universe.length; row++) {
        for (let col = 0; col < universe[row].length; col++) {
            if (universe[row][col] === galaxyMarker) {
                galaxyCounter++;
            }
        }
    }
    return galaxyCounter;
}

function getGalaxyMap(universe) {
    const numberOfGalaxies = getGalaxyCount(INPUT);
    let galaxyCounter = 1;
    for (let row = 0; row < universe.length; row++) {
        for (let col = 0; col < universe[row].length; col++) {
            if (universe[row][col] === galaxyMarker) {
                // console.log(`Galaxy ${galaxyCounter} found at ${row}x${col}.`)
                fs.appendFileSync('map.txt', `Galaxy ${galaxyCounter} found at ${row}x${col}.\n`);
                galaxyMap[galaxyCounter] = [row, col];
                galaxyCounter++;
            }
        }
    }
}

function getGalaxyPairs() {
    const galaxies = [];
    const uniquePairs = [];
    const galaxyCount = getGalaxyCount(INPUT);
    for (let i = 1; i <= galaxyCount; i++) {
        galaxies.push(i);
    }
    // console.log(galaxies);
    for (let i = 0; i < galaxies.length; i++) {
        for (let j = i + 1; j < galaxies.length; j++) {
            const pair = [galaxies[i], galaxies[j]];
            uniquePairs.push(pair);
        }
    }
    console.log(uniquePairs);
    return uniquePairs;
}

const galaxyPairs = getGalaxyPairs();

getGalaxyMap(INPUT);


//  For part 2, the expansion is way bigger than in part 1. This would take forever with the code I had for part 1,
//  So I must go looking for another approach.

function calculateDistance(pairs, map) {
    let totalDistance = 0;
    let pair = 0;
    let from = pairs[pair][0];
    let to = pairs[pair][1];

    let toRow = map[to][0];
    let toCol = map[to][1];
    let horDist;
    let vertDist;
    // // console.log(galaxyMap)

    // console.log(`Going from pair ${fromRow},${fromCol} to pair ${toRow},${toCol}`);


    for (let pair = 0; pair < pairs.length; pair++) {
        console.log(`|------------------------------------------------------------------------------|`);
        console.log(`|---  Pair ${pair + 1}                                                                  |`)

        function getExpandingLines(from, to, emptyLineArray) {
            console.log(`From value: ${from}, to value: ${to}`)
            let expandingLines = 0;
            for (let i = 0; i < emptyLineArray.length; i++) {
                if ((emptyLineArray[i] > from) && (emptyLineArray[i] < to)) {
                    expandingLines++;
                }
            }
            return expandingLines;
        }

        function getHorizontalDistance(from, to) {
            let low;
            let high;
            if (from > to) {
                low = to;
                high = from;
            } else {
                low = from;
                high = to;
            }
            console.log(`Low is ${low}`);
            console.log(`High is ${high}`);
            getExpandingLines(from, to, emptyCols);
            console.log(`| Amount of empty lines for pair ${pair + 1} HORIZONTAL is: ${getExpandingLines(from, to, emptyCols)}`);
            return (Math.abs(from - to)) + (getExpandingLines(from, to, emptyCols) * expansion);
        }

        function getVerticalDistance(from, to) {
            let low;
            let high;
            if (from > to) {
                low = to;
                high = from;
            } else {
                low = from;
                high = to;
            }
            // console.log(`Low is ${low}`);
            // console.log(`High is ${high}`);
            getExpandingLines(from, to, emptyRows);
            console.log(`| Amount of empty lines for pair ${pair + 1} VERTICAL is: ${getExpandingLines(from, to, emptyRows)}`);
            return (Math.abs(from - to)) + (getExpandingLines(from, to, emptyRows) * expansion);
        }

        from = pairs[pair][0];
        to = pairs[pair][1];
        let fromRow = map[from][0];
        let fromCol = map[from][1];
        horDist = getHorizontalDistance(fromCol, toCol);
        vertDist = getVerticalDistance(fromRow, toRow);
        console.log(`| Total distance for pair ${pair + 1} is ${horDist} and vertical distance is ${vertDist}. `)


        let distance = horDist + vertDist;
        console.log(`| Distance ${pair + 1} (${from} <-> ${to}) is ${distance}`);
        // fs.appendFileSync('distances.txt', `Distance ${pair + 1} (${from} (${map[from]},${map[from]}) <-> ${to} (${map[to]},${map[to]})) is ${distance}\n`);
        totalDistance += distance;
        console.log(`|------------------------------------------------------------------------------|`);
        console.log("")
    }
    console.log(totalDistance);
}

calculateDistance(galaxyPairs, galaxyMap);