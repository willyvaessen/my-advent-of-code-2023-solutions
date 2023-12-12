// Iteration testing
//     Below are 2 loops, to test iterating over the 2D array in two ways. First row by row, then column by column.
//     They are not needed for the program itself.
// ROW first, COL next
for (let row = 0; row < INPUT.length; row++) {
    for (let col = 0; col < INPUT[row].length; col++) {
        console.log(INPUT[row][col]);
    }
}       //  Check row by row
// COL first, ROW next (or at least, an attempt)
for (let col = 0; col < INPUT[0].length; col++) {
    for (let row = 0; row < INPUT.length; row++) {
        console.log(INPUT[row][col]);
    }
}   //  Check column by column
//  END of Iteration Testing part
