/*
# Problem Statement:
    The demons had captured the princess and imprisoned her in the bottom-right corner of a dungeon. The dungeon consists of m x n rooms laid out in a 2D grid. Our valiant knight was initially positioned in the top-left room and must fight his way through dungeon to rescue the princess.

    The knight has an initial health point represented by a positive integer. If at any point his health point drops to 0 or below, he dies immediately.

    Some of the rooms are guarded by demons (represented by negative integers), so the knight loses health upon entering these rooms; other rooms are either empty (represented as 0) or contain magic orbs that increase the knight's health (represented by positive integers).

    To reach the princess as quickly as possible, the knight decides to move only rightward or downward in each step.

    Return the knight's minimum initial health so that he can rescue the princess.

    Note that any room can contain threats or power-ups, even the first room the knight enters and the bottom-right room where the princess is imprisoned.

    

    Example 1:


    Input: dungeon = [[-2,-3,3],[-5,-10,1],[10,30,-5]]
    Output: 7
    Explanation: The initial health of the knight must be at least 7 if he follows the optimal path: RIGHT-> RIGHT -> DOWN -> DOWN.
    Example 2:

    Input: dungeon = [[0]]
    Output: 1
    

    Constraints:

    m == dungeon.length
    n == dungeon[i].length
    1 <= m, n <= 200
    -1000 <= dungeon[i][j] <= 1000
*/


/*
# Intuition
    1. One solution can be finding all paths using DFS + Backtracking, for a path find the minm health needed, If any other path need more health than that, then prune else traverse
    2. The current solution is using DP
    3. It is similar to minimum path sum, but the only difference is whenever the cell value become positive we have to make it zero why?
        3.1 Because knight is traverlling from top down and we keep the positive value it can affect the initial cells because if those are negative, knight will need power initially
        3.2 so by positive value at a cell we can say the current cell + later on cells are covered and we don't need initial health for that
        3.3 But for previous columns we will need some health in case if they're negative so we make current psotive cell as zero, indicating we don't need initial health for further cells
    4. Rest we solve it in similar manner as minimum path sum
*/


// Solution
/**
 * @param {number[][]} dungeon
 * @return {number}
 */
var calculateMinimumHP = function(dungeon) {
    return DG(dungeon);
};


function DG(dungeon){
    let m = dungeon.length, n = dungeon[0].length;
    let dp = Array.from({length:m}, ()=> new Array(n).fill(0));

    for(let i= m-1; i>=0 ; i--){
        for(let j = n-1; j>= 0; j--){

            let health = 0;

            if(i == m-1 && j == n-1){
                health =  dungeon[i][j];
            }
            else if(i == m-1){
               health =  dungeon[i][j] + dp[i][j+1];
            }else if(j == n-1){
                health =  dungeon[i][j] + dp[i+1][j];
            }else{
                health = dungeon[i][j] + Math.max(dp[i][j+1], dp[i+1][j])
            }

            dp[i][j] = health > 0 ? 0: health;
        }

    }
    return Math.abs(dp[0][0])+1;
}


/*
# Complexity Analysis
    TC: O(m*n)
    TC: O(m*n)
*/


// Solution II (Space Optimised)
/**
 * @param {number[][]} dungeon
 * @return {number}
 */
var calculateMinimumHP = function(dungeon) {
    return DG(dungeon);
};


function DG(dungeon){
    let m = dungeon.length, n = dungeon[0].length;
    let dp = new Array(n).fill(0);

    for(let i= m-1; i>=0 ; i--){
        for(let j = n-1; j>= 0; j--){

            let health = 0;
            if(i == m-1 && j == n-1){
                health =  dungeon[i][j];
            }
            else if(i == m-1){
               health =  dungeon[i][j] + dp[j+1];
            }else if(j == n-1){
                health =  dungeon[i][j] + dp[j];
            }else{
                health = dungeon[i][j] + Math.max(dp[j+1], dp[j])
            }

            dp[j] = health > 0 ? 0: health;
        }

    }
    return Math.abs(dp[0])+1;
}

/*
# Complexity Analysis
    TC: O(m*n)
    TC: O(n)
*/

// Note  - This can also be done inplace and in that case SC will become O(1)