/*
# Problem Statement:
    You have intercepted a secret message encoded as a string of numbers. The message is decoded via the following mapping:

    "1" -> 'A'

    "2" -> 'B'

    ...

    "25" -> 'Y'

    "26" -> 'Z'

    However, while decoding the message, you realize that there are many different ways you can decode the message because some codes are contained in other codes ("2" and "5" vs "25").

    For example, "11106" can be decoded into:

    "AAJF" with the grouping (1, 1, 10, 6)
    "KJF" with the grouping (11, 10, 6)
    The grouping (1, 11, 06) is invalid because "06" is not a valid code (only "6" is valid).
    Note: there may be strings that are impossible to decode.

    Given a string s containing only digits, return the number of ways to decode it. If the entire string cannot be decoded in any valid way, return 0.

    The test cases are generated so that the answer fits in a 32-bit integer.

    

    Example 1:

    Input: s = "12"

    Output: 2

    Explanation:

    "12" could be decoded as "AB" (1 2) or "L" (12).

    Example 2:

    Input: s = "226"

    Output: 3

    Explanation:

    "226" could be decoded as "BZ" (2 26), "VF" (22 6), or "BBF" (2 2 6).

    Example 3:

    Input: s = "06"

    Output: 0

    Explanation:

    "06" cannot be mapped to "F" because of the leading zero ("6" is different from "06"). In this case, the string is not a valid encoding, so return 0.

 

    Constraints:

    1 <= s.length <= 100
    s contains only digits and may contain leading zero(s).
*/


/*
# Intuition
    1. The idea is to use backtracking approach and do n-1 partitions in string and figure out the valid partions strings, if reached till last it means the partitions are valid
    2. There can be n states for start and for each state of start there can be start to n states 
        start =0, end: [0...n]
        start =1, end: [1,...n]
        .
        .
        start = n-1, end:[n-1]
    so in total n*(n-1)/2 i.e, n^2 states 
    3. work per state  = slice O(n) and Number(part) O(k) if prt is of k length so dominant factor if considered is n
    4. Total complexity - O(n^3)

    This can be more optimised as we can intelligently partition instead of looping from start, to end we know that the valid number 
    can have max of 1 and 2 digits
    so we can reduce the complexity of loop and as well as slice operation and make it O(n), see solution II
*/


// Solution I
/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function(s) {
    let n = s.length;

    let dp = new Array(n).fill(-1);
    decodings(n, s, 0, dp);
    console.log(dp)
    return dp[0];

};
// dp[i] = number of ways to decode the string starting from index start.
function decodings(n, s, start, dp){
    if(start > n-1){
        return 1;
    }
    if(start == n-1){
        return ( dp[start]= s[start] != '0' ? 1: 0)
    }
    if(dp[start] != -1) return dp[start];

    let validPartitons = 0;

    for(let end = start ; end < n ; end++){
        let partition = s.slice(start, end+1);
        if(!isValid(partition)){
            continue;
        }
        validPartitons += decodings(n, s, end+1, dp)
    }

    return (dp[start] = validPartitons);
}

function isValid(part){
    let num  = Number(part);
    if(
        (part.length > 1 && part[0] == '0')
        || num ==0 || num > 26
    ) return false;
     
    return true;
}


/*
# Complexity Analysis
    TC: O(n^3) // see Intuition G:72 
    SC: O(n) // Stack (n), DP (n)
*/


/*
# Intuition II
    1. Since we know we only can take 2 digits we can reduce the 
*/


// Solution II




/*
# Complexity Analysis

*/



// Solution III (Iterative method)

/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function (s) {
    return decodings(s);
};

function decodings(s){

    let n = s.length;
    let dp = new Array(n+1).fill(0);

    dp[n] = 1;

    for(let i = n-1; i >= 0 ; i--){
        if(s[i] == '0'){
            dp[i] = 0;
            continue;
        }

        // Take 1 digit
        dp[i] = dp[i+1];
        // take 2 digits
        if(i+2 <= n && Number(s.slice(i, i+2)) <= 26){
            dp[i] += dp[i+2];
        }
    }
    return dp[0];
}


/*
# Complexity Analysis
    TC: O(n)
    SC: O(n)
*/

// Solution IV (constant space)


var numDecodings = function (s) {
    return decodings(s);
};

/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function (s) {
    return decodings(s);
};

function decodings(s){

    let n = s.length;
    let next1 = 1; // dp[n]
    let next2 = 0; // dp[n+1]

    for(let i = n-1; i >= 0 ; i--){
        if(s[i] == '0'){
           next2 = next1;
           next1 = 0;
            continue;
        }

        // Take 1 digit
        let curr = next1
        // take 2 digits
        if(i+2 <= n && Number(s.slice(i, i+2)) <= 26){
           curr += next2;
        }
        next2 = next1;
        next1 = curr;
    }
    return next1;
}


/*
# Complexity Analysis
    TC: O(n)
    SC: O(1)
*/
