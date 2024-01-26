class Grid {
    private grid: number[][];

    constructor(private size: number) {
        this.grid = Array.from({length: size}, () => Array(size).fill(0));
    }

    isFull(row: number, col: number): boolean {
        return this.grid[row][col] === 1 || this.grid[row][col] === 2;
    }

    openSite(row: number, col: number) {
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

    public getGrid(): number[][] {
        return this.grid;
    }

    randomOpensite(): boolean {
        const row = Math.floor(Math.random() * this.size);
        const col = Math.floor(Math.random() * this.size);
        if (this.grid[row][col] !== 1) {
            this.openSite(row, col);
            return true;
        }
        return false;
    }
    
    percolates(): boolean {
        for (let col = 1; col <= this.size; col++) {
            if (this.isFull(1, col)) {
                return true;
            }
        }
        this.randomOpensite();
        return false;
    }

    reset(): void {
        this.grid = Array.from({length: this.size}, () => Array(this.size).fill(0));
    }
    
    monteCarlo(numTrials: number): number {
        let numOpened = 0;
        for (let i = 0; i < numTrials; i++) {
            this.reset();
            while (!this.percolates()) {
                if (this.randomOpensite()) {
                    numOpened++;
                }
            }
        }
        return numOpened / (this.size * this.size * numTrials);
    }

    isConnected(): boolean {
        let visited = Array.from({length: this.size}, () => Array(this.size).fill(false));
        let stack = [{row: 0, col: 0}];
        while (stack.length > 0) {
            let site = stack.pop();
            if (!site) continue;
            let {row, col} = site;
            if (row < 0 || row >= this.size || col < 0 || col >= this.size || visited[row][col]) continue;
            visited[row][col] = true;
            const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
            for (let [dx, dy] of directions) {
                stack.push({row: row + dx, col: col + dy});
            }
        }
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                if (!visited[row][col]) return false;
            }
        }
        return true;
    }
    
    startRandomOpensiteEverySecond(): void {
        setInterval(() => {
            this.randomOpensite();
            console.log(this.getGrid());
        }, 2000);
    }
    
}

const grid = new Grid(5);
grid.startRandomOpensiteEverySecond();
console.log(grid.monteCarlo(2000));
