//  First get the input:
const fs = require('fs');
const INPUT = fs.readFileSync('./Day4_Input', 'utf-8').split('\n');
// const INPUT = fs.readFileSync('./Day4_Input_Example', 'utf-8').split('\n');
// console.log(INPUT);
let totalScore = 0;
const cards = [];
const matchCountPerCard = [];
let totalCardAmount = 0;
function splitCards(cardInfo) {
    let title;
    let winning;
    let myNumbers;
    let amount = 1;
    const card = {title: title, amount: amount, winning: winning, myNumbers: myNumbers};
    for (let i = 0; i < INPUT.length; i++) {
        let card = INPUT[i];
        // console.log(`Card is ${card}`)
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
        cards.push({title, amount, winning, myNumbers});
    }
}

function checkWinnings(card) {

    // console.log("Checking the card for a win");
    // console.log(card.title);
    let cardTitle = card.title;
    let cardID = parseInt(card.title.split(" ")[1]);
    let amount = card.amount;
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
    // console.log("* * * * * * * * * *");
    // console.log("Logging matches")
    // console.log(matches);
    // console.log("* * * * * * * * * *");
    // console.log("* * * * * * * * * *");

    let matchCount = matches.length;
    // console.log("* * * * * * * * * *");
    // console.log(`ID of the card is ${cardID}`)
    // console.log(typeof cardID);
    // console.log("* * * * * * * * * *");
    //
    // console.log(`Card ${cardID}: Amount: ${amount} ; Matching numbers: ${matchCount}`);
    matchCountPerCard.push({cardID, amount, matchCount});
}

function addCopies(cards) {
let totalCardAmount = 0;
    console.log("");
    // console.log(cards);
    console.log(`*****  Adding copies of cards, according to matching numbers ****`);
    for (let i = 0; i < cards.length; i++) {
        // console.log("|______________________________________|");
        // console.log(`Card to handle is card ${cards[i].cardID}.`);
        // console.log(`This card has ${cards[i].matchCount} matches, so adding ${cards[i].amount} copies to the following cards:`);

        for (let j = 1; j <= cards[i].matchCount; j++){
            // console.log(`Adding copies to card ${cards[i+j].cardID}`);  // This seems to be the right for .. loop
            // console.log(`Card ${cards[i+j].cardID} starts with ${cards[i+j].amount} copies, adding ${cards[i].amount} copies so it ends up with ${(cards[i+j].amount + cards[i].amount)}`);
            cards[i+j].amount += cards[i].amount
            // console.log(`New amount for card ${cards[i+j].cardID} = *** ${cards[i+j].amount} ***`);

        }


        // for (let nextCard = i+1; nextCard <= cards[i].matchCount; nextCard++){
        //     console.log(cards[nextCard].cardID);
        // }
        console.log("");console.log("");console.log("");

    }

   for (let i = 0; i < cards.length; i++) {
       // console.log("   **********  **********  **********   ");
       // console.log(`Card ${cards[i].cardID} ends up with ${cards[i].amount} copies`);
       // console.log("   **********  **********  **********   ");
       totalCardAmount += cards[i].amount;

   }
   console.log(`The total amount of cards is: ${totalCardAmount}`);
}


//  Create the main loop
function main() {
    console.log("Running the program!");
    splitCards(INPUT);
    for (let i = 0; i < INPUT.length; i++) {
        let singleCard = cards[i];
        checkWinnings(singleCard);
    }

    addCopies(matchCountPerCard);


}

//  Run the program
main();

// let singleCard = cards[0];
// console.log(singleCard);
// checkWinnings(singleCard);



