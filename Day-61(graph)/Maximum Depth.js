/*
# Problem Statement:
Given a Tree of A nodes having A-1 edges. Each node is numbered from 1 to A where 1 is the root of the tree.

You are given Q queries. In each query, you will be given two integers L and X. Find the value of such node which lies at level L mod (MaxDepth + 1) and has value greater than or equal to X.

Answer to the query is the smallest possible value or -1, if all the values at the required level are smaller than X.

NOTE:

Level and Depth of the root is considered as 0.
It is guaranteed that each edge will be connecting exactly two different nodes of the tree.
Please read the input format for more clarification.


Problem Constraints

2 <= A, Q(size of array E and F) <= 105

1 <= B[i], C[i] <= A

1 <= D[i], E[i], F[i] <= 106



Input Format

The first argument is an integer A denoting the number of nodes.

The second and third arguments are the integer arrays B and C where for each i (0 <= i < A-1), B[i] and C[i] are the nodes connected by an edge.

The fourth argument is an integer array D, where D[i] denotes the value of the (i+1)th node

The fifth and sixth arguments are the integer arrays E and F where for each i (0 <= i < Q), E[i] denotes L and F[i] denotes X for ith query.



Output Format

Return an array of integers where the ith element denotes the answer to ith query.



Example Input

Input 1:

 A = 5
 B = [1, 4, 3, 1]
 C = [5, 2, 4, 4]
 D = [7, 38, 27, 37, 1]
 E = [1, 1, 2]
 F = [32, 18, 26]
Input 2:

 A = 3
 B = [1, 2]
 C = [3, 1]
 D = [7, 15, 27]
 E = [1, 10, 1]
 F = [29, 6, 26]


Example Output

Output 1:

 [37, 37, 27]
Output 2:

 [-1, 7, 27]


Example Explanation

Explanation 1:

      1[7]
     /    \
   5[1]  4[37]
        /    \
       2[38]  3[27]

 Query 1: 
    L = 1, X = 32
    Nodes for level 1 are 5, 4
    Value of Node 5 = 1 < 32
    Value of Node 4 = 37 >= 32
    Ans = 37
Explanation 2:

      1[7]
     /    \
   2[15]  3[27]

 Query 1: 
    L = 1, X = 6
    Nodes for level 1 are 2, 3 having value 15 and 27 respectively.
    Answer = -1 (Since no node is greater or equal to 29).
 Query 1: 
    L = 10 % 2 = 0, X = 6
    Nodes for level 0 is 1 having value 7.
    Answer = 7.   
*/


/*
# Intuition
    Question is easy but just involved multiple steps to process
    1. Construct adj list - O(E) : E = B.length
    2. Use adjlist to find out level of node using BFS - O(V+ E)V:A number of vertices, B is the number of edges
    3. store the levels in a level map, to find out which nodes of level 0, which of level 1 and so on
    4. Once we have required information, process all queries 1 by 1 - O(q)- q: L.length
        4.1 Get Value of L and X
        4.2 Get all nodes at level L%(MD+1)
        4.3 Find the smallestvalue at this level such that it is smallest out of all values and hold condition >= x
        4.4 put this value in op array

    5. return the op array -  K size
*/


// Solution
module.exports = { 
    //param A : integer
    //param B : array of integers
    //param C : array of integers
    //param D : array of integers
    //param E : array of integers
    //param F : array of integers
    //return a array of integers
       solve : function(A, B, C, D, E, F){
           return maxDepth(A, B, C, D, E, F);
       }   
   };
   
   function maxDepth(A, B, C, D,E, F){
       let adjList = constructAdjList(A, B, C);
       let {levelMap, maxDepth} = constructLevel(A, adjList);
       let op = [];
   
       for(let i = 0; i < E.length; i++){
           let L = E[i]%(maxDepth+1);
           let X = F[i];
   
           let nodesAtL = levelMap.get(L);
           let smallestValue = Infinity;
           for(let node of nodesAtL){
               let value = D[node-1];
               if(value >= X && value < smallestValue){
                   smallestValue = value;
               }
           }
           smallestValue!= Infinity ? op.push(smallestValue): op.push(-1)
       }
       return op;
   }
   function constructLevel(A, adjList){
       let levelMap = new Map();
       let visited = new Array(A+1).fill(false);
       let maxDepth = 0;
       let q = [];
       q.push([1, 0]);
       visited[1] = true;
   
       while(q.length > 0){
           let [node, level] = q.shift();
           maxDepth = Math.max(maxDepth, level)
           let lvlArray =  levelMap.get(level) || [];
           lvlArray.push(node)
           levelMap.set(level, lvlArray)
   
           for(let nbr of adjList[node]){
               if(!visited[nbr]){
                   visited[nbr] = true;
                   q.push([nbr, level+1]);
               }
           }
       }
       return {levelMap, maxDepth};
   }
   
   function constructAdjList(A, B, C){
       let adjList = Array.from({length: A+1}, ()=> []);
       for(let i=0; i<B.length; i++){
           let u = B[i];
           let v = C[i];
   
           adjList[u].push(v);
           adjList[v].push(u);
       }
       return adjList;
   }
   


/*
# Complexity Analysis
   TC: O(V+E+Q) // Assuming shift operation will tak O(1) time right now it is taking O(n)
   SC: O(V+K)
*/