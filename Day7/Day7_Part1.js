//  First get the input:
const fs = require('fs');
const INPUT = fs.readFileSync('./Day7_Input', 'utf-8').split('\n');
// const INPUT = fs.readFileSync('./Day7_Input_Example', 'utf-8').split('\n');
const DECK = {
    'A': 13,
    'K': 12,
    'Q': 11,
    'J': 10,
    'T': 9,
    '9': 8,
    '8': 7,
    '7': 6,
    '6': 5,
    '5': 4,
    '4': 3,
    '3': 2,
    '2': 1
}
// console.log(INPUT);
const HANDS = [];

//  Define functions
function splitHands(input) {
    for (let i = 0; i < input.length; i++) {
        // console.log(input[i]);
        let hand = input[i].split(' ')[0];
        let bidAmount = input[i].split(' ')[1];
        // console.log(`Hand: ${hand}  ${bidAmount}`);
        HANDS.push({hand, bidAmount});
    }
}

function countCards(hand) {
    // Initialize an empty object to store card counts
    const cardCount = {};

    // Loop through each card in the hand
    for (let i = 0; i < hand.length; i++) {
        const card = hand[i];

        // Check if the card is already in the object
        if (cardCount[card]) {
            // If it's present, increment the count
            cardCount[card]++;
        } else {
            // If it's not present, add it to the object with a count of 1
            cardCount[card] = 1;
        }
    }

    // Output the final card count object
    // console.log(cardCount);
    return cardCount;
}

function getHighestCount(handCount) {
    // Find the entry with the lowest count
    let maxCount = 1;
    let maxCard = null;

    // Iterate over the keys of the cardCount object
    for (const card in handCount) {
        if (handCount[card] > maxCount) {
            maxCount = handCount[card];
            maxCard = card;
        }
    }
    // console.log(`Card with the highest count: ${maxCard} (${maxCount} occurrences)`);
    // console.log(handCount);
    return maxCount;
}

function getHandType(hand) {
    let handCount = [];
    const HAND = hand.hand;
    let handType = '';
    let typeRank = 0;
    let amount = 0;
    // console.log("*** Getting the hand type ***");
    handCount = countCards(HAND)
    const handCountSize = Object.keys(handCount).length;
    // console.log(`The hand ${HAND} contains the ${handCountSize} unique cards.`);
    // console.log(`Checking the hand type of hand ${HAND}.`)
    if (handCountSize === 1) {
        // console.log(`Only 1 type of card in hand ${HAND}, this must be Five of a Kind`);
        handType = 'fiveOfKind';
        typeRank = 7;
    } else if (handCountSize === 2) {
        // console.log(`There are 2 types of card in hand ${HAND}, this can be Four of a Kind or a Full House`);
        // console.log(getHighestCount(handCount));
        // console.log("---------- ---------- ---------- ----------");
        if (getHighestCount(handCount) === 3) {
            // console.log(`Highest count is ${getHighestCount(handCount)}, so type is Full House`);
            handType = 'fullHouse';
            typeRank = 5;
        } else {
            // console.log(`Highest count is ${getHighestCount(handCount)}, so type is Four of a Kind`);
            handType = 'fourOfKind';
            typeRank = 6;
        }
    } else if (handCountSize === 3) {
        // console.log(`There are 3 types of card in hand ${HAND}, this can be Three of a Kind or Two Pairs`);
        if (getHighestCount(handCount) === 2) {
            // console.log(`Highest count is ${getHighestCount(handCount)}, so type is Two Pairs`);
            handType = 'twoPairs';
            typeRank = 3;
        } else {
            // console.log(`Highest count is ${getHighestCount(handCount)}, so Three of a Kind`);
            handType = 'threeOfKind';
            typeRank = 4;
        }
    } else if (handCountSize === 4) {
        // console.log(`There are 4 types of card in hand ${HAND}, this must be One Pair`);
        handType = 'onePair';
        typeRank = 2;
    } else if (handCountSize === 5) {
        // console.log(`Five different cards in hand ${HAND}, this must be a High Card`);
        handType = 'highCard';
        typeRank = 1;
    } else {
        // console.log(`This is a different type of hand, or an error.`)
    }
    // console.log(`The hand ${HAND} is a ${handType}`);
    return [handType, typeRank];
}


// getHandType(splitHands(INPUT));


function main() {
    console.log("*** Running Program ***");
    // console.log(HANDS);
    splitHands(INPUT);
    // console.log(HANDS);
}


//  Run the program
main();
for (let i = 0; i < HANDS.length; i++) {
    let currentHand = HANDS[i];
    // console.log(currentHand)
    // console.log(getHandType(currentHand)[0]);
    HANDS[i].type = getHandType(currentHand)[0];
    HANDS[i].typeRank = getHandType(currentHand)[1];

    // console.log(HANDS);
}

const handsSortedByType = HANDS.sort((a, b) => {
  // Compare by typeRank
  if (a.typeRank !== b.typeRank) {
    return a.typeRank - b.typeRank;
  }

  // If typeRank is the same, compare by hand using DECK order
  const compareHands = (handA, handB) => {
    for (let i = 0; i < Math.min(handA.length, handB.length); i++) {
      const rankA = DECK[handA[i]];
      const rankB = DECK[handB[i]];

      if (rankA !== rankB) {
        return rankA - rankB;
      }
    }

    return handA.length - handB.length;
  };

  return compareHands(a.hand, b.hand);
});

console.log(handsSortedByType);
let totalWinnings = 0;

console.log("*** Final Answer:")
for (let i = 0; i < handsSortedByType.length; i++) {
    let rank = i+1;
    let bid = handsSortedByType[i].bidAmount;
    let winning = rank * bid;
    // console.log(`Index ${i}, rank ${rank}, ${bid}. Winning is ${rank} x ${bid} = ${winning}`);
    totalWinnings += winning;

}
console.log("*** Final Answer:")
    console.log(totalWinnings);