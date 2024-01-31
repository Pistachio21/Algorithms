import Percolation from './percolation'

export default class PercolationStats {
    n: number
    trials: number
    callPercolation: Percolation
    numberOfOpenSites: number[]
    constructor(n: number, trials: number) {

        if (n <= 0 || trials <= 0) {
            throw new Error('N and Trials should not be 0 and/or less than 1')
        }
        this.n = n
        this.trials = trials
        this.callPercolation = new Percolation(n)
        this.numberOfOpenSites = []

        for (let i = 0; i < trials; i++) {
            while (!this.callPercolation.percolates()) {
                const row = Math.floor(Math.random() * n);
                const col = Math.floor(Math.random() * n);
                this.callPercolation.open(row, col);
            }
            this.numberOfOpenSites[i] = this.callPercolation.numberOfOpenSites() / (n * n)
        }
    }   

    mean(): number {
        let sum :number = 0;
        for (let i = 0; i < this.trials; i++) {
            sum += this.numberOfOpenSites[i] / (this.n * this.n);
        }
        return sum / this.trials;
    }

    stddev(): number {
        let standardDeviationNumerator = 0
        let standardDeviation : number
        for (let i = 0; i < this.numberOfOpenSites.length; i++) {
            standardDeviationNumerator += Math.pow(this.numberOfOpenSites[i] - this.mean(), 2)
        }
        standardDeviation = standardDeviationNumerator / (this.numberOfOpenSites.length - 1)
        return standardDeviation
    }//wrong calculation

    confidenceLo(): number {
        return Math.abs(this.mean() - (1.96 * this.stddev()) / Math.sqrt(this.trials))
    }

    confidenceHi(): number {
        return this.mean() + (1.96 * this.stddev() / Math.sqrt(this.trials))
    }
}