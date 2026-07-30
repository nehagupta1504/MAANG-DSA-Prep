/*
# Problem Statement:
    Given two integers n and k, return all possible combinations of k numbers chosen from the range [1, n].

    You may return the answer in any order.
    

Example 1:

    Input: n = 4, k = 2
    Output: [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]
    Explanation: There are 4 choose 2 = 6 total combinations.
    Note that combinations are unordered, i.e., [1,2] and [2,1] are considered to be the same combination.


Example 2:

    Input: n = 1, k = 1
    Output: [[1]]
    Explanation: There is 1 choose 1 = 1 total combination.
    

Constraints:

    1 <= n <= 20
    1 <= k <= n
*/


/*
# Intuition
    1. It is same as subset I, the only think here is instead of array we have n so instead of pusing array values we push n
*/


// Solution
/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function(n, k) {
    let result = [];
    subsetSumsHelper(n, 1, [], result, k);
    return result;
};

function subsetSumsHelper(n, i, currSubset, result, k){
    // If we find subset with size k
    if(currSubset.length == k){
        result.push([...currSubset]);
        return;
    }
    // if i reached end 
    if(i > n){
        return;
    }
   
    let subsetSize = currSubset.length;
    let remEl = n-i+1;
    
    // if curr size + rem elements still can't make k, this can never be our resultant states
    if(subsetSize + remEl < k){
        return;
    }

    // take
    currSubset.push(i);
    subsetSumsHelper(n, i+1, currSubset, result, k);
    // not take
    currSubset.pop();
    subsetSumsHelper(n, i+1, currSubset, result, k);
}


/*
# Complexity Analysis
    TC: O(k* nCk)
    SC: O(k* nCk)

    Time Complexity:
        -> total there will be O(2^n) subsets out of which there O(k* nck)
        [1,2,3,4] ways of choosing 2 elements out of 4 = > 4c2 = 4!/2!2! = =6
        [1,2][1,3][1,4][2,3][3,4]

    Space Complexity: 
    nCk subsets each of size k 
*/
// Q. Write iterative version of this code

// Solution -II (Itertive)
function subsetsItertive(n, k, res){
    let stack =  [];

    stack.push({subset: [], index: 1});

    while(stack.length > 0){
        let {subset, index} = stack.pop();

        if(subset.length == k){
            res.push([...subset]);
            continue;
        }
        if(index > n){
            continue;
        }

        // not take
        stack.push({subset:[...subset], index: index+1});
        // take
        stack.push({subset: [...subset, index], index: index+1})

    }

    return res;
}


/*
# Complexity Analysis
    TC: O(k* nCk)
    SC: O(k* nCk)
*/


// Q. Which one to choose for Production - Recursion for clarity
// Q. You wrote a recursive solution already. Can you now reframe this using the for-loop backtracking pattern and explain why it's preferred for combinations?

// Solution - III (For-loop backtracking)

var combine = function(n, k) {
    const result = [];

    function backtrack(start, subset) {
        if (subset.length === k) {
            result.push([...subset]);
            return;
        }

        // Remaining numbers needed
        const need = k - subset.length;

        // Strong pruning
        for (let i = start; i <= n - need + 1; i++) {
            subset.push(i);
            backtrack(i + 1, subset);
            subset.pop();
        }
    }

    backtrack(1, []);
    return result;
};
/*
// res = [[1, 2], [1,4]
1, [], need = 2
(2, [1]) 
i = 4, i<= 4-0+1

*/
/*
The important thing is:

    This approach is not asymptotically faster.

    Both ultimately generate all valid combinations.

    The reason interviewers prefer it is because it models the problem more naturally.


# Rule of Thumb

    Here's a pattern that works surprisingly well in interviews:

    Include/Exclude template → Subsets, Partition, Take/Not Take DP, Binary decisions.
    For-loop Backtracking template → Combinations, Combination Sum, Permutations, N-Queens, Palindrome Partitioning, Letter Combinations.

*/