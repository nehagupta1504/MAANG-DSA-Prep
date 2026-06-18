/*
# Problem Statement:
    Given an array arr of n integers, where arr[i] represents price of the stock on the ith day. Determine the maximum profit achievable by buying and selling the stock at most once. 
    The stock should be purchased before selling it, and both actions cannot occur on the same day.


Example 1

    Input: arr = [10, 7, 5, 8, 11, 9]

    Output: 6

    Explanation: Buy on day 3 (price = 5) and sell on day 5 (price = 11), profit = 11 - 5 = 6.

Example 2

    Input: arr = [5, 4, 3, 2, 1]

    Output: 0

    Explanation: In this case, no transactions are made. Therefore, the maximum profit remains 0.

# Constraints

    1 <= n<= 105
    0 <= arr[i] <= 106
*/


/*
# Intuition
1. finds the maximum profit from one buy and one sell transaction by tracking:

        buy → the minimum stock price seen so far
        profit → the maximum profit possible till current day
Ex- arr = [7, 1, 5, 3, 6, 4]

Price
  8 |
  7 | ● (7)
  6 |                     ● (6)
  5 |         ● (5)
  4 |                           ● (4)
  3 |              ● (3)
  2 |
  1 |    ● (1)
  0 +---------------------------------------
      D0   D1   D2   D3   D4   D5

| Day | Price | buy (min so far) | Profit Calculation | max profit |
| --- | ----- | ---------------- | ------------------ | ---------- |
| 0   | 7     | 7                | —                  | 0          |
| 1   | 1     | 1                | cheaper buy found  | 0          |
| 2   | 5     | 1                | `5 - 1 = 4`        | 4          |
| 3   | 3     | 1                | `3 - 1 = 2`        | 4          |
| 4   | 6     | 1                | `6 - 1 = 5`        | 5          |
| 5   | 4     | 1                | `4 - 1 = 3`        | 5          |

Price
  8 |
  7 | ●
  6 |                     🔴 Sell (6)
  5 |         ●
  4 |                           ●
  3 |              ●
  2 |
  1 |    🟢 Buy (1)
  0 +--------------------------------
      D0   D1   D2   D3   D4   D5

What the Algorithm Thinks

    At every day:

    "Can I get better profit if I sell today?"
*/

// Solution I
class Solution {
    // Function to calculate the maximum profit earned
    stockBuySell(arr, n) {
        let maxProfit = 0;
        // Initialize mini to the first element of arr
        let mini = arr[0];

        // Traverse through the array
        for (let i = 1; i < n; i++) {
            // Calculate current profit
            let curProfit = arr[i] - mini;
            
            // Update maxProfit if curProfit is larger
            maxProfit = Math.max(maxProfit, curProfit);
            
            // Update mini to minimum value encountered so far
            mini = Math.min(mini, arr[i]);
        }
        // Return the maximum profit
        return maxProfit;
    }
}

// Solution II
class Solution {
    stockBuySell(arr, n) {
        if(arr.length == 0 || arr.length == 1){
            return 0;
        }
        let buy = arr[0], profit =0;
        for(let i = 1; i < n; i++){
            if(buy >= arr[i]){
                buy = arr[i];
            }else{
                profit = Math.max(profit, arr[i] - buy);
            }
        }
        return profit;
    }
}

/*
# Complexity Analysis

Time Complexity
    O(n) because the algorithm iterates through the array of size n exactly once using a single loop starting from index 1 to n-1.

Space Complexity
    O(1) because the algorithm uses only a constant amount of extra space for the variables 'buy' and 'profit', regardless of the input size.
*/