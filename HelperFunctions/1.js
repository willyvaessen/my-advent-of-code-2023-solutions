//  1.  Een functie die kijkt of een getal deelbaar is door een ander getal

function isDeelbaar(getal) {
    let delers = 0;
    let deelbaar = false;
    // console.log(`We gaan kijken of het getal ${getal} deelbaar is door andere getallen.`);
    for (let d = 1; d <= getal; d++) {
        // console.log(`We gaan ${getal} delen door ${d}.`);
        // console.log(getal / d);
        if (getal % d === 0) {
            // console.log(`Deler ${d} is een geldige deler`);
            delers++;
        }
    }
    // console.log(`Het getal ${getal} heeft ${delers} delers.`);
    if (delers !== 0) {
        deelbaar = true;
        return deelbaar;
    }
}