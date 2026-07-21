/*
# Problem Statement:
You are given a directed graph with V vertices, numbered from 0 to V − 1, and its adjacency list Adj, where Adj[i] contains all vertices j such that there is a directed edge from vertex i to vertex j.

Your task is to find the number of strongly connected components (SCCs) in the graph.


Example 1

    Input: V=5, Adj=[[2,3],[0],[1],[4],[]]
    Output: 3

Example 2

    Input: V=8, Adj=[[1],[2],[0,3],[4],[5,7],[6],[4,7],[]]
    Output: 4
*/


/*
1. Strongly connected components
    Each pair of vertices in a component are reachable from each other

# Intuition 
    Kosaraju Implementation
    1. Arrange the node in order of their finishing time using DFS and store them in stack, the nodes which is connected to others nodes wil always be visited last
    2. Reverse the adj list to break down link btw different connected components
    3. run dfs on the nodes in stack and every single time we have to run a dfs its a different strongly connected component
*/


// Solution
class Solution {
    dfs(node, n, adj, visited){
        visited[node] = true;
        for(let nbr of adj[node]){
            if(!visited[nbr]){
                this.dfs(nbr, n, adj, visited);
            }
        }
    }
    dfsWithStack(node, n, adj, visited, stack){
        visited[node] = true;
        for(let nbr of adj[node]){
            if(!visited[nbr]){
                this.dfsWithStack(nbr, n, adj, visited, stack);
            }
        }
        stack.push(node); 
    }
    reverseAdjList(n, adj){
        let reverse = Array.from({length: n}, ()=> []);

        for(let i= 0; i < adj.length; i++){
            let nbrs = adj[i];
            for(let nbr of nbrs){
                reverse[nbr].push(i);
            }
        }
        return reverse;
    }
    kosaraju(V, adj) {
        let visited = new Array(V).fill(false);
        let stack =  new Stack();

        for(let i =0 ; i < V ; i++){
            if(!visited[i]){
                this.dfsWithStack(i, V, adj, visited, stack)
            }
        }
        let reverse = this.reverseAdjList(V, adj);
        console.log(reverse)
        visited = new Array(V).fill(false);
        let scc = 0;

        while(stack.size() > 0){
            let node = stack.pop();
            if(!visited[node]){
                scc++;
                this.dfs(node, V, reverse, visited);
            }
        }
        return scc;
    }
}

class Stack {
  constructor() {
    this.items = [];
  }

  // Add an element to the top
  push(value) {
    this.items.push(value);
  }

  // Remove and return the top element
  pop() {
    if (this.isEmpty()) {
      return null;
    }

    return this.items.pop();
  }

  // Return the top element without removing it
  peek() {
    if (this.isEmpty()) {
      return null;
    }

    return this.items[this.items.length - 1];
  }

  // Check whether the stack is empty
  isEmpty() {
    return this.items.length === 0;
  }

  // Return the number of elements
  size() {
    return this.items.length;
  }
}



/*
# Complexity Analysis

Time Complexity
    O(V + E), where V is the number of vertices and E is the number of edges. Initializing visited arrays takes O(V), the first DFS pass traverses all nodes and edges in O(V + E), reversing the adjacency list iterates through all E edges across V vertices resulting in O(V + E), and the second DFS pass traverses all nodes and edges again in O(V + E).

Space Complexity
    O(V + E), where V is the space required for the visited arrays, the stack, and the recursive call stack (O(V)), and E is the space required for the reversed adjacency list to store all original edges.
*/