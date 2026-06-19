/*
# Problem Statement:
    Given an array arr of n integers, where arr[i] represents price of the stock on the ith day. Determine the maximum profit achievable by buying and selling the stock any number of times.
    Holding at most one share of the stock at any given time is allowed, meaning buying and selling the stock can be done any number of times, but the stock must be sold before buying it again. Buying and selling the stock on the same day is permitted.


Example 1

    Input: arr = [9, 2, 6, 4, 7, 3]

    Output: 7

    Explanation: Buy on day 2 (price = 2) and sell on day 3 (price = 6), profit = 6 - 2 = 4. Then buy on day 4 (price = 4) and sell on day 5 (price = 7), profit = 7 - 4 = 3. Total profit is 4 + 3 = 7.

Example 2

    Input: arr = [2, 3, 4, 5, 6]

    Output: 4

    Explanation: Buy on day 1 (price = 2) and sell on day 5 (price = 6), profit = 6 - 2 = 4. Total profit is 4.


# Constraints

    1 <= n<= 105
    0 <= arr[i] <= 104
*/


/*
# Intuition
    ## Iterative - Solution I
        The idea is to capture every small profit opportunity in the stock prices. If today's price is greater than yesterday’s, we add that profit because it means we could have bought yesterday and sold today. Instead of finding one large transaction, we sum all increasing segments, which together give the maximum possible profit for unlimited transactions. This works because consecutive profits combine into the same result as buying at the lowest point and selling at the highest point of an increasing sequence.
        Example:
        1 → 5 → 3 → 8
        Profit = (5-1) + (8-3)
            = 4 + 5
            = 9
    
    ## Recursive - DP 
        * We make a decision at every day: either buy/sell the stock or skip the day.
        * buy = 1 means we are allowed to buy, and buy = 0 means we already hold a stock, so we can sell.
        * If we can buy → choose the maximum between:
            * Buy today (-arr[i]) and move to sell state
            * Skip today and stay in buy state
        * If we can sell → choose the maximum between:
            * Sell today (+arr[i]) and move to buy state
            * Skip today and stay in sell state
        * DP (memoization) stores already calculated states (i, buy) to avoid recomputation and reduce time complexity.
        * State Meaning dp[i][buy]
            * Represents: Maximum profit we can make starting from day i
            * with current state = buy/sell allowed
            * Core Thought Process
                At every index:
                "What's the maximum profit if I act today vs skip today?"
*/


// Solution

// Solution - I (Iterative)
class Solution {
    stockBuySell(arr, n) {
        if(arr.length == 0 || arr.length == 1){
            return 0;
        }
        let profit = 0;
        for(let i= 1; i < n ; i++){
            profit += Math.max(arr[i] - arr[i-1], 0);
        }
        return profit;
    }
}
// Solution -II (Recursive using DP)
class Solution {
    recusiveSolution(arr, i, buy, dp) {
      if (i == arr.length) {
        return 0;
      }
  
      if (dp && dp[i][buy] != -1) {
        return dp[i][buy];
      }
      let profit = 0;
      if (buy) {
        profit = Math.max(
          this.recusiveSolution(arr, i + 1, 0, dp) - arr[i],
          this.recusiveSolution(arr, i + 1, buy, dp),
        );
      } else {
        profit = Math.max(
          this.recusiveSolution(arr, i + 1, 1, dp) + arr[i],
          this.recusiveSolution(arr, i + 1, buy, dp),
        );
      }
      return (dp[i][buy] = profit);
    }
    stockBuySell(arr, n) {
      let dp = Array.from({ length: n }, () => new Array(2).fill(-1));
      return this.recusiveSolution(arr, 0, 1, dp);
    }
  }
  


/*
# Complexity Analysis

Time Complexity
    O(n) where n is the length of the input array. The initialization loop runs n times to create the dp table, and the recursive function computes each unique state (i, buy) exactly once. There are n * 2 possible states, and each state takes O(1) time to compute.

Space Complexity - 
    For solution I O(1), 
    For solution II O(n)
    O(n) where n is the depth of the recursion stack plus the space used for the dp table. The dp table consumes O(n) space (n * 2 elements), and the recursion stack reaches a maximum depth of O(n).
*/


// Solution III (Tabulation)
class Solution {
  // Function to find maximum profit earned using tabulation
  func(arr, n) {
      // Create a DP table to memoize results
      let dp = new Array(n + 1).fill().map(() => new Array(2).fill(-1));

      // Base condition
      dp[n][0] = dp[n][1] = 0;

      let profit;

      // Loop through the array in reverse order
      for (let ind = n - 1; ind >= 0; ind--) {
          for (let buy = 0; buy <= 1; buy++) {
              // We can buy the stock
              if (buy === 0) { 
                  profit = Math.max(0 + dp[ind + 1][0], (-1)*arr[ind] + dp[ind + 1][1]);
              }
          
              // We can sell the stock
              if (buy === 1) { 
                  profit = Math.max(0 + dp[ind + 1][1], arr[ind] + dp[ind + 1][0]);
              }

              dp[ind][buy] = profit;
          }
      }

      /* The maximum profit is stored in
      dp[0][0] after all calculations*/
      return dp[0][0];
  }

  // Function to calculate the maximum profit earned
  stockBuySell(arr, n) {
      // Return the maximum profit
      return this.func(arr, n);
  }
}


/*
Complexity Analysis

Time Complexity
  O(n) where n is the length of the array because the nested loops iterate (n * 2) times performing constant time operations.

Space Complexity
  O(n) where n is the length of the array due to the allocation of a (n+1) * 2 DP table.

*/