/*
# Problem Statement:
    In Danceland, one person can party either alone or can pair up with another person.

    Can you find in how many ways they can party if there are A people in Danceland?

    Note: Return your answer modulo 10003, as the answer can be large.



    Problem Constraints

    1 <= A <= 105



    Input Format

    Given only argument A of type Integer, number of people in Danceland.



    Output Format

    Return an integer denoting the number of ways people of Danceland can party.



    Example Input

    Input 1:

    A = 3
    Input 2:

    A = 5


    Example Output

    Output 1:

    4
    Output 2:

    26


    Example Explanation

    Explanation 1:

    Let suppose three people are A, B, and C. There are only 4 ways to party
    (A, B, C) All party alone
    (AB, C) A and B party together and C party alone
    (AC, B) A and C party together and B party alone
    (BC, A) B and C party together and A
    here 4 % 10003 = 4, so answer is 4.
    
    Explanation 2:

    Number of ways they can party are: 26.
*/


/*
# Intuition
    Think in a ways of breaking the problem into subproblems
   There can be 2 ways to party
   1. Party Alone
   2. Or pair with someone 

   Let's suppose A people for Ath people
   then 
   1. Party Alone - Find ways for A-1 people to party
   2. Pair with someone - Choices -A-1 and for each choice we have to find ways the rem people can party that is dp[A-2];
*/


// Solution
function danceLand(A){
    let dp = new Array(A+1).fill(0);
    dp[1] = 1;
    dp[2] = 2;
    let mod =10003;

    for(let i= 3; i <= A ; i++){
        // 2 ways
        // party alone then need to find ways to organise i-1 people dp[i-1]
        // If party with someone then pair choices = A-1 and for each choice we have to arrange n-2 people
       dp[i] = (dp[i-1]%mod + ((i-1)*dp[i-2])%mod)%mod;
    }
    return dp[A]
}


/*
# Complexity Analysis
    TC - O(A)
    SC -O(A)
*/

// Solution II (Space Optimised)
function danceLand(A){
    if(A == 1) return 1;
    let prevToPrev = 1;
    let prev = 2;
    let mod =10003;

    for(let i= 3; i <= A ; i++){
        // 2 ways
        // party alone then need to find ways to organise i-1 people dp[i-1]
        // If party with someone then pair choices = A-1 and for each choice we have to arrange n-2 people
       let next = (prev%mod + ((i-1)*prevToPrev)%mod)%mod;
       prevToPrev = prev;
       prev = next;
    }
    return prev;
}