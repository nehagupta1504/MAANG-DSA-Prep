/*
# Problem Statement:
    You are given a 2D integer array units of size m × n where units[i][j] represents the capacity of the jth unit in the ith device. Each device contains exactly n units.

    The rating of a device is the minimum capacity among all its units.

    You may perform the following operation any number of times (including zero):

    Choose a device i that has not been used as a source before.
    Remove exactly one unit from device i and add it to any different device.
    Then mark device i as used, so it cannot be chosen again as a source.
    Return the maximum possible sum of the ratings of all devices after any number of such operations.

    Note: Devices can receive units from multiple devices, regardless of whether they have been selected.
    The rating of an empty device is 0.
     

Example 1:

    Input: units = [[1,3],[2,2]]

    Output: 4

    Explanation:

    ​​​​​​​​​​​​​​Select device i = 0 and transfer units[0][0] = 1 to device i = 1.
    After the transfer, the ratings are:
    Device 0 = [3]: rating[0] = 3
    Device 1 = [2, 2, 1]: rating[1] = 1
    Thus, the sum of ratings is 3 + 1 = 4.

Example 2:

    Input: units = [[1,2,3],[4,5,6]]

    Output: 6

    Explanation:

    Select device i = 1 and transfer units[1][0] = 4 to device i = 0.
    After the transfer, the ratings are:
    Device 0 = [1, 2, 3, 4]: rating[0] = 1
    Device 1 = [5, 6]: rating[1] = 5
    Thus, the sum of ratings is 1 + 5 = 6.

Example 3:

    Input: units = [[5,5,5],[1,1,1]]

    Output: 6

    Explanation:

    No transfers increase the sum of ratings. Thus, the sum of ratings is 5 + 1 = 6.
     

# Constraints:

    1 <= m == units.length <= 10^5
    1 <= n == units[i].length <= 10^5
    m * n <= 2 * 10^5
    1 <= units[i][j] <= 10^5

*/


/*
# Intuition
    1. We need to find the row where second minimum is smallest
    2. To do that we need to sort each row
    3. How this works?
        a. If we can find the row which can take fall for other rows so that we can have max values out of all rows
        b. If we remove first value of all rows, second value will always be greater than first as the rows are sorted, so we can have maxium
            other values will not make any difference if we remove them or add them as we have to take the lowest value of each row
        c. If we remove lowest values from each row and put it in the row where the second value is minimum, every row will give their maximum answer
        d. and for the row which has second minimum since all first values get added in that row, the mimn of all first values will be contrbution of that row
    ex - 

    [
        [4, 5, 6]
        [2, 9, 9]
        [1, 7, 8]
    ]
        Here 1st row have the minm second value so move all first elements of others rows to that row 
    [
        [1, 2, 4, 5, 6]
        [9, 9]
        [7, 8]
    ]
    Note -  In reality we don't have to move the elements we can just add all the second elements 9 + 7

    Now the contibution of the row where second element is mimnum is minm of all rows first element minm( 1, 2, 4) = 1

    Ans = 9 + 7 + 1 

    Base Case: If only 1 element in each row then maxium would be sum of all elements

*/


// Solution
/**
 * @param {number[][]} units
 * @return {number}
 */
var maxRatings = function(units) {
    let m = units.length;
    let n = units[0].length;

    let maxRating =0;

    // If only 1 element in each row then max rating will be sum of all elements
    if(n == 1){
        maxRating = units.map(device=> device[0]).reduce((acc, el)=>el+acc, 0);
        return maxRating;
    }

    // sort all rows by ratings
    // find the row which contains lesser second value as compared to any other row
    // as that row will be suffering the loss
    let rowWithSecondLeastValue = 0;
    
    for(let i = 0; i<m; i++){
        // 1. sort
        units[i].sort((a, b)=>a-b);
        // 2. find the row with second value as minm
        if(units[rowWithSecondLeastValue][1] > units[i][1]){
            rowWithSecondLeastValue = i;
        }
    }

    // Assuming we have moved all first value to the row which minm second value
    // maxRating will contain value of seondCol except the one which have minm second      // value, as all first element moved to that row, we need to find min out of all
    // to add in maxRating
    
    let firstMinValue = Infinity;
    for(let i=0; i<m; i++){
        if(i != rowWithSecondLeastValue){
            maxRating += units[i][1];
        }
        firstMinValue = Math.min(units[i][0], firstMinValue);
    }

    maxRating += firstMinValue;
    return maxRating;
};



/*
# Complexity Analysis

Time Complexity : O(m*nlogn + m)
    Sort each row with n elements each (m*nlogn) + O(m) traverse all rows

Space Complexity: O(1) as no extra space is used
*/