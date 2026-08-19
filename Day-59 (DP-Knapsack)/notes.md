# Leetcode Problem List- https://leetcode.com/problem-list/50vif4uc/


# How to identify 0/1 Knapsack

A good way to identify 0/1 Knapsack is to look for these 3 things:

1. You have items
    * Each item has some value/cost/weight.
2. There is a capacity/limit
    * e.g. maximum weight, maximum budget, maximum time.
3. Each item can be used at most once
    * This is the "0/1" part:
    * 0 → don't take it
    * 1 → take it

NOTE: Biggest clue: For every item, do I have exactly two choices: take it or skip it?