//  First get the input:
const inputHelpers = require('../HelperFunctions/inputHelpers');
const algos = require('../HelperFunctions/algos');
const INPUT = inputHelpers.readInputFile('./test');

function createGraph(grid) {
  const graph = {};

  // Function to add an edge between two nodes in the graph
  function addEdge(node1, node2) {
    if (!graph[node1]) {
      graph[node1] = [];
    }
    if (!graph[node2]) {
      graph[node2] = [];
    }

    graph[node1].push(node2);
    graph[node2].push(node1);
  }

  // Iterate through each cell in the grid
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      const cell = grid[row][col];
        // console.log(cell)
      // If the cell is a '#', add edges to adjacent '#' cells
      if (cell === '#') {
        // Check right
        if (col < grid[row].length - 1 && grid[row][col + 1] === '#') {
          addEdge(`${row},${col}`, `${row},${col + 1}`);
        }
        // Check down
        if (row < grid.length - 1 && grid[row + 1][col] === '#') {
          addEdge(`${row},${col}`, `${row + 1},${col}`);
        }
      }
    }
  }

  return graph;
}

function findClosedLoop(graph, startNode, visited) {
  if (!visited[startNode]) {
    visited[startNode] = true;
    for (const neighbor of graph[startNode]) {
      findClosedLoop(graph, neighbor, visited);
    }
  }
}

function getCellsInsideClosedLoop(graph) {
  const visited = {};
  const startNode = Object.keys(graph)[0]; // Start from any node
  findClosedLoop(graph, startNode, visited);

  // Collect cells inside the closed loop
  const cellsInsideLoop = Object.keys(visited);

  return cellsInsideLoop;
}

function getCellsInsideShape(graph) {
  const visited = {};
  const startNode = Object.keys(graph)[0]; // Start from any node
  findClosedLoop(graph, startNode, visited);

  // Collect all visited cells except the initial starting node and its neighbors
  const cellsInsideLoop = Object.keys(visited).filter(node => node !== startNode && !graph[startNode].includes(node));

  return cellsInsideLoop;
}

function getCellsNotInClosedLoop(grid, cellsInsideLoop) {
  const allCells = new Set();

  // Step 1: Add all cells to the set
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      allCells.add(`${row},${col}`);
    }
  }

  // Step 2: Subtract cells inside the closed loop from all cells
  const cellsNotInClosedLoop = [...allCells].filter(cell => !cellsInsideLoop.includes(cell));

  return cellsNotInClosedLoop;
}

function findConnectedComponents(graph) {
  const visited = {};
  const components = [];

  function dfs(node, component) {
    if (!visited[node]) {
      visited[node] = true;
      component.push(node);
      for (const neighbor of graph[node]) {
        dfs(neighbor, component);
      }
    }
  }

  for (const node in graph) {
    if (!visited[node]) {
      const component = [];
      dfs(node, component);
      components.push(component);
    }
  }

  return components;
}

function findOutsideCells(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const visited = new Array(rows).fill(0).map(() => new Array(cols).fill(false));

  const outsideCells = [];

  function isInside(row, col) {
    return row >= 0 && row < rows && col >= 0 && col < cols;
  }

  function floodFill(row, col) {
    if (!isInside(row, col) || visited[row][col] || grid[row][col] === '#') {
      return;
    }

    visited[row][col] = true;
    outsideCells.push(`${row},${col}`);

    // Explore neighboring cells
    floodFill(row - 1, col);
    floodFill(row + 1, col);
    floodFill(row, col - 1);
    floodFill(row, col + 1);
  }

  // Find a starting point inside the closed loop
  let startRow, startCol;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] === '.') {
        startRow = row;
        startCol = col;
        break;
      }
    }
    if (startRow !== undefined) {
      break;
    }
  }

  // Perform flood-fill starting from the inside point
  if (startRow !== undefined) {
    floodFill(startRow, startCol);
  }

  return outsideCells;
}
function findInsideCells(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const visited = new Array(rows).fill(0).map(() => new Array(cols).fill(false));

  const insideCells = [];

  function isInside(row, col) {
    return row >= 0 && row < rows && col >= 0 && col < cols;
  }

  function floodFill(row, col) {
    if (!isInside(row, col) || visited[row][col] || grid[row][col] === '#') {
      return;
    }

    visited[row][col] = true;
    insideCells.push(`${row},${col}`);

    // Explore neighboring cells
    floodFill(row - 1, col);
    floodFill(row + 1, col);
    floodFill(row, col - 1);
    floodFill(row, col + 1);
  }

  // Find a starting point inside the closed loop
  let startRow, startCol;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] === '.') {
        startRow = row;
        startCol = col;
        break;
      }
    }
    if (startRow !== undefined) {
      break;
    }
  }

  // Perform flood-fill starting from the inside point
  if (startRow !== undefined) {
    floodFill(startRow, startCol);
  }

  return insideCells;
}
// console.log(INPUT);




const graph = createGraph(INPUT);

// Output the graph (for demonstration purposes)
// console.log(graph);
//
const cellsInsideLoop = getCellsInsideClosedLoop(graph);
// const cellsInsideShape = getCellsInsideShape(graph);
//
// console.log(cellsInsideLoop);
//
// console.log(cellsInsideShape);


const outsideCells = findOutsideCells(INPUT);
console.log(outsideCells);

const insideCells = findInsideCells(INPUT);
console.log(insideCells);