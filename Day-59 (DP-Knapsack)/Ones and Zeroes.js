/*
# Problem Statement:
    You are given an array of binary strings strs and two integers m and n.

    Return the size of the largest subset of strs such that there are at most m 0's and n 1's in the subset.

    A set x is a subset of a set y if all elements of x are also elements of y.

    

    Example 1:

    Input: strs = ["10","0001","111001","1","0"], m = 5, n = 3
    Output: 4
    Explanation: The largest subset with at most 5 0's and 3 1's is {"10", "0001", "1", "0"}, so the answer is 4.
    Other valid but smaller subsets include {"0001", "1"} and {"10", "1", "0"}.
    {"111001"} is an invalid subset because it contains 4 1's, greater than the maximum of 3.
    Example 2:

    Input: strs = ["10","0","1"], m = 1, n = 1
    Output: 2
    Explanation: The largest subset is {"0", "1"}, so the answer is 2.
    

    Constraints:

    1 <= strs.length <= 600
    1 <= strs[i].length <= 100
    strs[i] consists only of digits '0' and '1'.
    1 <= m, n <= 100
*/


/*
# Intuition


Recursion
    For every string → Take / Don't Take

    * take:

        1 + f(i+1, m-zeroCount, n-oneCount)

    * notTake:

        f(i+1, m, n)

    * Answer:

        max(take, notTake)

Base Cases
    * i === k → no strings left → 0
    * m === 0 && n === 0 → no resources left → 0
    
Brute Force
    Each string gives 2 choices.
    k strings → TC: O(2^k)
    Recursion depth → SC: O(k)

Why DP?

    Different recursion paths can reach the same state:

    (i, m, n)
    Future decisions depend only on these 3 values.

    So memoize:

    dp[i][m][n]

Number of States
    i → k possibilities
    m → m + 1 possibilities
    n → n + 1 possibilities
    States = k × (m+1) × (n+1)
        = O(kmn)
    Memoized TC: O(kmn)
    Memoized SC: O(kmn)

0/1 Knapsack Mapping
    Item → String
    Capacity → m zeros + n ones
    Weight → zero/one count
    Value → 1
    Choice → Take / Skip
    Goal → Maximize number of strings
*/


// Solution
/**
 * @param {string[]} strs
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var findMaxForm = function(strs, m, n) {
    return zeroesAndOnes(strs, m , n)
};


function zeroesAndOnes(strs, m , n){
    let k = strs.length;
    let dp = Array.from({length:k}, ()=> Array.from({length: m+1}, ()=> new Array(n+1).fill(-1)));
    // pre calculating to save complexity
    let counts = strs.map(str=> countZeroAndOne(str));

    function zeroesAndOnesHelper(i, m , n){
        if((i == k) || (m == 0 && n == 0)) return 0;

        if(dp[i][m][n] != -1) return dp[i][m][n];

        let {zeroCount, oneCount} = counts[i]
        let take = 0;

        if(m >= zeroCount && n >= oneCount){
           take = 1 + zeroesAndOnesHelper(i+1, m-zeroCount, n- oneCount);
        }
        let notTake = zeroesAndOnesHelper(i+1, m, n);

        return (dp[i][m][n] = Math.max(take, notTake));
    }
    return zeroesAndOnesHelper(0, m , n)
}
function countZeroAndOne(str){
    let ones = 0, zeroes = 0;
    for(let num of str){
        if(num == '1'){
            ones++;
        }else{
            zeroes++;
        }
    }
    return {zeroCount:zeroes, oneCount: ones}
}


/*
# Complexity Analysis
    TC: O(k*m*n), If we don't precompute count of zeroes and ones then TC would have been O(k*m*n*L) where L is the max length of each string
    SC: O(n + k*m*n) 
*/

// SOlution II - Itertaive

// Itertaive
function  zeroesAndOnesIterative(strs, m , n){
    let size = strs.length;
   let dp = Array.from({length:size+1}, ()=> Array.from({length: m+1}, ()=> new Array(n+1).fill(0)));
   let counts = strs.map(str=> countZeroAndOne(str));

   for(let i = size-1; i >=0 ; i--){
       let {zeroCount, oneCount} = counts[i]
       for(let j = m; j>=0; j--){
           for(k = n; k>=0; k--){
               if( (j-zeroCount >=0) && (k-oneCount >=0))
                   dp[i][j][k] = Math.max(1+ dp[i+1][j-zeroCount][k-oneCount], dp[i+1][j][k]);
               else
                   dp[i][j][k] = dp[i+1][j][k]
           }
       }
   }
   return dp[0][m][n]
}

/*
# Complexity Analysis
    TC: O(k*m*n), If we don't precompute count of zeroes and ones then TC would have been O(k*m*n*L) where L is the max length of each string
    SC: O(k*m*n) 
*/

// Solution III - Itertaive (Space Optimised- 2D DP)

// Itertaive
function  zeroesAndOnesIterative(strs, m , n){
    let size = strs.length;
   let dp = Array.from({length: 2}, ()=> Array.from({length: m+1}, ()=> new Array(n+1).fill(0)));
   let counts = strs.map(str=> countZeroAndOne(str));

   for(let i = size-1; i >=0 ; i--){
       let {zeroCount, oneCount} = counts[i]
       for(let j = m; j>=0; j--){
           for(k = n; k>=0; k--){
               if( (j-zeroCount >=0) && (k-oneCount >=0))
                   dp[i%2][j][k] = Math.max(1+ dp[(i+1)%2][j-zeroCount][k-oneCount], dp[(i+1)%2][j][k]);
               else
                   dp[i%2][j][k] = dp[(i+1)%2][j][k]
           }
       }
   }
   return dp[0][m][n]
}



/*
# Complexity Analysis
    TC: O(k*m*n), If we don't precompute count of zeroes and ones then TC would have been O(k*m*n*L) where L is the max length of each string
    SC: O(2*m*n) => O(mn)
*/

//Note: This can be more optimised in terms of readability and can be made proper 2D Dp
