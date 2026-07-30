/*
# Problem Statement:
    Given a collection of candidate numbers (candidates) and a target number (target), find all unique combinations in candidates where the candidate numbers sum to target.

    Each number in candidates may only be used once in the combination.

    Note: The solution set must not contain duplicate combinations.

    

Example 1:

    Input: candidates = [10,1,2,7,6,1,5], target = 8
    Output: 
    [
    [1,1,6],
    [1,2,5],
    [1,7],
    [2,6]
    ]

Example 2:

    Input: candidates = [2,5,2,1,2], target = 5
    Output: 
    [
    [1,2,2],
    [5]
    ]
 

Constraints:

    1 <= candidates.length <= 100
    1 <= candidates[i] <= 50
    1 <= target <= 30
*/


/*
# Intuition
    1. Same as subset II

*/


// Solution I

var combinationSum2 = function(candidates, target) {
    let n = candidates.length;
    candidates.sort((a,b)=>a-b);
    let totalSum = candidates.reduce((sum, el)=>el+sum, 0);
    if(totalSum < target){
     return [];
    }
    let res = [];
    combinationSum2helper(0, candidates, target, [], res, 0);
    
    return res;
};

// 2^n calls if all are unique so 2^30
function combinationSum2helper(index, nums, k, arr, res, currSum){
 if(currSum == k){
     res.push([...arr]);
     return;
 }
 // pruning currSum > k
 if(index == nums.length || currSum > k) return;

 
 arr.push(nums[index]);
 combinationSum2helper(index+1, nums, k, arr, res, currSum+nums[index]);

 arr.pop();
 while(index < nums.length-1 && nums[index] == nums[index+1]){
     index++;
 }
 combinationSum2helper(index+1,  nums, k, arr, res, currSum);
}


/*
# Complexity Analysis

*/