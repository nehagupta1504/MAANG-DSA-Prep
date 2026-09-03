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