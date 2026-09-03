/*
# Problem Statement:
    You are given an array of integers stones where stones[i] is the weight of the ith stone.

    We are playing a game with the stones. On each turn, we choose any two stones and smash them together. Suppose the stones have weights x and y with x <= y. The result of this smash is:

    If x == y, both stones are destroyed, and
    If x != y, the stone of weight x is destroyed, and the stone of weight y has new weight y - x.
    At the end of the game, there is at most one stone left.

    Return the smallest possible weight of the left stone. If there are no stones left, return 0.

    

Example 1:

    Input: stones = [2,7,4,1,8,1]
    Output: 1
    Explanation:
    We can combine 2 and 4 to get 2, so the array converts to [2,7,1,8,1] then,
    we can combine 7 and 8 to get 1, so the array converts to [2,1,1,1] then,
    we can combine 2 and 1 to get 1, so the array converts to [1,1,1] then,
    we can combine 1 and 1 to get 0, so the array converts to [1], then that's the optimal value.
    Example 2:

    Input: stones = [31,26,33,21,40]
    Output: 5
    

Constraints:

    1 <= stones.length <= 30
    1 <= stones[i] <= 100
*/


/*
# Intuition
    The key observation is that for every stone, we have two choices:

        Add the stone to the current sum.
        Subtract the stone from the current sum.
        For example, for:

        [31, 26, 33, 21, 40]

        one possible combination is:

        31 + 26 - 33 + 21 - 40 = 5

    So, instead of actually simulating stone smashing, we can think of the problem as:

    Assign either + or - to every stone such that the absolute value of the final sum is minimum.

    This gives us a simple recursive solution.

    However, the same (i, sum) state can be reached through multiple paths, so we use memoization to avoid solving the same state again.

    # In Simple Language
    We need to figure out the arrnagement of stones to smash such that we get smallest stone at last
    Think of it like we can combine the power of smaller stone and smash into bigger one to neutraise it.
    For ex - [5,5,15]
    now if we subtract 5,5 with each other 15 will be the greastest stone left, which is not an optimal answer
    However if we combine 5 & 5 it becomes 10 and then we can minimise 15 as much as possible

    Similarly If we find all combinations of + and - between all the numbers there will be qution which will give us minm sum and that will be our answer

    Note- By combining powers I mean we smash smaller stones with bigger one, one by one instead of crashing them all together

*/


// Solution
/**
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeightII = function(stones) {
    return lSWII(stones);
};

function lSWII(stones) {
    let n = stones.length;
    let dp = new Map();

    function lSWIIHelper(i, sum) {
        if (i == n) {
            return Math.abs(sum);
        }

        let key = `${i}|${sum}`;

        if (dp.has(key)) {
            return dp.get(key);
        }

        let ans = Math.min(
            lSWIIHelper(i + 1, sum + stones[i]),
            lSWIIHelper(i + 1, sum - stones[i])
        );

        dp.set(key, ans);

        return ans;
    }

    return lSWIIHelper(0, 0);
}



/*
# Complexity Analysis
Time complexity:
    (O(N*S))

    where N is the number of stones and S is the total sum of all stones.

Space complexity:
    (O(N*S))

    for the memoization map and recursion stack.
*/

// Optimised 1D - DP

/*
    Intuition
    1. Every stone is either assigned to Group A or Group B.
        Ex- a+b-c+d-e => (a+b+d)- (c+e)=> Group A => (a+b+d), Group B=> (c+e)
    2. total = sum of all stones, If Group A has sum x
    then Group B sum => total - x
    3. The final difference is: x - (total-x) => Group A - Group B
    4. x = total/2, So we want to find a subset whose sum is as close as possible to: This converts the problem into a 0/1 Knapsack / Subset Sum problem.
    5. Ex- [2, 7, 4, 1, 8, 1]
        Total= 23
        x = 23/2 = 11.5
        Suppose we find: 2 + 7 + 1 + 1 = 11 (Group A), then other group 23-11 => 12 Diff would be 12-11= 1
    
        Conclusion- We only need to find the maximum subset sum ≤ total / 2.

*/
// Recursive approach logic
function lSWIIOptimised(arr){
    let total = arr.reduce((acc, el)=> acc + el, 0);
    let targetSum = Math.floor(total/2);
    let n = arr.length;

    function maxSubsetSum(i, sum){
        if(i == n && sum <= targetSum){
            return Math.abs(sum);
        }
        if(i == n){
            return 0;
        }
        return Math.max(maxSubsetSum(i+1, sum+arr[i]), maxSubsetSum(i+1, sum));
    }
    let nearTargetSum =  maxSubsetSum(0, 0);
    return total - nearTargetSum - nearTargetSum;
}

// Tabulation approach

/**
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeightII = function(stones) {
    let total = stones.reduce((sum, stone) => sum + stone, 0);
    let target = Math.floor(total / 2);

    let dp = new Array(target + 1).fill(false);
    dp[0] = true;

    for (let stone of stones) {
        for (let sum = target; sum >= stone; sum--) {
            dp[sum] = dp[sum] || dp[sum - stone];
        }
    }

    for (let sum = target; sum >= 0; sum--) {
        if (dp[sum]) {
            return total - 2 * sum;
        }
    }
};

