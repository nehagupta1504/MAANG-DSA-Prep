/*
# Problem Statement:
Q2. Generate all Parentheses II


Problem Description
Given an integer A pairs of parentheses, write a function to generate all combinations of well-formed parentheses of length 2*A.


Problem Constraints
1 <= A <= 10


Input Format
First and only argument is integer A.


Output Format
Return a sorted list of all possible parenthesis.


Example Input
Input 1:
A = 3


Input 2:
A = 1


*/


/*
# Intuition

*/


// Solution


module.exports = {
//param A : integer
//return a array of string


   generateParenthesis : function(A){
       let res = [];
       generateParenthesisHelper(A, A, '', res);
       return res;
   }
};
function generateParenthesisHelper(open, close, str, res){
       if(open == 0 && close == 0){
           res.push(str);
       }
       if(open > 0 ){
           generateParenthesisHelper(open-1, close, str +'(', res);
       }
       if(close > open && close > 0){
           generateParenthesisHelper(open, close-1, str+ ')', res);
       }
}



/*
# Complexity Analysis

TC: Catalan Number C(n) = (2n)! / ((n+1)! × n!)
    If pruning not involved close >open then O(2^A)
    
SC -O(nCn​)
    The maximum recursion depth is: 2n
    res- There are Cn string each is of 2n size which is O(nCn​)
*/

/*
# Interview Questions

1. Explain Your approach
2. why did you choose a recursive backtracking approach for this problem over, say, an iterative approach using a queue or stack?
3. Good! Now let's talk about complexity. What is the time and space complexity of your solution? Can you justify it?
4. Let's stay focused on the problem. If a were one hundred, would your recursive approach still work, or would you hit any limitations? Think about the recursion depth and the number of valid parentheses combinations you would generate.
5. Right, the number of valid combinations grows very large. The recursion depth would be big O of a, which for one hundred should be manageable, but the sheer number of outputs would be the bottleneck. Now, is your solution optimal for this problem, given that you need to generate all valid parentheses combinations? Or is there a fundamentally different approach that would be more efficient?
6. For a problem where you must generate every valid combination, your backtracking approach is already optimal because you have to produce each output. Let's shift gears. Can you find a case where your code might fail? Think about edge cases or tricky inputs
7. Walk me through the trickiest input you can imagine for this problem. What would be the smallest or largest value of a you need to handle? What does your code return for those cases?.
8. What does your code return when a is zero, even if it's outside the constraint? Walk me through it.
9. Now let's go a bit deeper. Why does your recursive approach actually work? Specifically, why does the condition close greater than open ensure that you only generate valid parentheses?
10. The condition close greater than open means that you have placed fewer closing brackets than opening brackets so far, so there is an unmatched opening bracket available to close. That ensures validity. Now, let me ask you to implement something. Can you add a helper function that validates whether a given parentheses string is well-formed? You can use a simple stack-based validation. Write the function in the editor.



*/