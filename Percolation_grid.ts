class Grid {
    private grid: number[][];

    constructor(private size: number) {
        this.grid = Array.from({length: size}, () => Array(size).fill(0));
    }

    openSite(row: number, col: number) {
        // Check if the site is within the grid boundaries
        if (row >= 0 && row < this.size && col >= 0 && col < this.size) {
            this.grid[row][col] = 1;
            this.checkSurroundingCells(row, col);
        }
    }

    checkSurroundingCells(row: number, col: number) {
        const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        directions.forEach(([dx, dy]) => {
            const newRow = row + dx;
            const newCol = col + dy;
            if (newRow >= 0 && newRow < this.size && newCol >= 0 && newCol < this.size && this.grid[newRow][newCol] === 2) {
                this.grid[row][col] = 2;
            }
        });
    }

    public getGrid(): number [][]{
        return this.grid
    }

    randomOpensite():void{
        const row = Math.floor(Math.random())
    }
}

const grid = new Grid(5);
grid.randomOpensite();
console.log(grid.getGrid);
