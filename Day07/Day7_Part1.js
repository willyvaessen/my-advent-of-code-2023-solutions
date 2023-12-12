//  First get the input:
const fs = require('fs');
const INPUT = fs.readFileSync('./Day7_Input', 'utf-8').split('\n');
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

function splitHands(input) {
    for (let i = 0; i < input.length; i++) {
        let hand = input[i].split(' ')[0];
        let bidAmount = input[i].split(' ')[1];
        HANDS.push({hand, bidAmount});
    }
}

function countCards(hand) {
    const cardCount = {};
    for (let i = 0; i < hand.length; i++) {
        const card = hand[i];
        if (cardCount[card]) {
            cardCount[card]++;
        } else {
            cardCount[card] = 1;
        }
    }
    return cardCount;
}

function getHighestCount(handCount) {
    let maxCount = 1;
    let maxCard = null;

    // Iterate over the keys of the cardCount object
    for (const card in handCount) {
        if (handCount[card] > maxCount) {
            maxCount = handCount[card];
            maxCard = card;
        }
    }
    return maxCount;
}

function getHandType(hand) {
    let handCount = [];
    const HAND = hand.hand;
    let handType = '';
    let typeRank = 0;
    let amount = 0;
    handCount = countCards(HAND)
    const handCountSize = Object.keys(handCount).length;
    if (handCountSize === 1) {
        handType = 'fiveOfKind';
        typeRank = 7;
    } else if (handCountSize === 2) {
        if (getHighestCount(handCount) === 3) {
            handType = 'fullHouse';
            typeRank = 5;
        } else {
            handType = 'fourOfKind';
            typeRank = 6;
        }
    } else if (handCountSize === 3) {
        if (getHighestCount(handCount) === 2) {
            handType = 'twoPairs';
            typeRank = 3;
        } else {
            handType = 'threeOfKind';
            typeRank = 4;
        }
    } else if (handCountSize === 4) {
        handType = 'onePair';
        typeRank = 2;
    } else if (handCountSize === 5) {
        handType = 'highCard';
        typeRank = 1;
    }
    return [handType, typeRank];
}

function main() {
    console.log("*** Running Program ***");
    splitHands(INPUT);
}

//  Run the program
main();
for (let i = 0; i < HANDS.length; i++) {
    let currentHand = HANDS[i];
    HANDS[i].type = getHandType(currentHand)[0];
    HANDS[i].typeRank = getHandType(currentHand)[1];
}

const handsSortedByType = HANDS.sort((a, b) => {
    if (a.typeRank !== b.typeRank) {
        return a.typeRank - b.typeRank;
    }
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

for (let i = 0; i < handsSortedByType.length; i++) {
    let rank = i + 1;
    let bid = handsSortedByType[i].bidAmount;
    let winning = rank * bid;
    totalWinnings += winning;
}
console.log("*** Final Answer:")
console.log(totalWinnings);