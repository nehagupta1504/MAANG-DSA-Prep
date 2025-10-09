/*

# Problem Description

    You are given an integer array A of length N.
    You are also given a 2D integer array B with dimensions M x 2, where each row denotes a [L, R] query.
    For each query, you have to find the sum of all elements from L to R indices in A (0 - indexed).
    More formally, find A[L] + A[L + 1] + A[L + 2] +... + A[R - 1] + A[R] for each query.



# Problem Constraints

    1 <= N, M <= 105
    1 <= A[i] <= 109
    0 <= L <= R < N


# Input Format

    The first argument is the integer array A.
    The second argument is the 2D integer array B.


# Output Format

    Return an integer array of length M where ith element is the answer for ith query in B.


# Example Input

    Input 1:
    A = [1, 2, 3, 4, 5]
    B = [[0, 3], [1, 2]]

    Input 2:
    A = [2, 2, 2]
    B = [[0, 0], [1, 2]]



# Example Output

    Output 1:
    [10, 5]

    Output 2:
    [2, 4]


# Example Explanation

    Explanation 1:
    The sum of all elements of A[0 ... 3] = 1 + 2 + 3 + 4 = 10.
    The sum of all elements of A[1 ... 2] = 2 + 3 = 5.

    Explanation 2:
    The sum of all elements of A[0 ... 0] = 2 = 2.
    The sum of all elements of A[1 ... 2] = 2 + 2 = 4.
*/

/* 
---- ------- Brute Force Method ---- -------
To calculate sum for each query and time complexity for that would be O(n*q)
for q querries we're traversing n elements in worst case each time

*/

// Optimised Version

function rangeSumQuery(A, B){
    let prefixSum = findPrefixSum(A);
    let opArray = [];
    for(let i=0; i< B.length; i++){
        let l = B[i][0];
        let r = B[i][1];
        if(l === 0){
            opArray.push(prefixSum[r]);
        }else{
            opArray.push(prefixSum[r]-prefixSum[l-1]);
        }
    }
    return opArray;
}

function findPrefixSum(arr){
    let ps =[];
    for(let i=0; i< arr.length;i++){
        if(i==0){
            ps[i] = arr[i];
        }else{
            ps[i] = ps[i-1] + arr[i];
        }
    }
    return ps;
}
console.log(rangeSumQuery([1, 2, 3, 4, 5],[[0, 3]]));

// Time Complexity-
// PrefixSum - n as traversing whole querries
// rangeSumQuery- q where q is the no. of querries
// Total - O(n+q) 

// Space Complexity - O(n) to store prefixSum array values


/*
    ------------- More Optimised Version in terms of Space Complexity -----------------
   You can modify existing array to make it a prefix sum array but then the original array will be lost or you have to do some extra
   operations to recover it 
   // So before proceeding with this step make sure to confirm with your interviewer

*/