/*
Leetcode- 131

# Problem Statement:
    Given a string s, partition s such that every substring of the partition is a palindrome. Return all possible palindrome partitioning of s.

 

Example 1:

    Input: s = "aab"
    Output: [["a","a","b"],["aa","b"]]
    Example 2:

    Input: s = "a"
    Output: [["a"]]
    

Constraints:

    1 <= s.length <= 16
    s contains only lowercase English letters.
*/


/*
# Intuition
    1. Used earlier backtracking approach for partitioning, Refer to the notes
*/


// Solution
/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function(s) {
    return plaindromePartitioning(s);
};
// aaba
function plaindromePartitioning(s){
    let res = [];
    let n = s.length;

    function backtrack(start, palindromes){ 
        if(start == n){
            res.push([...palindromes]);
            return;
        }

        for(let end = start ; end < n ; end++){
            let subStr = s.slice(start, end+1); 
            if(!isPlaindrome(subStr)){
                continue;
            } 
            palindromes.push(subStr); 
            backtrack(end+1, palindromes); 
            palindromes.pop();
        }

    }
    backtrack(0, []);

    return res;
}

function isPlaindrome(str){
    if(str.length <= 1) return true;
    let i = 0, j = str.length-1;
    while(i<j){
        if(str[i] != str[j]){
            return false;
        }
        i++;
        j--;
    }
    return true;
}


/*
# Complexity Analysis
    TC: 
*/