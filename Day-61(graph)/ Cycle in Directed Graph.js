/*
# Problem Statement:
    Given an directed graph having A nodes. A matrix B of size M x 2 is given which represents the M edges such that there is a edge directed from node B[i][0] to node B[i][1].

    Find whether the graph contains a cycle or not, return 1 if cycle is present else return 0.

    NOTE:

    The cycle must contain atleast two nodes.
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

    Return 1 if cycle is present else return 0.



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

    1
    Output 2:

    0


    Example Explanation

    Explanation 1:

    The given graph contain cycle 1 -> 3 -> 4 -> 1 or the cycle 1 -> 2 -> 4 -> 1
    Explanation 2:

    The given graph doesn't contain any cycle.
*/


/*
# Intuition
    1. Directed graph contains a cycle can be identified using 2 algos
        1. DFS with path - If any node is visited and already in path then it contains a cycle
        2. Topological sorth, kahn's algo- If all the nodes are not processed after algo finishes it contains a cycle

    2. DFS with path- If the node is in the path it contains a cycle
    Instead of using 2 varibles path and visited seperately we can use state variable to track the state of nodes
    state[node] = 0, // Unprocessed, unvisited
    state[node] = 1 // Visited and in path
    state[node] = 2 // Completely processed that is visited and not in path
*/


// Solution (DFS with path)
module.exports = { 
    //param A : integer
    //param B : array of array of integers
    //return an integer
       solve : function(A, B){
           return cycleDetection(A, B);
       }
   };
   
   function createAdjList(n, edges){
       let adjList = Array.from({length: n+1}, ()=> new Array());
   
       for(let [u, v] of edges){
           adjList[u].push(v);
       }
       return adjList;
   }
   function cycleDetection(A, B){
       let adjList = createAdjList(A, B);
       let state = new Array(A+1).fill(0);
       // 0- univisted, 1-visited and in path, 2- visited and out of path
       for(let i=1; i <= A; i++){
           if(state[i] == 0){
               if(dfs(adjList, i, state)){
                   return 1;
               }
           }
       }
       return 0;
   }
   
   function dfs(adjList, i, state){
       state[i] = 1; // processing
   
       for(let nbr of adjList[i]){
           if(state[nbr] == 1 || dfs(adjList, nbr, state)){
               return true
           }
   
           state[nbr] = 2; // completely processed
       }
   }



/*
# Complexity Analysis
   TC - O(V+E)
   SC - O(V) - Depth of tree can be maxium of nodes that are connected together
*/