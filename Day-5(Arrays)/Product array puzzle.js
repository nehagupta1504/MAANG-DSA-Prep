/*
Given an array of integers A, find and return the product array of the same size where the ith element of the product array will be equal to the product of all the elements divided by the ith element of the array.

Note: It is always possible to form the product array with integer (32 bit) values. Solve it without using the division operator.


# Input Format

    The only argument given is the integer array A.
    Output Format

    Return the product array.

# Constraints

    2 <= length of the array <= 1000
    1 <= A[i] <= 10

# For Example

    Input 1:
        A = [1, 2, 3, 4, 5]
    Output 1:
        [120, 60, 40, 30, 24]

    Input 2:
        A = [5, 1, 10, 1]
    Output 2:
        [10, 50, 5, 50]
*/


function productArray(A){
    let product = 1;
    let countOfZeroes = 0;
    for(let i=0; i< A.length; i++){
        if(A[i] == 0){
            countOfZeroes++;
        }else{
            product *= A[i];
        }
    }
    let opArray = [];
    switch(countOfZeroes){
        case 1: {
            for(let i=0; i< A.length; i++){
                if(A[i] == 0){
                    opArray.push(product);
                }else{
                    opArray.push(0);
                }
            }
            return opArray;
        }
        case 0: {
            for(let i=0; i< A.length; i++){
                opArray.push(product/A[i]);
            }
            return opArray;
        }
        default:{
            return new Array({length: A.length}).fill(0);
        }

    }
}

// Another way of writing it
function productArray2(A){
    let product = A.reduce((acc, el) => acc * el, 1);
    let proArr = [];
    proArr = A.map(el=> el==0 ? 0: product/el)
    return proArr;
}


// Time Complexity - O(n)
// Space Complexity - O(n)