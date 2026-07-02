/*
Leetcode- 881

# Problem Statement:
    You are given an array people where people[i] is the weight of the ith person, and an infinite number of boats where each boat can carry a maximum weight of limit. Each boat carries at most two people at the same time, provided the sum of the weight of those people is at most limit.

    Return the minimum number of boats to carry every given person.

 

Example 1:

    Input: people = [1,2], limit = 3
    Output: 1
    Explanation: 1 boat (1, 2)

Example 2:

    Input: people = [3,2,2,1], limit = 3
    Output: 3
    Explanation: 3 boats (1, 2), (2) and (3)

Example 3:

    Input: people = [3,5,3,4], limit = 5
    Output: 4
    Explanation: 4 boats (3), (3), (4), (5)
    

Constraints:

    1 <= people.length <= 5 * 104
    1 <= people[i] <= limit <= 3 * 104
*/


/*
# Intuition
    1. We pair heaviest people with lightest weight if it still exceed the limit, we send the heaviest weight people first and increase boat by 1
    2. we pair 2nd heaviest and lightest weight if 1st condition repeats we do the same else we pair them up and send them in 1 boat
*/

// Solution

/**
 * @param {number[]} people
 * @param {number} limit
 * @return {number}
 */
var numRescueBoats = function (people, limit) {
    let n = people.length;
    people.sort((a, b) => a - b); 
    let l = 0, r = n - 1;
    let minBoats = 0;

    while (l <= r) {
        if (people[l] + people[r] <= limit) {
            l++;
        } 
        r--;
        minBoats++;
    }

    return minBoats;
};



/*
# Complexity Analysis
   TC  - O(nlogn + n)
    SC- O(1)
*/