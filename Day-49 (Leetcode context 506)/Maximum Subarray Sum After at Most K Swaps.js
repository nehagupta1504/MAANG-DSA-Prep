/*
Level : HARD

# Problem Statement:
    You are given an integer array nums and an integer k.

    You are allowed to perform at most k swap operations on the array.

    In one swap operation, you may choose any two indices i and j and swap nums[i] and nums[j].

    Return an integer denoting the maximum possible subarray sum after performing the swaps.

     

Example 1:

    Input: nums = [1,-1,0,2], k = 1

    Output: 3

    Explanation:

    We can swap on indices 1 and 3, resulting in the array [1, 2, 0, -1].
    The subarray [1, 2] has a sum of 3, which is the maximum possible subarray sum after at most k = 1​​​​​​​ swap.
    
Example 2:

    Input: nums = [4,3,2,4], k = 2

    Output: 13

    Explanation:

    The maximum possible subarray sum after at most k = 2 swaps is the sum of the entire array, which is 13.

Example 3:

    Input: nums = [-1,-2], k = 0

    Output: -1

    Explanation:

    k = 0 swaps are allowed.
    The possible subarrays are [-1], [-2], and [-1, -2], with sums -1, -2, and -3 respectively.
    Among these sums, the maximum is -1.
 

# Constraints:

    1 <= nums.length <= 1500
    -105 <= nums[i] <= 105
    0 <= k <= nums.length

    Note: Please do not copy the description during the contest to maintain the integrity of your submissions.
*/


/*
# Intuition (Brute Force)
    1. Find all subarrays we'll consider that array as answer [inside], rest elements are outside
    2. Try to replace k smallest element of inside array from largest k elements of outside
    3. we'll only replace inside element with outside when outside > inside element
    4. find the maxSum out of all subarrays after each operation    
*/


// Solution I (Brute Force)

var maxSum = function(nums, k) {
    let n = nums.length;
    let maxSum = -Infinity;
    
    for(let i=0; i< n ; i++){
        let currSum =0;
        let inside = [], outside = [...nums];

        for(let j =i ; j < n; j++){
            inside.push(nums[j]);
            currSum += nums[j];
            
            let ind = outside.indexOf(nums[j]);
            outside.splice(ind, 1);
            
            // smallest from inside and largest from outside and largest >  smallest
            let insideSorted = [...inside];
            let outsideSorted = [...outside];
            
            insideSorted.sort((a,b)=>a-b);
            outsideSorted.sort((a,b)=> b-a);


            let alteredCurrSum = currSum
            let swaps = Math.min(k, insideSorted.length, outsideSorted.length);
            let index =0;
            while(swaps > 0){
                let smallest = insideSorted[index];
                let largest = outsideSorted[index];
                if(smallest < largest){
                    alteredCurrSum -= smallest;
                    alteredCurrSum += largest;
                }
                index++;
                swaps--;
            }
            maxSum = Math.max(maxSum, alteredCurrSum);
        }
        
    }
    return maxSum;
};


/*
# Complexity Analysis

Time Complexity: O(n^3*logn)
    O(n³ log n) because there are O(n²) subarrays and sorting takes O(n log n) for each.

Space Complexity: O(n): we crearted 4 arrays so O(4*n) ~ O(n)
*/