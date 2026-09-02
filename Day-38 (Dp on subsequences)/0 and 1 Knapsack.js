/*
# Problem Statement:
    Given two integer arrays, val and wt, each of size N, which represent the values and weights of N items respectively, and an integer W representing the maximum capacity of a knapsack, determine the maximum value achievable by selecting a subset of the items such that the total weight of the selected items does not exceed the knapsack capacity W.
    Each item can either be picked in its entirety or not picked at all (0-1 property). The goal is to maximize the sum of the values of the selected items while keeping the total weight within the knapsack's capacity.


Example 1

    Input: val = [60, 100, 120], wt = [10, 20, 30], W = 50

    Output: 220

    Explanation: Select items with weights 20 and 30 for a total value of 100 + 120 = 220.

Example 2

    Input: val = [10, 40, 30, 50], wt = [5, 4, 6, 3], W = 10

    Output: 90

    Explanation: Select items with weights 4 and 3 for a total value of 40 + 50 = 90.


# Constraints

    1 ≤ N ≤ 500
    1 ≤ W ≤ 1000
    1 ≤ wt[i] ≤ 500
    1 ≤ val[i] ≤ 500
*/


/*
# Intuition
    * At every item, we have 2 choices: Pick or Skip.
        For each item, we ask:
        * Include it → if its weight fits in remaining capacity (W)
        * Exclude it → move to next item without taking it
        Since it’s 0/1 Knapsack, an item can be picked only once.

    * Goal is to maximize total value, not weight.
        We have a bag with capacity W, and every item has:

        * wt[i] → weight
        * val[i] → profit/value

        We want the maximum total value while staying within the weight limit.

    * If we include an item, capacity reduces.
        When picking an item:

        W - wt[i]

        because some bag space gets occupied, and we also add its value:

        val[i] + recursiveAnswer

    * We choose the better option using Math.max().
        Since the objective is maximum profit, we compare:

        Math.max(include, exclude)

        and keep the option giving higher value.

    * Memoization avoids solving the same state repeatedly.
        State = (i, W):

        i → current item index
        W → remaining bag capacity

        dp[i][W] stores the best profit possible from that state, avoiding repeated recursion.
*/


// Solution - I (Memoisation)
class Solution {
    knapsack01Memoisation(wt, val, i, n, W, dp) {
      if (W <= 0 || i == n) {
        return 0;
      }
      if(dp[i][W] != -1){
          return dp[i][W];
      }
  
      let include =
        W >= wt[i]
          ? val[i] + this.knapsack01Memoisation(wt, val, i + 1, n, W - wt[i], dp)
          : 0;
      let exclude = this.knapsack01Memoisation(wt, val, i + 1, n, W, dp);
  
      return dp[i][W] = Math.max(include, exclude);
    }
    knapsack01(wt, val, n, W) {
      let dp = Array.from({ length: n }, () => new Array(W + 1).fill(-1));
      return this.knapsack01Memoisation(wt, val, 0, n, W, dp);
    }
  }


/*
# Complexity Analysis

    Time Complexity
        O(n * W) where n is the number of items and W is the capacity; initializing the dp table takes O(n * W) and there are n * W unique states calculated once in the recursion.

    Space Complexity
        O(n * W) where n is the number of items and W is the capacity; this is used for the dp table storage and the recursion stack depth which is O(n).
    */


// Solution -II (Tabulation)
function iterativeKanpsack(profits, weights, C){
    let n = profits.length;
	let dp = Array.from({length: n+1}, ()=> new Array(C+1).fill(0));


    for(let i = n-1; i>= 0; i--){
        for(let j = 0; j<= C; j++){
            let take = j >= weights[i] ? profits[i] + dp[i+1][j-weights[i]]: 0;
            let notTake = dp[i+1][j];
            dp[i][j] = Math.max(take, notTake);
        }
    }
    return dp[0][C];
}

/*
# Complexity Analysis

Time Complexity
    O(n*C) where n is the number of items and W is the capacity; initializing the dp table takes O(n * W) and there are n * W unique states calculated once in the recursion.

Space Complexity
    O(n*C) where n is the number of items and W is the capacity; this is used for the dp table storage and the recursion stack depth which is O(n).

*/

// Solution- III (Space Optimised) with O(C) space only

function iterativeKanpsack(profits, weights, C){
    let n = profits.length;
	let dp =  new Array(C+1).fill(0);


    for(let i = n-1; i>= 0; i--){
        for(let j = C; j>=0; j--){
            let take = j >= weights[i] ? profits[i] + dp[j-weights[i]]: 0;
            let notTake = dp[j];
            dp[j] = Math.max(take, notTake);
        }
    }
    return dp[C];
}