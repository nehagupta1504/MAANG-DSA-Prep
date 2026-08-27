/*
# Problem Statement:
    Problem Description

In the recent expansion into grocery delivery, Flipkart faces a crucial challenge in effective inventory management. Each grocery item on the platform carries its own expiration date and profit margin, represented by two arrays, A and B of size N. A[i] denotes the time left before expiration date for the ith item, and B[i] denotes profit margin for the ith item. To mitigate potential losses due to expiring items, Flipkart is seeking a strategic solution.

The objective is to identify a method to strategically buy certain items, ensuring they are sold before their expiration date, thereby maximizing overall profit. Can you assist Flipkart in developing an innovative approach to optimize their grocery inventory and enhance profitability?

Your task is to find the maximum profit one can earn by buying groceries considering that you can only buy one grocery item at a time.

NOTE:

You can assume that it takes 1 minute to buy a grocery item, so you can only buy the ith grocery item when the current time <= A[i] - 1.
You can start buying from day = 0.
Return your answer modulo 10^9 + 7.



Problem Constraints

    1 <= N <= 105
    1 <= A[i] <= 109
    0 <= B[i] <= 109



Input Format

    The first argument is an integer array A represents the deadline for buying the grocery items.
    The second argument is an integer array B represents the profit obtained after buying the grocery items.



Output Format

    Return an integer denoting the maximum profit you can earn.



Example Input

    Input 1:

    A = [1, 3, 2, 3, 3]
    B = [5, 6, 1, 3, 9]
    Input 2:

    A = [3, 8, 7, 5]
    B = [3, 1, 7, 19]


    Example Output

    Output 1:

    20
    Output 2:

    30


Example Explanation

    Explanation 1:

    At time 0, buy item with profit 5.
    At time 1, buy item with profit 6.
    At time 2, buy item with profit 9.
    At time = 3 or after , you can't buy any item, as there is no item with deadline >= 4.
    So, total profit that one can earn is 20.

    
    Explanation 2:

    At time 0, buy item with profit 3.
    At time 1, buy item with profit 1.
    At time 2, buy item with profit 7.
    At time 3, buy item with profit 19.
    We are able to buy all items within their deadline. So, total profit that one can earn is 30.
*/


/*
# Intuition - Greedy Solution
1. sort by profit
2. Make an array of length max size of time available
3. loop through profit values put the values A[i]-1 cell, if its booked try putting in A[i]-2 cell and so o until all items it booked
4. when the items placed == max time avaibale return

*/


// Solution
module.exports = { 
    //param A : array of integers
    //param B : array of integers
    //return an integer
       solve : function(A, B){
           let inventory = [];
           let mod = 1e9 + 7;
           let n = A.length;
   
           for(let i = 0; i < A.length; i++){
               inventory.push([A[i], B[i]]);
           }
           inventory.sort((a,b)=>b[1]- a[1]);
           let maxTime = Math.min(Math.max(...A), n);
           let profit = new Array(maxTime).fill(-1);
           let itemsBought = 0, profitGain=0;
   
           for(let i=0; i<inventory.length; i++){
               let time = Math.min(inventory[i][0]-1, n-1);
               
               while(profit[time] != -1 && time >= 0){
                       time--;
               }
   
               if(time < 0) continue;
               profit[time] = inventory[i][1];
               profitGain = (profitGain + inventory[i][1])%mod;
               itemsBought++;
   
               if(itemsBought == maxTime){
                   break;
               }
           }
           return profitGain;
       }
   };



/*
# Complexity Analysis
   TC - O(nlogn + nk) => In worst case we have to go through all n jobs to fill k slots
   SC - O(n)
*/

// Solution-II Min Heap  - O(nlogn)
/*
# Intuition - Min Heap  
1. sort by deadline
   The ideas is if deadline  =1, process all nodes with deadline 1 and only make a heap of size = deadline, so that we keep only 1 porcess with maxm profit as we remove al processes with lesser profits
   If an item has deadline d, at most d items can be scheduled among all items seen so far.
   
2. Create a min heap, process the inventory items 1 by 1
   2.1 For every processed item, the heap will contain elements <= deadline
   2.2. Insert current element and removed the one with lesser profits
   For every item:
        Add its profit to the heap.
        If heap.size > deadline, remove the minimum-profit item.

3. Why remove the minimum? "If I have too many jobs for the available slots, discard the least profitable one."

4. TC -  O(nlogn)
        Sort (nlogn)
        Maintain a heap of maxm n size in worstcase and each insertion or extraction take logn time so O(nlogn)

*/


