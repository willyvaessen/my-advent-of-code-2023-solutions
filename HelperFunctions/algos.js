//  This file contains some algorithms that help me solve (real world) problems trough JavaScript


//  Dijkstra's Algorithm
function dijkstra(graph, start) {
    // Create an object to store the shortest distance from the start node to every other node
    let distances = {};

    // A set to keep track of all visited nodes
    let visited = new Set();

    // Get all the nodes of the graph
    let nodes = Object.keys(graph);

    // Initially, set the shortest distance to every node as Infinity
    for (let node of nodes) {
        distances[node] = Infinity;
    }

    // The distance from the start node to itself is 0
    distances[start] = 0;

    // Loop until all nodes are visited
    while (nodes.length) {
        // Sort nodes by distance and pick the closest unvisited node
        nodes.sort((a, b) => distances[a] - distances[b]);
        let closestNode = nodes.shift();

        // If the shortest distance to the closest node is still Infinity, then remaining nodes are unreachable and we can break
        if (distances[closestNode] === Infinity) break;

        // Mark the chosen node as visited
        visited.add(closestNode);

        // For each neighboring node of the current node
        for (let neighbor in graph[closestNode]) {
            // If the neighbor hasn't been visited yet
            if (!visited.has(neighbor)) {
                // Calculate tentative distance to the neighboring node
                let newDistance = distances[closestNode] + graph[closestNode][neighbor];

                // If the newly calculated distance is shorter than the previously known distance to this neighbor
                if (newDistance < distances[neighbor]) {
                    // Update the shortest distance to this neighbor
                    distances[neighbor] = newDistance;
                }
            }
        }
    }

    // Return the shortest distance from the start node to all nodes
    return distances;
}


module.exports = {
    dijkstra,

    // Add more utility functions as needed
};