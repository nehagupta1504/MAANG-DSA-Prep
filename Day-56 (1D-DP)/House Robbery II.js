/*
# Problem Statement:
    You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. All houses at this place are arranged in a circle. That means the first house is the neighbor of the last one. Meanwhile, adjacent houses have a security system connected, and it will automatically contact the police if two adjacent houses were broken into on the same night.

    Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.

    

    Example 1:

    Input: nums = [2,3,2]
    Output: 3
    Explanation: You cannot rob house 1 (money = 2) and then rob house 3 (money = 2), because they are adjacent houses.
    Example 2:

    Input: nums = [1,2,3,1]
    Output: 4
    Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
    Total amount you can rob = 1 + 3 = 4.
    Example 3:

    Input: nums = [1,2,3]
    Output: 3

*/


/*
# Intuition
    1. We know how to claculate max loot amount, when nbring houses are not allowed using House Robber I
    2. In this problem since we can't loot 0 and n-1 house together, we can divide problem into 2 parts
        2.1 Start from house 0 and end at n-2, find max loot amount till n-2
        2.2 start at 1st house and end at n-1 and find max loot amount till n-1
    3. return the max amount out of n-1 and n-2

    Why this works?
    1. Since we can't include both 0th and n-1th house, it makes sense to divide problem into 2 parts from (0 to n-2) to get maxm 
    amount if 0th house is included and (1, n-1) to get maxm amount if last house included and return max out of both
*/


// Solution
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
    let n = nums.length;

    if(n == 1) return nums[0];

    let robbery1 = houseRobbery(nums.slice(1));
    let robbery2 = houseRobbery(nums.slice(0, n-1))
    return Math.max(robbery1, robbery2);
};

function houseRobbery(house){
    let n = house.length;
    let loot = new Array(n);

    loot[0] = house[0];
    loot[1] = Math.max(house[0], house[1]);

    for(let i=2; i < n; i++){
        loot[i] = Math.max(house[i] + loot[i-2], loot[i-1]);
    }
    return loot[n-1];
}


/*
# Complexity Analysis

*/