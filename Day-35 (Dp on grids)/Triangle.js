/*
# Problem Statement:
    Given a 2d integer array named triangle with n rows. Its first row has 1 element and each succeeding row has one more element in it than the row above it.
    Return the minimum falling path sum from the first row to the last.
    Movement is allowed only to the bottom or bottom-right cell from the current cell.


Example 1

    Input: triangle = [[1], [1, 2], [1, 2, 4]]

    Output: 3

    Explanation:

    One possible route can be:

    Start at 1st row -> bottom -> bottom.

Example 2

    Input: triangle = [[1], [4, 7], [4,10, 50], [-50, 5, 6, -100]]

    Output: -42

    Explanation:

    One possible route can be:

    Start at 1st row -> bottom-right -> bottom-right -> bottom-right


# Constraints

    n == number of rows in triangle
    1 <= n <= 200
    -104 <= triangle[i][j] <= 104
    triangle[0].length == 1
    triangle[i].length = triangle[i-1].length + 1
    The answer will not exceed 109
*/


/*
# Intuition
    For every position in the triangle, we want the minimum path sum to reach that cell from the top.
    A cell (i, j) can only be reached from two possible positions in the previous row: the top (i-1, j) or the top-left (i-1, j-1).
    So, for each cell, we take the minimum of those two paths and add the current cell value.
    We build the answer row by row using DP, storing the minimum cost to reach each position.
    Finally, the minimum value in the last row gives the minimum path sum from top to bottom.
*/


// Solution I

class Solution {
    minFallingPathSum(matrix) {
        let m = matrix.length;
        let dp = Array.from({length: m}, ()=> new Array(m).fill(Infinity));

        dp[0][0]= matrix[0][0];

        for(let i=1; i < m; i++){
            let n = matrix[i].length;
            for(let j= 0; j < n;  j++){
                let left = j > 0 ? dp[i-1][j-1]: Infinity;
                let top = dp[i-1][j];
                let min = Math.min(top, left);
                dp[i][j] = matrix[i][j] + min;
            }
        }
        return Math.min(...dp[m-1]);
    }
    minTriangleSum(triangle) {
        return this.minFallingPathSum(triangle)
    }
}



/*
# Complexity Analysis

Time Complexity
    O(n^2) where n is the number of rows. The initialization of the DP table involves n nested loops (filling n rows, each of length up to n), and the nested loops iterate over the triangle structure with total elements proportional to n^2.

Space Complexity
    O(n^2) to store the dp table of size n*n, where n is the number of rows.

*/

// Solution II
class Solution {
    minTriangleSum(triangle) {
      let m = triangle.length;
      let dp = Array.from({ length: 2 }, () => new Array(m).fill(Infinity));
  
      dp[(m - 1)%2] = [...triangle[m - 1]];
  
      for (let i = m - 2; i >= 0; i--) {
        let colSize = triangle[i].length;
        for (let j = 0; j < colSize; j++) {
          dp[i%2][j] = triangle[i][j] + Math.min(dp[(i + 1)%2][j], dp[(i + 1)%2][j + 1]);
        }
      }
      return dp[0][0];
    }
  }

/* 

Complexity Analysis
  
Time Complexity
  O(n^2) where n is the number of rows in the triangle. The algorithm uses a nested loop where the outer loop runs n times and the inner loop runs proportional to the number of elements in each row (1 to n), resulting in a summation 1 + 2 + ... + n = n(n+1)/2.
  
Space Complexity
  O(n) where n is the number of rows in the triangle. The DP table is initialized as a 2 x n array, providing constant row access with space complexity proportional to the width of the base of the triangle.

*/