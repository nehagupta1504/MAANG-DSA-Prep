/*
# Problem Statement:
    Give an array coins of n integers representing coin denominations. Your task is to find the number of distinct combinations that sum up to a specified amount of money. If it's impossible to achieve the exact amount with any combination of coins, return 0.

    Single coin can be used any number of times.

    Return your answer with modulo 109+7.


Example 1

    Input: coins = [2, 4,10], amount = 10

    Output: 4

    Explanation: The four combinations are:

    10 = 10

    10 = 4 + 4 + 2

    10 = 4 + 2 + 2 + 2

    10 = 2 + 2 + 2 + 2 + 2

Example 2

    Input: coins = [5], amount = 5
    Output: 1
    Explanation: There is one combination: 5 = 5.

# Constraints

    1 <= n, coins[i], amount <= 103
    All the values of coins are unique.
*/


// Solution I  Recursion
class Solution {
    coinChange(coins, i, amount){
        if(amount == 0){
            return 1;
        }
        if(coins.length == i || amount < 0){
            return 0;
        }
        let take = this.coinChange(coins, i, amount-coins[i]);
        let notTake = this.coinChange(coins, i+1, amount);
        return take + notTake;
    }
    count(coins, N, amount) {
        return this.coinChange(coins, 0, amount);
    }
}


// Solution II Tabulation
class Solution {
    coinChangeTabulation(coins, N, amount){
         let dp = Array.from({length: N+1}, ()=> new Array(amount+1).fill(0));
         for(let i=0 ; i<= N; i++){
            dp[i][0] = 1;
         }
         let mod = 1e9+ 7;
         for(let i = N-1; i>= 0; i--){
            for(let amt = 1; amt <= amount; amt++){
                if(amt-coins[i] >= 0){
                    dp[i][amt] = (dp[i][amt-coins[i]] %mod + dp[i+1][amt]%mod)%mod; 
                }else{
                    dp[i][amt] = dp[i+1][amt];
                }
            }
         }
         return dp[0][amount]

    }
    count(coins, N, amount) {
       return this.coinChangeTabulation(coins, N, amount);
    }
}


/*
# Complexity Analysis
    Time Complexity
        O(N * amount), where N is the number of coins and amount is the target sum. The space initialization loop runs in O(N * amount), the base case loop runs in O(N), and the nested loops iterate over N and amount.

    Space Complexity
        O(N * amount), as a 2D array of size (N + 1) x (amount + 1) is allocated to store the DP states.
*/

// Solution - III (Space optimised Tabulation)

function coinChangeIterative(coins, sum){
    let n = coins.length;
   let dp = new Array(sum+1).fill(0);
   let mod = 1e6+7;

   dp[0] = 1;

   for(let i = n-1; i>=0 ; i--){
       for(let j = 1; j<= sum ;j++){
           dp[j] = ((j - coins[i] >= 0 ?
                            dp[j-coins[i]]: 0
                       ) + dp[j])%mod;
       }
   }
   return dp[sum];
}

// More optimised
function coinChangeIterative(coins, sum){
    let n = coins.length;
   let dp = new Array(sum+1).fill(0);
   // let mod = 1e6+7;

   dp[0] = 1;

   for(let i = n-1; i>=0 ; i--){
       for(let j = coins[i]; j<= sum ;j++){
        // we need j to be always >= coins[i] otherwise we're assigning dp[j] = dp[j], so the minm value of j can be coins[i]
           dp[j] = dp[j-coins[i]] + dp[j];
       }
   }
   return dp[sum];
}