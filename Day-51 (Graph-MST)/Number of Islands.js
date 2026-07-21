/*
# Problem Statement:
    Given n, m denoting the row and column of the 2D matrix, and an array A of size k denoting the number of operations. Matrix elements are 0 if there is water or 1 if there is land. Originally, the 2D matrix is all 0 which means there is no land in the matrix.
    The array has k operator(s) and each operator has two integers A[i][0], A[i][1] means that you can change the cell matrix[A[i][0]][A[i][1]] from sea to island. Return how many islands are there in the matrix after each operation.
    The directions to check for the island are up, down, right, left. The answer array will be of size k.


Example 1

    Input: n = 4, m = 5, k = 4, A = [[1,1],[0,1],[3,3],[3,4]] 

    Output: [1, 1, 2, 2]

    Explanation: The following illustration is the representation of the operation:



Example 2

    Input: n = 4, m = 5, k = 12, A = [[0,0],[0,0],[1,1],[1,0],[0,1],[0,3],[1,3],[0,4], [3,2], [2,2],[1,2], [0,2]] 

    Output: [1, 1, 2, 1, 1, 2, 2, 2, 3, 3, 1, 1] 

    Explanation: If we follow the process like in example 1, we will get the above result.
*/


/*
# Intuition

    When adding a new land cell:

    1. Duplicate operation: If the cell is already land, the island count remains unchanged.
    2. No land neighbour: A new island is created: count + 1.
    3. One land neighbour: It joins that island: count remains unchanged.
    4. Multiple land neighbours:
    If they belong to the same island, count remains unchanged.
    If they belong to different islands, the new cell merges them.


    1. If i have 4 nbrs and their parents are same, then the op will be same, make the current node parent as the universal parent
    2. Now if 2 nodes have same parent and 2 nodes have diff universal parent, it means total 2 universal parents, now they'll be connected so reduce the total op by 1 and make all nodes union by size
    3. If 3 diff universal parents I would be be reduces by 2



*/


// Solution
class DisjointSet {
    constructor(n) {
      this.rank = new Array(n).fill(0);
      this.size = new Array(n).fill(0);
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
  
      if(parentofU == parentofV){
          return false;
      }
  
      if(this.size[parentofU] > this.size[parentofV]){
          this.parent[parentofV] = parentofU;
          this.size[parentofU] += this.size[parentofV];
      }else{
          this.parent[parentofU] = parentofV;
          this.size[parentofV] += this.size[parentofU];
      }
      return true;
    }
  }
  
  class Solution {
      numOfIslands(n, m, A) {
          let totalCells = n*m;
          let matrix = Array.from({length: n }, ()=> new Array(m).fill(0));
          let ds = new DisjointSet(totalCells);
          let op = []; 
  
  
          for(let i = 0; i < A.length; i++){
              let x = A[i][0];
              let y = A[i][1];
              let lastEntry = op.length > 0 ? op[op.length-1]: 0;
              // only need in case of non duplicate entry
              let landNbrs = matrix[x][y] == 0 ? checkLandNbrs(n, m, matrix, x, y): [];
  
              if(matrix[x][y] == 1){
                  // duplicate operation or no land nbr
                  op.push(lastEntry);
  
              }else if(landNbrs.length == 0){
                  op.push(lastEntry+1);
  
              }else if(landNbrs.length == 1){
                  // only 1 land nbr thn count won't increase
                  let node1 = x*m + y;
                  let node2 = landNbrs[0][0]*m + landNbrs[0][1];
                  // connect nbrs
                  ds.unionBySize(node1, node2);
                  op.push(lastEntry);
  
              }else{
                  // more than 1 nbr they can either be connected or this can the the conncting node
                  let universalParent = new Set();
                  for(let [row, col] of landNbrs){
                      let node2 = row*m +col;
                      let parent = ds.getUniversalParent(node2);
                      universalParent.add(parent);
                  }
                  // if 4 diff parents means 4 or more diff lands now 4 lands will be connected and the land count would be reduced by 3
                  let newLandCount = lastEntry - (universalParent.size -1);
                  op.push(newLandCount);
  
                  // Further processing- connect the nbrs
                  let node1 = x*m + y;
                  for(let [row, col] of landNbrs){
                      let node2 = row*m +col;
                      ds.unionBySize(node1, node2);
                  }
                  
              }
              matrix[x][y] = 1;
          }
          return op;
      }
  }
  
  function checkLandNbrs(n, m, matrix,  i, j){
      let dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
      let nbrs = []
      for(let [x1, y1] of dirs){
          let row = i + x1;
          let col = j + y1;
          if(row >= 0 && row < n && col >= 0 && col < m && matrix[row][col] == 1){
              nbrs.push([row, col]);
          }
      }
      return nbrs;
  }

/*
# Complexity Analysis
Time Complexity
    O(Q * α(N*M)) where Q is the number of operations in A, N*M is the number of cells in the grid, and α is the Inverse Ackermann function due to Disjoint Set Union operations (find and union).
Space Complexity
    O(N * M) to store the Disjoint Set parent/size arrays and the matrix representation of the grid.
*/