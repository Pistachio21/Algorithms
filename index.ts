class Percolation {
    callQuickUnion: QuickUnion
    randomizer: number
    countOpen: number
    static grid: number[][]
    itPercolates: number

    constructor(n: number) {
        Percolation.grid = []
        this.itPercolates = 0
        this.countOpen = 0
        this.randomizer = Math.floor(Math.random() * 3)
        this.callQuickUnion = new QuickUnion()
        if (n <= 0) {
            console.log('enter a number not starting at 0 or less')
        } else {
            for (let i = 0; i < n; i++) {
                Percolation.grid.push(Array(n).fill(0));
            }
        }
    }

    open(row: number, col: number) {
       this.callQuickUnion.union(row, col)
        
    } //does not work

    isOpen(row: number, col: number): boolean {
        if (Percolation.grid[row][col] === 1) {
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
        for (let i = 0; i < Percolation.grid.length; i++) {
            // if (Percolation.grid[i] === 1 && Percolation.grid[i] === 2) {
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

    displayGrid() {
        for (let i = 0; i < Percolation.grid.length; i++) {
            console.log(Percolation.grid[i].join(' '));
        }
    }
}


class QuickUnion {
    id: number[][]

    constructor() {
        this.id = Percolation.grid
    }

    public quickUnion(n: number) {
        for (let i = 0; i < n; i++) {
            this.id.push([i])
        }
    }

    public root(i: number): number {
        for (let i = 0; i < this.id.length; i++) {
            while (i != this.id[i][i]) {
                [i] = this.id[i]
            }
        }
        return i
    }

    public connected(p: number, q: number) {
        if (this.root(p) === this.root(q)) {
            return true
        } else {
            return false
        }
    }

    public union(s: number, v: number) {
        let i: number = this.root(s)
        let j = this.root(v)
        this.id[i][i] = j
    }
}
let newGrid = new Percolation(5)
newGrid.open(0,0)

console.log(newGrid.displayGrid())