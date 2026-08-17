/*
# Problem Statement:
    There are N jobs to be done, but you can do only one job at a time.

    Given an array A denoting the start time of the jobs and an array B denoting the finish time of the jobs.

    Your aim is to select jobs in such a way so that you can finish the maximum number of jobs.

    Return the maximum number of jobs you can finish.


Example Input

    Input 1:

    A = [1, 5, 7, 1]
    B = [7, 8, 8, 8]
    Input 2:

    A = [3, 2, 6]
    B = [9, 8, 9]


Example Output

    Output 1:

    2
    Output 2:

    1


Example Explanation

    Explanation 1:

    We can finish the job in the period of time: (1, 7) and (7, 8).
    Explanation 2:

    Since all three jobs collide with each other. We can do only 1 job.
*/


/*
# Intuition
 /*
   [1, 7][5, 8][7,8][1,8]
   [1, 7][7,8][5, 8][1,8]
   
   The jobs javing same end time what is the least start time for that
   [1,7][7,8]
   
   [2,8][3,9][6,9]
   
   Algo
   1. sort the jobs via end time first
   2. take all the jobs with least end time and pick them to do first, check which job can be done after that end time
   [1,8][2,7][5,6][3,7], [2,4][1,4][1,2]
   [1,2][2,4][1,4][5,6][2,7][3,7][1,8]
   endtime 2
   endtime 4 count 2
   endtime 6 count 3
   
   1. Sort the jobs in order of endtime
   2. take the first job record the endtime and see which next job has starttime >= currentedntime if yes then update the edntime to that job and increment count
   else move ahead
   
   

*/


// Solution
module.exports = { 
    //param A : array of integers
    //param B : array of integers
    //return an integer
       solve : function(A, B){
           let jobs = [];
           for(let i=0; i<A.length; i++){
               jobs.push([A[i], B[i]]);
           }
           jobs.sort((a,b)=>a[1]-b[1]);
   
           let count=1;
           let currEndTime=jobs[0][1];
   
           for(let i=1; i <jobs.length; i++){
               if(jobs[i][0] >= currEndTime){
                   currEndTime = jobs[i][1];
                   count++;
               }
           }
           return count;
       }
   };
   
  

/*
# Complexity Analysis
   TC: O(n)
   SC: O(n)
*/