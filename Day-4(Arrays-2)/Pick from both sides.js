/*
# Problem Description

    You are given an integer array A of size N.

    You have to perform B operations. In one operation, you can remove either the leftmost or the rightmost element of the array A.

    Find and return the maximum possible sum of the B elements that were removed after the B operations.

    NOTE: Suppose B = 3, and array A contains 10 elements, then you can:

    Remove 3 elements from front and 0 elements from the back, OR
    Remove 2 elements from front and 1 element from the back, OR
    Remove 1 element from front and 2 elements from the back, OR
    Remove 0 elements from front and 3 elements from the back.


# Problem Constraints

    1 <= N <= 105

    1 <= B <= N

    -103 <= A[i] <= 103


# Input Format

    First argument is an integer array A.

    Second argument is an integer B.


# Output Format
    Return an integer denoting the maximum possible sum of elements you removed.



# Example Input

    Input 1:
    A = [5, -2, 3 , 1, 2]
    B = 3
    
    Input 2:
    A = [ 2, 3, -1, 4, 2, 1 ]
    B = 4


# Example Output

    Output 1:
    8

    Output 2:
    9


# Example Explanation

    Explanation 1:
    Remove element 5 from front and element (1, 2) from back so we get 5 + 1 + 2 = 8

    Explanation 2:
    Remove the first element and the last 3 elements. So we get 2 + 4 + 2 + 1 = 9
*/

// Brute Force: Find all possible combination of B length and then find the sum
// Time Complexity - If there are B elements then we have to find B+1 combinations, for each combination we have to find the sum of B elements - O(B^2)


// Optimal Approach - Prefix Sum

function pickFromBothSides(A, B){
    let n = A.length;
    let ps = [];
    // calculate prefix sum
    for(let i=0; i <A.length; i++){
        if(i ==0 ) ps[i] = A[i];
        else ps[i] = ps[i-1] + A[i];
    }
    // now find the combinations for ex - if B=2
    /*
        Front Back
          2    0
          1    1
          0    2
    */
   let front = B;
   let maxSum = Number.MIN_SAFE_INTEGER;
   while(front >= 0){
        let back = B-front;
        let sum = (front == 0 ? 0 : ps[front-1]) + (back == n ? ps[n-1]: ps[n-1]- ps[n-1-back]);
        maxSum = Math.max(sum, maxSum)
        front--;
   }
   return maxSum;
}

// Time Complexity - O(n)
// Space Complexity - O(n)