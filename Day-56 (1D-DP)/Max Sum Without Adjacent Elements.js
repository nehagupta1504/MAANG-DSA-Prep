/*
# Problem Statement:
    Given a 2 x N grid of integers, A, your task is to choose numbers from the grid such that sum of these numbers is maximized. 
    However, you cannot choose two numbers that are adjacent horizontally, vertically, or diagonally. 

    Return the maximum possible sum.

    Note: You are allowed to choose more than 2 numbers from the grid.


    Problem Constraints

    1 <= N <= 20000
    1 <= A[i] <= 2000


    Input Format

    The first and the only argument of input contains a 2d matrix, A.


    Output Format

    Return an integer, representing the maximum possible sum.


Example Input

    Input 1:

    A = [   
            [1]
            [2]    
        ]
    Input 2:

    A = [   
            [1, 2, 3, 4]
            [2, 3, 4, 5]    
        ]


Example Output

    Output 1:

    2
    Output 2:

    8


Example Explanation

    Explanation 1:

    We will choose 2 (From 2nd row 1st column).
    Explanation 2:

    We will choose 3 (From 2nd row 2nd column) and 5 (From 2nd row 4th column).
*/


/*
# Intuition
    1. convert the problem into house robber 
        conversion
        ex- [
                [1,2,3,4]
                [2,3,4,5]
            ]
        a. It is given that it is a 2*n matrix so we select a number its sure that we can't select any number from next col
        and we select from i+2 col then i+4 then i+6 and so on
        b. Now since col is fixed which number out of both rows we should select ex- if we select 1 which one out of (3,4) should we slect
        then which one out of (4,5). 
        c. The pattern is to select maximum out of each row 
        so now if we select maximum the input will convert into - [2,3,4,5] maxm values out of both rows, in each column
        now given this array [2,3,4,5] the problem again states we can't take adjacent elements so it becomes house robber problem
*/


// Solution
module.exports = { 
    //param A : array of array of integers
    //return an integer
       adjacent : function(A){
           let n = A[0].length;
           let arr = new Array(n).fill(0);
           for(let i=0; i< n; i++){
               arr[i] = Math.max(A[0][i], A[1][i]);
           }
           let dp = new Array(n).fill(0);
           dp[0] = arr[0];
           dp[1] = Math.max(arr[0], arr[1]);
   
           for(let i= 2; i < n ; i++){
               dp[i] = Math.max(dp[i-1], arr[i]+dp[i-2]);
           }
           return dp[n-1];
       }
   };



/*
# Complexity Analysis
   TC: O(n)
   SC: O(n)
*/