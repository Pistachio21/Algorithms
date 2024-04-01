import Board from "./board";
// Test constructor
const tiles1 = [[1, 2], [3, 0]];
const board1 = new Board(tiles1);
console.log(board1.tiles); // Expected: [[1, 2], [3, 0]]
console.log(board1.size);  // Expected: 2
// Test toStrings
const tiles2 = [[1, 2, 3], [4, 5, 6], [7, 8, 0]];
const board2 = new Board(tiles2);
console.log(board2.toStrings()); // Expected: '123456780'
// Test dimension
console.log(board1.dimension()); // Expected: 2
console.log(board2.dimension()); // Expected: 3
// Test hamming
console.log(board1.hamming()); // Expected: 0
console.log(board2.hamming()); // Expected: 0
// Test manhattan
console.log(board1.manhattan()); // Expected: 0
console.log(board2.manhattan()); // Expected: 0
// Test isGoal
console.log(board1.isGoal()); // Expected: true
console.log(board2.isGoal()); // Expected: true or false, depending on the puzzle
// Test equals
const tiles3 = [[1, 2], [3, 0]]; // Same as board1
const board3 = new Board(tiles3);
console.log(board1.equals(board3)); // Expected: true
// Test neighbors
const neighbors = board2.neighbors();
console.log(neighbors[0]); // Expected: 2, if blank tile is in the middle
// Test twin
const twinBoard = board2.twin();
console.log(twinBoard); // Expected: a new board with two tiles swapped
//still has a few bugs, fix later.