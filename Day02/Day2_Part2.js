//  First get the input:
const fs = require('fs');
const INPUT = fs.readFileSync('./Day2_Input', 'utf-8').split('\n');
// const INPUT = fs.readFileSync('./Day2_Example_Input', 'utf-8').split('\n');
// const INPUT = 'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green'; //  One line only, to test.
// console.log(INPUT);

const gamePower = [];

function getGameInfo(INPUT) {
    const colonIndex = INPUT.indexOf(':');
    let gameID = INPUT.slice(5, colonIndex);
    const gameSets = INPUT.slice(colonIndex + 1, INPUT.length).split(';');
    const organizedGameSets = organizeGameSets(gameSets);
    return {'Game': gameID, organizedGameSets};
}


function organizeGameSets(gameSets) {
    const organizedGameSets = new Set();
    for (let g = 0; g < gameSets.length; g++) {
        const gameDetail = (gameSets[g].trim().split(','));
        const checkGame = {'red': 0, 'green': 0, 'blue': 0};
        for (let c = 0; c < gameDetail.length; c++) {
            let cubeDetail = gameDetail[c].trim().split(' ');
            checkGame[cubeDetail[1]] = parseInt(cubeDetail[0]);
            organizedGameSets.add(checkGame);
        }
    }
    return organizedGameSets;
}

const games = [];
for (let i = 0; i < INPUT.length; i++) {
    games.push(getGameInfo(INPUT[i]));
}

for (let i = 0; i < games.length; i++) {
    const game = games[i];
// Check if the game is already in either set
    let minRed = 0;
    let minGreen = 0;
    let minBlue = 0;
    let power = 0;
    game.organizedGameSets.forEach(organizedGameSet => {

        const redColor = organizedGameSet.red;
        const greenColor = organizedGameSet.green;
        const blueColor = organizedGameSet.blue;

        if (redColor > minRed) {
            minRed = redColor;
        }
        if (greenColor > minGreen) {
            minGreen = greenColor;
        }
        if (blueColor > minBlue) {
            minBlue = blueColor;
        }
        power = minRed * minBlue * minGreen;

    });
    gamePower.push(power);
}

//  Calculate the total power
let totalPower = 0;
for (let i = 0; i < gamePower.length; i++) {
    totalPower += gamePower[i];
}
console.log("The final answer is: ");
console.log(totalPower);
