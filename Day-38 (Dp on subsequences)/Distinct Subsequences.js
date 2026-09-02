/*
# Problem Statement:
Problem Description

    Given two strings A and B, count the number of unique ways in string A to form a subsequence that is identical to string B.

    A subsequence of a string is a new string formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (ie, "ACE" is a subsequence of "ABCDE" while "AEC" is not).

    Since the answer can be very large, return the result modulo 109 + 7.


Problem Constraints

    1 <= |A|, |B| <= 1000


Input Format

    The first argument is a string A.
    The second argument is a string B.


Output Format

    Return an integer representing the number of distinct subsequences of A which equal B, modulo 109 + 7.


Example Input

    Input 1:
    A = "abc"
    B = "abc"
    Input 2:
    A = "rabbbit"
    B = "rabbit"


Example Output

    Output 1:
    1
    Output 2:
    3


Example Explanation

    Explanation 1:
        Both strings are equal. There is exactly 1 way to form "abc"
        as a subsequence of "abc" — take all characters.

        Result: 1
    Explanation 2:
        The string A = "rabbbit" has 3 'b' characters.
        To form B = "rabbit", we need exactly 2 'b' characters.
        We can remove any one of the 3 'b' characters:

        1. "ra_bbit" (remove 1st 'b')
        2. "rab_bit" (remove 2nd 'b')
        3. "rabb_it" (remove 3rd 'b')

        "_" marks the removed character.

        Result: 3
*/


/*
# Intuition
    A and B
    unique ways in string A to form a subsequence that is identical to B

Once the string B is completely traversed j == B.length that is we found 1 way

i, j
    if(matches) then consider match and increment i+1, j+1
    
    i+1, j (even it match, find more matches, if not matches then look forward for more matches)
*/


// Solution I (Recursive Memoisation)
function isSubsequence(A, B){
    let mod = 1e9+7;
    let n= A.length, m =B.length;
    let dp = Array.from({length: n}, ()=> new Array(m).fill(-1));

    function isSubsequenceHelper(i, j){
        if(j == B.length) return 1;

        // If B ptr doesn't reach to end while A does, there is no subsequence forming
        if(i == A.length) return 0;

        if(dp[i][j] != -1) return dp[i][j];

        let ways =0;
        if(A[i] == B[j]){
            ways = (ways + isSubsequenceHelper(i+1, j+1))%mod;
        }
        ways = (ways + isSubsequenceHelper(i+1, j))%mod;
        return (dp[i][j]  = ways)
    }
    return isSubsequenceHelper(0, 0);
}




/*
# Complexity Analysis
    TC: O(n*m)
    SC- O(n*m)
*/

// SOlution II (Iterative)
function isSubsequenceItertive(A, B){

    let mod = 1e9+7;
    let n= A.length, m =B.length;
    let dp = new Array(m+1).fill(0);

    dp[m] = 1;


    for(let i = n-1; i >= 0; i--){
        for(let j = 0; j< m ;j++){
            let ways =0;
            if(A[i] == B[j]){
                 ways = (ways + dp[j+1])%mod;
            }
            ways = (ways + dp[j])%mod;

            dp[j] = ways;
        }
    }
    return dp[0];
}

/*
# Complexity Analysis
    TC: O(n*m)
    SC- O(m)
*/