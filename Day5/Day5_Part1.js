//  First get the input:
const fs = require('fs');
// const INPUT = fs.readFileSync('./Day5_Input', 'utf-8').split('\n');
const INPUT = fs.readFileSync('./Day5_Input_Example', 'utf-8').split('\n');
// console.log(INPUT);  //  Just testing if INPUT logs correctly.

//  Declaring consts for the various maps:
const SEEDS = ((INPUT[0].split(":")[1]).trim()).split(" ");
// console.log(INPUT[0]);
const seedToSoil = [];
const soilToFertilizer = [];
const fertilizerToWater = [];
const waterToLight = [];
const lightToTemperature = [];
const temperatureToHumidity = [];
const humidityToLocation = [];

const soilFound = [];
const fertilizerFound = [];
const waterFound = [];
const lightFound = [];
const temperatureFound = [];
const humidityFound = [];
const locationsFound = [];

const destinationNotFound = [];

// console.log(INPUT[2]);


function getMaps(inputData) {
    let dstRangeStart = 0;  //  Destination Range Start (First value in a line)
    let srcRangeStart = 0;  //  Source Range Start      (Second value in a line)
    let rangeLength = 0;    //  Length of the Ranges    (Third value in a line)
    // console.log("--- Creating maps from input ---");
    // console.log("--- Seed to Soil----------------------------------------------------------------");
    let dataStart = INPUT.indexOf('seed-to-soil map:') + 1;
    let dataEnd = INPUT.indexOf('soil-to-fertilizer map:') - 2;
    for (let i = dataStart; i <= dataEnd; i++) {
        seedToSoil.push({
            "Destination": INPUT[i].split(' ')[0],
            "Source": INPUT[i].split(' ')[1],
            "Length": INPUT[i].split(' ')[2]
        });
    }

    // console.log("--- Soil to Fertilizer ---------------------------------------------------------");
    dataStart = INPUT.indexOf('soil-to-fertilizer map:') + 1;
    dataEnd = INPUT.indexOf('fertilizer-to-water map:') - 2;
    for (let i = dataStart; i <= dataEnd; i++) {
        soilToFertilizer.push({
            "Destination": INPUT[i].split(' ')[0],
            "Source": INPUT[i].split(' ')[1],
            "Length": INPUT[i].split(' ')[2]
        });
    }

    // console.log("--- Fertilizer to Water --------------------------------------------------------");
    dataStart = INPUT.indexOf('fertilizer-to-water map:') + 1;
    dataEnd = INPUT.indexOf('water-to-light map:') - 2;
    for (let i = dataStart; i <= dataEnd; i++) {
        fertilizerToWater.push({
            "Destination": INPUT[i].split(' ')[0],
            "Source": INPUT[i].split(' ')[1],
            "Length": INPUT[i].split(' ')[2]
        });
    }

    // console.log("--- Water to Light -------------------------------------------------------------");
    dataStart = INPUT.indexOf('water-to-light map:') + 1;
    dataEnd = INPUT.indexOf('light-to-temperature map:') - 2;
    for (let i = dataStart; i <= dataEnd; i++) {
        waterToLight.push({
            "Destination": INPUT[i].split(' ')[0],
            "Source": INPUT[i].split(' ')[1],
            "Length": INPUT[i].split(' ')[2]
        });
    }

    // console.log("--- Light to Temperature -------------------------------------------------------");
    dataStart = INPUT.indexOf('light-to-temperature map:') + 1;
    dataEnd = INPUT.indexOf('temperature-to-humidity map:') - 2;
    for (let i = dataStart; i <= dataEnd; i++) {
        lightToTemperature.push({
            "Destination": INPUT[i].split(' ')[0],
            "Source": INPUT[i].split(' ')[1],
            "Length": INPUT[i].split(' ')[2]
        });
    }

    // console.log("--- Temperature to Humidity ----------------------------------------------------");
    dataStart = INPUT.indexOf('temperature-to-humidity map:') + 1;
    dataEnd = INPUT.indexOf('humidity-to-location map:') - 2;
    for (let i = dataStart; i <= dataEnd; i++) {
        temperatureToHumidity.push({
            "Destination": INPUT[i].split(' ')[0],
            "Source": INPUT[i].split(' ')[1],
            "Length": INPUT[i].split(' ')[2]
        });
    }

    // console.log("--- Humidity to Location -------------------------------------------------------");
    dataStart = INPUT.indexOf('humidity-to-location map:') + 1;
    dataEnd = INPUT.length - 1;
    for (let i = dataStart; i <= dataEnd; i++) {
        humidityToLocation.push({
            "Destination": INPUT[i].split(' ')[0],
            "Source": INPUT[i].split(' ')[1],
            "Length": INPUT[i].split(' ')[2]
        });
    }


    // console.log("--------------------------------------------------------------------------------");
    // console.log("");


}   //  This function extracts the INPUT into arrays to work with.

