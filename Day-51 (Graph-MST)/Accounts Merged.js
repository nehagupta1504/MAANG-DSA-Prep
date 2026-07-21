/*
# Problem Statement:
Given a list of accounts where each element account [i] is a list of strings, where the first element account [i][0] is a name, and the rest of the elements are emails representing emails of the account.

Now, merge these accounts. Two accounts definitely belong to the same person if there is some common email to both accounts. Note that even if two accounts have the same name, they may belong to different people as people could have the same name. A person can have any number of accounts initially, but all of their accounts definitely have the same name.

After merging the accounts, return the accounts in the following format: the first element of each account is the name, and the rest of the elements are emails in sorted order.


Example 1

    Input: N = 4,

    accounts =

    [["John","johnsmith@mail.com","john_newyork@mail.com"],

    ["John","johnsmith@mail.com","john00@mail.com"],

    ["Mary","mary@mail.com"],

    ["John","johnnybravo@mail.com"]]


    Output: [["John","john00@mail.com","john_newyork@mail.com", "johnsmith@mail.com"],

    ["Mary","mary@mail.com"],

    ["John","johnnybravo@mail.com"]]


    Explanation: The first and the second John are the same person as they have a common email. But the third Mary and fourth John are not the same as they do not have any common email. The result can be in any order but the emails must be in sorted order. The following is also a valid result:

    [['Mary', 'mary@mail.com'],

    ['John', 'johnnybravo@mail.com'],

    ['John', 'john00@mail.com' , 'john_newyork@mail.com', 'johnsmith@mail.com' ]]

Example 2

    Input: N = 6,

    accounts =

    [["John","j1@com","j2@com","j3@com"],

    ["John","j4@com"],

    ["Raj",”r1@com”, “r2@com”],

    ["John","j1@com","j5@com"],

    ["Raj",”r2@com”, “r3@com”],

    ["Mary","m1@com"]]



    Output: [["John","j1@com","j2@com","j3@com","j5@com"],

    ["John","j4@com"],

    ["Raj",”r1@com”, “r2@com”, “r3@com”],

    ["Mary","m1@com"]]



    Explanation: The first and the fourth John are the same person here as they have a common email. And the third and the fifth Raj are also the same person. So, the same accounts are merged.

Constraints

·  1 <= N <= 1000

·  2 <= accounts[i].size <= 15

·  1 <= accounts[i][j].size <= 30

·  accounts[i][0] consists of English letters.
*/


/*
# Intuition
    # Use disjoint set to connect the email in the following steps 

        ip- [
            [neha, "n1@gmail.com", "n2@gmail.com"],
            [rina, "r1@gmail.com"],
            [yash, "y1@gmail.com"],
            [neha, "n2@gmail.com", "n3@gmail.com"]
        ]

    // Step 1- Connect all the emails to a index

        1. Make a map and map all the emails to its parent index 
        2. If a email is recurring, then make its parent the original index

        0th index - [neha, "n1@gmail.com", "n2@gmail.com"],

        emailMap{
            n1@gmail.com ->0
            n2@gmail.com-> 0
        }
        1stIndex - [rina, "r1@gmail.com"],
        emailMap{
            n1@gmail.com ->0
            n2@gmail.com-> 0
            r1@gmail.com->1
        }
        2ndIndex -  [yash, "y1@gmail.com"]
        emailMap{
            n1@gmail.com ->0
            n2@gmail.com-> 0
            r1@gmail.com->1
            y1@gmail.com-> 2
        }
        3rd Index -     [neha, "n2@gmail.com", "n3@gmail.com"]
        parent =[0, 1, 2, 0] 0-3, 1, 2
        emailMap{
            n1@gmail.com ->0
            n2@gmail.com-> 0
            r1@gmail.com->1
            y1@gmail.com-> 2
            n3@gmail.com-> 3
        }


    // Step 2-  create a map to put connected emails togetger

        emailMap{
            n1@gmail.com ->0
            n2@gmail.com-> 0
            r1@gmail.com->1
            y1@gmail.com-> 2
            n3@gmail.com-> 3
        }

        0-> n1@gmail.com ,    n2@gmail.com,  n3@gmail.com (since we set parent of 3 as 0)
        1->  r1@gmail.com
        2-> y1@gmail.com



    // Step 3- sort the emails

    // Step 4- add parent name in front of the array

*/


