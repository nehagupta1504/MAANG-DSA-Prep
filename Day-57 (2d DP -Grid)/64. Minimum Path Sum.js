/*
# Problem Statement:
    Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right, which minimizes the sum of all numbers along its path.

    Note: You can only move either down or right at any point in time.

    

    Example 1:


    Input: grid = [[1,3,1],[1,5,1],[4,2,1]]
    Output: 7
    Explanation: Because the path 1 → 3 → 1 → 1 → 1 minimizes the sum.
    Example 2:

    Input: grid = [[1,2,3],[4,5,6]]
    Output: 12
*/


/*
# Intuition
    Same as earlier problems
*/


// Solution
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function (grid) {
    return pathSum(grid);
};

function pathSum(grid) {
    let m = grid.length, n = grid[0].length;
    let dp = new Array(n).fill(Infinity);
    dp[n-1] = 0;
    for (let i = m - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            if (i == m - 1 && j == n - 1) {
                dp[j] = grid[i][j];
                continue;
            }

            dp[j] = grid[i][j] + Math.min( dp[j], dp[j + 1] ?? Infinity);
        }
    }
    
    return dp[0];
}




/*
# Complexity Analysis
    TC: O(m*n)
    SC: O(n)
*/