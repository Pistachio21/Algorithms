export class QuickUnion {
    id: number[]

    constructor() {
        this.id = []
    }

    public quickUnion(n: number) {
        for (let i = 0; i < n; i++) {
            this.id.push(i)
        }
    }

    public root(i: number): number {
        while (i != this.id[i]) {
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
        this.id[i] = j
    }
}

let quickUnion = new QuickUnion();
quickUnion.quickUnion(50)
quickUnion.union(43, 45)
console.log(quickUnion.connected(43, 45))
console.log(quickUnion.root(43))
console.log(quickUnion.id)

