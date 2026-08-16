/*
# Problem Statement:

    Given an m x n binary matrix filled with 0's and 1's, find the largest square containing only 1's and return its area.

    

    Example 1:


    Input: matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
    Output: 4
    Example 2:


    Input: matrix = [["0","1"],["1","0"]]
    Output: 1
    Example 3:

    Input: matrix = [["0"]]
    Output: 0
    

    Constraints:

    m == matrix.length
    n == matrix[i].length
    1 <= m, n <= 300
    matrix[i][j] is '0' or '1'.
*/


/*
# Intuition
How can we make Largest Square?

1. start from a cell square size 1
    1
2. If we see its left, digonal left and bottom, we can expand only if all of those are 1, so now size becomes 2

    1 1 (org cell)
    1 1
3. Let's suppose now left and digonal left and bottom all makes square of 2 and current cell is also 1 it'll make 3*3 size

i = m-1
Grid:                       DP Grid
    1 1 1 
    1 1 1
    1 1 1                   1 1 1


i = m-2

Grid:                       DP Grid
    1 1 1 
    1 1 1                   1 2 2
    1 1 1                   1 1 1

i = m-3

Grid:                       DP Grid
    1 1 1                   1 2 3   
    1 1 1                   1 2 2
    1 1 1                   1 1 1

j = 0, 1 (no left side), 
j= 1 2(as all left bottom left and right alredy makes size of 1 so including current will make size of 2), 
j= 2 3 (as all left, bottom-left, and right makes size of 2 so including current cell it'll increase the square size by 1 )

Area will be equal to size * size
Example - 

[
["1","1","1","1","1"],
["1","0","1","1","1"],
["1","1","1","1","1"],
["1","0","0","1","0"]

]


[
[1, 1, 1, 2, 3]
[1, 0, 1, 2, 2]
[1, 1, 1, 1, 1]
[1, 0, 0, 1, 0]
]

Algorithm

we go from i m to 0
from j 0 to n
at each i and j we check minm(i, j-1, i+1, j-1, i+1, j)+1 and move ahead
*/


// Solution
/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalSquare = function(matrix) {
    return maximalSquareDP(matrix)
};

function maximalSquareDP(grid){
    let m = grid.length, n = grid[0].length;
    let dp = Array.from({length:m}, ()=> new Array(n).fill(0))

    let max = 0;
    for(let i = m-1; i>= 0 ; i--){
        for(let j=0; j < n; j++){
            if(j == 0 || i == m-1){
                dp[i][j] = Number(grid[i][j]);
                max = Math.max(dp[i][j], max);
                continue;
            }
            dp[i][j] = grid[i][j] == "0" ? 0: Math.min(dp[i][j-1], dp[i+1][j-1], dp[i+1][j]) + 1;
            max = Math.max(dp[i][j], max);
        }
    }
    return max*max;
}



/*
# Complexity Analysis
    TC: O(m*n)
    SC: O(m*n)
*/

// Solution II (Space Optimised) 2D DP
var maximalSquare = function(matrix) {
    return maximalSquareDP(matrix)
};

function maximalSquareDP(grid){
    let m = grid.length, n = grid[0].length;
    let dp = Array.from({length:2}, ()=> new Array(n).fill(0))

    let max = 0;
    for(let i = m-1; i>= 0 ; i--){
        for(let j=0; j < n; j++){
            if(j == 0 || i == m-1){
                dp[i%2][j] = Number(grid[i][j]);
                max = Math.max(dp[i%2][j], max);
                continue;
            }
            dp[i%2][j] = grid[i][j] == "0" ? 0: Math.min(dp[i%2][j-1], dp[(i+1)%2][j-1], dp[(i+1)%2][j]) + 1;
            max = Math.max(dp[i%2][j], max);
        }
    }
    return max*max;
}

// Solution III (1D- DP)
function maximalSquareDP(grid){
    let m = grid.length, n = grid[0].length;
    let dp = new Array(n).fill(0);

    let max = 0;
    for(let i = m-1; i>= 0 ; i--){
        let diagonal = 0;
        for(let j=0; j < n; j++){
            const temp = dp[j];

            if (grid[i][j] === "1") {
                dp[j] = Math.min(
                    dp[j],        // bottom
                    dp[j - 1] ?? 0, // left
                    diagonal      // bottom-left
                ) + 1;

                max = Math.max(max, dp[j]);
            } else {
                dp[j] = 0;
            }

            diagonal = temp;
        }
    }
    return max*max;
}
/*
# Complexity Analysis
    TC: O(m*n)
    SC: O(n)
*/
