/*
# Problem Statement:
    Given a number A, return number of ways you can draw A chords in a circle with 2 x A points such that no 2 chords intersect.

    Two ways are different if there exists a chord which is present in one way and not in other.
    Return the answer modulo 109 + 7.



Problem Constraints

    1 <= A <= 103



Input Format

    The first and the only argument contains the integer A.



Output Format

    Return an integer answering the query as described in the problem statement.



Example Input

    Input 1:

    A = 1
    Input 2:

    A = 2


    Example Output

    Output 1:

    1
    Output 2:

    2


Example Explanation

    Explanation 1:

    If points are numbered 1 to 2 in clockwise direction, then different ways to draw chords are: {(1-2)} only. So, we return 1.
    Explanation 2:

    If points are numbered 1 to 4 in clockwise direction, then different ways to draw chords are:{(1-2), (3-4)} and {(1-4), (2-3)}.
    So, we return 2.
*/


/*
# Intuition
    1. Direct application of catalan numbers
    Q. How did you identify Catalan
        Choosing a root/pivot splits the problem into two independent subproblems of sizes j and n-1-j. Since the number of combinations is the product of the two sides and we sum over all possible pivots, the recurrence becomes C[n] = Σ C[j] × C[n-1-j], which is the Catalan recurrence."
    Q. How to tell this is catalan number problem
        This follows the Catalan recurrence. Fix one point and pair it with another point. That chord partitions the remaining points into two independent subproblems. Therefore, dp[n] = Σ dp[j] * dp[n-1-j], which is the Catalan recurrence.
*/


// Solution
module.exports = { 
    //param A : integer
    //return an integer
       chordCnt : function(A){
           return chords(A);
       }
   };
   
   function chords(A){
       let mod = 1000000007n;
       let C = Array.from({length: A+1}).fill(0n);
       C[0]= 1n, C[1] = 1n;
   
       for(let i= 2; i <= A; i++){
           for(let j = 0; j< i; j++){
               C[i] =(C[i] +  (C[j]*C[i-1-j])%mod)%mod;
           }
       }
       return Number(C[A]);
   }



/*
# Complexity Analysis
   Same as Unique BSTs
*/