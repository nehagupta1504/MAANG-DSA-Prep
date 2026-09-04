/*
# Problem Statement:
    Same problem as find the path, just edges formulation is little diverted to make problem complex

    You are given N towns (1 to N). All towns are connected via unique directed path as mentioned in the input.

    Given 2 towns find whether you can reach the first town from the second without repeating any edge.

    B C : query to find whether B is reachable from C.

    Input contains an integer array A of size N and 2 integers B and C ( 1 <= B, C <= N ).

    There exist a directed edge from A[i] to i+1 for every 1 <= i < N. Also, it's guaranteed that A[i] <= i for every 1 <= i < N.

    NOTE: Array A is 0-indexed. A[0] = 1 which you can ignore as it doesn't represent any edge.



Problem Constraints

    1 <= N <= 100000




Input Format

    First argument is vector A

    Second argument is integer B

    Third argument is integer C



Output Format

    Return 1 if reachable, 0 otherwise.



    Example Input

    Input 1:

    A = [1, 1, 2]
    B = 1
    C = 2
    Input 2:

    A = [1, 1, 2]
    B = 2
    C = 1


    Example Output

    Output 1:

    0
    Output 2:

    1


    Example Explanation

    Explanation 1:

    Tree is 1--> 2--> 3 and hence 1 is not reachable from 2.
    Explanation 2:

    Tree is 1--> 2--> 3 and hence 2 is reachable from 1.
*/


/*
# Intuition
    1. Only constructAdjList differs in implemntation rest is same as find the path in graph
*/


// Solution
module.exports = { 
    //param A : array of integers
    //param B : integer
    //param C : integer
    //return an integer
       solve : function(A, B, C){
           return firstDFS(A, B, C);
       }
   };
   
   function firstDFS(A, B, C){
       let n = A.length;
       let adjList = constructAdjList(A);
       let visited = new Array(n+1).fill(false);
   
       return dfs(adjList, C, visited, B) ? 1:0;
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
   function constructAdjList(A){
       let n = A.length;
       let adjList = Array.from({length:n+1}, ()=> new Array());
   
       for(let i=1; i < n; i++){
           adjList[A[i]].push(i+1);
       }
       return adjList;
   }


/*
# Complexity Analysis

*/