/*
Leetcode- 1498
# Problem Statement:
    You are given an array of integers nums and an integer target.

    Return the number of non-empty subsequences of nums such that the sum of the minimum and maximum element on it is less or equal to target. Since the answer may be too large, return it modulo 109 + 7.

    

Example 1:

    Input: nums = [3,5,6,7], target = 9
    Output: 4
    Explanation: There are 4 subsequences that satisfy the condition.
    [3] -> Min value + max value <= target (3 + 3 <= 9)
    [3,5] -> (3 + 5 <= 9)
    [3,5,6] -> (3 + 6 <= 9)
    [3,6] -> (3 + 6 <= 9)

Example 2:
    Input: nums = [3,3,6,8], target = 10
    Output: 6
    Explanation: There are 6 subsequences that satisfy the condition. (nums can have repeated numbers).
    [3] , [3] , [3,3], [3,6] , [3,6] , [3,3,6]

Example 3:

    Input: nums = [2,3,3,4,6,7], target = 12
    Output: 61
    Explanation: There are 63 non-empty subsequences, two of them do not satisfy the condition ([6,7], [7]).
    Number of valid subsequences (63 - 2 = 61).
 

Constraints:

    1 <= nums.length <= 105
    1 <= nums[i] <= 106
    1 <= target <= 106
*/


/*
# Intuition
    1. Sort the array so that we can use 2 pointers approach here
    2. Start from leftmost and rightmost end
    3. whenever sum is > target we move right in inwards direction
    4. Whenever sum is <= target we calculate how many values are there in the subsequence fixing the minm value,
    we don't need to fix right side as all the values from left+1 to right will result in sum < target
    5. so # of subsequence fixing the leftmost side would be 2^numbers from left +1 to right i.e, right-left
    6. Once we calculate it and add it to our answer we move forward to find for left+1

    Note- We use precomputed power of 2's as it can result in overflow by using left shift or pow operator and if 
    we write a recursive function it also slowers our main loop as we're calculation it again and again
*/


// Solution
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

var numSubseq = function (nums, target) {
    let n = nums.length;
    nums.sort((a,b)=>a-b);
    let mod = 1e9+7;
    
    let powOfTwo = new Array(n).fill(1);
    for(let i=1; i< n ; i++){
        powOfTwo[i] = (powOfTwo[i-1]*2)%mod;
    }

    let left = 0, right = n-1;
    let count =0;

    while(left <= right){
        if(nums[left] + nums[right] > target){
            right--;
        }else{
            // if Left boundary is fixed and from left+1 to right any number can be included or excluded
            // as then the sum would always remain less than or equal to target
            let numbersTillRight = right-left;
            count = (count+ powOfTwo[numbersTillRight])%mod;
            left++;
        }
    }
    return count;

};

/*
# Complexity Analysis
    Time Complexity - O(n+n) => O(n)
    Space Complexity - O(n)
*/