// Solution
class DisjointSet {
    constructor(n) {
      this.rank = new Array(n).fill(0);
      this.size = new Array(n).fill(0);
      this.parent = Array.from({ length: n }, (_, index) => index);
    }
  
    getUniversalParent(node) {
      if (node == this.parent[node]) {
        return node;
      }
      return (this.parent[node] = this.getUniversalParent(this.parent[node]));
    }
  
    find(u, v) {
      let parentofU = this.getUniversalParent(u);
      let parentofV = this.getUniversalParent(v);
      if (parentofU == parentofV) {
        return true;
      }
      return false;
    }
  
    unionByRank(u, v) {
      let sameSet = this.find(u, v);
      if (sameSet) return null;
  
      let parentofU = this.getUniversalParent(u);
      let parentofV = this.getUniversalParent(v);
  
      if (this.rank[parentofU] > this.rank[parentofV]) {
        this.parent[parentofV] = parentofU;
      } else if (this.rank[parentofU] < this.rank[parentofV]) {
        this.parent[parentofU] = parentofV;
      } else {
        this.parent[parentofV] = parentofU;
        this.rank[parentofU] += 1;
      }
    }
  
    unionBySize(u, v) {
  
      let parentofU = this.getUniversalParent(u);
      let parentofV = this.getUniversalParent(v);
  
      if(parentofU == parentofV){
          return false;
      }
  
      if(this.size[parentofU] > this.size[parentofV]){
          this.parent[parentofV] = parentofU;
          this.size[parentofU] += this.size[parentofV];
      }else{
          this.parent[parentofU] = parentofV;
          this.size[parentofV] += this.size[parentofU];
      }
      return true;
    }
  }
  
  class Solution {
      accountsMerge(details) {
          let n = details.length;
  
          let ds = new DisjointSet(n);
          let emailMap = new Map();
  
          // Step 1
          for(let i=0; i < n ; i++){
              for(let j=1; j < details[i].length; j++){
                  let email = details[i][j];
                  if(!emailMap.has(email)){
                      emailMap.set(email, i);
                  }else{
                      // make i and emailMap.get(email) (some index ) connected
                      ds.unionBySize(i, emailMap.get(email));
                  }
  
              }
          }
          // Step 2-
          let accountsMerged = new Map();
          for(let [email, index] of emailMap.entries()){
              let parent = ds.getUniversalParent(index);
              if(!accountsMerged.has(parent)){
                  accountsMerged.set(parent, [])
              }
              
              accountsMerged.get(parent).push(email);
          }
  
          // STEP 3 and 4
          let result = [], i=0;
          for(let [index, emails] of accountsMerged.entries()){
              emails.sort()
              result[i] = [details[index][0], ...emails];
              i++;
          }
          
          return result;
  
      }
  }



/*
# Complexity Analysis

    Let:

    N = number of accounts
    E = total email entries, including duplicates
    U = number of unique emails; in the worst case, U = E
    K = maximum number of unique emails in any merged account

Time Complexity:

    1. Create the Disjoint Set:
    O(N)

    2. Process all E email entries, create the email map, and perform unions:
    O(E × α(N))

    3. Iterate through U unique emails and find their universal parents:
    O(U × α(N))
    Worst case: O(E × α(N))

    4. Sort all U unique emails, with at most K emails in each merged account:
    O(U log K)
    Worst case: O(E log K)

    5. Build the final result:
    O(U + N)
    Worst case: O(E + N)

    Overall:
    O(N + Eα(N) + Uα(N) + U log K)

    Worst case, when U = E:
    O(N + Eα(N) + E log K)

    Absolute worst case, when K = E:
    O(N + Eα(N) + E log E)

    Since E log E dominates Eα(N):
    TC = O(N + E log E)

Space Complexity - O(N + U)
*/