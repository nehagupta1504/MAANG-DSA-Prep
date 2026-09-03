/*
# Problem Statement:
    Given an array arr of n integers, return true if the array can be partitioned into two subsets such that the sum of elements in both subsets is equal else return false.


Example 1

    Input: arr = [1, 10, 21, 10]

    Output: True

    Explanation: The array can be partitioned as [1, 10, 10] and [21].

Example 2

    Input: arr = [1, 2, 3, 5]

    Output: False

    Explanation: The array cannot be partitioned into equal sum subsets.


# Constraints

    1 ≤ n ≤ 100
    1 ≤ arr[i] ≤ 1000
    n*sum of elements ≤ 105
*/


/*
# Intuition
    * The problem is converted into a Subset Sum problem.
        To split the array into 2 equal parts, both subsets must have the same sum. So instead of finding two subsets directly, we just check:
        “Can we find one subset whose sum = totalSum / 2?”
    * Quick optimization using total sum.
        First, we calculate the total array sum:
        If the sum is odd, equal partition is impossible because an odd number cannot be split into two equal integers → return false.
        If the sum is even, our target becomes sum / 2.
    * At every element, we make 2 choices:
    Either:
        * Take the current number → add it to sumSofar
        * Skip the current number → move ahead without adding
        This explores all possible subsets.
    * Base cases stop unnecessary work.
        * If sumSofar === target, we found one valid subset → return true.
        * If sumSofar > target or we reach the end of the array, this path cannot work → return false.
    * Memoization prevents repeated calculations.
        Many recursion paths revisit the same (index, sumSofar) state. dp[i][sumSofar] stores already-computed answers so we don’t solve the same subproblem again, making the solution much faster.
*/

/**
 * LeetCode: 416. Partition Equal Subset Sum
 *
 * # Intuition
 *
 * If the total sum is odd, we cannot divide the array
 * into two subsets with equal sums.
 *
 * Otherwise, we only need to find whether there exists
 * a subset whose sum is:
 *
 *      totalSum / 2
 *
 * This converts the problem into a classic Subset Sum /
 * 0-1 Knapsack problem.
 *
 * For every number, we have two choices:
 *
 * 1. Take the number
 * 2. Don't take the number
 *
 *
 * ============================================================
 * Solution I — Recursion + Memoisation
 * ============================================================
 *
 * State:
 *
 *      dp[i][sum]
 *
 * Meaning:
 * Can we form `sum` using elements from index `i` onwards?
 *
 * Recurrence:
 *
 *      take:
 *      findTargetSum(i + 1, sum - nums[i])
 *
 *      notTake:
 *      findTargetSum(i + 1, sum)
 *
 * If either choice works, the answer is true.
 *
 * Time Complexity:
 *      O(N * targetSum)
 *
 * Space Complexity:
 *      O(N * targetSum) for DP
 *      + O(N) recursion stack
 */


/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function(nums) {
    return partitionSubset(nums);
};

function partitionSubset(nums) {
    const totalSum = nums.reduce((sum, num) => sum + num, 0);

    if (totalSum % 2 !== 0) {
        return false;
    }

    const n = nums.length;
    const targetSum = totalSum / 2;

    const dp = Array.from(
        { length: n },
        () => new Array(targetSum + 1).fill(-1)
    );

    function findTargetSum(i, sum) {

        if (sum === 0 && i === n) {
            return true;
        }

        if (sum < 0 || i === n) {
            return false;
        }

        if (dp[i][sum] !== -1) {
            return dp[i][sum];
        }

        const take = findTargetSum(
            i + 1,
            sum - nums[i]
        );

        const notTake = findTargetSum(
            i + 1,
            sum
        );

        return dp[i][sum] = take || notTake;
    }

    return findTargetSum(0, targetSum);
}


