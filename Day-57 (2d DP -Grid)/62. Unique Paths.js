/*
# Problem Statement:
    There is a robot on an m x n grid. The robot is initially located at the top-left corner (i.e., grid[0][0]). The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or right at any point in time.

    Given the two integers m and n, return the number of possible unique paths that the robot can take to reach the bottom-right corner.

    The test cases are generated so that the answer will be less than or equal to 2 * 109.

    

    Example 1:


    Input: m = 3, n = 7
    Output: 28
    Example 2:

    Input: m = 3, n = 2
    Output: 3
    Explanation: From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:
    1. Right -> Down -> Down
    2. Down -> Down -> Right
    3. Down -> Right -> Down
    

    Constraints:

    1 <= m, n <= 100
*/


/*
# Intuition
    1. dp[m-1][n-1] = 1, There is 1 way to reach from dest to dest and don't move
    2. At every point we can calculate the unique ways by adding # unique ways to reach from its right to end cell + #unique ways to reach from down cell to end cell
*/


// Solution I
function uniquePathshelper(m, n){
    let dp = Array.from({length: m+1}, ()=> new Array(n+1).fill(0));
    dp[m-1][n-1] = 1;
    
    for(let i = m-1; i >=0 ; i--){
        for(let j = n-1; j>=0 ; j--){
            if(i == m-1 && j == n-1) continue;
            
            dp[i][j] = dp[i+1][j] + dp[i][j+1];
        }
    }
    return dp[0][0];
    
}

/*
# Complexity Analysis
    TC: O(m*n)
    SC: O(m*n)
*/

// Solution II (Space Optimised DP)


function uniquePathshelper(m, n){
    let dp = new Array(n+1).fill(0);
    dp[n-1] = 1;

    for(let i = m-1; i >=0 ; i--){
        for(let j = n-1; j>=0 ; j--){
            if(i == m-1 && j == n-1) continue;

            dp[j] = dp[j] + dp[j+1];
        }
    }
    return dp[0];
}

/*
# Complexity Analysis
    TC: O(m*n)
    SC: O(n)
*/
