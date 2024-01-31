import Percolation from './percolation'
export default class PercolationStats {
    n: number
    trials: number
    numberOfOpenSites: number[]
    constructor(n: number, trials: number) {

        if (n <= 0 || trials <= 0) {
            throw new Error('N and Trials should not be 0 and or less than 1')
        }
        this.n = n
        this.trials = trials
        this.numberOfOpenSites = []

        for (let i = 0; i < trials; i++) {
            let percolation = new Percolation(n);
            while (!percolation.percolates()) {
                const row = Math.floor(Math.random() * n);
                const col = Math.floor(Math.random() * n);
                percolation.open(row, col);
            }
            this.numberOfOpenSites[i] = percolation.numberOfOpenSites() / (n * n)
        }
    }

    mean(): number {
        let sum: number = 0;
        for (let i = 0; i < this.trials; i++) {
            sum += this.numberOfOpenSites[i];
        }
        return sum / this.trials;
    }

    stddev(): number {
        let standardDeviationNumerator = 0
        let standardDeviation: number
        for (let i = 0; i < this.numberOfOpenSites.length; i++) {
            standardDeviationNumerator += Math.pow(this.numberOfOpenSites[i] - this.mean(), 2)
        }
        standardDeviation = standardDeviationNumerator / (this.numberOfOpenSites.length - 1)
        return Math.sqrt(standardDeviation);
    }

    confidenceLo(): number {
        return this.mean() - (1.96 * this.stddev()) / Math.sqrt(this.trials)
    }

    confidenceHi(): number {
        return this.mean() + (1.96 * this.stddev() / Math.sqrt(this.trials))
    }
}