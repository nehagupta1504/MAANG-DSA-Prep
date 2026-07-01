/*
# Problem Statement:
    Leetcode- 658 (https://leetcode.com/problems/find-k-closest-elements/)
        Given a sorted integer array arr, two integers k and x, return the k closest integers to x in the array. The result should also be sorted in ascending order.

        An integer a is closer to x than an integer b if:

        |a - x| < |b - x|, or
        |a - x| == |b - x| and a < b
        

    Example 1:

        Input: arr = [1,2,3,4,5], k = 4, x = 3

        Output: [1,2,3,4]

        Example 2:

        Input: arr = [1,1,2,3,4,5], k = 4, x = -1

        Output: [1,1,2,3]

    

    Constraints:

        1 <= k <= arr.length
        1 <= arr.length <= 104
        arr is sorted in ascending order.
        -104 <= arr[i], x <= 104
*/


/*
# Intuition
    1. Find the place of x in the array using binary search
    2. From that position go to both sides of array if the diff is same then keep left side and move on
    3. Keep the value in array as per the diff
    4. Make 2 seperate arrays for left side and right side so that we don't have to sort them
    5. Since every element added in the left array will be in decresing order so you have to reverse it and then merge both arrays and return ans
*/


// Solution I (Binary Search + 2 Pointers)
/**
 * @param {number[]} arr
 * @param {number} k
 * @param {number} x
 * @return {number[]}
 */
var findClosestElements = function(arr, k, x) {
    let n = arr.length;

    let pos = findPosInArray(arr, x);
    
    let left = pos, right = pos+1;
    let leftArray = [], rightArray = [];

    while(left >= 0 && right < n  && k > 0){
        let a = Math.abs(arr[left] -x);
        let b = Math.abs(arr[right]-x);
        
        if(a <= b){
            leftArray.push(arr[left]);
            left--;
        }else{
            rightArray.push(arr[right]);
            right++;
        }

        k--;
    }
    
    while(k > 0 && left >= 0){
         leftArray.push(arr[left]);
         left--;
         k--;
    }
    while(k > 0 && right < n){
        rightArray.push(arr[right]);
        right++;
        k--;
    }

    leftArray = leftArray.reverse();
    let ans = [...leftArray, ...rightArray]
    
    return ans;
};

function findPosInArray(arr, x){
    let low = 0, high = arr.length-1;

    while(low <= high){
        let mid = low + Math.floor((high-low)/2)
        if(arr[mid] <= x){
            low = mid+1;
        }else{
            high = mid-1;
        }
    }
    return high;
}

/*
# Complexity Analysis
    TC:  O(logn + k)
        Explanation: Binary Search (findPosInArray()) O(log n)  + two-pointer pick // O(k) + reverse/merge    // O(k)
*/