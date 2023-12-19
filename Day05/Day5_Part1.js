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
function findDestination(source, map) {
    let destination = 0;
    for (let i = 0; i < map.length; i++) {
        let indexToSearch = (source - map[i].Source);
        if ((indexToSearch >= 0) && indexToSearch < map[i].Length) {
            destination = parseInt(map[i].Destination) + indexToSearch;
            return destination;
        } else {
            destination = parseInt(source);
        }
    }
    return destination;
}

for (let i = 0; i < SEEDS.length; i++) {
    let seed = SEEDS[i];
    let locationFound = findDestination(findDestination(findDestination(findDestination(findDestination(findDestination(findDestination(seed, seedToSoil), soilToFertilizer), fertilizerToWater), waterToLight), lightToTemperature), temperatureToHumidity), humidityToLocation);
    locationsFound.push(locationFound);
    console.log(`Location for seed ${seed} is ${locationFound}`);
}


console.log("** Results **");
console.log(locationsFound);

console.log(Math.min(...locationsFound));
