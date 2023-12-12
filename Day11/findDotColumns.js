

function expandRowWithColumns(rowToExpand, columns) {
    let expandedRow = rowToExpand;

    for (let i = 0; i < columns.length; i++) {
        expandedRow = insertColumn(expandedRow, columns[i]);
    }

    return expandedRow;
}

// Example usage
const originalRow = 'abcdefgh';

const columnsToAdd = [2, 5, 7];

const finalRow = expandRowWithColumns(originalRow, columnsToAdd);

console.log(finalRow);








// function insertExtraColumn(array) {
//     const columnsWithAllDots = findColumnsWithAllDots(array);
//     console.log(columnsWithAllDots)
//     const newArray = [...array];
//
//     columnsWithAllDots.forEach(columnIndex => {
//         newArray.forEach((row, rowIndex) => {
//             newArray[rowIndex] = [...row.slice(0, columnIndex + 1), 'A', ...row.slice(columnIndex + 1)];
//         });
//     });
//
//     return newArray;
// }
//
// function findColumnsWithAllDots(array) {
//     const columnsWithAllDots = [];
//
//     for (let col = 0; col < array[0].length; col++) {
//         const allDots = array.every(row => row[col] === '.');
//         if (allDots) {
//             columnsWithAllDots.push(col);
//         }
//     }
//
//     return columnsWithAllDots;
// }
//
// const originalArray = [
//   '...#......', '.......#..',
//   '#.........', '..........',
//   '......#...', '.#........',
//   '.........#', '..........',
//   '.......#..', '#...#.....'
// ]
// ;
// console.log(originalArray)
// const newArray = insertExtraColumn(originalArray);
// console.log(newArray);
//
//
//
//
// rowsToStrings(newArray);
// console.log(rowsToStrings(newArray));