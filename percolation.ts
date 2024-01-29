import WeightedQuickUnion from './WeightedQuickUnion'

export default class Percolation {
    callQuickUnion: WeightedQuickUnion
    countOpen: number
    grid: number[][]
    topSite: number
    percolated: boolean
    bottomSite: number
    n: number
    shouldContinue: boolean
    intervalId: NodeJS.Timeout | null;

    constructor(n: number) {
        if (n <= 0) {
            throw new Error('enter a number not starting at 0 or less')
        }
        this.percolated = false
        this.shouldContinue = false
        this.intervalId = null;
        this.n = n
        this.grid = new Array<number[]>(n).fill([]).map(() => new Array<number>(n).fill(0))
        this.countOpen = 0
        this.topSite = n * n
        this.bottomSite = n * n + 1
        this.callQuickUnion = new WeightedQuickUnion(n * n + 2)
    }

    index(row: number, col: number) {
        return this.n * (row - 1) + col
    }

    open(row: number, col: number) {
        if (row > this.n || col > this.n || row < 0 || col < 0) {
            throw new Error('enter a number not starting at 0 or less')
        }
        //possible bug
        this.grid[row - 1][col - 1] = 1
        this.checkSurroundingCells(row, col);

    }

    isOpen(row: number, col: number): boolean {
        if (row > this.n || col > this.n || row < 0 || col < 0) {
            throw new Error('enter a number not starting at 0 or less')
        }
        if (this.grid[row - 1][col - 1] === 1) {
            //if the specified place is open, then its true
            return true
        } else {
            return false
        }

    }
    isFull(row: number, col: number): boolean {
        if (row > this.n || col > this.n || row < 0 || col < 0) {
            throw new Error('enter a number not starting at 0 or less')
        }
        let connectBottomSite = row * this.n + col
        return this.callQuickUnion.connected(this.topSite, connectBottomSite)
    }

    numberOfOpenSites(): number {
        this.countOpen = 0;
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[i].length; j++) {
                if (this.grid[i][j] === 1 || this.grid[i][j] === 2) {
                    this.countOpen++;
                }
            }
        }
        return this.countOpen;
    }

    percolates(): boolean {
        return this.callQuickUnion.connected(this.topSite, this.bottomSite)
        // for (let col = 1; col <= this.n; col++) {
        //     if (this.isFull(1, col)) {
        //         this.percolated = true;
        //         return true;
        //     }
        // }
        // return false;
    }

    displayGrid() {
        for (let i = 0; i < this.grid.length; i++) {
            console.log(this.grid[i].join(' '));
        }
    }

    randomOpenSite(): boolean {
        let row: number;
        let col: number;
        let opened: boolean = false;
        if (!this.percolated) {
            while (!opened) {
                row = Math.floor(Math.random() * this.n) + 1;
                col = Math.floor(Math.random() * this.n ) + 1;
                if (this.grid[row][col] === 0) {
                    this.grid[row][col] = 1;
                    this.checkSurroundingCells(row, col);
                    this.countOpen++
                    opened = true;
                }
            }
        } else {
            return false
        }
        return opened;
    }

//randomizer needs: after change values, check if it percolates, if not go on, if percolates, stop.
    checkSurroundingCells(row: number, col: number) {
        if (row === 1) {
            this.callQuickUnion.union(this.index(row, col), this.topSite)
        }
        if (row === this.n) {
            this.callQuickUnion.union(this.index(row, col), this.bottomSite)
        }
        //possible bug
        if (row > 1 && this.isOpen(row - 1, col)) {
            this.callQuickUnion.union(this.index(row, col), this.index(row - 1, col))
        }
        if (row < this.n && this.isOpen(row + 1, col)) {
            this.callQuickUnion.union(this.index(row, col), this.index(row + 1, col))
        }
        if (col > 1 && this.isOpen(row, col - 1)) {
            this.callQuickUnion.union(this.index(row, col), this.index(row, col - 1))
        }
        if (row < this.n && this.isOpen(row, col + 1)) {
            this.callQuickUnion.union(this.index(row, col), this.index(row, col + 1))
        }
        this.countOpen++
    }

    startRandomOpenSiteEverySecond(): void {
        this.intervalId = setInterval(() => {
            if (!this.percolates()) {
                this.randomOpenSite();
                console.log(this.displayGrid());
            } else {
                if (this.intervalId) {
                    clearInterval(this.intervalId);
                }
                this.intervalId = null;
                console.log('Top and bottom rows are connected. Simulation ended.');
            }
        }, 1000);
    }

    openSite(row: number, col: number) {
        this.grid[row][col] = 1;
        this.checkSurroundingCells(row, col);
        this.countOpen++
    }

    checkPercolation(): boolean {
        return this.callQuickUnion.connected(this.topSite, this.bottomSite);
    }

    check() {
        this.percolated = this.checkPercolation();
    }
}

let newGrid = new Percolation(5)
newGrid.startRandomOpenSiteEverySecond()
console.log(newGrid.percolates())
newGrid.displayGrid()