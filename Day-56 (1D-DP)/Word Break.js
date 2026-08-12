/*
# Problem Statement: Leetcode-139
    Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.

    Note that the same word in the dictionary may be reused multiple times in the segmentation.

    

    Example 1:

    Input: s = "leetcode", wordDict = ["leet","code"]
    Output: true
    Explanation: Return true because "leetcode" can be segmented as "leet code".
    Example 2:

    Input: s = "applepenapple", wordDict = ["apple","pen"]
    Output: true
    Explanation: Return true because "applepenapple" can be segmented as "apple pen apple".
    Note that you are allowed to reuse a dictionary word.
    Example 3:

    Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
    Output: false
    

    Constraints:

    1 <= s.length <= 300
    1 <= wordDict.length <= 1000
    1 <= wordDict[i].length <= 20
    s and wordDict[i] consist of only lowercase English letters.
    All the strings of wordDict are unique.
*/


/*
# Intuition
    1. The idea is to loop through the word, if anytime we find the word we check via recursion whether the further segment is present or not
    2. If not present we then continue looping through the word, until we find next match
    3. Dp[i] represent wether the substring from ith to n can be segemented from the dictionary or not

    Why use DP?
    As recurrence is present ex - "aaaaa" dict: ['a', 'aa', 'aaa']

                             start = 0
                    /       |       \
                  "a"      "aa"     "aaa"
                   ↓         ↓         ↓
                start=1    start=2   start=3
               /  |  \     / |  \     / \
             "a" "aa" "aaa" "a" "aa" "aaa" ...
              ↓    ↓    ↓    ↓    ↓
            s=2   s=3   s=4  s=3  s=4
           / | \  / | \   ↓  / | \
         "a" "aa" "aaa"   "a" "aa" "aaa"
          ↓    ↓     ↓     ↓    ↓     ↓
        s=3   s=4    s=5   s=4   s=5   s=6
        /|\   / \     ✓    / \    ✓
       / | \ /   \        /   \
      a aa aaa a   aa     a    aa
      ↓  ↓   ↓  ↓    ↓    ↓     ↓
     s4 s5  s5 s5   s6   s5    s6
      |  ✓   ✓  ✓         ✓
      a
      ↓
     s5 ✓

     If you can see we're repeating the word break so it produces recurrence
*/


// Solution

/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function(s, wordDict) {
    return breakWord(s, wordDict);
};

function breakWord(s, wordDict){
    let wordSet = new Set(wordDict);
    let n  = s.length;
    let dp = new Array(n).fill(-1);

    function breakWordHelper(s, start, dp){
        if(start == s.length){
            return true;
        }
        if(dp[start]!= -1){
            return dp[start];
        }
        let wordFound = false;
        for(let i = start ; i < n ; i++){
            let word = s.substring(start, i+1)
            if(wordSet.has(word)){
                if(breakWordHelper(s, i+1, dp)){
                    dp[start] = true;
                    return dp[start];
                }
            }
        }
        return (dp[start] = false);
    }

    breakWordHelper(s, 0, dp);
    return dp[0];
}



/*
# Complexity Analysis
    TC: O(n^3)
        1. Start states: 0... n-1 : n states
        2. For each start state loop run from start...n-1
            n + (n-1)+ (n-2)+.... +1 : O(n^2)
        3. For every iteration we're constructing the word 
            1. lets suppose start = 0, now word found and we break and check for rest n-1 string, we formed till n-2 charcters but now last charcter not found
            so we move forward and break at next location found
            In worst case we have to break at every start and construct nth long word if not found
            so O(n)



    
    Sc: O(n+ D)
        dp → O(n)
        recursion stack → O(n)
        wordSet → O(D)
*/

// Solution II (Optimised) Using Trie