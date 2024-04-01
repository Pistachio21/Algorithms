import Board from "./board";
import SearchNode from "./searchNode"
import { MinHeap } from "min-heap-typed";

class Solver {
    initial: Board
    nodeToBoardMap: Map<SearchNode, Board>;
    // find a solution to the initial board (using the A* algorithm)
    constructor(initial: Board) {
        // YOUR CODE HERE
        this.initial = initial
        this.nodeToBoardMap = new Map<SearchNode, Board>();
    }

    // is the initial board solvable? (see below)
    isSolvable(): boolean {
        // PLS MODIFY
        return true
        
    }

    //implement tracking previous boards while solving for solution.
    //implement isSolvable criteria, and moves method

    // min number of moves to solve initial board; -1 if unsolvable
    moves(): number {
        // PLS MODIFY
        return 0;
    }

    // sequence of boards in a shortest solution; null if unsolvable
    solution(): Board[] {
        const priorityQueue = new MinHeap<SearchNode>([], {comparator: (a, b) => a.priority() - b.priority()});
        const initialSearchNode = new SearchNode(0, null, this.initial);
        priorityQueue.add(initialSearchNode);
    
        const visited = new Set<string>();
    
        while (!priorityQueue.isEmpty()) {
            priorityQueue.elements.sort((a, b) => a.priority() - b.priority());
            const currentNode = priorityQueue.poll();
            if (!currentNode) {
                throw new Error("Priority queue is empty unexpectedly.");
            }
            const currentBoard = currentNode.getBoard();
    
            if (currentBoard.isGoal()) {
                const solutionPath: Board[] = [];
                let node: SearchNode | null = currentNode;
                while (node !== null) {
                    solutionPath.unshift(node.getBoard());
                    node = node.previousSearchNode;
                }
                return solutionPath;
            }
    
            visited.add(currentBoard.toStrings());
    
            const neighbors = currentBoard.neighbors();
            for (const neighbor of neighbors) {
                const neighborNode = new SearchNode(currentNode.moves + 1, currentNode, neighbor);
                if (!visited.has(neighbor.toStrings())) {
                    priorityQueue.add(neighborNode);
                }
            }
        }
        return [];
    }//ask aaron how to run this and debug
}

export default Solver;


