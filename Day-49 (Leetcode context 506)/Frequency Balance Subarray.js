/*
# Problem Statement:
    You are given an integer array ​​​​​​​nums.

    Define a frequency balance subarray as follows:

    If the subarray contains only one distinct value, it is frequency balanced.
    Otherwise, there must exist a positive integer f such that every distinct value in the subarray occurs either f or 2 * f times, and both frequencies occur among the distinct values.
    Return an integer denoting the length of the longest frequency balance subarray.

     

Example 1:

    Input: nums = [1,2,2,1,2,3,3,3]

    Output: 5

    Explanation:

    The longest frequency balance subarray is [2, 1, 2, 3, 3].
    The elements that appear most frequently are 2 and 3, both appearing twice.
    The remaining element 1 appears once, meeting the requirements.

Example 2:

    Input: nums = [5,5,5,5]

    Output: 4

    Explanation:

    The longest frequency balance subarray is [5, 5, 5, 5].
    The element that appears most frequently is 5.
    There are no other elements meeting the requirements.

Example 3:

    Input: nums = [1,2,3,4]

    Output: 1

    Explanation:

    Since all elements appear only once, the length of the longest frequency balance subarray is 1.

     

# Constraints:

    1 <= nums.length <= 10​​​​​​​3
    1 <= nums[i] <= 10​​​​​​​9

*/


/*
# Intuition
    1. The code tries every possible subarray nums[i...j] using two loops.

    2. For each subarray, freqMap stores how many times each number appears.

        Example:

        [1, 2, 1] → {1: 2, 2: 1}

    3. uniqueFreq stores how many numbers have a particular frequency.

        Example:

        {1: 2, 2: 1} 

        means:

        frequency 2 appears for 1 number
        frequency 1 appears for 1 number
    3. Whenever nums[j] is added, its old frequency is removed from uniqueFreq, and its new frequency is added.
    4. Then checkIsBalanced() checks whether the current subarray satisfies your balanced condition.
        a. if only 1 element in freqMap and uniqueFreq = 1 so it satisfies our condition
        b. uniqueFreq = 2, if uniqueFreq >2 (never balanced) only 2 frequencies can be there `f` &  `2f`
        c. sort it to get smaller freq and larger freq if larger = 2*smaller then our array is balanced
 */


// Solution
/**
 * @param {number[]} nums
 * @return {number}
 */

var getLength = function (nums) {
    let n = nums.length;
    let maxSize = 0;

    for (let i = 0; i < n; i++) {
        let freqMap = new Map();
        let uniqueFreq = new Map();

        for (let j = i; j < n; j++) {
            // fill freqMap
            let previousFreq = freqMap.get(nums[j]) || 0;
            increaseFreqCount(freqMap, nums[j]);
            
            // remove prev freq 
            if(previousFreq != 0){
                decreaseFreqCount(uniqueFreq, previousFreq);
            }

            // add count to new one
            increaseFreqCount(uniqueFreq, previousFreq+1);
    
            let size = checkIsBalanced(uniqueFreq, freqMap, i, j);
            maxSize = Math.max(size, maxSize);
        }
    }
    return maxSize;
};

function checkIsBalanced(uniqueFreq, freqMap, i, j){
    let maxSize = 0;
    if (uniqueFreq.size == 1 && freqMap.size == 1) {
        maxSize = Math.max(maxSize, j - i + 1);
    }
    
    // or  uniqueFreq size  == 2 check larger = 2*smaller;
    if (uniqueFreq.size == 2) {
        let keys = [...uniqueFreq.keys()].sort((a, b) => a - b);
        
        let smaller = keys[0];
        let larger = keys[1];
        if (larger == 2 * smaller) {
            maxSize = Math.max(maxSize, j - i + 1);
        }
    }
    return maxSize;
}

function decreaseFreqCount(map, key){
    map.set(key, (map.get(key) || 0)-1);
    if(map.get(key) == 0){
        map.delete(key);
    }
}

function increaseFreqCount(map, key){
    map.set(key, (map.get(key) || 0)+1)
}


/*
# Complexity Analysis
    Time Complexity: O(n²)
        O(n²) to check all subarrays + All other are constant operations
    Space Complexity: O(n)
        2 freq map, max can be of size n
*/