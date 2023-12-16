// Read a text file in JavaScript using Node.js

const fs = require( 'fs' );  // Hover on require and click 'Enable coding assistance for Node.js'
const filePath = 'input.txt';  // Replace with your file path

fs.readFile( filePath, 'utf8', ( err, content ) => {
    if ( err ) {
        console.error( err );
        return;
    }
    console.log( content );
} );