/*
 * ============================================================
 * Solution II — Bottom-Up Tabulation
 * ============================================================
 *
 * We can convert the recursive solution into an iterative DP.
 *
 * dp[i][sum] means:
 *
 *      Can we form `sum` using elements from index `i`
 *      onwards?
 *
 * At every element:
 *
 *      Take:
 *      dp[i + 1][sum - nums[i]]
 *
 *      Don't Take:
 *      dp[i + 1][sum]
 *
 * Therefore:
 *
 *      dp[i][sum] =
 *          dp[i + 1][sum - nums[i]]
 *          ||
 *          dp[i + 1][sum]
 *
 * Base case:
 *
 *      dp[n][0] = true
 *
 * because with no elements left, we can always form
 * a sum of 0.
 *
 * Time Complexity:
 *      O(N * targetSum)
 *
 * Space Complexity:
 *      O(N * targetSum)
 */

function partitionSubsetIterative(nums) {
    const totalSum = nums.reduce((sum, num) => sum + num, 0);

    if (totalSum % 2 !== 0) {
        return false;
    }

    const n = nums.length;
    const targetSum = totalSum / 2;

    const dp = Array.from(
        { length: n + 1 },
        () => new Array(targetSum + 1).fill(false)
    );

    dp[n][0] = true;

    for (let i = n - 1; i >= 0; i--) {

        for (let sum = 0; sum <= targetSum; sum++) {

            if (sum < nums[i]) {
                dp[i][sum] = dp[i + 1][sum];
                continue;
            }

            const take = dp[i + 1][sum - nums[i]];
            const notTake = dp[i + 1][sum];

            dp[i][sum] = take || notTake;
        }
    }

    return dp[0][targetSum];
}


/*
 * ============================================================
 * Solution III — Space Optimised Tabulation
 * ============================================================
 *
 * In the 2D DP solution, dp[i][sum] only depends on:
 *
 *      dp[i + 1][...]
 *
 * So we don't need to store all N rows.
 *
 * We can reduce the DP to:
 *
 *      dp[sum]
 *
 * dp[sum] means:
 *
 *      Can we currently form this sum?
 *
 * Initially:
 *
 *      dp[0] = true
 *
 * because selecting nothing gives a sum of 0.
 *
 *
 * The transition becomes:
 *
 *      dp[sum] =
 *          dp[sum] ||
 *          dp[sum - nums[i]]
 *
 *
 * IMPORTANT:
 *
 * We iterate `sum` backwards.
 *
 * Why?
 *
 * Because this is a 0/1 Knapsack problem and every number
 * can be used only once.
 *
 * If we iterate forwards, an updated value could be reused
 * in the same iteration, which would allow the same number
 * to be used multiple times.
 *
 * Backward iteration prevents that.
 *
 *
 * Time Complexity:
 *      O(N * targetSum)
 *
 * Space Complexity:
 *      O(targetSum)
 */


/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function(nums) {
    return partitionSubsetIterative(nums);
};

function partitionSubsetIterative(nums) {
    const totalSum = nums.reduce((sum, num) => sum + num, 0);

    if (totalSum % 2 !== 0) {
        return false;
    }

    const targetSum = totalSum / 2;

    const dp = new Array(targetSum + 1).fill(false);

    dp[0] = true;

    for (const num of nums) {

        for (let sum = targetSum; sum >= num; sum--) {
            dp[sum] = dp[sum] || dp[sum - num];
        }
    }

    return dp[targetSum];
}


/*
 * ============================================================
 * Final Comparison
 * ============================================================
 *
 * Solution I:
 *
 *      Recursion + Memoisation
 *
 *      Time:  O(N * targetSum)
 *      Space: O(N * targetSum)
 *
 *
 * Solution II:
 *
 *      2D Tabulation
 *
 *      Time:  O(N * targetSum)
 *      Space: O(N * targetSum)
 *
 *
 * Solution III:
 *
 *      1D Space Optimised DP
 *
 *      Time:  O(N * targetSum)
 *      Space: O(targetSum)
 *
 *
 * Pattern:
 *
 *      Equal Partition
 *             ↓
 *      Total Sum / 2
 *             ↓
 *        Subset Sum
 *             ↓
 *       0/1 Knapsack
 *             ↓
 *          1D DP
 *
 *
 * Key takeaway:
 *
 * "Can I divide the array into two equal subsets?"
 *
 * becomes:
 *
 * "Can I find one subset with sum = totalSum / 2?"
 */