/*
# Problem Description

    You are given an integer array A of length N.
    You have to find the sum of all subarray sums of A.
    More formally, a subarray is defined as a contiguous part of an array which we can obtain by deleting zero or more elements from either end of the array.
    A subarray sum denotes the sum of all the elements of that subarray.

    Note : Be careful of integer overflow issues while calculations. Use appropriate datatypes.



# Problem Constraints

    1 <= N <= 10^5
    1 <= Ai <= 10^4


# Input Format

    The first argument is the integer array A.


# Output Format

    Return a single integer denoting the sum of all subarray sums of the given array.


# Example Input

    Input 1:
    A = [1, 2, 3]

    Input 2:
    A = [2, 1, 3]


# Example Output

    Output 1:
    20

    Output 2:
    19


# Example Explanation

    Explanation 1:
    The different subarrays for the given array are: [1], [2], [3], [1, 2], [2, 3], [1, 2, 3].
    Their sums are: 1 + 2 + 3 + 3 + 5 + 6 = 20

    Explanation 2:
    The different subarrays for the given array are: [2], [1], [3], [2, 1], [1, 3], [2, 1, 3].
    Their sums are: 2 + 1 + 3 + 3 + 4 + 6 = 19

*/
// Method 1: Brute Force - To find all subarrays and then calculate their sum - Time complexity - O(N*N)


// Method 2: Using contribution technique 
/*
    Contribution Technique
    1. Find how many times each element is contributing to the subarrays
    2. Adding contribution of each number
    Ex - [1,2,3]
    Subrrays - [1], [1,2], [1,2,3], [2], [2,3], [3]
    1 is contributing 3 times = 1*3 =3
    2 is contributing 4 times = 2*4 = 8
    3 is contributing 3 times = 3*3 =9
    Total = 3+8+9=20
    Now how to find the contribution of each number? Refer to the Array-notes.pdf for this.
*/
// Main function
function sumofAllSubArrays(A){
 let sum =0;
 for(let i=0; i< A.length; i++){
    sum += findContributionOfIthNumber(A, i);
 }
 return sum;
}

function findContributionOfIthNumber(arr, i){
    let n = arr.length;
    let times = (i+1)* (n-i);
    return arr[i]*times;
}

console.log(sumofAllSubArrays([1, 2, 3]));
console.log(sumofAllSubArrays([2, 1, 3]));
