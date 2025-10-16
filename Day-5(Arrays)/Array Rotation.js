/*
# Problem Description
    Given an integer array A of size N and an integer B, you have to return the same array after rotating it B times towards the right.


# Problem Constraints
    1 <= N <= 105
    1 <= A[i] <=109
    1 <= B <= 109


# Input Format
    The first argument given is the integer array A.
    The second argument given is the integer B.


# Output Format
    Return the array A after rotating it B times to the right


# Example Input

    Input 1:
    A = [1, 2, 3, 4]
    B = 2

    Input 2:
    A = [2, 5, 6]
    B = 1


# Example Output

    Output 1:
    [3, 4, 1, 2]

    Output 2:
    [6, 2, 5]


# Example Explanation

    Explanation 1:

    Rotate towards the right 2 times - [1, 2, 3, 4] => [4, 1, 2, 3] => [3, 4, 1, 2]
    Explanation 2:

    Rotate towards the right 1 time - [2, 5, 6] => [6, 2, 5]

*/

// 
// [1,1,4,9,4,7,1]
// op - 7 1 1 1 4 9 4 B = 2 

// 1 7 4 9 4 1 1
// 7 1 1 1 4 9 4



function swap(A, a, b) {
    [A[a], A[b]] = [A[b], A[a]];
}

function reverse(A, start, end){
    let mid = start +  Math.floor((end-start)/2);
    for(let i = start, j =end ; i<= mid; i++, j--){
        swap(A, i ,j);
    }
}
function arrayRotation(A, B){
    let n = A.length;
    let rotateCount = B % n;
    if (rotateCount == 0) {
        return A;
    }
    // reverse complete array
    reverse(A, 0, n-1)
    // reverse both parts seperately
    let part1 = rotateCount-1;
    reverse(A, 0, part1);
    reverse(A, part1+1, n-1);
    return A;
}

