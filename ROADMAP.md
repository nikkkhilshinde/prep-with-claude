# DSA Interview Prep Roadmap
**Goal:** FAANG / Top-tier interviews  
**Timeline:** 12 weeks  
**Language:** Java  
**Approach:** Pattern-first, not problem-first

---

## How to use this roadmap

1. Read the pattern card before touching any problem
2. Understand the *template* — not just the code, the *thinking process*
3. Do problems in order: Warm-up → Core → Stretch
4. After each problem, write one sentence: "This was [pattern] because..."
5. If you're stuck for more than 30 min on Warm-up → read the hint. More than 45 min on Core → read a solution, understand it, then re-solve from scratch the next day.

---

## Phase 1 — Weeks 1–3: Array Patterns (High ROI)

These patterns alone cover ~35% of FAANG interview questions.

| Week | Pattern | Card | Why this order |
|------|---------|------|----------------|
| 1 | Two Pointers | `patterns/01_two_pointers.md` | Simplest pattern, teaches the "shrink search space" mindset |
| 1 | Sliding Window | `patterns/02_sliding_window.md` | Natural extension of two pointers |
| 2 | Prefix Sum | `patterns/03_prefix_sum.md` | Unlocks range query problems |
| 2 | Hashing / Frequency Map | `patterns/04_hashing.md` | Used as a helper in 60% of problems |
| 3 | Sorting + Greedy on Arrays | `patterns/05_sorting_greedy.md` | Many "optimize" problems reduce to sort + sweep |

---

## Phase 2 — Weeks 4–6: Core Data Structures

| Week | Pattern | Card | Why this order |
|------|---------|------|----------------|
| 4 | Binary Search | `patterns/06_binary_search.md` | Not just sorted arrays — "search on answer" is a major pattern |
| 4 | Stack | `patterns/07_stack.md` | Monotonic stack is extremely high frequency |
| 5 | Linked List | `patterns/08_linked_list.md` | Pointer manipulation, fast/slow pointers |
| 5 | Queue + Monotonic Deque | `patterns/09_queue_deque.md` | Sliding window max/min problems |
| 6 | Heap / Priority Queue | `patterns/10_heap.md` | Top-K problems, streaming data |

---

## Phase 3 — Weeks 7–9: Recursion + Trees

| Week | Pattern | Card | Why this order |
|------|---------|------|----------------|
| 7 | Recursion + Backtracking | `patterns/11_recursion_backtracking.md` | Foundation for trees, graphs, DP |
| 7 | Binary Tree Traversals | `patterns/12_binary_tree.md` | DFS/BFS on trees — most asked structure |
| 8 | Binary Search Tree | `patterns/13_bst.md` | Ordered property unlocks elegant solutions |
| 8 | Tree DP / Path problems | `patterns/14_tree_dp.md` | Diameter, max path sum type problems |
| 9 | Trie | `patterns/15_trie.md` | String search, prefix matching |

---

## Phase 4 — Weeks 10–11: Graphs

| Week | Pattern | Card | Why this order |
|------|---------|------|----------------|
| 10 | Graph BFS / DFS | `patterns/16_graph_bfs_dfs.md` | Foundation — everything else builds on this |
| 10 | Topological Sort | `patterns/17_topological_sort.md` | Dependency ordering, course schedule type |
| 11 | Union Find (DSU) | `patterns/18_union_find.md` | Connected components, cycle detection |
| 11 | Shortest Path (Dijkstra) | `patterns/19_shortest_path.md` | Weighted graphs, useful to know |

---

## Phase 5 — Week 12: Dynamic Programming

DP is last because it requires you to *see* recursion clearly first.

| Week | Pattern | Card | Why this order |
|------|---------|------|----------------|
| 12 | 1D DP (Linear) | `patterns/20_dp_1d.md` | Fibonacci, climb stairs, house robber |
| 12 | 2D DP (Grid/String) | `patterns/21_dp_2d.md` | Longest common subsequence, edit distance |
| 12 | DP on Intervals | `patterns/22_dp_intervals.md` | Burst balloons, matrix chain type |
| 12 | Knapsack variants | `patterns/23_dp_knapsack.md` | 0/1 knapsack, coin change, partition |

---

## Weekly Rhythm

```
Monday    — Read pattern card. Understand template fully.
Tuesday   — Warm-up problem (should feel easy by end of day)
Wednesday — Core problem (45 min hard cap, then study solution)
Thursday  — Core problem #2
Friday    — Stretch problem (simulate real interview: timer on, think aloud)
Weekend   — Review: re-solve one problem from scratch without looking at old code
```

---

## Pattern Recognition Cheat Sheet

When you see this in a problem → think this pattern:

| Signal | Pattern |
|--------|---------|
| "sorted array", "find pair that sums to" | Two Pointers |
| "subarray", "substring", "window of size k" | Sliding Window |
| "range sum", "sum between indices" | Prefix Sum |
| "count occurrences", "find duplicate", "group anagrams" | HashMap |
| "find in sorted", "minimum/maximum that satisfies condition" | Binary Search |
| "next greater element", "valid parentheses" | Stack |
| "top K", "kth largest/smallest" | Heap |
| "all combinations", "all permutations", "generate all" | Backtracking |
| "left/right child", "level order", "path sum" | Tree DFS/BFS |
| "course schedule", "build order", "prerequisites" | Topological Sort |
| "connected components", "union of sets" | Union Find |
| "minimum cost path", "number of ways", "optimal substructure" | DP |

---

## Problem Difficulty Guide

- **Warm-up**: LeetCode Easy or straightforward Medium. Pattern is obvious.
- **Core**: LeetCode Medium. Pattern applies but requires thought on *how*.
- **Stretch**: LeetCode Hard or a tricky Medium that combines two patterns.

---

*Cards are in the `patterns/` directory. Start with `01_two_pointers.md`.*
