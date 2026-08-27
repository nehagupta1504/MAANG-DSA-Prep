/*
# Problem Statement:
    Given an integer A, how many structurally unique BST's (binary search trees) exist that can store values 1...A?

    Problem Constraints
    1 <= A <=18



Input Format

    First and only argument is the integer A



Output Format

    Return a single integer, the answer to the problem



Example Input

    Input 1:

    1
    Input 2:

    2


Example Output

    Output 1:

    1
    Output 2:

    2


Example Explanation

    Explanation 1:

    Only single node tree is possible.
    Explanation 2:

    2 trees are possible, one rooted at 1 and other rooted at 2.
*/


/*
# Intuition
    1. Plain catalan number implementation
*/


// Solution
module.exports = { 
    //param A : integer
    //return an integer
       numTrees : function(A){
           return findUniqueBst(A);
       }
   };
   
   function findUniqueBst(A){
       let C = Array.from({length: A+1}).fill(0);
       C[0]= 1, C[1] = 1;
   
       for(let i= 2; i <= A; i++){
           for(let j = 0; j< i; j++){
               C[i] += C[j]*C[i-1-j];
           }
       }
       return C[A];
   }



/*
# Complexity Analysis
   TC: O(n^2)
   SC: O(n)

*/