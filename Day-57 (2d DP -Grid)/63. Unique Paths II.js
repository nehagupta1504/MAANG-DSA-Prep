/*
# Problem Statement:
    You are given an m x n integer array grid. There is a robot initially located at the top-left corner (i.e., grid[0][0]). The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or right at any point in time.

    An obstacle and space are marked as 1 or 0 respectively in grid. A path that the robot takes cannot include any square that is an obstacle.

    Return the number of possible unique paths that the robot can take to reach the bottom-right corner.

    The testcases are generated so that the answer will be less than or equal to 2 * 109.

    

    Example 1:


    Input: obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
    Output: 2
    Explanation: There is one obstacle in the middle of the 3x3 grid above.
    There are two ways to reach the bottom-right corner:
    1. Right -> Right -> Down -> Down
    2. Down -> Down -> Right -> Right
    Example 2:


    Input: obstacleGrid = [[0,1],[0,0]]
    Output: 1
*/


/*
# Intuition
    1. Same as previous question `unique path.js` the only difference is, if we encounter an obstacle we make the currnet cell ways zero
    2. Base case if any of the starting or ending cell is blocked then also return 0;
*/


// Solution
function uniquePathshelper(grid, m, n){
    if(grid[0][0] == 1 || grid[m-1][n-1] == 1) return 0;
    
    let dp = Array.from({length: m+1}, ()=> new Array(n+1).fill(0));
    dp[m-1][n-1] = 1;
    
    for(let i = m-1; i >=0 ; i--){
        for(let j = n-1; j>=0 ; j--){
            if(i == m-1 && j == n-1) continue;
            
            if(grid[i][j] == 1){
                dp[i][j] = 0;
                continue;
            }
            
            dp[i][j] = dp[i+1][j] + dp[i][j+1];
        }
    }
    return dp[0][0];
    
}


// Solution II (Space Optimised Solution)
var uniquePathsWithObstacles = function(obstacleGrid) {
    let m =obstacleGrid.length, n= obstacleGrid[0].length;
    return uniquePathshelper(obstacleGrid, m, n)
};


function uniquePathshelper(grid, m, n){
    if(grid[0][0] == 1 || grid[m-1][n-1] == 1) return 0;

    let dp = new Array(n+1).fill(0);
    dp[n-1] = 1;
    
    for(let i = m-1; i >=0 ; i--){
        for(let j = n-1; j>=0 ; j--){
            if(i == m-1 && j == n-1) continue;
            
            if(grid[i][j] == 1){
                dp[j] = 0;
                continue;
            }
            
            dp[j] = dp[j] + dp[j+1];
        }
    }
    return dp[0];
    
}
