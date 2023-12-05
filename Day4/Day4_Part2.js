//  First get the input:
const fs = require('fs');
// const INPUT = fs.readFileSync('./Day4_Input', 'utf-8').split('\n');
const INPUT = fs.readFileSync('./Day4_Input_Example', 'utf-8').split('\n');
// console.log(INPUT);
let totalScore = 0;
const cards = [];

function splitCards(cardInfo) {
    let title;
    let winning;
    let myNumbers;
    const card = {title: title, winning: winning, myNumbers: myNumbers};
    for (let i = 0; i < INPUT.length; i++) {
        let card = INPUT[i];
        // console.log(card)
        title = card.split(':')[0];
        let numbers = card.split(':')[1];
        // console.log(title);
        // console.log(numbers);
        const convertToNumber = (num) => {
            const parsedNum = parseInt(num, 10);
            return isNaN(parsedNum) ? null : parsedNum;
        };

        winning = numbers.split('|')[0].trim().split(' ').map(convertToNumber).filter(num => num !== null);
        myNumbers = numbers.split('|')[1].trim().split(' ').map(convertToNumber).filter(num => num !== null);
        // console.log(title);
        // console.log(winning);
        // console.log(myNumbers);
        cards.push({title, winning, myNumbers});
    }
}

function checkWinnings(card) {

    // console.log("Checking the card for a win");
    // console.log(card.title);
    let cardTitle = card.title;
    let winningNumbers = card.winning;
    let myNumbers = card.myNumbers;
    const matches = [];
    // console.log(myNumbers);
    for (let n = 0; n < myNumbers.length; n++) {
        // console.log(`${cardTitle}: ${myNumbers[n]} ${winningNumbers.includes(myNumbers[n])}`);
        if (winningNumbers.includes(myNumbers[n])) {
            matches.push(myNumbers[n]);
        }

    }
    // console.log(matches);
    let matchCount = matches.length;
    console.log(`${cardTitle}: matching numbers: ${matchCount}`);
}


//  Create the main loop
function main() {
    console.log("Running the program!");
    splitCards(INPUT);
    for (let i = 0; i < INPUT.length; i++) {
        let singleCard = cards[i];
        checkWinnings(singleCard);
    }
    console.log(totalScore);
}

//  Run the program
main();

// let singleCard = cards[0];
// console.log(singleCard);
// checkWinnings(singleCard);



