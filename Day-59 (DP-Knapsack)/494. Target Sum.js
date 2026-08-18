/*
# Problem Statement:
    You are given an integer array nums and an integer target.

    You want to build an expression out of nums by adding one of the symbols '+' and '-' before each integer in nums and then concatenate all the integers.

    For example, if nums = [2, 1], you can add a '+' before 2 and a '-' before 1 and concatenate them to build the expression "+2-1".
    Return the number of different expressions that you can build, which evaluates to target.

    

    Example 1:

    Input: nums = [1,1,1,1,1], target = 3
    Output: 5
    Explanation: There are 5 ways to assign symbols to make the sum of nums be target 3.
    -1 + 1 + 1 + 1 + 1 = 3
    +1 - 1 + 1 + 1 + 1 = 3
    +1 + 1 - 1 + 1 + 1 = 3
    +1 + 1 + 1 - 1 + 1 = 3
    +1 + 1 + 1 + 1 - 1 = 3
    Example 2:

    Input: nums = [1], target = 1
    Output: 1
    

    Constraints:

    1 <= nums.length <= 20
    0 <= nums[i] <= 1000
    0 <= sum(nums[i]) <= 1000
    -1000 <= target <= 1000
*/


/*
# Intuition
    dp[i][j] =>  Number of ways to reach target using elements from ith to n-1th index, given that current sum is j
    1. 
*/


// Solution
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var findTargetSumWays = function(nums, target) {
    return targetSum(nums, target)
};

function targetSum(nums, target){
    let count =0;
    let n  = nums.length;
    let maxValue = nums.reduce((acc, el)=> acc+el, 0);

    let dp = Array.from({length: n}, ()=> new Array(2*maxValue + 1).fill(-1));

    function targetSumRecursion(i, value){
        if(i == n){
            if(value == target) return 1;
            return 0;
        }
        
        if(dp[i][value+maxValue] != -1) return dp[i][value+maxValue];

        dp[i][value+maxValue] = targetSumRecursion(i+1, value-nums[i])  + targetSumRecursion(i+1, nums[i]+ value);

        return dp[i][value+maxValue];
    }
    return targetSumRecursion(0, 0);
}



/*
# Complexity Analysis
    TC: 
    Without DP - O(2^n) The recursion will go to nth depth for each element and always have 2 states
    with DP - O(n*k) to be exact n*2k+1 where k is the sum of all elements of nums array since we can have n*(2k+1) unique states only

    SC: 
    Without DP - Auxillary space (stack) - O(n)=> O(n)
    With DP - O(n*2k) + O(n) stack => Overall - O(nk)
*/