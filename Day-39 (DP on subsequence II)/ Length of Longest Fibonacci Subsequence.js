/*
# Problem Statement:
    Given a strictly increasing array A of positive integers forming a sequence.

    A sequence X1, X2, X3, ..., XN is fibonacci like if


    N > =3
    Xi + Xi+1 = Xi+2 for all i+2 <= N
    Find and return the length of the longest Fibonacci-like subsequence of A.

    If one does not exist, return 0.

    NOTE: A subsequence is derived from another sequence A by deleting any number of elements (including none) from A, without changing the order of the remaining elements.



    Problem Constraints

    3 <= length of the array <= 1000

    1 <= A[i] <= 109



    Input Format

    The only argument given is the integer array A.



    Output Format

    Return the length of the longest Fibonacci-like subsequence of A.
    If one does not exist, return 0.



    Example Input

    Input 1:

    A = [1, 2, 3, 4, 5, 6, 7, 8]
    Input 2:

    A = [1, 3, 7, 11, 12, 14, 18]


    Example Output

    Output 1:

    5
    Output 2:

    3


    Example Explanation

    Explanation 1:

    The longest subsequence that is fibonacci-like: [1, 2, 3, 5, 8].
    Explanation 2:

    The longest subsequence that is fibonacci-like: [1, 11, 12], [3, 11, 14] or [7, 11, 18].
    The length will be 3.
*/


/*
# Intuition
    1. The idea is to find all pairs and then continue checking for the next number
*/


// Solution
module.exports = { 
    //param A : array of integers
    //return an integer
       solve : function(A){
           return fibonacciSequence(A);
       }
   };
   
   function fibonacciSequence(A){
       let set = new Set(A);
       let pairs = [];
       let n = A.length;
   
      //  [1, 3, 7, 11, 12, 14, 18]
       // find all pairs 
       for(let i=0; i<n; i++){
           for(let j = i+1; j<n; j++){
               let next = A[i] + A[j];
               if(set.has(next)){
                   pairs.push([A[i], A[j]]);
               }
           }        
       }
       // console.log(pairs)
       let maxLength = 2;
       for(let i=0; i <pairs.length; i++){
           let [prev, next] = pairs[i];
           let currLength = 2;
           while(set.has(prev+next)){
               let temp = prev+next;
               prev = next;
               next = temp; 
               currLength++;
           }
           maxLength = Math.max(maxLength, currLength);
       }
       return maxLength == 2 ? 0: maxLength;
   }
   

/*
# Complexity Analysis
   TC - O(n^2 + p.L) in worst case p-> n^2 and L can be n so O(n^3)
   SC- O(n)  - Set space
*/

// Optimised Solution DP

/*
# Intuition
1. Create a 2D dp to store length of longest series starting from i and j index, 
2. For each pair check if prev value exists, If exists then update current i, j with prev value index +1 
ex - 5 8 13 21
for 5 and 8, prev = 3 doesn't exists don't do anything
for 8 13 prev 5 exists so increment dp[index of 8][index of 13] = dp[index of 5][index of 8]  + 1=> 2+1 => 3
now for 13 and 21 8 exists so, dp[index of 13][index of 21] = dp[index of 8][index of 13] + 1 = 3+1 = 4 (ans) 

*/


module.exports = { 
    //param A : array of integers
    //return an integer
       solve : function(A){
           return fibonacciSequence(A);
       }
   };
   
   function fibonacciSequence(A){
       let map = new Map();
       let n = A.length;
       let dp = Array.from({length:n}, ()=> new Array(n).fill(2));
   
       for(let [index, el] of A.entries()){
           map.set(el, index)
       }
   
       let maxLength = 0;
       for(i = 0; i < n ; i++){
           for(let j = i+1; j<n ; j++){
               const prev = A[j]-A[i];
   
               if(map.has(prev)){
                   const k = map.get(prev);
   
                   if(k < i){
                       // index should be less than i for a sequence
                       dp[i][j] = dp[k][i] + 1;
                   }
               }
               maxLength = Math.max(dp[i][j], maxLength);
           }
       }
   
       return maxLength >= 3? maxLength: 0;
   }
   


/*
# Complexity Analysis
TC - O(n^2) States
SC - O(n + n^2) - for map + dp
   

*/