module.exports = { 
    //param A : array of integers
    //param B : array of integers
    //return an integer
       solve : function(A, B){
           let inventory = [];
           let mod = 1e9 + 7;
   
           for(let i = 0; i < A.length; i++){
               inventory.push([A[i], B[i]]);
           }
           inventory.sort((a,b)=>a[0]- b[0]);
            let mH = new MinHeap();
            let deadLine = 0;

            for(let i=0 ;i < inventory.length; i++){
                deadLine = inventory[i][0];
                mH.insert(inventory[i][0], inventory[i][1]);

                if(mH.size() > deadLine){
                    mH.extractMin();
                }
            }

            let profitGain = 0;
            while(mH.size() > 0){
                let {time, profit} =  mH.extractMin();;
                profitGain = (profitGain + profit)%mod;
            }
            return profitGain;
   
       }
   };

class Pair{
    constructor(time, profit){
        this.time = time;
        this.profit = profit;
    }
}

class MinHeap {
    constructor() {
        this.heap = [];
    }

    // O(log n)
    insert(time, profit) {
        let pair = new Pair(time, profit);
        this.heap.push(pair);
        this.bubbleUp();
    }

    // O(log n)
    extractMin() {
        if (this.heap.length === 0) return null;

        if (this.heap.length === 1) {
            return this.heap.pop();
        }

        const min = this.heap[0];

        this.heap[0] = this.heap.pop();
        this.bubbleDown();

        return min;
    }

    // O(1)
    peek() {
        return this.heap.length > 0 ? this.heap[0] : null;
    }

    bubbleUp() {
        let index = this.heap.length - 1;

        while (index > 0) {
            const parent = Math.floor((index - 1) / 2);
            if (this.heap[parent].profit <= this.heap[index].profit) break;

            [this.heap[parent], this.heap[index]] =
                [this.heap[index], this.heap[parent]];

            index = parent;
        }
    }

    bubbleDown() {
        let index = 0;
        const n = this.heap.length;

        while (true) {
            const left = 2 * index + 1;
            const right = 2 * index + 2;

            let smallest = index;

            if (left < n && this.heap[left].profit  < this.heap[smallest].profit ) {
                smallest = left;
            }

            if (right < n && this.heap[right].profit  < this.heap[smallest].profit ) {
                smallest = right;
            }

            if (smallest === index) break;

            [this.heap[index], this.heap[smallest]] =
                [this.heap[smallest], this.heap[index]];

            index = smallest;
        }
    }
    size(){
        return this.heap.length;
    }
}

// Solution - III (Disjoint set) - O(nlogn)
/*
   Optimised way to use Disjoint set
   1. Bottleneck in current solution - checking each slot if occupied or not
    while (profit[time] != -1 && time >= 0) { time--; }
    2. If we can find empty slots in constant time, The algorithm will become O(nlogn)

    How does  this work
    1. We take an array of max slots possible i.e min(MaxTime, n)
    2. Use DSU as 
        2.1 Initial all slots are empty, so pointing out to index itself
        2.2 At time time of filling any slot if its empty i.e, parent[index] == index so fill it by making it point to next empty slot
        which by default we consider as index-1
        Ex - If we fill 6th slot, then we make its value 5 and let's suppose 5 is already filled so it'll point to 4 and now 4 is empty so
        using universal parent we can reach to 4 from 6.
        2.3 Getting emoty slot is find till parent[index] == index
        2.4 If anytime any slot is returning -1, it means all slots lower to that has been filled` 
}
*/


module.exports = { 
    //param A : array of integers
    //param B : array of integers
    //return an integer
       solve : function(A, B){
           let inventory = [];
           let mod = 1e9 + 7;
           let n = A.length;
   
           for(let i = 0; i < A.length; i++){
               inventory.push([A[i], B[i]]);
           }
           inventory.sort((a,b)=>b[1]- a[1]);

           let profitGain=0;

           let maxTime = Math.min(Math.max(...A), n)
           let dsu = new DisjointSet(maxTime);

           for(let i=0; i<inventory.length; i++){
               let time = Math.min(inventory[i][0]-1, n-1);
               let emptySlot = dsu.nextEmptySlot(time);
                // if no empty slot
               if(emptySlot == -1) continue;

               dsu.fillSlot(emptySlot);

               profitGain = (profitGain + inventory[i][1])%mod;
           }
           return profitGain;
       }
   };


class DisjointSet{
    constructor(size){
        this.parent = Array.from({length: size}, (_, index)=> index);
    }

    nextEmptySlot(index){
        // if a index. == parent[index] it will be considered empty yet
        if(this.parent[index] == -1) return -1;
        if(this.parent[index] == index) return index;
        return this.parent[index] = this.nextEmptySlot(this.parent[index])
    }

    fillSlot(index){
        if(index == 0 && this.parent[index] != index){
            return -1;
        }
        this.parent[index] = index-1;
    }

}