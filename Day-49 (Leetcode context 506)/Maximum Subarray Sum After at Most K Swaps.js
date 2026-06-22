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

    Version 1:
    Try all subarrays + sort
    TC: O(n³ log n)
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



/*
# Intuition (Version 2)
    1. Find all subarrays we'll consider that array as answer [inside], rest elements are outside
    2. Try to replace k smallest element of inside array from largest k elements of outside
    
    Question ? 
    Do we need to sort complete inside and outside arrays? No we only need min of (k, insideSize, outsideSize) we can swap these many
    elements at max, so we can maintain a min heap and max Heap for this size we can optimise it

    Try all subarrays + rebuild top-k heaps
    TC: O(n³ log k)
*/


// Solution II (Using Heap)

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */

var maxSum = function(nums, k) {
    let n = nums.length;
    let maxSum = -Infinity;

    let minHeap = new  MinHeap();
    let maxHeap = new MaxHeap();
    
    for(let i=0; i< n ; i++){
        let currSum =0;
        let inside = [], outside = [...nums];

        for(let j =i ; j < n; j++){
            inside.push(nums[j]);
            currSum += nums[j];
            
            let ind = outside.indexOf(nums[j]);
            outside.splice(ind, 1);
            

            let alteredCurrSum = currSum;
            let swaps = Math.min(k, inside.length, outside.length);
            
            // Maintain swaps element in maxHeap from inside and minHeap from outside
            findKElements(inside, swaps, maxHeap);
            findKElements(outside, swaps, minHeap);

            // get the k/swaps element inside an array use the array to swap the elements
            let sortedInside = maxHeap.sortHeap().reverse();
            let sortedOutside = minHeap.sortHeap().reverse();
            
            let index =0;
            while(swaps > 0){
                let smallest = sortedInside[index];
                let largest = sortedOutside[index];
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


function findKElements(arr, k, heap){
    for(let el of arr){
        heap.push(el);
        if(heap.size() > k){
            heap.pop();
        }
    }
    
}

// Considering MinHeap and MinHeap implementation is present
// You have to implement MinHeap & MinHeap for this solution to work

/*
# Complexity Analysis

Time Complexity - O(n³ log k) 
    — there are O(n²) subarrays, and for each subarray you process up to n elements using heaps of size k, costing O(n log k).
*/




/*
# Intuition (Version 3)
    Try all subarrays + dynamically update inside/outside structures
    Expected TC: around O(n² * klog n) now k almost equal to n it'll wait because it'll again become n^3 so 
    we need to use fenwick tree, which we have yet to learn
    this is the most optimised solution so far using heaps, but still didn't pass all the tests
*/


/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */

var maxSum = function(nums, k) {
    let n = nums.length;
    let maxSum = -Infinity;

    
    
    for(let i=0; i< n ; i++){
        let currSum =0;
        
        let minHeap = new  PQ();
        let maxHeap = new MaxH();
        let outsideFreq = new Map();
        let outsideCount = n;

        addElementsInMaxHeap(maxHeap, nums, outsideFreq);
        
        for(let j =i ; j < n; j++){
            
            currSum += nums[j];
            outsideCount--;
            
            minHeap.push(nums[j]);
            outsideFreq.set(nums[j], outsideFreq.get(nums[j])-1);


            let alteredCurrSum = currSum;
            let swaps = Math.min(k, minHeap.size(), outsideCount);

            let insideSmallest = minHeap.getTopK(swaps);
            let outsideLargest = maxHeap.getTopK(swaps, outsideFreq)

            let alteredSum = currSum;
            
            for (let s = 0; s < swaps; s++) {
                let small = insideSmallest[s];
                let large = outsideLargest[s];

                if (large > small) {
                    alteredSum += large - small;
                } else {
                    break;
                }
            }
            
            maxSum = Math.max(maxSum, alteredSum);
        }
        
    }
    return maxSum;
};


function addElementsInMaxHeap(heap, arr, freqMap) {
    for (let el of arr) {
        heap.push(el);
        freqMap.set(el, (freqMap.get(el) || 0)+1);
    }
}

// for top k elements in max heap inside max heap class
// code given here for reference
function getTopK(k, freqMap){
    let removed = [];
    let result = [];
    
    
    while (k > 0 && !this.isEmpty()) {
        let removedEl = this.pop();
        
        if(freqMap.get(removedEl)){
            result.push(removedEl);
            removed.push(removedEl);

             // temporarily consume one occurrence
            freqMap.set(removedEl, freqMap.get(removedEl)-1)       
            k--;
        }
        // If freq is 0, it was stale, so don't restore it
    }

    // restore heap
    while (removed.length > 0) {
        let removedEl = removed.pop();
        this.push(removedEl);
        freqMap.set(removedEl, (freqMap.get(removedEl) || 0)+1)
    }
    return result;
}


// for top k elements in min heap inside max heap class
// code given here for reference
function getTopK(k) {
    let removed = [];
    let result = [];

    while (k > 0 && !this.isEmpty()) {
        let removedEl = this.pop();

        result.push(removedEl);
        removed.push(removedEl);

        k--;
    }

    // restore heap
    while (removed.length > 0) {
        this.push(removed.pop());
    }

    return result;
}
/*
# Complexity Analysis

Time Complexity: O(n² * k log n),
    O(n²) subarrays and for each one we pop/restore up to k elements from both heaps.
    In worst case, when k ≈ n, it becomes O(n³ log n).

Space Complexity: O(n)
    minHeap + maxHeap + outsideFreq = O(n)

*/