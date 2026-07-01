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

// Note -  There can be various solutions for this problem but the best would be BS as the array given is sorted
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

/* 
# Inutition
    1. Maintain a max heap with max k size
    2. the heap should contain max diff value at top
    3. If the diff for 2 values are same then top should contain one with max value as it is easy to remove that way

NOTE -This code is not completely optimised, the better way is to look at the code and think what optimisations you can make

*/

// Solution II (Heap)
/**
 * @param {number[]} arr
 * @param {number} k
 * @param {number} x
 * @return {number[]}
 */
class Pair {
    constructor(val, diff) {
        this.val = val;
        this.diff = diff;
    }
}
class HeapImplementation {
    constructor(k) {
        this.heap = [];
        this.k = k;
    }
    extractMax() {
        if (this.size() === 0) return null;
        this.swap(0, this.size() - 1);
        let val = this.heap.pop();
        this.heapifyDown(0);
        return val;
    }
    getLeftChild(index) {
        return 2 * index + 1;
    }
    getRightChild(index) {
        return 2 * index + 2;
    }
    getParent(index) {
        return Math.floor((index - 1) / 2);
    }
    heapifyDown(index) {
        let leftChild = this.getLeftChild(index);
        let largest = index;

        if (leftChild >= this.size()) return;

        if (
            this.heap[leftChild].diff > this.heap[largest].diff ||
            (
                this.heap[leftChild].diff == this.heap[largest].diff &&
                this.heap[leftChild].val > this.heap[largest].val
            )
        ) {
            largest = leftChild;
        }
        let rightChild = this.getRightChild(index);
        if (
            rightChild < this.size() &&
            (
                this.heap[rightChild].diff > this.heap[largest].diff ||
                (
                    this.heap[rightChild].diff == this.heap[largest].diff &&
                    this.heap[rightChild].val > this.heap[largest].val
                )
            )
        ) {
            largest = rightChild;
        }
        if (index != largest) {
            this.swap(index, largest);
            this.heapifyDown(largest);
        }
    }
    heapifyUp(index) {
        if (index == 0) {
            return;
        }
        let parent = this.getParent(index);
        if (
            this.heap[parent].diff < this.heap[index].diff ||
            (
                this.heap[parent].diff == this.heap[index].diff &&
                this.heap[parent].val < this.heap[index].val
            )

        ) {
            this.swap(parent, index);
            this.heapifyUp(parent);
        }
    }
    insert(val, diff) {
        let pair = new Pair(val, diff);
        this.heap.push(pair);
        this.heapifyUp(this.size() - 1);
        if (this.size() > this.k) {
            this.extractMax();
        }
    }
    size() {
        return this.heap.length;
    }
    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }
    peek() {
        return this.heap[0];
    }

}
var findClosestElements = function (arr, k, x) {
    let heap = new HeapImplementation(k);
    for(let i=0; i<arr.length; i++){
        heap.insert(arr[i], Math.abs(arr[i]-x));
    }
    let ans = [];
    while(heap.size()){
        let max = heap.extractMax();
        ans.push(max.val);
    }

    ans.sort((a, b) => a - b);

    return ans;
}


/*
# Complexity Analysis- Heap
    TC: O(n log k + k log k)
    SC: O(k)
*/