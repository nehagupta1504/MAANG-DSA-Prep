/*
# Problem Statement:
    Given an undirected graph with A vertices numbered from 0 to A-1 and E edges, represented as a 2D array B[][], where each entry B[i] = [u, v] denotes an edge between vertices u and v.

    Your task is to return a list of all connected components. Each connected component should be represented as a list of its vertices, with all components returned in a collection where each component is listed separately.

    Note:
    Before returning the result, sort the vertices inside each connected component, and also sort the list of components as a whole (based on their first elements). This ensures a fully ordered output.


    Problem Constraints

    1 ≤ A, E ≤ 105
    0 ≤ B[i][0], B[i][1] < A


    Input Format

    First Argument is an Integer A, denoting the number of vertices.
    Second Argument is an 2D Integer Array of size Ex2, where B[i] = [u, v] denotes an edge between vertices u and v.


    Output Format

    Return a list of all connected components in sorted order


    Example Input

    Input 1:
    A: 5, 
    B: [
        [0, 1], 
        [2, 1], 
        [3, 4]
    ]
    Input 2:
    A: 7, 
    B: [
        [0, 1], 
        [6, 0], 
        [2, 4], 
        [2, 3], 
        [3, 4]
    ]


    Example Output

    Output 1:
    [[0, 1, 2], [3, 4]]
    Output 2:
    [[0, 1, 6], [2, 3, 4], [5]]
*/


/*
# Intuition
    Same as earlier questions
*/


// Solution
module.exports = { 
    //param A : integer
    //param B : array of array of integers
    //return a array of array of integers
       getComponents : function(A, B){
           return getConnectedComponents(A, B);
       }
   };
   function getConnectedComponents(A, B){
       let connectedComponents = [];
       let adjList = createAdjList(A, B);
       let visited = new Array(A).fill(false);
   
       for(let i=0; i < A; i++){
           
           if(!visited[i]){
               let path = new Array();
               dfs(adjList, i, visited, path);
               path.sort((a,b)=>a-b);
               connectedComponents.push([...path]);
           }
       }
       return connectedComponents;
   }
   
   function dfs(adj, src, visited, path){
       visited[src] = true;
       path.push(src);
   
       for(let nbr of adj[src]){
           if(!visited[nbr]){
               dfs(adj, nbr, visited, path);
           }
       }
   }
   
   function createAdjList(n, edges){
       let adjList = Array.from({length: n+1}, ()=> new Array());
   
       for(let [u, v] of edges){
           adjList[u].push(v);
           adjList[v].push(u);
       }
       return adjList;
   }



/*
# Complexity Analysis

*/