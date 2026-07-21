/*
# Problem Statement:
    There are n stones at integer coordinate points on a 2D plane, with at most one stone per coordinate point. Some stones need to be removed.A stone can be removed if it shares the same row or the same column as another stone that has not been removed.
    Given an array of stones of length n where stones[i] = [xi, yi] represents the location of the ith stone, return the maximum possible number of stones that can be removed.


Example 1

    Input : n=6, stones = [[0, 0],[ 0, 1], [1, 0],[1, 2],[2, 1],[2, 2]]

    Output: 5

    Explanation: One of the many ways to remove 5 stones is to remove the following stones:

    [0,0], [1,0], [0,1], [2,1], [1,2]

Example 2

    Input : n = 6, stones = [[0, 0], [0, 2], [1, 3], [3, 1], [3, 2], [4, 3]]

    Output: 4

    Explanation: We can remove the following stones: [0,0], [0,2], [1,3], [3,1]
*/


/*
# Intuition
 Ideology
        1. It says if any stones are in same row or column we can remove It
        2. Lets suppose the stones which share either rows or column are conncted 
        let's say we have these type of connections
            col1 col2 col3 col4
    row1    o---o.     
    row2    |          o
    row3    o---o      |
    row4    |          o---o
    row5    o---o

        3. Now we can remove from each connected component i can remove all the stones except 1 
        for ex- I will remove (1,2) stone since its sharing same row as (1,1)
        (1,1) as same col as (3,1)
        (3,2) same row as(3,1)
        (3,1) same col as (5, 1)
        (5,1) same row as the (5, 2)
        so you can see we can remove all the stones from a connected component except the last one
        total stones present  = connected components
        So # of stones removed = n - connected components

    How to connect the nodes? 
        Make a row and col map
        the nodes which share same row put in the map ex - 0th row - > [1st stone, 3rd stone]
        same for column
        now join the the nodes which are in same column and rows


*/


// Solution
class DisjointSet {
    // Constructor
    constructor(n) {
        /* To store the ranks, parents and 
        sizes of different set of vertices */
        this.rank = new Array(n + 1).fill(0);
        this.parent = new Array(n + 1).fill(0).map((_, i) => i);
        this.size = new Array(n + 1).fill(1);
    }

    // Function to find ultimate parent
    findUPar(node) {
        if (node === this.parent[node])
            return node;
        this.parent[node] = this.findUPar(this.parent[node]);
        return this.parent[node];
    }

    // Function to implement union by rank
    unionByRank(u, v) {
        const ulp_u = this.findUPar(u);
        const ulp_v = this.findUPar(v);
        if (ulp_u === ulp_v) return;
        if (this.rank[ulp_u] < this.rank[ulp_v]) {
            this.parent[ulp_u] = ulp_v;
        } else if (this.rank[ulp_v] < this.rank[ulp_u]) {
            this.parent[ulp_v] = ulp_u;
        } else {
            this.parent[ulp_v] = ulp_u;
            this.rank[ulp_u]++;
        }
    }

    // Function to implement union by size
    unionBySize(u, v) {
        const ulp_u = this.findUPar(u);
        const ulp_v = this.findUPar(v);
        if (ulp_u === ulp_v) return;
        if (this.size[ulp_u] < this.size[ulp_v]) {
            this.parent[ulp_u] = ulp_v;
            this.size[ulp_v] += this.size[ulp_u];
        } else {
            this.parent[ulp_v] = ulp_u;
            this.size[ulp_u] += this.size[ulp_v];
        }
    }

    getSize(node) {
        return this.size[this.findUPar(node)];
    }
}

class Solution {
    maxRemove(stones, n) {
        let ds = new DisjointSet(n);
        let rowMap = new Map();
        let colMap = new Map();

        for(let i=0 ; i < stones.length; i++){
            // x y represent cordinates while i represent stone number
            let x = stones[i][0];
            let y = stones[i][1];

            if(!rowMap.has(x)){
                rowMap.set(x, [])
            }
            rowMap.get(x).push(i);

            if(!colMap.has(y)){
                colMap.set(y, [])
            }
            colMap.get(y).push(i);
        }
        // connect same row stone
        for(let [row, stones] of rowMap.entries()){
            let firstStone = stones[0];
            for(let i=1 ; i < stones.length; i++){
                let secondStone = stones[i];
                ds.unionBySize(firstStone, secondStone);
            }
        }
        // connect same col stone
        for(let stones of colMap.values()){
            let firstStone = stones[0];
            for(let i=1 ; i < stones.length; i++){
                let secondStone = stones[i];
                ds.unionBySize(firstStone, secondStone);
            }
        }

        let disconnectedComponentes = new Set();

        for(let i=0 ; i < n; i++){
           let parent =  ds.findUPar(i);
           disconnectedComponentes.add(parent);
        }
        return n - disconnectedComponentes.size;

    }
}



/*
# Complexity Analysis
    Time Complexity
        O(N * α(N)) where N is the number of stones. The initialization loops run in O(N). Building the maps and unioning nodes involves iterating through stones once and performing DSU operations with path compression and union by size, resulting in near-constant amortized time complexity per operation.
    Space Complexity
        O(N) where N is the number of stones. We store three arrays of size N in the DisjointSet, and two HashMaps (rowMap and colMap) that store all N stones across various buckets.
*/