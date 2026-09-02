/*
# Problem Statement:
    As it is Tushar's Birthday on March 1st, he decided to throw a party to all his friends at TGI Fridays in Pune. Given are the eating capacity of each friend, filling capacity of each dish and cost of each dish. A friend is satisfied if the sum of the filling capacity of dishes he ate is equal to his capacity. Find the minimum cost such that all of Tushar's friends are satisfied (reached their eating capacity).

    NOTE:

    Each dish is supposed to be eaten by only one person. Sharing is not allowed.

    Each friend can take any dish unlimited number of times.

    There always exists a dish with filling capacity 1 so that a solution always exists.



    Problem Constraints

    |A| <= 1000

    |B| <= 1000

    |C| <= 1000



    Input Format

    First Argument is vector A, denoting eating capacities

    Second Argument is vector B, denoting filling capacities

    Third Argument is vector C, denoting cost



    Output Format

    Return a single integer, the answer to the problem



    Example Input

    Input 1:

    A = [2, 4, 6]
    B = [2, 1, 3]
    C = [2, 5, 3]
    Input 2:

    A = [2]
    B = [1]
    C = [2]


    Example Output

    Output 1:

    12
    Output 2:

    4


    Example Explanation

    Explanation 1:

    First friend takes dish 1, Second friend takes dish 1 twice and third friend takes dish 3 twice.
    So 2 + 2*2 + 3*2 = 12.
    Explanation 2:

    Only way is to take 2 dishes of cost 2, hence 4.
*/


/*
# Intuition
    1. For each person find the minm cost required, so the subproblem now becomes a complete knapsack problem
*/


// Solution I (Recursive)

function tusharBirthday(eatingC, fillingC, cost){
    let totalCost = 0;
    for(let capacity of eatingC){
        let dp = Array.from({length: fillingC.length}, ()=>new Array(capacity+1).fill(-1))
        let cost = findMinmCost(0, capacity, dp);
        totalCost += cost;
    }

    function findMinmCost(i, capacity, dp){
        if(capacity == 0){
            return 0;
        }
        if(i == fillingC.length) return Infinity;

        if(dp[i][capacity] != -1) return dp[i][capacity];

        let minmCost = Infinity;
        if(capacity >= fillingC[i]){
            // eat 
             minmCost = Math.min(minmCost, cost[i] + findMinmCost(i, capacity-fillingC[i], dp));
        }
       // don't eat
        minmCost = Math.min(minmCost, findMinmCost(i+1, capacity, dp));

        return (dp[i][capacity] = minmCost);
    }

    return totalCost;
}

// Solution II (Itertive Approach)
module.exports = { 
    //param A : array of integers
    //param B : array of integers
    //param C : array of integers
    //return an integer
       solve : function(A, B, C){
           return tusharBirthdayItertive(A, B, C);
       }
   };
   function tusharBirthdayItertive(eatingC, fillingC, cost){
       let totalCost = 0;
       let maxCapacity = Math.max(...eatingC);
       let costForCapacity = new Array(maxCapacity+1).fill(-1);
   
       for(let capacity of eatingC){
           if(costForCapacity[capacity] == -1){
              costForCapacity[capacity] = tusharBirthdayItertiveHelper(capacity);
           }
           totalCost += costForCapacity[capacity];
       }
   
       function tusharBirthdayItertiveHelper(capacity){
           let n = fillingC.length;
           let dp = Array.from({length: 2}, ()=>new Array(capacity+1).fill(Infinity));
           for(let i=0; i<= n; i++){
               dp[i%2][0] =0;
           }
   
           for(let i = n-1; i>=0 ;i--){
               for(let j=0; j<=capacity; j++){
   
                   if(j-fillingC[i] < 0){
                       dp[i%2][j] =  dp[(i+1)%2][j];
                       continue;
                   }
   
                   dp[i%2][j] = Math.min(
                       cost[i] + dp[i%2][j-fillingC[i]],
                       dp[(i+1)%2][j]
                   )
               }
           }
           return dp[0][capacity];
   
       }
       return totalCost;
   }


/*
# Complexity Analysis (Iterative)

    TC: (N*M*C)
        N - Total dishes,
        M - Total Friends, with unique capacities
        C- Lets say Max Capacity out of all friends
    SC: O(C) + O(2*C) => O(2*C)
*/