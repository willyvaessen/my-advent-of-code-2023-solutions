/*  --- Day 2: Cube Conundrum ---

You're launched high into the atmosphere! The apex of your trajectory just
barely reaches the surface of a large island floating in the sky.
You gently land in a fluffy pile of leaves. It's quite cold, but you
don't see much snow. An Elf runs over to greet you.

The Elf explains that you've arrived at Snow Island and apologizes for the lack of snow.
He'll be happy to explain the situation, but it's a bit of a walk, so you have some time.
They don't get many visitors up here; would you like to play a game in the meantime?

As you walk, the Elf shows you a small bag and some cubes which are either red, green, or blue.
Each time you play this game, he will hide a secret number of cubes of each color in the bag,
and your goal is to figure out information about the number of cubes.

To get information, once a bag has been loaded with cubes, the Elf will reach into the bag,
grab a handful of random cubes, show them to you, and then put them back in the bag.
He'll do this a few times per game.

You play several games and record the information from each game (your puzzle input).
Each game is listed with its ID number (like the 11 in Game 11: ...) followed by a
semicolon-separated list of subsets of cubes that were revealed from the bag (like 3 red, 5 green, 4 blue).
 */

/*  Example
For example, the record of a few games might look like this:

Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green

In game 1, three sets of cubes are revealed from the bag (and then put back again).
The first set is 3 blue cubes and 4 red cubes;
the second set is 1 red cube, 2 green cubes, and 6 blue cubes;
the third set is only 2 green cubes.

The Elf would first like to know which games would have been possible if the bag contained
    only 12 red cubes, 13 green cubes, and 14 blue cubes?

In the example above, games 1, 2, and 5 would have been possible if the bag had been loaded with that configuration.
However, game 3 would have been impossible because at one point the Elf showed you 20 red cubes at once;
similarly, game 4 would also have been impossible because the Elf showed you 15 blue cubes at once.
If you add up the IDs of the games that would have been possible, you get 8. */


/*  --- The assignment ---
Determine which games would have been possible if the bag had been loaded with only
12 red cubes,
13 green cubes, and
14 blue cubes.

What is the sum of the IDs of those games?
*/

//  First get the input:
const fs = require('fs');
const INPUT = fs.readFileSync('./Day2_Input', 'utf-8').split('\n');
// const INPUT = fs.readFileSync('./Day2_Example_Input', 'utf-8').split('\n');
// const INPUT = 'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green'; //  One line only, to test.
// console.log(INPUT);

//  The amount of cubes in the bag:
// const RED = 12;
// const GREEN = 13;
// const BLUE = 14;
let sumIDs = 0;
const bag = {'red': 12, 'green': 13, 'blue': 14};
// const checkGame = {'red': 0, 'green': 0, 'blue': 0};

//  Declaring two arrays, to store the game ID's of possible and impossible games:
const possibleGames = new Set();
const impossibleGames = new Set();


//  Each line of input, is a separate game. Each game has the same structure
//      Each line starts with the game ID (Game <int>:

function getGameInfo(INPUT) {
    const colonIndex = INPUT.indexOf(':');
    // console.log(": is positioned at index " + colonIndex);
    let gameID = INPUT.slice(5, colonIndex);
    // console.log("The game ID is: " + gameID);
    // console.log("----------------------------------------")
    // console.log(INPUT.slice(colonIndex + 1, INPUT.length));
    // console.log("----------------------------------------")
    const gameSets = INPUT.slice(colonIndex + 1, INPUT.length).split(';');
    // console.log("Sets detected: " + gameSets);
    // console.log(gameSets);

    const organizedGameSets = organizeGameSets(gameSets);
    // console.log(organizedGameSets);
    return {'Game': gameID, organizedGameSets};
}


// console.log("Number of games: " + gameSets.length);
function organizeGameSets(gameSets) {
    const organizedGameSets = new Set();
    // console.log("Running function organizeGameSets");
    // console.log(gameSets);
    // for (let i = 0; i < gameSets.length; i++) {
    // console.log(gameSets[i].trim());
    for (let g = 0; g < gameSets.length; g++) {
        // console.log("--- Game Sets --------------------------");
        // console.log("Length: " + gameSets.length);
        // console.log(gameSets);
        const gameDetail = (gameSets[g].trim().split(','));
        // console.log("--- Clearing CheckGame object ----------")
        const checkGame = {'red': 0, 'green': 0, 'blue': 0};
        // console.log("--- Game Details -----------------------")
        // console.log(gameDetail);
        // console.log(checkGame);
        // console.log("----------------------------------------")
        for (let c = 0; c < gameDetail.length; c++) {
            // console.log(gameDetail[c]);
            let cubeDetail = gameDetail[c].trim().split(' ');
            // console.log(cubeDetail)
            // console.log("Cube Detail: Color: " + cubeDetail[1] + ": " + cubeDetail[0]);
            // console.log("--- Check Game Details ----------------")
            // console.log(checkGame);
            // console.log("--- Updating Game Details --------------");

            checkGame[cubeDetail[1]] = parseInt(cubeDetail[0]);
            // console.log("--- Updated Game Details ---------------");
            // console.log(checkGame);
            // console.log("----------------------------------------");
            organizedGameSets.add(checkGame);
        }
        // console.log("Contents of this is: ")


    }
    return organizedGameSets;
    // checkPossibility(checkGame, bag);
// }
}


function checkPossibility(games) {
    console.log("Checking the games to see if they are possible.");

    // console.log(typeof games);
    for (let i = 0; i < games.length; i++) {
        const game = games[i];
// Check if the game is already in either set
        if (possibleGames.has(game.Game) || impossibleGames.has(game.Game)) {
            continue; // Skip processing if the game is already categorized
        }

        let isPossible = true;

        game.organizedGameSets.forEach(organizedGameSet => {
            Object.keys(organizedGameSet).forEach(color => {
                if (organizedGameSet[color] > bag[color]) {
                    // The set makes it impossible
                    isPossible = false;
                }
            });
        });
        if (isPossible) {
            // If all sets make it possible, add to possibleGames
            possibleGames.add(game.Game);
        } else {
            // If at least one set makes it impossible, add to impossibleGames
            impossibleGames.add(game.Game);
        }
    }
}


//  Running the app:
const games = [];
for (let i = 0; i < INPUT.length; i++) {
    games.push(getGameInfo(INPUT[i]));
}
// console.log("----------------------------------------");
// console.log("--- Games ------------------------------");
// console.log("----------------------------------------");
// console.log(games.length);
checkPossibility(games);
console.log(possibleGames);


//  Now to calculate the sum of the ID's of the possible games.
possibleGames.forEach(gameID => {
    // console.log(gameID);
    sumIDs += parseInt(gameID);
});

console.log("The final answer is: " + sumIDs);