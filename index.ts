import PercolationStats from './percolationStats';
const readlineSync = require('readline-sync');

let getN = Number(readlineSync.questionInt('Enter a number for the n x n grid:'))
let getTrials = Number(readlineSync.questionInt('Enter a number for the number of trials:'))

let newStatistics = new PercolationStats(getN, getTrials)
console.log('Mean:' + newStatistics.mean())
console.log('Standard Deviation: ' + newStatistics.stddev())
console.log(newStatistics.confidenceHi() + ',' + newStatistics.confidenceLo())