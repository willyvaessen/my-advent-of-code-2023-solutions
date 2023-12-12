const fs = require('fs');
const INPUT = fs.readFileSync('./Day7_Input', 'utf-8').split('\n');
const DECK = {
    'A': 13,
    'K': 12,
    'Q': 11,
    'T': 10,
    '9': 9,
    '8': 8,
    '7': 7,
    '6': 6,
    '5': 5,
    '4': 4,
    '3': 3,
    '2': 2,
    'J': 1,
}
const HANDS = [];

//  Define functions
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

    for (const card in handCount) {
        if (handCount[card] > maxCount) {
            maxCount = handCount[card];
            maxCard = card;
        }
    }
    return maxCount;
}

function getHighestCountWithJokers(handCount) {
    let maxCount = 1;
    let maxCard = null;

    for (const card in handCount) {
        if (handCount[card] > maxCount) {
            maxCount = handCount[card];
            maxCard = card;
        } else if (handCount[card] === maxCount) {
            maxCard = card;
        }
    }
    return [maxCard, maxCount];
}


function handleJokers(hand) {
    let joker = hand.J;
    if (joker === undefined) {
    } else {
        let maxCard = getHighestCountWithJokers(hand)[0];
        let highestCount = getHighestCountWithJokers(hand)[1];
        if (hand.J === 5) {
            hand[maxCard] += hand.J;
        } else {
            hand[maxCard] += hand.J;
            hand.J = 0;
            delete hand['J'];
        }
    }
    return hand;
}


function getHandType(hand) {
    let handCount = [];
    const HAND = hand.hand;
    let handType = '';
    let typeRank = 0;
    let amount = 0;
    handCount = countCards(HAND)

    handleJokers(handCount);
    const handCountSize = Object.keys(handCount).length;
    if (handCountSize === 1) {
        handType = 'fiveOfKind';
        typeRank = 7;
    } else if (handCountSize === 2) {
        if (getHighestCount(handCount) === 3) {
            handType = 'fullHouse';
            typeRank = 5;
        } else {
            // console.log(`Highest count is ${getHighestCount(handCount)}, so type is Four of a Kind`);
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
    } else {
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

let totalWinnings = 0;

for (let i = 0; i < handsSortedByType.length; i++) {
    let rank = i + 1;
    let bid = handsSortedByType[i].bidAmount;
    let winning = rank * bid;
    totalWinnings += winning;

}
console.log("*** Final Answer:")
console.log(totalWinnings);
