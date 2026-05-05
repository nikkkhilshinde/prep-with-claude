# DSA Prep with Claude

A pattern-based DSA interview prep app built for FAANG and top-tier interviews.  
No framework, no server — just open `index.html` in a browser.

## What's inside

- **23 pattern cards** across 5 phases covering every major interview topic
- **156 problems** with LeetCode, NeetCode, and YouTube links
- **Todo → Attempted → Solved** tracking per problem
- **Self-check boxes** — all must pass for a pattern to be marked complete
- **Notes** per pattern — auto-saved as you type
- **Full state persistence** via localStorage — close and reopen, picks up exactly where you left off

## How to use

```bash
git clone git@github.com:nikkkhilshinde/prep-with-claude.git
cd prep-with-claude
open index.html   # macOS
# or just double-click index.html on Windows/Linux
```

No npm install. No build step. No dependencies.

## Curriculum

| Phase | Weeks | Patterns |
|-------|-------|----------|
| 1 — Array Patterns | 1–3 | Two Pointers, Sliding Window, Prefix Sum, Hashing, Sorting + Greedy |
| 2 — Core Data Structures | 4–6 | Binary Search, Stack, Linked List, Queue + Deque, Heap |
| 3 — Recursion + Trees | 7–9 | Backtracking, Binary Tree, BST, Tree DP, Trie |
| 4 — Graphs | 10–11 | Graph BFS/DFS, Topological Sort, Union Find, Dijkstra |
| 5 — Dynamic Programming | 12 | 1D DP, 2D DP, Interval DP, Knapsack |

## Each pattern card includes

- **Core idea** — the mental model, not just the mechanics
- **Visual walkthrough** — ASCII diagrams tracing through an example step by step
- **Java templates** — ready-to-adapt code for each variant
- **Recognition signals** — "when you see X, think Y"
- **Common mistakes** — the bugs that trip people up most
- **Complexity analysis** — time and space for each variant
- **Problems** — 3 tiers (Warm-up / Core / Stretch) with hints and links

## Weekly rhythm

| Day | Task |
|-----|------|
| Mon | Read the pattern card, understand the template |
| Tue | Warm-up problem |
| Wed | Core problem #1 (45 min cap) |
| Thu | Core problem #2 |
| Fri | Stretch problem — timer on, simulate an interview |
| Sat | Re-solve one problem from scratch without notes |
| Sun | Review week, tick off self-check boxes |

## Stack

Plain HTML + CSS + JavaScript. State stored in `localStorage`.  
No build tools, no dependencies, no accounts required.
