import Percolation from './percolation'

class PercolationStats {
    n: number
    trials: number
    callPercolation: Percolation
    numberOfOpenSites: number[]
    constructor(n: number, trials: number) {
        this.n = n
        this.trials = trials
        this.callPercolation = new Percolation(trials)
        this.numberOfOpenSites = Array(trials).fill(0)
    }

    runTheTrials() {
        for (let i = 0; i < this.trials; i++) {
            let percolation = new Percolation(this.n);
            while (!percolation.percolates()) {
                if (percolation.randomOpenSite()) {
                    this.numberOfOpenSites[i]++;
                }
            }
        }
    }

    mean(): number {
        let sum = 0;
        for (let t = 0; t < this.trials; t++) {
            sum += this.numberOfOpenSites[t] / (this.n * this.n);
        }
        return sum / this.trials;
    }


    stddev(): number {
        let standardDeviation = 0
        for (let i = 0; i < this.trials; i++) {
            standardDeviation += Math.pow(this.numberOfOpenSites[i] /
                (this.n * this.n) - this.mean(), 2)
        }
        return Math.sqrt(standardDeviation / this.trials - 1)
    }

    confidenceLo(): number {
        return this.mean() - (1.96 * this.stddev() / Math.sqrt(this.trials))
    }

    confidenceHi(): number {
        return this.mean() - (1.96 * this.stddev() / Math.sqrt(this.trials))
    }
}