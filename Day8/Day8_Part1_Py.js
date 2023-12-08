const fs = require('fs');

// Lees het bestand 'test.txt' in
const steps = fs.readFileSync('./Day8_Input_Example', 'utf8').split('\n');
const rest = steps.slice(1);

// Initialiseer het netwerk als een lege object
const network = {};


console.log(steps);
console.log(rest);

// Vul het netwerk met de gegeven relaties
rest.forEach(line => {
    if (line.trim() !== "") {
        const [pos, targetsStr] = line.split(" = ");
        network[pos] = targetsStr.slice(1, -1).split(", ");
    }

});

console.log(network);

// Initialisatie van de simulatievariabelen
let stepCount = 0;
let current = "AAA";

// Voer de simulatie uit totdat de huidige positie "ZZZ" is
while (current !== "ZZZ") {
    stepCount++;
    current = network[current][steps[0] === "L" ? 0 : 1];
    steps.push(steps.shift());
}

// Druk het totale aantal stappen af
console.log(stepCount);
