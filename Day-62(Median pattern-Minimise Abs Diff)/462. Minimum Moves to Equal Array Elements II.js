/*
# Problem Statement:
    Given an integer array nums of size n, return the minimum number of moves required to make all array elements equal.

    In one move, you can increment or decrement an element of the array by 1.

    Test cases are designed so that the answer will fit in a 32-bit integer.

    

    Example 1:

    Input: nums = [1,2,3]
    Output: 2
    Explanation:
    Only two moves are needed (remember each move increments or decrements one element):
    [1,2,3]  =>  [2,2,3]  =>  [2,2,2]
    Example 2:

    Input: nums = [1,10,2,9]
    Output: 16
    

    Constraints:

    n == nums.length
    1 <= nums.length <= 105
    -109 <= nums[i] <= 109
*/


/*
# Intuition
    See Notes for better understanding - notes.md under same folder
*/


// Solution
var minMoves2 = function(nums) {
    nums.sort((a,b)=>a-b);
    let n = nums.length;
    let median = n%2 == 0 ? [n/2, n/2-1]: [Math.floor(n/2)];
    let minCost = Infinity;
    let i=0;
    while(i<median.length){
        let cost =0;
        for(let el of nums){
            cost += Math.abs(el-nums[median[i]]);
        }
        minCost = Math.min(cost, minCost);
        i++;
    }
      return minCost
  };
  



/*
# Complexity Analysis
  TC - O(nlogn+n)
  SC- O(1)
*/