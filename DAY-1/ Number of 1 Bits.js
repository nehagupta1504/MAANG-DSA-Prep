/*
Problem Description

    Write a function that takes an integer and returns the number of 1 bits present in its binary representation.


Problem Constraints

    1 <= A <= 109


Input Format

    First and only argument contains integer A


Output Format

    Return an integer


Example Input

    Input 1:
    11
    Input 2:
    6


Example Output

    Output 1:
    3
    Output 2:
    2


Example Explanation

    Explaination 1:
    11 is represented as 1011 in binary.
    Explaination 2:
    6 is represented as 110 in binary.

*/

// Solution-1: Naive solution

function numberOf1Bits(A) {
    let count = 0;
    while(A > 0){
        count += A%2 == 0? 0: 1;
        A = Math.floor(A/2);
    }
    return count;
}

// Time Complexity: O(log(A))
// Space Complexity: O(1)

console.log(numberOf1Bits(11));
console.log(numberOf1Bits(6));
console.log(numberOf1Bits(10));
console.log(numberOf1Bits(100));
console.log(numberOf1Bits(1000));
console.log(numberOf1Bits(10000));
console.log(numberOf1Bits(100000));

// Solution-2: Bit Manipulation
// Note -  If you haven't studies bit manipulation, you can skip this solution.

function numberOf1Bits2(A) {
    let count = 0;
    while(A > 0){
        A & 1 == 1? count++: count;
        A = A >>1;
    }
    return count;
}

// Time Complexity: O(log(A))
// Space Complexity: O(1)

console.log(numberOf1Bits2(11));
console.log(numberOf1Bits2(6));
console.log(numberOf1Bits2(10));
console.log(numberOf1Bits2(100));
console.log(numberOf1Bits2(1000));
console.log(numberOf1Bits2(10000));
console.log(numberOf1Bits2(100000));
