/*
# Problem Statement:
Problem Description

    There is a row of seats represented by string A. Assume that it contains N seats adjacent to each other.
    There is a group of people who are already seated in that row randomly. i.e. some are sitting together & some are scattered.



    An occupied seat is marked with a character 'x' and an unoccupied seat is marked with a dot ('.')

    Now your target is to make the whole group sit together i.e. next to each other, without having any vacant seat between them in such a way that the total number of hops or jumps to move them should be minimum.

    In one jump a person can move to the adjacent seat (if available).

    NOTE: 1. Return your answer modulo 107 + 3.







Problem Constraints

    1 <= N <= 1000000
    A[i] = 'x' or '.'



Example Input

    Input 1:

    A = "....x..xx...x.."
    Input 2:

    A = "....xxx"


    Example Output

    Output 1:

    5
    Output 2:

    0


Example Explanation

    Explanation 1:

    Here is the row having 15 seats represented by the String (0, 1, 2, 3, ......... , 14) 
                    . . . . x . . x x . . . x . . 
    Now to make them sit together one of approaches is -
                    . . . . . . x x x x . . . . .
    Steps To achieve this:
    1) Move the person sitting at 4th index to 6th index: Number of jumps by him =   (6 - 4) = 2
    2) Bring the person sitting at 12th index to 9th index: Number of jumps by him = (12 - 9) = 3
    So, total number of jumps made: 2 + 3 = 5 which is the minimum possible.

    If we other ways to make them sit together but the number of jumps will exceed 5 and that will not be minimum.
    
    Explanation 2:

    They are already together. So, the cost is zero.
    */


/*
# Intuition
    1. Key Insight — Minimum Moves to Make People Consecutive
        a. Let occupied positions be pos[i].
        b. If the first person finally sits at k, final positions are:
            k, k+1, k+2, ...
        c. Movement:
            ∣pos[i]−(k+i)∣
        d. Rewrite:
            ∣(pos[i]−i)−k∣
        e. Create:
            modified[i] = pos[i] - i
        f. Now minimize:
            ∑∣modified[i]−k∣
        g. Median minimizes the sum of absolute differences.
            Odd count → k = median
            Even count → any k between the two middle values works; simply choose either middle value.

        Pattern:
        Make elements consecutive → subtract index → find median.
*/


// Solution
module.exports = { 
    //param A : string
    //return an integer
       seats : function(A){
           A = A.split("");
           let mod = 1e7+3;
           let pos = [];
           // Noting pos of x "....x..xx...x.." [4, 7, 8, 12]
           for(let [index, el] of A.entries()){
               if(el == 'x'){
                   pos.push(index);
               }
           }
           // when seated together pos will be k, k+1, k+2, k+2
           // finding median positions
           let medians = [];
           for(let i=0; i<pos.length; i++){
               // movements=> (k-4), (k+1-7), (k+2-8), (k+3-12), 4-0, 7-1, 8-2, 12-3 => [4, 6, 6, 9]
               medians.push(pos[i]-i);
           }
           // Minm movements when we select median value out of those medians
           let n = medians.length;
           let k = medians[Math.floor(n/2)]; // [4, 6(m), 6, 9]
           let movement = 0;
   
           for(let el of medians){
               // If we found k = 6
               movement = (movement + Math.abs(el-k))%mod; // [2, 0, 0, 3]
           }
   
           return movement;
       }
   };
   


/*
# Complexity Analysis
   TC- O(n)
   SC- O(k) //k number of people to occupy seats
 */