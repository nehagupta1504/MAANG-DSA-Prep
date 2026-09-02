/*
# Problem Statement:
    Given a rod of length N inches and an array price[] where price[i] denotes the value of a piece of rod of length i inches (1-based indexing). Determine the maximum value obtainable by cutting up the rod and selling the pieces. Make any number of cuts, or none at all, and sell the resulting pieces.


Example 1

    Input: price = [1, 6, 8, 9, 10, 19, 7, 20], N = 8

    Output: 25

    Explanation: Cut the rod into lengths of 2 and 6 for a total price of 6 + 19= 25.

Example 2

    Input: price = [1, 5, 8, 9], N = 4

    Output: 10

    Explanation: Cut the rod into lengths of 2 and 2 for a total price of 5 + 5 = 10.


# Constraints

    1 ≤ N ≤ 1000
    1 ≤ price[i] ≤ 105
*/


/*
# Intuition

*/


// Solution Memoisation
class Solution {
    RodCuttingRMemoisation(price, n, i, dp){   
        if( price.length+1 == i || n <= 0){
            return 0;
        }
        if(dp[n][i] != -1){
            return dp[n][i];
        }
        let cut = n >= i ? price[i-1] + this.RodCuttingMemoisation(price, n-i, i, dp) : 0;
        let notCut = this.RodCuttingMemoisation(price, n, i+1, dp);
        
        return dp[n][i] = Math.max(cut, notCut)
    }
    RodCutting(price, n) {
        let dp = Array.from({length: n+1}, ()=> new Array(n+1).fill(-1))
       return this.RodCuttingMemoisation(price, n, 1, dp);
    }
}

// One more way (Recursive)
function cuttingRod(price){
    let n = price.length;
    let dp = new Array(n+1).fill(-1);

    function cuttingRodHelper(rod){
        if(rod == 1){
            // can't cut further
            return price[rod-1];
        }
        if(dp[rod] != -1) return dp[rod];

        let maxPrice =0;

        // try cutting keep one length fix (can't cut) and other side variable that can be cut
        for(let cut = 1; cut < rod; cut++){
            maxPrice = Math.max(maxPrice, price[cut-1] + cuttingRodHelper(rod-cut));
        }
        // if don't cut
        maxPrice = Math.max(maxPrice, price[rod-1]);
        return dp[rod] = maxPrice;
    }
    return cuttingRodHelper(n);
}

/*
# Complexity Analysis

Time Complexity
    O(n^2) where n is the length of the rod. The DP table size is (n+1)x(n+1), and each state is computed once. The initialization of the DP table takes O(n^2).

Space Complexity
    O(n^2) for the DP table storage and O(n) for the recursion stack depth.
*/


// Solution II Tabulation
class Solution {

    RodCuttingTabulation(price, N){
        let dp = Array.from({length: N+1}, ()=> new Array(N+2).fill(0));
        for(let n = 1; n <= N ; n++){
            for(let i= n; i >= 1 ; i--){
                dp[n][i] = Math.max(
                    n >= i? price[i-1] + dp[n-i][i] : 0,
                    dp[n][i+1]
                )
            }
        }
        return dp[N][1];
    }
    RodCutting(price, n) {
       return this.RodCuttingTabulation(price, n);
    }
}


/*
# Complexity Analysis

Time Complexity
    O(N^2) where N is the length of the rod. The tabulation method initializes an (N+1)x(N+2) DP table in O(N^2) time, followed by nested loops where the outer loop runs N times and the inner loop runs N times, resulting in a total complexity of O(N^2).

Space Complexity
    O(N^2) where N is the length of the rod. The algorithm allocates a 2D array of size (N+1)x(N+2) to store the intermediate results, requiring O(N^2) space.
*/

// Solution - III (Iterative)
function rodCutItertive(price){
    let n = price.length;
    let maxPrice = new Array(n+1).fill(0);

    maxPrice[1] = price[0];
    for(let i = 2; i<= n ;i++){
        for(let cut = 1; cut < i; cut++){
            maxPrice[i] = Math.max(maxPrice[i] , price[cut-1] + maxPrice[i-cut]);
        }
        maxPrice[i] = Math.max(maxPrice[i], price[i-1]);
    }
    return maxPrice[n];
}

/*
# Complexity Analysis

Time Complexity
    O(N^2) where N is the length of the rod. The tabulation method initializes an (N+1)x(N+2) DP table in O(N^2) time, followed by nested loops where the outer loop runs N times and the inner loop runs N times, resulting in a total complexity of O(N^2).

Space Complexity
    O(N) where N is the length of the rod.
*/


