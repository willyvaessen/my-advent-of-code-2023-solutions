# Advent of Code 2023

Today it is 1 December. The first day of the 2023 Advent. 
I will be trying to solve the puzzles this year, hopefully in a timely fashion, 
but first and foremost as practice.
I will try to solve the puzzles with JavaScrit again and if time permits, 
I might also give it a try with Python as I will be looking at Python more 
in the upcoming months.

## --- Day 1: Trebuchet?! ---

At first glance, this first day seems pretty straightforward and it turned out to be quite doable in part 1.
Part 2 of the first day was a lot more challenging, but I ended up solving it by handling the input strings, 
writing them back to a file and use that file as input for my code that solved part 1.


## --- Day 2: Cube Conundrum ---

Part 1 of day 2 has taken me almost all my free time today, but I managed to get it done.
Part 2 on the other hand, proved to be a lot easier.


## --- Day 3: Gear Ratios ---

I still haven't been able to finish this day. My code works with the example data, 
but I can't get it to work with the actual input and I'm not sure where to look.


## --- Day 4: Scratchcards ---

The first part was quite easy to do (took me less than 6 hours) but for the second part I need some more time.


## --- Day 5: If You Give A Seed A Fertilizer ---

Much to my own surprise, the approach I took ended up working by the end of the day. For part 1 that is.
Part 2 has taken me a lot of time, mostly waiting for my computer to finish finding the answer.
I'm sure there's a more efficient way to solve it, but I haven't found it.


## --- Day 6: Wait For It ---

Looking at the title for today, it makes it all the more typical that I solved day 6 while waiting for my computer to 
find the answer to part 2 of day 5. This one was a breeze. It might have taken me more time to figure out if I 
understood the assignment than I needed to solve the actual puzzle. 
I might rewrite my code to automate it all the way.


## --- Day 7: Camel Cards ---

We're playing a kind of poker game today.
Comparing hands, ranking them and finding the total score.

With the addition of Jokers in the second part of the day.




function handleJokers(hand) {
    let joker = hand.J;
    // console.log(hand);
    if (joker === undefined) {
        // console.log(`No Jokers in this hand.`);
    } else {
        // console.log(`Number of jokers in this hand is ${joker}`);
        let maxCard = getHighestCountWithJokers(hand)[0];
        let highestCount = getHighestCountWithJokers(hand)[1];
        // console.log(maxCard, getHighestCountWithJokers);
        // console.log("");
        // console.log("|**----------**|");
        // console.log(hand[maxCard]);
        // console.log("|----------|");
        // console.log(typeof hand.J);
        // console.log(hand.J === 5);
        if (!hand.J === 5) {
            // console.log("*** Updating amount of highest card:")
        hand[maxCard] += hand.J;
        hand.J = 0;
        delete hand['J'];
        // console.log("|----------|");
        // console.log(hand[maxCard]);
        // console.log("|----------|");
        }

    }
    console.log(hand);
    return hand;
}