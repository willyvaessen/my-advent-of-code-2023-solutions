//  Races:
/*
Time:        54     94     65     92
Distance:   302   1476   1029   1404
*/

/* Part 2
Time:        54946592
Distance:   302147610291404


*/

/* Example Data:
Time:      7  15   30
Distance:  9  40  200
*/

let buttonPress = 0;
let speed = buttonPress;
const distanceToBeat = 302147610291404;     //  From the input
let raceTime = 54946592;         //  From the input
let timeToRace = 0;
console.log(`Time to race is ${timeToRace} milliseconds`);
let distanceRaced = 0;
let possibleWins = 0;

for (let i = 0; i <= raceTime; i++) {
    buttonPress = i;
    timeToRace = raceTime - buttonPress;
    distanceRaced = timeToRace * buttonPress;
    speed = buttonPress;
    // console.log(`By pressing the button for ${buttonPress} ms, there are ${timeToRace} ms left of total racetime ${raceTime} to race, covering a distance of ${distanceRaced};`);
    if (distanceRaced > distanceToBeat) {
        possibleWins++
    }
}

console.log(possibleWins);