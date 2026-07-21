/*
# Problem Statement:
Given an n x n binary matrix grid, it is allowed to change at most one 0 to 1. A group of connected 1s forms an island, where two 1s are connected if they share one of their sides.
Return the size of the largest island in the grid after applying this operation.


Example 1

    Input: grid = [[1,0],[0,1]]

    Output: 3

    Explanation: We change any one 0 to 1 and connect two 1s, then we get an island with maximum area = 3.

Example 2

    Input: grid = [[1,1],[1,1]]

    Output: 4

    Explanation: The largest island already exists with size 4.
*/


/*
# Intuition
  If all the cells are 1 the size of grid is the answer
    I have to find the 0 which connects the 2 bigger islands


    [
        [1,1,0,0,0]
        [0,0,1,1,1]
        [1,1,0,0,0]
        [0,1,0,0, 0]
    ]
    1. first traverse through the whole grid and make it cconncted using disjoint set
    2. For each zero do this
        1. find its nbrs which are non zero
            a. if no nbr present then size can be 1
            b. If 1 nbr present then size is nbr size + 1
            c. If more than 1 nbr present, 
                1. find their universal parents
                    a. If 1 universal parent then size is 1+ universalparentsize
                    b. if more than 1 present then size is size of all universal nbrs + 1

*/


// Solution
class DisjointSet {
    constructor(n) {
      this.rank = new Array(n).fill(0);
      this.size = new Array(n).fill(1);
      this.parent = Array.from({ length: n }, (_, index) => index);
    }
  
    getUniversalParent(node) {
      if (node == this.parent[node]) {
        return node;
      }
      return (this.parent[node] = this.getUniversalParent(this.parent[node]));
    }
  
    find(u, v) {
      let parentofU = this.getUniversalParent(u);
      let parentofV = this.getUniversalParent(v);
      if (parentofU == parentofV) {
        return true;
      }
      return false;
    }
  
    unionByRank(u, v) {
      let sameSet = this.find(u, v);
      if (sameSet) return null;
  
      let parentofU = this.getUniversalParent(u);
      let parentofV = this.getUniversalParent(v);
  
      if (this.rank[parentofU] > this.rank[parentofV]) {
        this.parent[parentofV] = parentofU;
      } else if (this.rank[parentofU] < this.rank[parentofV]) {
        this.parent[parentofU] = parentofV;
      } else {
        this.parent[parentofV] = parentofU;
        this.rank[parentofU] += 1;
      }
    }
  
    unionBySize(u, v) {
      let parentofU = this.getUniversalParent(u);
      let parentofV = this.getUniversalParent(v);
  
      if (parentofU == parentofV) {
        return false;
      }
  
      if (this.size[parentofU] > this.size[parentofV]) {
        this.parent[parentofV] = parentofU;
        this.size[parentofU] += this.size[parentofV];
      } else {
        this.parent[parentofU] = parentofV;
        this.size[parentofV] += this.size[parentofU];
      }
      return true;
    }
  }
  function findNonZeroNbr(n, m, matrix, i, j) {
    let dirs = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];
    let nbrs = [];
    for (let [x1, y1] of dirs) {
      let row = i + x1;
      let col = j + y1;
      if (row >= 0 && row < n && col >= 0 && col < m && matrix[row][col] == 1) {
        nbrs.push([row, col]);
      }
    }
    return nbrs;
  }
  
  
  class Solution {
    largestIsland(grid) {
      let maxSize = 1;
      let n = grid.length;
      let m = grid[0].length;
      let dirs = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
      ];
  
      let ds = new DisjointSet(n * m);
      let oneCount = 0;
      // Step 1
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
          if (grid[i][j] == 1) {
            oneCount++;
            let node1 = i * m + j;
            let nonZeroNbrs = findNonZeroNbr(n, m, grid, i, j);
  
            for (let [x, y] of nonZeroNbrs) {
                let node2 = x * m + y;
                ds.unionBySize(node1, node2);
            }
            
          }
        }
      }
      // If all 1
      if(oneCount == n*m){
          return n*m;
      }
  
      // Step 2 for each zero check
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
          if (grid[i][j] == 0) {
            let nonZeroNbrs = findNonZeroNbr(n, m, grid, i, j);
            let size = 1;
            
            let parentMap = new Set();
  
            if (nonZeroNbrs.length > 0) {
              for (let [x, y] of nonZeroNbrs) {
                let node = x * m + y;
                let parent = ds.getUniversalParent(node);
                if(!parentMap.has(parent)){
                  parentMap.add(parent);
                  size += ds.size[parent];
                }
              }
            }
  
            maxSize = Math.max(size, maxSize);
          }
        }
      }
      return maxSize;
    }
  }


/*
# Complexity Analysis

Time Complexity

    Let the grid dimensions be N×M.

    Building the DSU: O(NMα(NM))
    Checking every zero: O(NMα(NM))
    Space: O(NM)

    Overall: O(NMα(NM)) time
	​

Space Complexity: O(NM) 
	​

*/