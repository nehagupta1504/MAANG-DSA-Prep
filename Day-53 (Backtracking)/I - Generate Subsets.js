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
    2. Can also be solved using bit manipulation 
        1. Consider the number of elements using number for bits ex - 3 elements so 3 bits will be used
        2. Start a iterator from 0 to 2^n (where n is the no of bits) for each iterator check the bits from 0  to n-1 if its 1 push the corresponding array element in the subset
        3. Once the subset is ready push it into the res array
        4. TC - iterate from 0 to (2^n -1), for each iteration we have to go via n bits each time, also copying would take n time so TC - O((2n*2^n), SC - O(n* 2^n)  as each subset will conatain n number
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

// Solution - II (Bit Manipulation)
var subsets = function(nums) {
    let result = [];
    // subsetSumsHelper(nums, 0, [], result);
    subsetSumBitManipulation(nums, result);
    return result;
};

function subsetSumBitManipulation(arr, result){
    let n = arr.length;
    let max = Math.pow(2, n);
    let num = 0;

    while(num < max){
        let subset = [];

        for(let i=0 ; i < n ; i++){
            // check each bit for each num
            if(num & (1<<i)){
                // if ith bit is one number is included in subset
                subset.push(arr[i])
            }
        }
        result.push([...subset]);
        num++;
    }
    return result
}

/*
# Complexity Analysis
    TC -  O(n*2^n)
        1. while loop will run till 2^n times 
            1.1 A copy operation of n each time
            1.2 A for loop running n times to check each bit // bits can not be more than 32 so if n <=32 bits then only this solution will work

    SC - O(n*2^n) - Total 2^n subset each subset holding maxm of n elements

*/

// Q. Why your answers don't contain duplicates why?
// A. because we're only checking each index single time only and once we move forward we never see that no. again because of which there are no duplicates

// Q. But what if the array contains the duplicates
// A. Using set
// Q. further question, we don't want you to generate the duplicates rather than generating and filtering it later

/*
Example:
    nums = [1,2,2]

    Step 1: Sort the array so that all duplicates are adjacent.

    nums = [1,2,2]

    Why do we sort?
    Because it allows us to skip all duplicate values together while exploring
    the "not take" branch.

---------------------------------------------------------
Recursive Tree

                           []
                      /            \
                 Take 1           Skip 1
                  |                 |
                 [1]               []
               /     \           /     \
          Take 2    Skip 2   Take 2   Skip 2
            |          |        |        |
         [1,2]       [1]      [2]       []

    Now consider the duplicate '2'.

    From subset [1,2]:

                    [1,2]
                /     \
            Take 2       Skip 2
            |             |
        [1,2,2]       [1,2]

    Notice that skipping the second '2' generates [1,2],
    which was already generated when we skipped the first '2'.

    So this branch creates duplicate subsets.

---------------------------------------------------------
Key Observation

    Whenever we decide NOT to take an element,
    there is no point in considering the remaining duplicate copies.

    Instead of skipping only one duplicate,

        Skip first 2
        Skip second 2
        Skip third 2
        ...

    we skip ALL consecutive duplicates together.

    This ensures every unique subset is generated exactly once.

---------------------------------------------------------
Implementation Idea

        1. Include the current element.
        2. Backtrack.
        3. Before exploring the "exclude" branch,
        skip every duplicate of the current element.

---------------------------------------------------------
Example

    nums = [1,2,2]

    When processing the first 2:

    Take branch:
        [1,2]
            -> [1,2,2]

    Skip branch:
        Skip every remaining 2
            -> [1]

    Without skipping duplicates,
    [1,2] would be produced twice.

    That's why duplicates are skipped only before exploring
    the "not take" branch.

    Whenever we decide to skip any number there is no point of exploring the duplicates as it'll going to generate the same subset as we skip the first number if we skip the second number as well it wil lead to duplicate subset
    however if we take a number and then take another identical value changes the subset



*/

// Solution-3 (For array containing duplicates)
var subsetsWithDup = function(nums) {
    let result = [];
    nums.sort((a,b)=>a-b);
    subsetSumsHelper(nums, 0, [], result);
    return result;
};

function subsetSumsHelper(nums, i, currSubset, result){
    if(i == nums.length){
        result.push([...currSubset]);
        return;
    }
    currSubset.push(nums[i]);
    subsetSumsHelper(nums, i+1, currSubset, result);
    currSubset.pop();

    while(nums[i] == nums[i+1]){
        i++;
    }
    subsetSumsHelper(nums, i+1, currSubset, result);
}

/*
# Complexity Analysis
    TC -  O(n*(f0+1)*(f1+1)*(f2+1)*....(fn+1) ) where fi is the number of duplicated values at each index
    SC -  O(n* ((f0+1)*(f1+1)*(f2+1)*....(fn+1))) No of subsets ((f0+1)*(f1+1)*(f2+1)*....(fn+1)) contianing n numbers at max

    n total elements
    1. nlogn for sorting
    2. For each element if its repeated fi times then number of subsets it produces with itself is (fi+1) 
    ex - [1,1,1,1,2,2,2], how many subsets 1 forms [], [1], [1,1], [1,1,1], [1,1,1,1] - 5
    how many subsets 2 formss [], [2],[2,2], [2,2,2] - 4
    Total subsets f1 * f2 = 20
    3. Similarly time complexity for this is (f0+1)*(f1+1)*(f2+1)*....(fn+1)  
    4. If everything is unique the TC - (1+1)*(1+1)*(1+1).....(1+1) => 2*2*2...2 (n times) => 2^n

    Space complexity-
    If the interviewer asks auxiliary space (excluding the output array):

    Recursion stack = O(n)
    currSubset = O(n)
    Overall auxiliary space = O(n)
    
*/

// Q. What if you only want to store a subset of k size?

/* 
    A. I'll add some pruning condition to stop 
        1. If the subset size becomes k, push it and return it
        2. If i reached arr length stop and return
        3. If curr subset size + remanining elements in array < k then also return because even if we add all elements then also we'll not find any valid state

*/

// Solution - IV
function subsetSumsHelper(nums, i, currSubset, result, k){
    // If we find subset with size k
    if(currSubset.length == k){
        result.push([...currSubset]);
        return;
    }
    // if i reached end 
    if(i == nums.length){
        return;
    }
   
    let subsetSize = currSubset.length;
    let remEl = nums.length-i;
    // if curr size + rem elements still can't make k, this can never be our resultant states
    if(subsetSize + remEl < k){
        return;
    }

    currSubset.push(nums[i]);
    subsetSumsHelper(nums, i+1, currSubset, result, k);
    currSubset.pop();
    // duplicate handling
    while(i < nums.length-1 && nums[i] == nums[i+1]){
        i++;
    }
    subsetSumsHelper(nums, i+1, currSubset, result, k);
}
/*

    TC - 
    SC - 

    There will be n elements without duplicates then for k subsets we can have nc3 numbers

*/

// Q. Your solution works using the include/exclude recursion pattern. Can you now solve the same problem using the for-loop backtracking template? Which approach would you choose in production, and why?"

/*

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


[1]
[1,2]
[1,2,3]
pops when i reaches arr length

stack.push({subset: [], index: 0})
while(stack.length> 0 ){
let 
}

*/
function subsets(arr){
    let stack =  [];
    let res = [];

    stack.push({subset: [], index: 0});

    while(stack.length > 0){
        let {subset, index} = stack.pop();

        if(index == arr.length){
            res.push([...subset]);
            continue;
        }

        // not take
        stack.push({subset:[...subset], index: index+1});
        // take
        stack.push({subset: [...subset, arr[index]], index: index+1})

    }

    return res;
}

/*
    For this problem, recursion is more readable and easier to reason about. 
    The recursive code closely matches the decision tree—take or not take—so it's easier to maintain and less error-prone. 
    An explicit stack is useful when recursion depth could become a problem or when the language has a small recursion limit, but for this problem the constraints are small, so I'd prefer recursion for clarity."

*/