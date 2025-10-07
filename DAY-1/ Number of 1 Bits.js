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


// Brian Kernighan’s algorithm

function numberOf1Bits3(A) {
    let count = 0;
    while(A > 0){
        A = A & (A - 1);
        count++;
    }
    return count;
}
// Explanation:
// This algoritm is called Brian Kernighan’s algorithm
// it'll only run for the number of 1 bits in A.
// General rule:  When you subtract 1 from a binary number: all bits to the first 1 will change from 0->1 and the 1 will change to 1->0
// By doing & of A and A-1, we'll remove the rightmost set bit of A.
// 101(A) & 100 (A-1) = 100 (Removed rightmost set bit)
// 100(A) & 011 (A-1) = 000 (Removed rightmost set bit)
// only ran for 2 times because there are 2 1 bits in A.

// Time Complexity: O(k), k is no. of 1 bits in A.
// Space Complexity: O(1)

console.log(numberOf1Bits3(11));
console.log(numberOf1Bits3(6));
console.log(numberOf1Bits3(10));
console.log(numberOf1Bits3(100));
console.log(numberOf1Bits3(1000));
console.log(numberOf1Bits3(10000));
console.log(numberOf1Bits3(100000));