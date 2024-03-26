import Board from "./board";

function testBoard() {
    const tiles1 = [[1, 2, 3], [4, 5, 6], [7, 8, 0]];
    const tiles2 = [[1, 2, 3], [4, 0, 6], [7, 5, 8]];

    const board1 = new Board(tiles1);
    const board2 = new Board(tiles2);

    // Test toStrings method
    const expectedString1 = '123456780';
    const expectedString2 = '123406578';
    console.log('toStrings:', );

    // Test dimension method
    const expectedDimension1 = 3;
    const expectedDimension2 = 3;
    console.log('dimension:', tiles1);
}

testBoard()//change the test cases