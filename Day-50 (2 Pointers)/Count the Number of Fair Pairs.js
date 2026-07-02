/*
Leetcode- 2563
# Problem Statement:
    
    Given a 0-indexed integer array nums of size n and two integers lower and upper, return the number of fair pairs.

    A pair (i, j) is fair if:

    0 <= i < j < n, and
    lower <= nums[i] + nums[j] <= upper
 

Example 1:

    Input: nums = [0,1,7,4,4,5], lower = 3, upper = 6
    Output: 6
    Explanation: There are 6 fair pairs: (0,3), (0,4), (0,5), (1,3), (1,4), and (1,5).

Example 2:

    Input: nums = [1,7,9,2,5], lower = 11, upper = 11
    Output: 1
    Explanation: There is a single fair pair: (2,3).
 

# Constraints:

    1 <= nums.length <= 105
    nums.length == n
    -109 <= nums[i] <= 109
    -109 <= lower <= upper <= 109
*/


/*
# Intuition
    1. It's same as "Count Pairs Whose Sum is Less than Target" but now we have given a lowerbound so we can't directly do right-left
        as it breaks our condition
    2. We use the exact left and right pointers as "Count Pairs Whose Sum is Less than Target" (see explanation of this problem)
        but now we find the first valid position btw left and right from where the nums[left] + nums(valid... right) becomes >= lowerbound
        since upperbound is fixed by nums[left] + nums[right]
        a. we found the valid position using binary search whenever the sum at curr pos and left becomes more or equal we move to the left
         else we move to the right 
*/


// Solution
var countFairPairs = function (nums, lower, upper) {
    nums.sort((a, b) => a - b); 
    let n = nums.length;
    let left = 0, right = n - 1;
    let count = 0;
    while (left < right) {
        if (nums[left] + nums[right] > upper) { 
            right--;
        } else if (nums[left] + nums[right] < lower) {
            left++;
        } else {
            let pos = binarySearch(nums, left, right, lower); 
            count += right - pos+1;
            left++;
        }
    }
    return count;

};


function binarySearch(nums, left, right, lower) {
    let low = left + 1; 
    let high = right - 1;
    while (low <= high) { 
        let mid = low + Math.floor((high - low) / 2);
        if (nums[mid] + nums[left] >= lower) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    // first valid pos
    return high+1;
}


/*
# Complexity Analysis
    TC- O(nlogn+nlogn)
    SC - O(1)
*/