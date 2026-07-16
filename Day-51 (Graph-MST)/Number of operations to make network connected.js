/*
# Problem Statement:

    Given a graph with n vertices and m edges. The graph is represented by an array Edges, where Edge[i] = [a, b] indicates an edge between vertices a and b. One edge can be removed from anywhere and added between any two vertices in one operation. Find the minimum number of operations that will be required to make the graph connected. If it is not possible to make the graph connected, return -1.


Example 1

    Input : n = 4, Edge =[ [0, 1], [ 0, 2], [1, 2]]

    Output: 1

    Explanation: We need a minimum of 1 operation to make the two components connected. We can remove the edge (1,2) and add the edge between node 2 and node 3 like the following:



Example 2

    Input: n = 9, Edge = [[0,1],[0,2],[0,3],[1,2],[2,3],[4,5],[5,6],[7,8]]

    Output: 2

    Explanation: We need a minimum of 2 operations to make the two components connected. We can remove the edge (0,2) and add the edge between node 3 and node 4 and we can remove the edge (0,3) and add it between nodes 6 and 8 like the following:
*/


/*
# Intuition

    Idealogy - 
    1. Graph can't be connected if no. of existing edges is less than vertices-1
    2. Construct disjoint set 
    3. No of operations = no of different universal parent

*/


// Solution
// Use disjoint set class from  `Disjoint set.js`
class Solution {
    solve(n, Edge) {
        if(Edge.length < n-1){
            return -1;
        }
        let ds = new DisjointSet(n);

        for(let [u,v] of Edge){
            ds.unionBySize(u, v);
        }

        let diffUniversalParents = new Set();
        for(let i=0; i < n ; i++){
            let parent = ds.getUniversalParent(i);
            diffUniversalParents.add(parent);
        }

        return diffUniversalParents.size -1;
    }
}

/*
# Complexity Analysis
    TC- O(E + V) // E- to do E times unionbySize (constant), and V times run the loop to find the parent
    SC- O(V) // for disjoint set internal implementation
*/


// Solution -2 // A little optimised


/* 
    Idealogy - 
    1. Graph can't be connected if no. of existing edges is less than vertices-1
    2. Total n components every time we join a edge the disconnected components reduce by 1
    3. Update union function to return whether the edge is merged to form a connected component or not
*/

/*
    Updated Union By Size Code
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

*/

class Solution {
    solve(n, Edge) {
        if(Edge.length < n-1){
            return -1;
        }
        let ds = new DisjointSet(n);
        let components = n;

        for(let [u,v] of Edge){
            if(ds.unionBySize(u, v)){
                components--;
            }
        }

        return components-1;
    }
}
