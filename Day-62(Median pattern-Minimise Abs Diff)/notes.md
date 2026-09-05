# Median Pattern — Minimize Absolute Difference

## 1. The Core Idea

Whenever a problem asks:

> **Make all elements equal using minimum operations**

and changing an element by `1` costs `1`, the total cost of choosing a target value `x` is:

`|a₁ - x| + |a₂ - x| + ... + |aₙ - x|`

The value of `x` that minimizes this sum is the **Median**.

### Key Formula

```text
Cost(x) = Σ |nums[i] - x|

Minimum Cost → Median
```

---

## 2. Why Median?

Consider:

```text
[1, 2, 3, 10, 11]
```

Suppose we choose `x = 3`.

```text
|1-3| + |2-3| + |3-3| + |10-3| + |11-3|
= 2 + 1 + 0 + 7 + 8
= 18
```

Now imagine moving `x` one step to the right:

```text
x = 4
```

The elements on the left become **1 unit farther away**, while the elements on the right become **1 unit closer**.

Since there are more elements on the right, the total cost decreases.

As we continue moving toward the middle, the cost keeps decreasing until we reach the median.

Once we move past the median, there are more elements on the left, so the cost starts increasing.

Therefore:

```text
             Median
               ↓
[1, 2, 3, 10, 11]
         ↓
    minimum cost
```

---

## 3. Pattern Recognition

Look for these clues:

### Strong signals

* Make all elements equal
* Choose a common target value
* Increment/decrement by `1`
* Cost depends on **distance**
* Minimize total number of moves
* Minimize `Σ |a[i] - x|`

When you see these together:

```text
Absolute Difference
        ↓
Minimize total distance
        ↓
Median
```

---

## 4. Why NOT Mean?

This is an important distinction.

### Absolute difference

```text
Σ |a[i] - x|
```

→ **Median**

### Squared difference

```text
Σ (a[i] - x)²
```

→ **Mean**

So remember:

```text
Absolute distance → Median
Squared distance  → Mean
```

---

## 5. How to Solve

### Step 1: Sort

```text
nums.sort()
```

### Step 2: Find the median

For `n` elements:

```text
median = nums[Math.floor(n / 2)]
```

For even-sized arrays, either middle value gives a minimum.

### Step 3: Calculate total distance

```text
answer += Math.abs(nums[i] - median)
```

### Complexity

```text
Sorting       → O(n log n)
Calculate     → O(n)

Overall       → O(n log n)
```

---

## 6. Mathematical Intuition

Suppose the sorted array is:

```text
[a₁, a₂, a₃, a₄, a₅]
```

If the target moves from `x` to `x + 1`:

* Every element **less than or equal to x** becomes 1 move farther.
* Every element **greater than x** becomes 1 move closer.

So:

```text
More elements on left  → move target right increases cost
More elements on right → move target right decreases cost
```

The balance point is the **median**.

That's why the median minimizes the total absolute distance.

---

## 7. Important Extension: Weighted Median

Sometimes every element has a different cost:

```text
Cost = Σ |a[i] - x| × weight[i]
```

Now ordinary median is not enough.

The pattern becomes:

```text
Σ |a[i] - x|
        ↓
     Median

Σ weight[i] × |a[i] - x|
        ↓
   Weighted Median
```

Think of the weight as saying:

> "This element is more expensive to move."

So the optimal target shifts toward the elements with larger weights.

---

## 8. 1D → 2D Extension

If the problem uses **Manhattan distance**:

```text
distance =
|x₁ - x₂| + |y₁ - y₂|
```

we can solve each dimension independently.

```text
X coordinates → median
Y coordinates → median
```

So:

```text
Manhattan Distance
        ↓
Separate X and Y
        ↓
Median of X
Median of Y
```

---

## 9. Pattern Summary

### Basic Pattern

```text
Make values equal
        ↓
Cost = absolute difference
        ↓
Minimize Σ|a[i] - x|
        ↓
Choose Median
```

### Variations

```text
Σ |a[i] - x|              → Median

Σ w[i]|a[i] - x|          → Weighted Median

Σ (a[i] - x)²             → Mean

Manhattan distance        → Median independently
                              for each dimension
```

---

## 10. Interview Trigger

When you read:

> "Find a value such that the total distance from all elements is minimum."

Immediately ask:

**"Is the distance an absolute difference?"**

If yes:

**Think MEDIAN.**
