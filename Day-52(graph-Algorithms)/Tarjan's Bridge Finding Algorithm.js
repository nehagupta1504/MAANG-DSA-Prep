/*
# Bridges in Graph

# Problem Statement:
    Given an undirected connected Graph with V vertices (Numbered from 0 to V-1) and E edges. An edge is represented [ai, bi] denoting that there is an edge from vertex ai to bi . An edge is called a bridge if its removal makes some vertex unable to reach another vertex.

    Return all bridges in the graph in any order.


Example 1

    Input: V = 4, E = [ [0,1],[1,2],[2,0],[1,3] ]

    Output: [ [1, 3] ]

    Explanation: The edge [1, 3] is the critical edge because if we remove the edge the graph will be divided into 2 components.


    Example 2


    Input: V = 3, E = [[0,1],[1,2],[2,0]]

    Result: []

    Explanation: There no bridges in the graph.
*/


/*
# Intuition
    1. A bridge is an edge whose removal disconnects part of the graph.
    2. DFS assigns every node a discovery time, showing when it was first visited.
    3. low[node] stores the earliest-discovered node reachable from that node’s subtree through an alternative path.

    4. For an edge parent → child, we check:

        4.1 low[child] > discovery[parent]
        4.2 If true, the child’s subtree cannot reach the parent or its ancestors through another path, so the edge is a bridge.
        4.3 If low[child] <= discovery[parent], an alternative path exists, so the edge is not a bridge.
*/


// Solution
class Solution {
    timer = 1;
    createAdjList(n, E){
        let adj = Array.from({length: n}, ()=> []);
        for(let i =0 ; i< E.length ; i++){
            let u = E[i][0];
            let v = E[i][1];
            adj[u].push(v);
            adj[v].push(u);
        }
        return adj;
    }
    dfs(node, parent, adj, vis, time, low, bridges){
        vis[node] = true;
        time[node] = low[node] = this.timer;
        this.timer++; 
        for(let nbr of adj[node]){
            if(!vis[nbr]){
                this.dfs(nbr, node, adj, vis, time, low, bridges);
                low[node] = Math.min(low[node], low[nbr]);

                if(low[nbr] > time[node]){
                    bridges.push([node, nbr]);
                }
            }else if(parent != nbr){
                low[node] = Math.min(low[node], low[nbr]);
            }
        }
    }
    criticalConnections(V, E) {
        let adj = this.createAdjList(V, E);
        let time = new Array(V);
        let low = new Array(V);
        let vis = new Array(V).fill(false);
        let bridges = [];
        
        for(let i =0;  i < V ; i++){
            if(!vis[i]){
                this.dfs(i, -1, adj, vis, time, low, bridges)
            }
        }
        return bridges;
    }
}



/*
# Complexity Analysis
 TC : O(V+E)
 SC: O(V+ E)
*/