import WeightedQuickUnion from './WeightedQuickUnion'
export default class Percolation {
    callQuickUnion: WeightedQuickUnion
    countOpen: number
    grid: number[][]
    topSite: number
    bottomSite: number
    n: number
    gridLength: number

    constructor(n: number) {
        if (n <= 0) {
            throw new Error('enter a number not starting at 0 or less')
        }
        this.gridLength = n
        this.n = n
        this.grid = Array.from({ length: n }, () => Array(n).fill(0));
        this.countOpen = 0
        this.topSite = n * n
        this.bottomSite = n * n + 1
        this.callQuickUnion = new WeightedQuickUnion(n * n + 2)
        for (let i = 0; i < n; i++) {
            this.callQuickUnion.union(this.index(0, i), this.topSite)
            this.callQuickUnion.union(this.index(n - 1, i), this.bottomSite)
            this.callQuickUnion.connected(this.topSite, this.index(i, 0));
            this.callQuickUnion.connected(this.bottomSite, this.index(i, 0));
        }
    }

    index(row: number, col: number) {
        return this.gridLength * row + col;
    }

    open(row: number, col: number) {
        if (row < 0 || col < 0 || row >= this.gridLength || col >= this.gridLength) {
            throw new Error('Invalid row or column number.');
        }

        if (this.grid[row][col] === 1) {
            return;
        }

        this.grid[row][col] = 1;
        this.countOpen++;

        if (row === 0) {
            this.callQuickUnion.union(this.index(row, col), this.topSite);
        }
        if (row === this.gridLength - 1) {
            this.callQuickUnion.union(this.index(row, col), this.bottomSite);
        }

        if (row > 0 && this.isOpen(row - 1, col)) {
            this.callQuickUnion.union(this.index(row, col), this.index(row - 1, col));
        }
        if (row < this.gridLength - 1 && this.isOpen(row + 1, col)) {
            this.callQuickUnion.union(this.index(row, col), this.index(row + 1, col));
        }
        if (col > 0 && this.isOpen(row, col - 1)) {
            this.callQuickUnion.union(this.index(row, col), this.index(row, col - 1));
        }
        if (col < this.gridLength - 1 && this.isOpen(row, col + 1)) {
            this.callQuickUnion.union(this.index(row, col), this.index(row, col + 1));
        }
    }

    isOpen(row: number, col: number): boolean {
        if (row > this.n || col > this.n || row < 0 || col < 0) {
            throw new Error('Invalid row or column number.')
        }
        return this.grid[row][col] === 1;
    }

    isFull(row: number, col: number): boolean {
        if (row > this.n || col > this.n || row < 0 || col < 0) {
            throw new Error('Invalid row or column number.')
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
    }

    displayGrid() {
        for (let i = 0; i < this.grid.length; i++) {
            console.log(this.grid[i].join(' '));
        }
    }

    randomOpenSite(): void {
        let row: number;
        let col: number;

       while(!this.percolates()) {
        row = Math.floor(Math.random() * this.n);
        col = Math.floor(Math.random() * this.n);
        if (!this.isOpen(row, col)) {
            this.open(row, col)
        }
       }
       this.displayGrid()
    }
}