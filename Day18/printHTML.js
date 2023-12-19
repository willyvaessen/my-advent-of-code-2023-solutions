const MAP = {
  '0,0': '#',
  '1,0': '#',
  '2,0': '#',
  '3,0': '#',
  '4,0': '#',
  '5,0': '#',
  '6,0': '#',
  '6,-1': '#',
  '6,-2': '#',
  '6,-3': '#',
  '6,-4': '#',
  '6,-5': '#',
  '5,-5': '#',
  '4,-5': '#',
  '4,-6': '#',
  '4,-7': '#',
  '5,-7': '#',
  '6,-7': '#',
  '6,-8': '#',
  '6,-9': '#',
  '5,-9': '#',
  '4,-9': '#',
  '3,-9': '#',
  '2,-9': '#',
  '1,-9': '#',
  '1,-8': '#',
  '1,-7': '#',
  '0,-7': '#',
  '0,-6': '#',
  '0,-5': '#',
  '1,-5': '#',
  '2,-5': '#',
  '2,-4': '#',
  '2,-3': '#',
  '2,-2': '#',
  '1,-2': '#',
  '0,-2': '#',
  '0,-1': '#'
}


// Get the canvas element
const canvas = document.getElementById('mapCanvas');
const context = canvas.getContext('2d');

// Size of each pixel
const pixelSize = 20; // Adjust the size as needed

// Loop through the map and draw rectangles for each '#' or '.' with different colors
for (const coords in MAP) {
  const value = MAP[coords];
  const [x, y] = coords.split(',').map(Number);

  if (value === '#') {
    context.fillStyle = 'black'; // Color for '#'
  } else if (value === '.') {
    context.fillStyle = 'gray'; // Color for '.'
  }

  context.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
}