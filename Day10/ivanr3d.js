//  First get the input:
const fs = require('fs');
// const INPUT = fs.readFileSync('./Day10_Input', 'utf-8').split('\n');
const data = fs.readFileSync('./Day10_Input_Example', 'utf-8').split('\n').slice(0,-1);
// const data = $0.innerText.split('\n').slice(0,-1);
let map = [];
let start = {value: 'S', x:0, y:0, g:0};
let queue = [];
let visited = [];
let contains = false;

data.forEach((line,i)=>{
    for (let j = 0; j < line.length; j++) {
        line[j] === 'S' ? start = {value: 'S', x:j, y:i, g:0} : null;
    }
    map.push(line);
});

queue.push(start);
visited.push(start);

while (queue.length > 0) {
    let pipe = queue.shift();
    let neighbors = getNeighbors(pipe);
    for (let i = 0; i < neighbors.length; i++) {
        contains = false;
        for (let j = 0; j < visited.length; j++) {
            if (neighbors[i].x === visited[j].x && neighbors[i].y === visited[j].y) {
                neighbors[i].g < visited[j].g ? visited[j].g = neighbors[i].g : null;
                contains = true;
            }
        }
        if (!contains) {
            visited.push(neighbors[i]);
            queue.push(neighbors[i]);
        }

    }
}

const result = getObjectWithHighestG(visited);
console.log(`Part 1 -> ${result.g}`);
console.log(queue)

function getNeighbors(tile) {
    let ns = [];
    if (tile.value === '|') {
        ns.push({value: map[tile.y-1][tile.x], x: tile.x, y: tile.y-1, g:tile.g+1});
        ns.push({value: map[tile.y+1][tile.x], x: tile.x, y: tile.y+1, g: tile.g+1});
    }
    else if (tile.value === '-') {
        ns.push({value: map[tile.y][tile.x-1], x: tile.x-1, y: tile.y, g: tile.g+1});
        ns.push({value: map[tile.y][tile.x+1], x: tile.x+1, y: tile.y, g: tile.g+1});
    }
    else if (tile.value === 'L') {
        ns.push({value: map[tile.y-1][tile.x], x: tile.x, y: tile.y-1, g:tile.g+1});
        ns.push({value: map[tile.y][tile.x+1], x: tile.x+1, y: tile.y, g: tile.g+1});
    }
    else if (tile.value === 'J') {
        ns.push({value: map[tile.y-1][tile.x], x: tile.x, y: tile.y-1, g:tile.g+1});
        ns.push({value: map[tile.y][tile.x-1], x: tile.x-1, y: tile.y, g: tile.g+1});
    }
    else if (tile.value === '7') {
        ns.push({value: map[tile.y][tile.x-1], x: tile.x-1, y: tile.y, g: tile.g+1});
        ns.push({value: map[tile.y+1][tile.x], x: tile.x, y: tile.y+1, g: tile.g+1});
    }
    else if (tile.value === 'F') {
        ns.push({value: map[tile.y][tile.x+1], x: tile.x+1, y: tile.y, g: tile.g+1});
        ns.push({value: map[tile.y+1][tile.x], x: tile.x, y: tile.y+1, g: tile.g+1});
    }
    else if (tile.value === 'S') {
        if (map[tile.y-1][tile.x] === '|' || map[tile.y-1][tile.x] === '7' || map[tile.y-1][tile.x] === 'F') {
            ns.push({value: map[tile.y-1][tile.x], x: tile.x, y: tile.y-1, g:tile.g+1});
        }
        if (map[tile.y+1][tile.x] === '|' || map[tile.y+1][tile.x] === 'L' || map[tile.y+1][tile.x] === 'J') {
            ns.push({value: map[tile.y+1][tile.x], x: tile.x, y: tile.y+1, g: tile.g+1});
        }
        if (map[tile.y][tile.x-1] === '-' || map[tile.y][tile.x-1] === 'L' || map[tile.y][tile.x-1] === 'F') {
            ns.push({value: map[tile.y][tile.x-1], x: tile.x-1, y: tile.y, g: tile.g+1});
        }
        if (map[tile.y][tile.x+1] === '-' || map[tile.y][tile.x+1] === 'J' || map[tile.y][tile.x+1] === '7') {
            ns.push({value: map[tile.y][tile.x+1], x: tile.x+1, y: tile.y, g: tile.g+1});
        }
    }
    return ns;
}


function getObjectWithHighestG(array) {
    let maxObject = array[0];
    for (let i = 1; i < array.length; i++) {
    if (array[i].g > maxObject.g) {
        maxObject = array[i];
    }
    }
    return maxObject;
}