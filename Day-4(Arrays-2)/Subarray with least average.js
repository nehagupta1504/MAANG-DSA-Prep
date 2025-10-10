/*
# Difficulty Level - Medium

# Problem Description

    Given an array A of size N, find the subarray of size B with the least average.


# Problem Constraints

    1 <= B <= N <= 105
    -105 <= A[i] <= 105


# Input Format

    First argument contains an array A of integers of size N.
    Second argument contains integer B.


# Output Format

    Return the index of the first element of the subarray of size B that has least average.
    Array indexing starts from 0.


# Example Input

    Input 1:
    A = [3, 7, 90, 20, 10, 50, 40]
    B = 3

    Input 2:
    A = [3, 7, 5, 20, -10, 0, 12]
    B = 2


# Example Output

    Output 1:
    3

    Output 2:
    4


# Example Explanation

    Explanation 1:
    Subarray between indexes 3 and 5
    The subarray {20, 10, 50} has the least average 
    among all subarrays of size 3.

    Explanation 2:
    Subarray between [4, 5] has minimum average
*/

function leastAverage(A, B){
    let arr = findSumOfSubArraySizeB(A, B);
    let min = Number.MAX_SAFE_INTEGER;
    let index = -1;
    for(let i=0; i< arr.length; i++){
        if(min > arr[i]){
            min = arr[i];
            index = i;
        }
    }
    return index;
}

function findSumOfSubArraySizeB(arr, window){
    let opArray = [];
    let sum = 0;
    for(let i = 0; i< arr.length; i++){
        if(i<window-1){
            sum += arr[i]
        }else{
            sum += arr[i];
            if(i-window<0){
                opArray.push(sum);
            }else{
                sum -= arr[i-window];
                opArray.push(sum);
            }
        }
    }
    return opArray;
}

console.log(leastAverage([3, 7, 90, 20, 10, 50, 40], 3))

// Time Complexity - O(n)
// Space Complexity - O(k) -  where k is the window size