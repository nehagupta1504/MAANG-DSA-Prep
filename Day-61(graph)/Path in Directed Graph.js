/*
# Problem Statement:
Given an directed graph having A nodes labelled from 1 to A containing M edges given by matrix B of size M x 2such that there is a edge directed from node

B[i][0] to node B[i][1].

Find whether a path exists from node 1 to node A.

Return 1 if path exists else return 0.

NOTE:

There are no self-loops in the graph.
There are no multiple edges between two nodes.
The graph may or may not be connected.
Nodes are numbered from 1 to A.
Your solution will run on multiple test cases. If you are using global variables make sure to clear them.


Problem Constraints

2 <= A <= 105

1 <= M <= min(200000,A*(A-1))

1 <= B[i][0], B[i][1] <= A



Input Format

The first argument given is an integer A representing the number of nodes in the graph.

The second argument given a matrix B of size M x 2 which represents the M edges such that there is a edge directed from node B[i][0] to node B[i][1].



Output Format

Return 1 if path exists between node 1 to node A else return 0.



Example Input

Input 1:

 A = 5
 B = [  [1, 2] 
        [4, 1] 
        [2, 4] 
        [3, 4] 
        [5, 2] 
        [1, 3] ]
Input 2:

 A = 5
 B = [  [1, 2]
        [2, 3] 
        [3, 4] 
        [4, 5] ]


Example Output

Output 1:

 0
Output 2:

 1


Example Explanation

Explanation 1:

 The given doens't contain any path from node 1 to node 5 so we will return 0.
Explanation 2:

 Path from node1 to node 5 is ( 1 -> 2 -> 3 -> 4 -> 5 ) so we will return 1.    
*/


/*
# Intuition
    1. The logic is to use DFS and whenever the source node becomes the DEST node we will return true, means path is found
*/


// Solution
module.exports = { 
    //param A : integer
    //param B : array of array of integers
    //return an integer
       solve : function(A, B){
           return findPath(A, B)
       }
   };
   function findPath(A, B){
       let adjList = createAdjList(A, B);
       let visited = new Array(A+1).fill(false);
       return dfs(adjList, 1, visited, A) ? 1: 0;
   }
   
   function createAdjList(n, edges){
       let adjList = Array.from({length: n+1}, ()=> new Array());
   
       for(let [u, v] of edges){
           adjList[u].push(v);
       }
       return adjList;
   }
   
   function dfs(adjList, i, visited, dest){
      if(i == dest){
          return true;
      }
      visited[i] = true;
      for(let nbr of adjList[i]){
          if(!visited[nbr]){
              if(dfs(adjList, nbr, visited, dest)) return true;
          }
      }
      return false;
   }



/*
# Complexity Analysis
   TC - O(V+E) => V: vertices, E: Edges
   SC- O(n)

*/