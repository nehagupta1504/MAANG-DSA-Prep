/*
# Problem Statement:
    Given a triangle array, return the minimum path sum from top to bottom.

    For each step, you may move to an adjacent number of the row below. More formally, if you are on index i on the current row, you may move to either index i or index i + 1 on the next row.

    

    Example 1:

    Input: triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]
    Output: 11
    Explanation: The triangle looks like:
    2
    3 4
    6 5 7
    4 1 8 3
    The minimum path sum from top to bottom is 2 + 3 + 5 + 1 = 11 (underlined above).
    Example 2:

    Input: triangle = [[-10]]
    Output: -10
*/


/*
# Intuition
    1. Start from triangle bottom, it'll not change
    2. Start traversing from second last bottom row, and check minm value for next row same col and new row next col (i+1, j) and (i+1, j+1)
    3. We can use dp array to store it, or we can modify it inplace as well in triangle only
*/


// Solution

/**
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function(triangle) {
    return bottomUp(triangle); 
     // return topDown(triangle);
};

function topDown(A){
 let n= A.length;

 let dp = Array.from({length:n});
 for(let i=0; i<n; i++){
     dp[i] = new Array(A[i].length).fill(-1);
 }
 function helper(A,i, j, dp){
     if(i == n-1){
         dp[i][j] = A[i][j];
         return dp[i][j];
     }
     if(dp[i][j]!= -1){
         return dp[i][j];
     }
     let down = helper(A, i+1, j, dp);
     let nextDown = j < A[i].length ? helper(A, i+1, j+1, dp): Number.POSITIVE_INFINITY;
     dp[i][j] = A[i][j] + Math.min(down, nextDown);
     return dp[i][j];
 }
 helper(A, 0, 0, dp);
 return dp[0][0];
}


function bottomUp(triangle){

 for (let i = triangle.length - 2; i >= 0; i--) {
     for (let j = 0; j <= i; j++) {
         triangle[i][j]  += Math.min(triangle[i+1][j], triangle[i+1][j + 1]);
     }
 }

 return  triangle[0][0];
}

/*
# Complexity Analysis (Bottom-up Approach)
    TC: O(n^2)
    SC: O(1)
*/