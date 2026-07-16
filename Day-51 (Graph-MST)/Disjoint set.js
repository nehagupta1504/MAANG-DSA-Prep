/*
# Problem Statement:

    Design a disjoint set (also called union-find) data structure that supports the following operations:


    DisjointSet(int n) initializes the disjoint set with n elements.

    void unionByRank(int u, int v) merges the sets containing u and v using the rank heuristic.

    void unionBySize(int u, int v) merges the sets containing u and v using the size heuristic.

    bool find(int u, int v) checks if the elements u and v are in the same set and returns true if they are, otherwise false.

Example 1

    Input:

        ["DisjointSet", "unionByRank", "unionBySize", "find", "find"]

        [[5], [0, 1], [2, 3], [0, 1], [0, 3]]



    Output:

        [null, null, null, true, false]



Explanation:

    DisjointSet ds = new DisjointSet(5); // Initialize a disjoint set with 5 elements

    ds.unionByRank(0, 1); // Merge sets containing 0 and 1 using rank

    ds.unionBySize(2, 3); // Merge sets containing 2 and 3 using size

    ds.find(0, 1); // Returns true as 0 and 1 are in the same set

    ds.find(0, 3); // Returns false as 0 and 3 are not in the same set

Example 2

Input:

    ["DisjointSet", "unionBySize", "unionBySize", "find", "find"]

    [[3], [0, 1], [1, 2], [0, 2], [0, 1]]



Output:

    [null, null, null, true, true]



Explanation:

    DisjointSet ds = new DisjointSet(3); // Initialize a disjoint set with 3 elements

    ds.unionBySize(0, 1); // Merge sets containing 0 and 1 using size

    ds.unionBySize(1, 2); // Merge sets containing 1 and 2 using rank

    ds.find(0, 2); // Returns true as 0 and 2 are in the same set

    ds.find(0, 1); // Returns true as 0 and 1 are in the same set
*/


/*
# Intuition

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
      let sameSet = this.find(u, v);
      if (sameSet) return null;
  
      let parentofU = this.getUniversalParent(u);
      let parentofV = this.getUniversalParent(v);
  
      if(this.size[parentofU] > this.size[parentofV]){
          this.parent[parentofV] = parentofU;
          this.size[parentofU] += this.size[parentofV];
      }else{
          this.parent[parentofU] = parentofV;
          this.size[parentofV] += this.size[parentofU];
      }
    }
  }
  

/*
# Complexity Analysis

TC- O(4alpha) - O(constant)
SC- O(3n) - O(n)

*/