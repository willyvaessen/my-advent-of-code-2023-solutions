//  First get the input:
const fs = require('fs');
// const INPUT = fs.readFileSync('./Day5_Input', 'utf-8').split('\n');
const INPUT = fs.readFileSync('./Day5_Input_Example', 'utf-8').split('\n');
// console.log(INPUT);  //  Just testing if INPUT logs correctly.

//  Declaring consts for the various maps:
const SEEDS = ((INPUT[0].split(":")[1]).trim()).split(" ");
const seedToSoil = [];
const soilToFertilizer = [];
const fertilizerToWater = [];
const waterToLight = [];
const lightToTemperature = [];
const temperatureToHumidity = [];
const humidityToLocation = [];


console.log(INPUT[2]);


function getMaps(inputData) {
    console.log("--- Creating maps from input ---");
    console.log("--- Seed to Soil----------------------------------------------------------------");
    let dataStart = INPUT.indexOf('seed-to-soil map:') + 1;
    let dataEnd = INPUT.indexOf('soil-to-fertilizer map:') - 2;

    console.log(`First line of data is ${dataStart}, last line is ${dataEnd}`)
    console.log(`First Line: ${INPUT[dataStart]}`);
    console.log(`Last Line: ${INPUT[dataEnd]}`);


    console.log("--------------------------------------------------------------------------------");
    console.log("");
    console.log("--- Soil to Fertilizer ---------------------------------------------------------");
    dataStart = INPUT.indexOf('soil-to-fertilizer map:') + 1;
    dataEnd = INPUT.indexOf('fertilizer-to-water map:') - 2;

    console.log(`First line of data is ${dataStart}, last line is ${dataEnd}`)
    console.log(`First Line: ${INPUT[dataStart]}`);
    console.log(`Last Line: ${INPUT[dataEnd]}`);

    console.log("--------------------------------------------------------------------------------");
    console.log("");
    console.log("--- Fertilizer to Water --------------------------------------------------------");
    dataStart = INPUT.indexOf('fertilizer-to-water map:') + 1;
    dataEnd = INPUT.indexOf('water-to-light map:') - 2;

    console.log(`First line of data is ${dataStart}, last line is ${dataEnd}`)
    console.log(`First Line: ${INPUT[dataStart]}`);
    console.log(`Last Line: ${INPUT[dataEnd]}`);

    console.log("--------------------------------------------------------------------------------");
    console.log("");
    console.log("--- Water to Light -------------------------------------------------------------");
    dataStart = INPUT.indexOf('water-to-light map:') + 1;
    dataEnd = INPUT.indexOf('light-to-temperature map:') - 2;


    console.log(`First line of data is ${dataStart}, last line is ${dataEnd}`)
    console.log(`First Line: ${INPUT[dataStart]}`);
    console.log(`Last Line: ${INPUT[dataEnd]}`);

    console.log("--------------------------------------------------------------------------------");
    console.log("");

    console.log("--- Light to Temperature -------------------------------------------------------");
    dataStart = INPUT.indexOf('light-to-temperature map:') + 1;
    dataEnd = INPUT.indexOf('temperature-to-humidity map:') - 2;


    console.log(`First line of data is ${dataStart}, last line is ${dataEnd}`)
    console.log(`First Line: ${INPUT[dataStart]}`);
    console.log(`Last Line: ${INPUT[dataEnd]}`);
    console.log("--------------------------------------------------------------------------------");
    console.log("");
    console.log("--- Temperature to Humidity ----------------------------------------------------");
    dataStart = INPUT.indexOf('temperature-to-humidity map:') + 1;
    dataEnd = INPUT.indexOf('humidity-to-location map:') - 2;


    console.log(`First line of data is ${dataStart}, last line is ${dataEnd}`)
    console.log(`First Line: ${INPUT[dataStart]}`);
    console.log(`Last Line: ${INPUT[dataEnd]}`);
    console.log("--------------------------------------------------------------------------------");
    console.log("");
    console.log("--- Humidity to Location -------------------------------------------------------");
    dataStart = INPUT.indexOf('humidity-to-location map:') + 1;
    dataEnd = INPUT.length -1;


    console.log(`First line of data is ${dataStart}, last line is ${dataEnd}`)
    console.log(`First Line: ${INPUT[dataStart]}`);
    console.log(`Last Line: ${INPUT[dataEnd]}`);
    console.log("--------------------------------------------------------------------------------");
    console.log("");


}


getMaps(INPUT);


// console.log("--- Seeds ----------------------------------------------------------------------");
// console.log(SEEDS);
// console.log("--------------------------------------------------------------------------------");