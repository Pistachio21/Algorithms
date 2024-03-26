class Board {
    tiles: number[][]
    size: number
    // create a board from an n-by-n array of tiles,
    // where tiles[row][col] = tile at (row, col)
    constructor(tiles: number[][]) {
        // YOUR CODE HERE
        this.tiles = tiles
        this.size = this.tiles.length
    }

    // string representation of this board
    toStrings(): string {
        return this.tiles.flat().join('');
    }
    
    // board dimension n
    dimension(): number {
        // PLS MODIFY
        return this.size
    }

    // number of tiles out of place
    hamming(): number {
        let count = 0;
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (this.tiles[i][j] !== i * this.size + j + 1) {
                    count++;
                }
            }
        }
        return count;
    }

    // sum of Manhattan distances between tiles and goal
    manhattan() {
        let sum = 0;
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                const currentNumber = i * this.size + j + 1;
                let goalRow = -1
                let goalCol = -1;
                for (let row = 0; row < this.size; row++) {
                    const col = this.tiles[row].indexOf(currentNumber);
                    if (col !== -1) {
                        goalRow = row;
                        goalCol = col;
                        break;
                    }
                }
                const distance = Math.abs(i - goalRow) + Math.abs(j - goalCol);
                sum += distance;
            }
        }

        return sum;
    }


    // is this board the goal board?
    isGoal(): boolean {
        // PLS MODIFY
        return this.hamming() === 0
    }

    // does this board equal y?
    equals(y: Board): boolean {
        // PLS MODIFY
        return this.manhattan() < y.manhattan()
    }

    // all neighboring boards
    neighbors(): Board[] {
        // Find the blank square's position
        let blankRow = -1;
        let blankCol = -1;
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (this.tiles[i][j] === 0) {
                    blankRow = i;
                    blankCol = j;
                    break;
                }
            }
            if (blankRow !== -1) break;
        }
        const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]; // Right, Down, Left, Up
        let neighbors: Board[] = [];


        for (let i = 0; i < directions.length; i++) {
            for (let j = 0; j < directions.length; j++) {
                let newRow = blankRow + directions[i][j];
                let newCol = blankCol + directions[i][j];
                if (newRow >= 0 && newRow < this.size && newCol >= 0 && newCol < this.size) {

                    let newTiles = JSON.parse(JSON.stringify(this.tiles));
                    [newTiles[blankRow][blankCol], newTiles[newRow][newCol]] =
                        [newTiles[newRow][newCol], newTiles[blankRow][blankCol]];
                    neighbors.push(new Board(newTiles));
                }
            }
        }

        return neighbors;
    }

    // a board that is obtained by exchanging any pair of tiles
    twin(): Board {
        let position1 = -1
        let position2 = -1
        let position3 = -1
        let position4 = -1
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (this.tiles[i][j] !== 0) {
                    if (position1 === -1 && position2 === -1) {
                        position1 = i
                        position2 = j
                    }
                } else {
                    if (position3 === -1 && position4 === -1) {
                        position3 = i
                        position4 = j
                        break
                    }
                }
            }
            let newBoard = this.tiles[position1][position2]
            this.tiles[position1][position2] = this.tiles[position3][position4]
            this.tiles[position3][position4] = newBoard
        }
        // PLS MODIFY
        return new Board(this.tiles);
    }
}

export default Board;