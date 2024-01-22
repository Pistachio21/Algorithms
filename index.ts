import { QuickUnion } from "../quickUnion"

class Percolation {
    callQuickUnion: QuickUnion
    sets: string[] = []

    constructor(n: number) {
        this.callQuickUnion = new QuickUnion()
        if (n <= 0) {
            console.log('enter a number not starting at 0 or less')
        } else {
            for (let i = 0; i < n; i++) {
                this.sets.push("0")
            }
        }
    }
    open(row: number, col: number) {
        //determine the criteria for full and empty open site. /
        //A full site is an open site that can be connected to an open site in the
        // top row via a chain of neighboring (left, right, up, down) open sites
        //when a full open site is created, it can affect other connecting sites
        //most likely use quickunion para sa diri na scenario
        //check adjacent if its 1 or 0, if 1, ma connect, if 0, nothing happens.
        //if closed = 0, and if empty open site = 1, full open site = 2
        //how to determine the system stops at the last border.
        //research weighted quick union

        
    }
    isOpen(row: number, col: number): boolean {
        if (this.callQuickUnion.connected(row, col)) {
            //if the specified place is open, then its true
            return true
        } else {
            return false
        }

    }
    isFull(row: number, col: number): boolean {

    }


    numberOfOpenSites(): number {
        return 0
    }


    percolates(): boolean {
        if (p === 0) {
            return false
        } else {
            return true
        }

    }
}