function logArrays() {      //  A function to log all the arrays that have been created
    console.log("--- Seeds ----------------------------------------------------------------------");
    console.log(SEEDS);
    console.log("--------------------------------------------------------------------------------");
    console.log("");
    console.log("--- Seed to Soil----------------------------------------------------------------");
    console.log(seedToSoil);
    console.log("--------------------------------------------------------------------------------");
    console.log("");
    console.log("--- Soil to Fertilizer ---------------------------------------------------------");
    console.log(soilToFertilizer);
    console.log("--------------------------------------------------------------------------------");
    console.log("");
    console.log("--- Fertilizer to Water --------------------------------------------------------");
    console.log(fertilizerToWater);
    console.log("--------------------------------------------------------------------------------");
    console.log("");
    console.log("--- Water to Light -------------------------------------------------------------");
    console.log(waterToLight);
    console.log("--------------------------------------------------------------------------------");
    console.log("");
    console.log("--- Light to Temperature -------------------------------------------------------");
    console.log(lightToTemperature);
    console.log("--------------------------------------------------------------------------------");
    console.log("");
    console.log("--- Temperature to Humidity ----------------------------------------------------");
    console.log(temperatureToHumidity);
    console.log("--------------------------------------------------------------------------------");
    console.log("");
    console.log("--- Humidity to Location -------------------------------------------------------");
    console.log(humidityToLocation);
    console.log("--------------------------------------------------------------------------------");
    console.log("");

}          //  A function to log all the arrays that have been created
//  logArrays();

getMaps(INPUT);


//  Now that I have the maps created, it's time to evaluate the seeds.
//  Basically it will be a lookup traversing all arrays, checking if the currentSeed is in the range of the sources and
//      if it is, take the value of the corresponding index in the destinations.
//      That value becomes the input for the next array.


//  In the example, we have 4 seeds: 79, 14, 55, 13
//  We will have to loop through the array of seeds first


// let seed = SEEDS[0];

//  Now that we have a seed, let's go through the first map to find the soils
function findSoil(seed) {
    let destination = 0;
    // console.log(`Finding soil for seed ${seed}`);
    //  The Soil array has a number of lines. Each line must be searched to find the source for our seed.
    for (let i = 0; i < seedToSoil.length; i++) {
        // console.log(`Looking in line ${i} at first seed ${parseInt(seedToSoil[i].Source)}`);
        let indexToSearch = (seed - seedToSoil[i].Source);
        // console.log(`Index is ${indexToSearch}`);
        if ((indexToSearch >= 0) && indexToSearch < seedToSoil[i].Length) {
            console.log(`Seed ${seed} should be found in line ${i}`);
            // console.log(`Seed ${seed} / ${parseInt(seedToSoil[i].Source) + indexToSearch} corresponds to ${parseInt(seedToSoil[i].Destination) + indexToSearch}`);
            destination = parseInt(seedToSoil[i].Destination) + indexToSearch;
            // soilFound.push(destination);
        } else {
            // console.log(`Seed ${seed} can't be found in line ${i}.`);
            destination = parseInt(seed);
            destinationNotFound.push({"Seed": seed, "Line": i});
        }
    }
    soilFound.push(destination);
}

//  Next, let's find the fertilizer destinations

function findFertilizer(soil) {
    let destination = 0;
    // console.log(`Finding fertilizer for soil ${soil}`);
    //  The Soil array has a number of lines. Each line must be searched to find the source for our seed.
    for (let i = 0; i < soilToFertilizer.length; i++) {
        // console.log(`Looking in line ${i} at first seed ${parseInt(seedToSoil[i].Source)}`);
        let indexToSearch = (soil - soilToFertilizer[i].Source);
        // console.log(`Index is ${indexToSearch}`);
        if ((indexToSearch >= 0) && indexToSearch < soilToFertilizer[i].Length) {
            console.log(`Seed ${soil} should be found in line ${i}`);
            // console.log(`Seed ${soil} / ${parseInt(soilToFertilizer[i].Source) + indexToSearch} corresponds to ${parseInt(soilToFertilizer[i].Destination) + indexToSearch}`);
            destination = parseInt(soilToFertilizer[i].Destination) + indexToSearch;
            // fertilizerFound.push(destination);
        } else {
            // console.log(`Seed ${soil} can't be found in line ${i}.`);
            destination = soil;
            // destinationNotFound.push({"Seed": soil, "Line": i});

        }
    }
    fertilizerFound.push(destination);
}


