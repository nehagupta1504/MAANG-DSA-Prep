/*
# Problem Statement:
    Given a n x m 2d integer array called matrix where matrix[i][j] represents the number of cherries you can pick up from the (i, j) cell.Given two robots that can collect cherries, one is located at the top-leftmost (0, 0) cell and the other at the top-rightmost (0, m-1) cell.
    Return the maximum number of cherries that can be picked by the two robots in total, following these rules:
    Robots that are standing on (i, j) cell can only move to cell (i + 1, j - 1), (i + 1, j), or (i + 1, j + 1), if it exists in the matrix.
    A robot will pick up all the cherries in a given cell when it passes through that cell.
    If both robots come to the same cell at the same time, only one robot takes the cherries.
    Both robots must reach the bottom row in matrix.

Example 1

    Input: matrix = [[2, 1, 3], [4, 2, 5], [1, 6, 2], [7, 2, 8]]

    Output: 37

    Explanation:

    Possible left robot path:-

    Start at 0th cell (2) -> down (4) -> down-right (6) ->down-left (7)

    Possible right robot path:-

    Start at 2nd cell (3) -> down (5) -> down (2) -> down (8)

Example 2

    Input: matrix = [[1, 4, 4, 1], [1, 2, 2, 1], [5, 6, 10, 11], [8, 1, 1, 1]]

    Output: 32

    Explanation:

    Possible left robot path:-

    Start at 0th cell (1) -> down-right (2) -> down (6) ->down-left (8)

    Possible right robot path:-

    Start at 3rd cell (1) -> down-left (2) -> down-right (11) -> down (1)

# Constraints

    n == number of rows in matrix
    m == number of columns in matrix
    2 <= n, m <= 70
    0 <= matrix[i][j] <= 1000
*/


/*
# Intuition
Think of this problem as two players collecting chocolates together while moving from the top row to the bottom row.

    Robot 1 starts at the left corner (0,0)
    Robot 2 starts at the right corner (0,m-1)

At every row, both robots move simultaneously, and each robot has 3 choices:
So together, there are:

    3 × 3 = 9 possible move combinations

for every step.

    Now imagine we are standing at some row i with robot positions (j1, j2).

We ask:

    “If robot1 is at j1 and robot2 is at j2, what is the maximum chocolates we can collect from here till the bottom?”

This becomes our DP state: dp[i][j1][j2]

To compute it:

Step 1: Collect chocolates in the current row

    If robots are on different cells:

    matrix[i][j1] + matrix[i][j2]

    But if both robots land on the same cell:

    count only once

    because we cannot pick the same chocolate twice.

Step 2: Try all future possibilities

    From (j1, j2) both robots can move in 3 ways each, so we explore all:

    9 next combinations

    Example:

    Robot1 at j1

    j1-1, j1, j1+1

    Robot2 at j2

    j2-1, j2, j2+1

    For each valid move, we look at:

    dp[i+1][newJ1][newJ2]

    and choose the maximum.

Why Bottom-Up?

    We start from the last row because there is no future move there.

    At the last row:

    Whatever chocolates are present = final answer for that state

    Then move upward:

    Current row answer
    =
    current chocolates
    +
    best possible future path

    until we reach:

    dp[0][0][m-1]

which represents:

    Robot1 at left corner
    Robot2 at right corner
    Maximum chocolates collectable
    Simple Mental Model

Think:

Current reward
+
Best future outcome
=
Optimal answer

for both robots together.
*/

// Solution I (Memoisation)
class Solution {
    solve(grid, i, j1, j2, dp) {
      let n = grid.length;
      let m = grid[0].length;
      // Out of boundary
      if (j1 < 0 || j1 >= m || j2 < 0 || j2 >= m) {
        return -1e9;
      }
  
      // Base case: last row
      if (i === n - 1) {
        if (j1 === j2) {
          return grid[i][j1];
        } else {
          return grid[i][j1] + grid[i][j2];
        }
      }
  
      if (dp[i][j1][j2] !== null) {
        return dp[i][j1][j2];
      }
  
      // Cherries collected from current row
      let cherries = 0;
  
      if (j1 === j2) {
        cherries = grid[i][j1];
      } else {
        cherries = grid[i][j1] + grid[i][j2];
      }
  
      let maxCherry = -1e9;
  
      // Robot 1 can move: j1 - 1, j1, j1 + 1
      for (let r1 = j1 - 1; r1 <= j1 + 1; r1++) {
        // Robot 2 can move: j2 - 1, j2, j2 + 1
        for (let r2 = j2 - 1; r2 <= j2 + 1; r2++) {
          maxCherry = Math.max(maxCherry, this.solve(grid, i + 1, r1, r2, dp));
        }
      }
  
      dp[i][j1][j2] = cherries + maxCherry;
      return dp[i][j1][j2];
    }
  
    cherryPickup(matrix) {
      let n = matrix.length;
      let m = matrix[0].length;
      // dp[i][j1][j2]
      const dp = Array.from({ length: n }, () =>
        Array.from({ length: m }, () =>
          Array(m).fill(null)
        )
      );
  
      return this.solve(matrix, 0, 0, m - 1, dp);
    }
  }
  

// Solution II
class Solution {
    cherryPickupTabulation(matrix){
     let n = matrix.length,
      m = matrix[0].length;
      let dir = [-1, 0, 1];

    let dp = Array.from({ length: n }, () =>
      Array.from({ length: m }, () => new Array(m).fill(-Infinity)),
    );
    let j1 = 0, j2 = m-1;
    for(let j1 = 0; j1 < m ; j1++){
        for(let j2 = 0; j2 < m; j2++){
            dp[n-1][j1][j2] = j1 == j2 ? matrix[n-1][j1] : matrix[n-1][j1] + matrix[n-1][j2];
        }
    }
    for(let i = n-2; i >=0 ; i--){
       for(let j1 = 0; j1 < m ; j1++){
        for(let j2 = 0; j2 < m ; j2++){
            let maxPrevCherry = -Infinity;
            for(let col1 of dir){
                for(let col2 of dir){
                    let nj1 = col1+ j1;
                    let nj2 = col2 + j2;
                    if(nj1 < 0 || nj1 >= m || nj2 <0 || nj2 >= m){
                        continue;
                    }
                    maxPrevCherry = Math.max(maxPrevCherry, dp[i+1][nj1][nj2]);
                }
            }
            let currentCherry = j1 == j2? matrix[i][j1] :  matrix[i][j1] + matrix[i][j2];
            dp[i][j1][j2] = currentCherry + maxPrevCherry;
        }
       }
    }
    
    return dp[0][0][m-1];
  }
    cherryPickup(matrix) {
        return this.cherryPickupTabulation(matrix)
    }
}


/*
# Complexity Analysis

Time Complexity - O(2*3*n) since m is 3 and we're only checking next 2 activities
    O(n * m^2) where n is the number of rows and m is the number of columns. The algorithm initializes the DP table with O(n * m^2), fills the base case in O(m^2), and iterates through n rows with nested loops for m * m, each performing a constant number of operations (3 * 3 = 9 directions).

Space Complexity
    O(n * m^2) due to the 3D DP array of size n * m * m used to store the maximum cherries collected at each state.
*/