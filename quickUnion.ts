export class WeightedQuickUnion {
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

let quickUnion = new WeightedQuickUnion();
quickUnion.quickUnion(50)
quickUnion.union(43, 45)
console.log(quickUnion.connected(43, 45))
console.log(quickUnion.root(43))
console.log(quickUnion.id)

