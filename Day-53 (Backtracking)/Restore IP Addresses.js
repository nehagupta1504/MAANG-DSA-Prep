/*
# Problem Statement:
    A valid IP address consists of exactly four integers separated by single dots. Each integer is between 0 and 255 (inclusive) and cannot have leading zeros.

    For example, "0.1.2.201" and "192.168.1.1" are valid IP addresses, but "0.011.255.245", "192.168.1.312" and "192.168@1.1" are invalid IP addresses.
    Given a string s containing only digits, return all possible valid IP addresses that can be formed by inserting dots into s. You are not allowed to reorder or remove any digits in s. You may return the valid IP addresses in any order.

    

    Example 1:

    Input: s = "25525511135"
    Output: ["255.255.11.135","255.255.111.35"]
    Example 2:

    Input: s = "0000"
    Output: ["0.0.0.0"]
    Example 3:

    Input: s = "101023"
    Output: ["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]
*/


/*
# Intuition
    1. Edge case - if string contains more than 12 number its invalid ip by default 
    1. find dots position
    2. start with inital dots as 0 and starting point as -1
    3. check whether the dots contain complete positions if yes push it in the response
    4. start from current i: index+1 to index+3, since initial index is -1
    5. For each index we're checking whether the last breaking point till `i` 
        5.1 wether the given number form is valid or not
        5.2 If the rest of the numbers left can be divided by rest dots following valid ip property
    6. If property suffice put the dot and try to find the next dot in similar manner

    Note - This is a rough solution and not very optimised, instead of pushing dot position we should be storing the parts of ip otherwise we have to use a helper funcction to join them later
    which is not at all a good approach
*/


// Solution
/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function(s) {
    return restoreIpAddressesHelper(s)
};
function restoreIpAddressesHelper(s){
    if(s.length > 12) return [];

    let res = [];

    function restore(str, index, dots, res){
        let n = str.length;
        if(dots.length == 3){
            let lastvalid = checkCondition(str, index+1, n-1);
            if(lastvalid){
                res.push([...dots]);
            }
            return;
        }
        let lastBp = dots.length > 0 ? dots[dots.length-1] : -1;

        if(index >= n){
            return;
        }

        for(let i = index+1; i <= index+3; i++){
            let len1 = i+1;
            let len2 = n- len1;
            
            let currBreakCount = 4 - dots.length -1 ;
            let isValid = checkCondition(str,  lastBp+1, i);
            if( (len2 > (currBreakCount*3)) || !isValid){
                continue;
            }
            dots.push(i);
            restore(str, i, dots, res);
            dots.pop(i);
        }
    }
    restore(s, -1, [], res);

    let ans = buildIPs(s, res)
    return ans;
}
function checkCondition(str, start, end){
    if(start > end) return false;

    let sub = str.slice(start, end+1);
    let num = Number(sub);

    if((sub.length >1 && sub[0] == '0') || num > 255 || sub.length > 3){
        return false;
    }

    return true;
}

function buildIPs(s, dotPositions) {
    const result = [];

    for (const dots of dotPositions) {
        let parts = [];
        let prev = 0;

        for (const pos of dots) {
            parts.push(s.slice(prev, pos + 1)); // +1 because dot is after this index
            prev = pos + 1;
        }

        parts.push(s.slice(prev)); // last part
        result.push(parts.join('.'));
    }

    return result;
}



/*
# Complexity Analysis
    TC: 3^3
        
        * Three recursive decisions are made while placing the first three dots.
        * The fourth segment is uniquely determined by the remaining characters and
        * is only validated, not recursively explored.

    SC: Auxillary space : O(1) + output space O(k) 
        * At a time only 3 calls can be placed inside a stack

*/

// SOlution II - we have optimised this code by removing dot and storing the ip parts
/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function(s) {
    return restoreIpAddressesHelper(s)
};
function restoreIpAddressesHelper(s){
    if(s.length < 4 || s.length > 12) return [];

    let res = [];
    let n = s.length;

    function restore(str, start, parts, res){
        if(parts.length == 3){
            let lastPart = str.slice(start, n);
            if(validPart(lastPart)){
                parts.push(lastPart)
                res.push([...parts]);
                parts.pop(lastPart)
            }
            return;
        }
        if(start >= n) return;

        for(let end = start; end < start+3 ; end++){
            let part = str.slice(start, end+1);
            let restPartLength = n- end-1;

            let partsLen = 4 - parts.length -1 ;
            if(restPartLength > (partsLen*3) || !validPart(part)){
                // rest parts can't be divided into valid ipaddress
                continue;
            }
            parts.push(part);
            restore(str, end+1, parts, res);
            parts.pop();

        }
    }
    restore(s, 0, [], res);
    for(let i = 0 ; i <res.length; i++){
        let ip = res[i];
        ip = ip.join(".");
        res[i] = ip;
    }
    return res;
}

function validPart(part){
    let num = Number(part);
    if(part.length <= 0 || num > 255 || (part.length > 1 && part[0] == '0')){
        return false;
    }
    return true;
}
