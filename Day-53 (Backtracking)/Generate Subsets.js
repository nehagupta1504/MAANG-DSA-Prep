/*
# Problem Statement:

    Given a set of distinct integers A, return all possible subsets that can be formed from the elements of array A.



Problem Constraints

    1 ≤ |A| ≤ 16

    INT_MIN ≤ A[i] ≤ INT_MAX

    Array A is given in increasing order.

    All elements of array A are distinct.


Example Input

    Input 1:

    A = [1]
    Input 2:

    A = [1, 2, 3]


Example Output

    Output 1:

    [
        []
        [1]
    ]
    Output 2:

    [
    []
    [1]
    [1, 2]
    [1, 2, 3]
    [1, 3]
    [2]
    [2, 3]
    [3]
    ]
*/


/*
# Intuition
    1. Solved using Take or not take approach
*/


// Solution
class Solution {
    subsets(A) {
        let res = [];
        subsetshelper(0, A, [], res);
        return res;
    }
}
function subsetshelper(i, arr, subset, res){
    if(i == arr.length){
        res.push([...subset]);
        return;
    }
    subset.push(arr[i]);
    subsetshelper(i+1, arr, subset, res);
    subset.pop();
    subsetshelper(i+1, arr, subset, res);
}





/*
# Complexity Analysis
    TC- O(n * 2^n) - n=> putting all sbsets value in resultant array for each 2^n values
    SC - O(n + n* 2^n)
        1. The maximum recursion depth is n, and subset can contain at most n elements.
        2. You store 2ⁿ subsets, each containing up to n elements.
*/

/*
# Questions Asked
    1. Good! I like the recursion backtracking approach. Now tell me, why did you choose to use an array to track the current subset and pass it through recursion, rather than say, using bit manipulation or building subsets iteratively?

    2. What’s the time and space complexity

    3.You're on the right track! The number of subsets is two to the power n. But when you compute time complexity, you also need to account for the work done at each node in your recursion tree. At each base case, you're pushing a copy of the subset into the result. What's the cost of that copy operation, and how does it affect the overall time complexity?


    4. Right! For subset generation you must produce two to the power n subsets, so big O of n times two to the power n is indeed optimal. Now let's talk about an alternative. You mentioned bit manipulation earlier. Can you code the key part of a bit manipulation approach for generating subsets? Go ahead and add it to the editor.



    5. Of course! Why does the backtracking approach you used actually generate all possible subsets, and why does it never miss or duplicate any subset? In other words, what property of the recursion ensures full coverage and no repeats?


*/