/*
# Problem Statement:
    You are given a weighted, undirected, and connected graph with V vertices numbered from 0 to V-1.
    The graph is provided in the form of an adjacency list, where each entry adj[u] contains a list of pairs [v, w], representing an edge between vertex u and vertex v with weight w.
    Find the sum of the weights of the edges in the Minimum Spanning Tree (MST) of the graph. 
    A minimum spanning tree (MST) or minimum weight spanning tree is a subset of the edges of a connected, edge-weighted undirected graph that connects all the vertices together, without any cycles and with the minimum possible total edge weight.
    Note : The input to the function in code editor is giving in form of adjacency list.


Example 1

    Input: V = 4, adj = [[[1, 1], [3, 4]], [[0, 1], [2, 2]], [[1, 2], [3, 3]], [[0, 4], [2, 3]]]

    Output: 6

    Explanation: 

    Edges included in the MST:

    From node 0 → [1, 1] (weight 1)
    From node 1 → [2, 2] (weight 2)
    From node 2 → [3, 3] (weight 3)
    The total MST weight is 1 + 2 + 3 = 6.

    These edges connect all vertices (0, 1, 2, 3) with minimum cost.

Example 2


    Input: V = 3, adj = [[[1, 5], [2, 15]], [[0, 5], [2, 10]], [[0, 15], [1, 10]]]

    Output: 15

    Explanation: 

    Edges included in the MST:

    From node 0 → [1, 5] (weight 5)
    From node 1 → [2, 10] (weight 10)
    The total weight of the MST is 5+10 = 15
*/


/*
# Intuition

*/


// Solution

class Pair{
    constructor(vertice, cost){
        this.cost = cost;
        this.vertice = vertice;
    }
}
class MinHeap {
  constructor() {
    this.heap = [];
  }

  getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  getLeftChildIndex(index) {
    return 2 * index + 1;
  }

  getRightChildIndex(index) {
    return 2 * index + 2;
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  size() {
    return this.heap.length;
  }

  peek() {
    return this.heap.length === 0 ? null : this.heap[0];
  }

  insert(vertice, cost) {
    let pair = new Pair(vertice, cost);
    this.heap.push(pair);
    this.heapifyUp(this.heap.length - 1);
  }

  heapifyUp(index) {
    while (index > 0) {
      const parentIndex = this.getParentIndex(index);

      if (this.heap[parentIndex].cost <= this.heap[index].cost) {
        break;
      }

      this.swap(parentIndex, index);
      index = parentIndex;
    }
  }

  extractMin() {
    if (this.heap.length === 0) {
      return null;
    }

    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    const minimum = this.heap[0];
    this.heap[0] = this.heap.pop();

    this.heapifyDown(0);

    return minimum;
  }

  heapifyDown(index) {
    const size = this.heap.length;

    while (true) {
      const leftIndex = this.getLeftChildIndex(index);
      const rightIndex = this.getRightChildIndex(index);
      let smallestIndex = index;

      if (
        leftIndex < size &&
        this.heap[leftIndex].cost < this.heap[smallestIndex].cost
      ) {
        smallestIndex = leftIndex;
      }

      if (
        rightIndex < size &&
        this.heap[rightIndex].cost < this.heap[smallestIndex].cost
      ) {
        smallestIndex = rightIndex;
      }

      if (smallestIndex === index) {
        break;
      }

      this.swap(index, smallestIndex);
      index = smallestIndex;
    }
  }
}


class Solution {
    spanningTree(V, adj) {
        let visited = new Array(V).fill(false);
        let mstCost = 0;
        let heap = new MinHeap();
        heap.insert(1, 0);

        while(heap.size() > 0){
            let {vertice, cost} = heap.extractMin();
            if(visited[vertice]){
                // to leave already processed vertices
                continue;
            }
            mstCost += cost;
            visited[vertice] = true;

            for(let [nbr, edgeWt] of adj[vertice]){
                if(!visited[nbr]){
                    heap.insert(nbr, edgeWt);
                }
            }

        }
        return mstCost;
    }
}



/*
# Complexity Analysis

TC- O(ElogE) // Textbook ans is (ElogV) as the heap never hold more than V elements, it does it using decrese_key  method, When you find a shorter edge to a vertex, you update its value in-place using a decrease_key operation.
SC - O(V+E) //  Textbook version O(E), if uses decrese_key method

If you use the Eager approach (the optimized textbook version), the heap size never exceeds (V), so the auxiliary space for the heap itself is indeed O(V)
*/