//  Next, let's find the water destinations
function findWater(fertilizer) {
    let destination = 0;
    console.log(`Finding water for fertilizer source ${fertilizer}`);
    //  The Soil array has a number of lines. Each line must be searched to find the source for our seed.
    for (let i = 0; i < fertilizerToWater.length; i++) {
        console.log("*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-")
        console.log(`Looking in line ${i} at first fertilizer ${parseInt(fertilizerToWater[i].Source)}`);
        let indexToSearch = (fertilizer - fertilizerToWater[i].Source);
        console.log(`Index is ${indexToSearch}`);
        console.log(`Length of map is ${fertilizerToWater[i].Length}`)
        if ((indexToSearch >= 0) && indexToSearch < fertilizerToWater[i].Length) {
            console.log(`Seed ${fertilizer} should be found in line ${i}`);
            console.log(`Seed ${fertilizer} / ${parseInt(fertilizerToWater[i].Source) + indexToSearch} corresponds to ${parseInt(fertilizerToWater[i].Destination) + indexToSearch}`);
            destination = parseInt(fertilizerToWater[i].Destination) + indexToSearch;
            // waterFound.push(destination);
        } else {
            console.log(`Seed ${fertilizer} can't be found in line ${i}.`);
            destination = fertilizer;

            // destinationNotFound.push({"Seed": soil, "Line": i});

        }
    }
    waterFound.push(destination);
}


// function navigate(source, destination) {
//     let dest = 0;
//     console.log(`Finding soil for seed ${source}`);
//     console.log(destination);
//     console.log(destination[0].Source)
//     //  The Soil array has a number of lines. Each line must be searched to find the source for our seed.
//     for (let i = 0; i < destination.length; i++) {
//         console.log(`--- Run ${i+1} ---`)
//         console.log(`Source is ${source}, which is a ${typeof source}`)
//         console.log(typeof destination[i].Source)
//         console.log(`Looking in line ${i} at first seed ${destination[i].Source}`);
//         let indexToSearch = (parseInt(source) - destination[i].Source);
//         console.log(`Index is ${indexToSearch}`);
//         if ((indexToSearch > 0) && (indexToSearch <= destination[i].Length)) {
//             console.log(`Seed ${source} should be found in line ${i}`);
//             console.log(`Seed ${source} / ${parseInt(destination[i].Source) + indexToSearch} corresponds to ${parseInt(destination[i].Destination) + indexToSearch}`);
//             destination = parseInt(destination[i].Destination) + indexToSearch;
//         } else {
//             console.log(`Seed ${source} can't be found in line ${i}.`);
//             destination = source;
//         }
//     }
//     return dest
// }


// let destination = navigate(seed, seedToSoil);
//
console.log("--- Starting Program ---")
// console.log(findSoil(seed));
// console.log(destination)
console.log("* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * ");
console.log("-- Seed sources --");
console.log(SEEDS);
console.log("* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * ");
console.log("");
console.log("-- Finding Soil Destinations --")
for (let i = 0; i < SEEDS.length; i++) {
    let seed = SEEDS[i];
    // console.log(seed)
    findSoil(seed);
}
console.log("* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * ");
console.log("");
console.log("--- Soil Destinations found ---")
console.log(soilFound);
console.log("* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * ");
console.log("");
console.log("-- Finding Fertilizer Destinations --")
for (let i = 0; i < soilFound.length; i++) {
    let soil = soilFound[i];
    // console.log(soil);
    findFertilizer(soil);
}
console.log("* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * ");
console.log("--- Fertilizer Destinations found ---")
console.log(fertilizerFound);

console.log("-- Finding Water Destinations --")
for (let i = 0; i < fertilizerFound.length; i++) {
    let fertilizer = fertilizerFound[i];
    findWater(fertilizer);
}
console.log("* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * ");
console.log("--- Water Destinations found ---")
console.log(waterFound);


