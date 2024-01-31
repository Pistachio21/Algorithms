export default class WeightedQuickUnion {
    id: number[]
    sz: number[]

    constructor(n: number) {
        this.id = new Array(n)
        this.sz = new Array(n)
        for (let i = 0; i < n; i++) {
            this.id[i] = i
            this.sz[i] = 1
        }
    }

    public root(i: number): number {
        while (i !== this.id[i]) {
            this.id[i] = this.id[this.id[i]];
            i = this.id[i];
        }
        return i;
    }
    
    public connected(p: number, q: number) {
        if (this.root(p) === this.root(q)) {
            return true
        } else {
            return false
        }
    }

    public union(s: number, v: number) {
        s = Math.abs(s);
        v = Math.abs(v);
        if (s >= this.id.length || v >= this.id.length) {
            throw new Error('Invalid indices.');
        }
    
        let i: number = this.root(s);
        let j: number = this.root(v);
    
        if (i === j) return; // Components are already connected
    
        if (this.sz[i] < this.sz[j]) {
            this.id[i] = j;
            this.sz[j] += this.sz[i];
        } else {
            this.id[j] = i;
            this.sz[i] += this.sz[j];
        }
    }    
}