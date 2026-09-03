/*
# Problem Statement:
    You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.

    Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

    You may assume that you have an infinite number of each kind of coin.

    

    Example 1:

    Input: coins = [1,2,5], amount = 11
    Output: 3
    Explanation: 11 = 5 + 5 + 1
    Example 2:

    Input: coins = [2], amount = 3
    Output: -1
    Example 3:

    Input: coins = [1], amount = 0
    Output: 0
    

Constraints:

    1 <= coins.length <= 12
    1 <= coins[i] <= 231 - 1
    0 <= amount <= 104
*/


/*
# Intuition
    1. We will go with knapsack approach here, take it or not take it
    2. If we take it we increase coin count by 1 and decrease the amount by coins[i] and stay on the same coin, since there are infinite amounts of coins
    3. If we don't take it we just check for next element
    4. If ever we reach a amount of zero it means it is possible to change the coin so we return the amount of coin needed
    to get an updated amount standing at index i
    5. Of both choices, return the one with minm coins
*/


// Solution I (Memoisation)
function coinChangeMemoisation(coins, sum){
    let n = coins.length;
    let dp = Array.from({length: n}, ()=> new Array(sum+1).fill(-1));

    function coinChangeHelper(i, sum){
        if(sum == 0) return 0;

        if(i == n)return Infinity;

        if(dp[i][sum] != -1) dp[i][sum];

        let take = sum >= coins[i] ? 1 + coinChangeHelper(i, sum-coins[i]): Infinity;
        let notTake = coinChangeHelper(i+1, sum);

        return (dp[i][sum]= Math.min(take, notTake));
    }
    let minCoins = coinChangeHelper(0, sum);
    return  minCoins == Infinity ? -1: minCoins;
}


/*
# Complexity Analysis
    TC - O(n*k), where k is the amount needed, originally from 2^n without DP
        Number of states - n*k, and constant work in each stat
    SC - O(n*k) -> Dp -O(n*k), stack space needed can be max k if there is coin of 1 then we need to collect 1rs at a time on each level
*/

// Solution II (Tabulation)
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
    return coinChangeIterative(coins, amount)
};


function coinChangeMemoisation(coins, sum){
    let n = coins.length;
    let dp = Array.from({length: n}, ()=> new Array(sum+1).fill(-1));

    function coinChangeHelper(i, sum){
        if(sum == 0) return 0;

        if(i == n)return Infinity;

        if(dp[i][sum] != -1) dp[i][sum];

        let take = sum >= coins[i] ? 1 + coinChangeHelper(i, sum-coins[i]): Infinity;
        let notTake = coinChangeHelper(i+1, sum);

        return (dp[i][sum]= Math.min(take, notTake));
    }
    let minCoins = coinChangeHelper(0, sum);
    return  minCoins == Infinity ? -1: minCoins;
}


function coinChangeIterative(coins, sum){
    let n = coins.length;
    let dp = Array.from({length: n+1}, ()=> new Array(sum+1).fill(Infinity));

    for(let i=0; i<= n ; i++){
        dp[i][0] = 0;
    }
    for(let i = n-1; i>=0 ; i--){
        for(let j = 0; j<= sum; j++){
             let take = j >= coins[i] ? 1 + dp[i][j-coins[i]]: Infinity;
             let notTake = dp[i+1][j];

             dp[i][j]= Math.min(take, notTake)
        }
        // console.log(dp[i])
    }
    return dp[0][sum] == Infinity ? -1: dp[0][sum];

}

// Only stack space removed rest complexity is same


// Solution - III (Space optimised Tabulation)
function coinChangeIterative(coins, sum){
    let n = coins.length;
    let dp = new Array(sum+1).fill(Infinity);

    dp[0] = 0;
    
    for(let i = n-1; i>=0 ; i--){
        for(let j = 0; j<= sum; j++){
             let take = j >= coins[i] ? 1 + dp[j-coins[i]]: Infinity;
             let notTake = dp[j];

             dp[j]= Math.min(take, notTake)
        }
    }
    return dp[sum] == Infinity ? -1: dp[sum];

}

/*
 TC - O(n*k), where k is the amount needed, originally from 2^n without DP
        Number of states - n*k, and constant work in each state
    SC - O(k) -> Dp Table 

*/