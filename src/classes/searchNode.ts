import Board from './board'
import { MinHeap } from 'min-heap-typed';

class SearchNode {    
    moves: number;
    previousSearchNode: SearchNode | null;
    board: Board
    

    constructor(moves: number, previousSearchNode: SearchNode | null = null, board: Board) {
        this.moves = moves;
        this.previousSearchNode = previousSearchNode;
        this.board = board
    }

    priority(): number {
        return this.moves;
    }

    getBoard() {
        return this.board
    }

}

// const heap = new MinHeap<SearchNode>([], {comparator: (a, b) => a.priority() - b.priority()});

// const node1 = new SearchNode(13);
// const node2 = new SearchNode(15);
// const node3 = new SearchNode(8);

// heap.add(node1);
// heap.add(node2);
// heap.add(node3);

// console.log(heap.poll());
// console.log(heap.peek());

export default SearchNode