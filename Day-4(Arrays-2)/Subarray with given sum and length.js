/*
# Difficulty Level - Easy

# Problem Description

    Given an array A of length N. Also given are integers B and C.

    Return 1 if there exists a subarray with length B having sum C and 0 otherwise



# Problem Constraints

    1 <= N <= 105

    1 <= A[i] <= 104

    1 <= B <= N

    1 <= C <= 109



# Input Format

    First argument A is an array of integers.

    The remaining arguments B and C are integers



# Output Format

    Return 1 if such a subarray exist and 0 otherwise


# Example Input

    Input 1:
    A = [4, 3, 2, 6, 1]
    B = 3
    C = 11

    Input 2:
    A = [4, 2, 2, 5, 1]
    B = 4
    C = 6




# Example Output

    Output 1:
    1

    Output 2:
    0


# Example Explanation

    Explanation 1:
    The subarray [3, 2, 6] is of length 3 and sum 11.


    Explanation 2:
    There are no such subarray.
*/


function subArrayWithGivenSum(A, B, C){
    let arr = findSumOfSubArraySizeB(A, B);
    for(let i=0; i< arr.length; i++){
        if(arr[i] == C){
            return 1;
        }
    }
    return 0;
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

console.log(subArrayWithGivenSum([4, 2, 2, 5, 1], 4, 6))

// Time Complexity - O(n)
// Space Complexity - O(k) -  where k is the window size