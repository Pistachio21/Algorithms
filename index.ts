class Percolation {
    callQuickUnion: WeightedQuickUnion
    randomizer: number
    countOpen: number
    static grid: number[][]
    itPercolates: number
    topSite : number
    bottomSite: number
    n: number

    constructor(n: number) {
        this.n = n
        Percolation.grid = []
        this.itPercolates = 0
        this.countOpen = 0
        this.topSite = n * n
        this.bottomSite = n * n + 1
        this.randomizer = Math.floor(Math.random() * 3)
        this.callQuickUnion = new WeightedQuickUnion()
        if (n <= 0) {
            throw new Error('enter a number not starting at 0 or less')
        } else {
            for (let i = 0; i < n; i++) {
                Percolation.grid.push(Array(n).fill(0));
            }
        }
    }

    open(row: number, col: number) {
        if (row >= this.n || col > this.n || row < 0 || col < 0) {
            throw new Error('enter a number not starting at 0 or less')
        }
        if (Percolation.grid[row][col] === 0) {
            this.callQuickUnion.union(row, col)
        }  
    }

    isOpen(row: number, col: number): boolean {
        if (row >= this.n || col > this.n || row < 0 || col < 0) {
            throw new Error('enter a number not starting at 0 or less')
        }
        if (Percolation.grid[row][col] === 1) {
            //if the specified place is open, then its true
            return true
        } else {
            return false
        }

    }
    isFull(row: number, col: number): boolean {
        if (row >= this.n || col > this.n || row < 0 || col < 0) {
            throw new Error('enter a number not starting at 0 or less')
        }
        let connectBottomSite = row * this.n + col
        return this.callQuickUnion.connected(this.topSite, connectBottomSite)
    }

    numberOfOpenSites(): number {
        for (let i = 0; i < Percolation.grid.length; i++) {
            if (Percolation.grid[i][i] === 1 || Percolation.grid[i][i] === 2) {
                this.countOpen++
            }
        }
        return this.countOpen
    }


    percolates(): boolean {
        for (let col = 1; col <= this.n; col++) {
            if (this.isFull(this.n, col)) {
                return true;
            }
        }
        return false;
    }

    displayGrid() {
        for (let i = 0; i < Percolation.grid.length; i++) {
            console.log(Percolation.grid[i].join(' '));
        }
    }

    randomOpenSite(): void {
        const row = Math.floor(Math.random() * this.n);
        const col = Math.floor(Math.random() * this.n);
        this.open(row, col)
    }
}

class WeightedQuickUnion {
    id: number[]
    sz: number[]

    constructor() {
        this.id = []
        this.sz = []
    }

    public quickUnion(n: number) {
        for (let i = 0; i < n; i++) {
            this.id.push(i)
            this.sz.push(1)
        }
    }

    public root(i: number): number {
        while (i !== this.id[i]) {
            i = this.id[i]
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

        if (i === j) return;

        if (this.sz[i] < this.sz[j]) {
            this.id[i] = j;
            this.sz[j] += this.sz[i];
        }
        else {
            this.id[j] = i;
            this.sz[i] += this.sz[j];
        }
    }
}
let newGrid = new Percolation(5)
console.log(newGrid.randomOpenSite())
console.log(newGrid.displayGrid())