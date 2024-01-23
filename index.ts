import { QuickUnion } from "./quickUnion"

class Percolation {
    callQuickUnion: QuickUnion
    randomizer: number
    countOpen: number
    grid: number[][]
    itPercolates: number

    constructor(n: number) {
        this.grid = []
        this.itPercolates = 0
        this.countOpen = 0
        this.randomizer = Math.floor(Math.random() * 3)
        this.callQuickUnion = new QuickUnion()
        if (n <= 0) {
            console.log('enter a number not starting at 0 or less')
        } else {
            for (let i = 0; i < n; i++) {
                let row: number[] = []
                for (let m = 0; m < n; m++) {
                    row.push(0); // Add a zero to the row
                }
                this.grid.push(row); // Push the entire row into sets
            }
        }
    }

    open(row: number, col: number) {
        if (this.randomizer === 1) {
            this.callQuickUnion.union(row, col)
        } else if (this.randomizer === 2) {
            this.callQuickUnion.union(row, col)
        }
    } //does not work

    isOpen(row: number, col: number): boolean {
        if (this.callQuickUnion.connected(row, col)) {
            //if the specified place is open, then its true
            return true
        } else {
            return false
        }

    }
    isFull(row: number, col: number): boolean {
        if (this.callQuickUnion.connected(row, col)) {
            return true
        } else {
            return false
        }

    }


    numberOfOpenSites(): number {
        for (let i = 0; i < this.grid.length; i++) {
            // if (this.grid[i] === 1 && this.grid[i] === 2) {
            //     this.countOpen++
            // }

        }
        return this.countOpen
    }


    percolates(): boolean {
        if (this.itPercolates === 0) {
            return false
        } else {
            return true
        }

    }
}

let newGrid = new Percolation(20)
console.log(newGrid.grid)