const PHASES = [
  {
    id: 'phase1',
    title: 'Array Patterns',
    weeks: 'Weeks 1–3',
    patterns: ['two_pointers','sliding_window','prefix_sum','hashing','sorting_greedy']
  },
  {
    id: 'phase2',
    title: 'Core Data Structures',
    weeks: 'Weeks 4–6',
    patterns: ['binary_search','stack','linked_list','queue_deque','heap']
  },
  {
    id: 'phase3',
    title: 'Recursion + Trees',
    weeks: 'Weeks 7–9',
    patterns: ['recursion_backtracking','binary_tree','bst','tree_dp','trie']
  },
  {
    id: 'phase4',
    title: 'Graphs',
    weeks: 'Weeks 10–11',
    patterns: ['graph_bfs_dfs','topological_sort','union_find','shortest_path']
  },
  {
    id: 'phase5',
    title: 'Dynamic Programming',
    weeks: 'Week 12',
    patterns: ['dp_1d','dp_2d','dp_intervals','dp_knapsack']
  }
];

const PATTERNS = {
  two_pointers: {
    id: 'two_pointers',
    title: 'Two Pointers',
    phase: 'Phase 1 — Week 1',
    frequency: 'Extremely High',
    dependsOn: [],
    unlocks: ['Sliding Window', 'Linked List fast/slow pointer'],
    idea: `You maintain <strong>two index variables</strong> that move through the data — usually toward each other or in the same direction — to avoid a nested loop.\n\nThe naive approach to most two-pointer problems is O(n²): check every pair. Two pointers gets you to O(n) by using <em>a structural property of the data</em> (usually sortedness, or a logical invariant) to know which pointer to move at each step.\n\nThe key question you should always ask: <strong>"What does moving each pointer mean, and why is moving that one guaranteed to not skip the answer?"</strong>`,
    variants: [
      {
        label: 'Variant 1: Opposite Ends (most common)',
        visual: `arr = [1, 3, 5, 7, 9, 11]   target = 12
       <span class="hl2">L</span>                 <span class="hl">R</span>

Step 1: arr[L] + arr[R] = 1 + 11 = 12 ✓ Found it.

Another example, target = 10:
       <span class="hl2">L</span>                 <span class="hl">R</span>
       1  3  5  7  9  11      sum = 12 > 10 → too big → move R left

       <span class="hl2">L</span>              <span class="hl">R</span>
       1  3  5  7  9  11      sum = 10 = 10 ✓ Found it.

<span class="hl3">Why correct?</span> When sum > target, moving L right makes it bigger.
So we MUST move R left — safely eliminates possibilities.`,
        note: null
      },
      {
        label: 'Variant 2: Same Direction (read/write)',
        visual: `arr = [1, 1, 2, 3, 3, 4]
       <span class="hl">W</span>                    ← write pointer (slow): next valid slot
       <span class="hl2">R</span>                    ← read pointer (fast): scans for next unique

Step 1: arr[R]=1, arr[W]=1 → same, R moves on
Step 2: arr[R]=1, arr[W]=1 → same, R moves on
Step 3: arr[R]=2 ≠ arr[W]=1 → different! write at W+1, advance W

Result: [<span class="hl">1, 2, 3, 4</span>, _, _]   (first 4 elements valid)`,
        note: null
      },
      {
        label: 'Variant 3: Fast / Slow (cycle detection)',
        visual: `Linked list:  1 → 2 → 3 → 4 → 2 (cycle back)

slow moves 1 step, fast moves 2 steps.

Step 1: slow=1, fast=1
Step 2: slow=2, fast=3
Step 3: slow=3, fast=2  (fast lapped around the cycle)
Step 4: slow=4, fast=4  ← <span class="hl">they meet → cycle exists</span>

If no cycle: fast reaches null before they meet.`,
        note: null
      }
    ],
    templates: [
      {
        label: 'Opposite Ends',
        code: `<span class="kw">public void</span> <span class="fn">twoPointerOpposite</span>(<span class="ty">int</span>[] arr, <span class="ty">int</span> target) {
    <span class="ty">int</span> left  = <span class="nu">0</span>;
    <span class="ty">int</span> right = arr.length - <span class="nu">1</span>;

    <span class="kw">while</span> (left < right) {
        <span class="ty">int</span> current = arr[left] + arr[right]; <span class="cm">// compute(left, right)</span>

        <span class="kw">if</span> (current == target) {
            <span class="cm">// found — return or move both to find more answers</span>
            left++;
            right--;
        } <span class="kw">else if</span> (current < target) {
            left++;   <span class="cm">// need bigger → move left right</span>
        } <span class="kw">else</span> {
            right--;  <span class="cm">// need smaller → move right left</span>
        }
    }
}`
      },
      {
        label: 'Same Direction (Read / Write)',
        code: `<span class="kw">public int</span> <span class="fn">removeElement</span>(<span class="ty">int</span>[] arr) {
    <span class="ty">int</span> write = <span class="nu">0</span>; <span class="cm">// slow: next valid position</span>

    <span class="kw">for</span> (<span class="ty">int</span> read = <span class="nu">0</span>; read < arr.length; read++) {
        <span class="kw">if</span> (<span class="fn">isValid</span>(arr[read])) { <span class="cm">// condition varies by problem</span>
            arr[write] = arr[read];
            write++;
        }
    }

    <span class="kw">return</span> write; <span class="cm">// new logical length</span>
}`
      },
      {
        label: 'Fast / Slow (Linked List)',
        code: `<span class="kw">public boolean</span> <span class="fn">hasCycle</span>(<span class="ty">ListNode</span> head) {
    <span class="ty">ListNode</span> slow = head;
    <span class="ty">ListNode</span> fast = head;

    <span class="kw">while</span> (fast != <span class="kw">null</span> && fast.next != <span class="kw">null</span>) {
        slow = slow.next;       <span class="cm">// 1 step</span>
        fast = fast.next.next;  <span class="cm">// 2 steps</span>

        <span class="kw">if</span> (slow == fast) <span class="kw">return true</span>;
    }

    <span class="kw">return false</span>;
}`
      }
    ],
    signals: [
      { cue: 'Sorted array + find a pair/triplet that meets a condition', pattern: 'Opposite-ends two pointers' },
      { cue: 'In-place removal or deduplication', pattern: 'Read/write same direction' },
      { cue: 'Linked list cycle, middle of list, kth from end', pattern: 'Fast/slow pointers' },
      { cue: 'Two arrays being merged or compared simultaneously', pattern: 'Two pointers on separate arrays' }
    ],
    mistakes: [
      {
        title: 'Forgetting duplicate handling',
        body: 'In 3Sum, after finding a valid triplet you must skip duplicates on all three levels (outer loop, left, right). Use: <code>while (left &lt; right &amp;&amp; nums[left] == nums[left+1]) left++;</code>'
      },
      {
        title: 'Wrong loop condition',
        body: 'Use <code>left &lt; right</code>, not <code>left &lt;= right</code>. When they meet you\'re pairing an element with itself — no valid pair.'
      },
      {
        title: 'Moving both pointers when only one should move',
        body: 'Move both only when you\'ve confirmed a valid answer and want to continue. Otherwise move exactly one pointer based on the invariant.'
      },
      {
        title: 'Applying to unsorted data without sorting first',
        body: '"Move left because sum is too small" only works on sorted data. Factor in O(n log n) sort cost when giving your complexity answer.'
      }
    ],
    complexity: [
      { variant: 'Opposite Ends', time: 'O(n)', space: 'O(1)' },
      { variant: 'Same Direction', time: 'O(n)', space: 'O(1)' },
      { variant: 'Fast / Slow', time: 'O(n)', space: 'O(1)' }
    ],
    problems: {
      warmup: [
        {
          id: 'lc167',
          lcUrl: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/',
          nc: 'https://neetcode.io/problems/two-integer-sum-ii',
          name: 'Two Sum II — Input Array Is Sorted',
          lc: 'LC 167',
          hint: 'Classic opposite-ends. Array is already sorted. <strong>Ask yourself:</strong> when sum < target, which pointer gives you a bigger value?'
        },
        {
          id: 'lc26',
          lcUrl: 'https://leetcode.com/problems/remove-duplicates-from-sorted-array/',
          name: 'Remove Duplicates from Sorted Array',
          lc: 'LC 26',
          hint: 'Classic read/write. <strong>Ask yourself:</strong> when does the read pointer find something the write pointer should care about?'
        },
        {
          id: 'lc344',
          lcUrl: 'https://leetcode.com/problems/reverse-string/',
          name: 'Reverse String',
          lc: 'LC 344',
          hint: 'Swap from both ends inward. Simplest opposite-ends problem — if stuck here, re-read the template.'
        }
      ],
      core: [
        {
          id: 'lc15',
          lcUrl: 'https://leetcode.com/problems/3sum/',
          nc: 'https://neetcode.io/problems/three-integer-sum',
          yt: 'https://www.youtube.com/watch?v=jzZsG8n2R9A',
          name: '3Sum',
          lc: 'LC 15',
          hint: 'Fix one element with a for-loop, run opposite-ends on the rest. Hard part: <strong>three levels of duplicate skipping</strong> — outer loop, left pointer, right pointer. Sort first.'
        },
        {
          id: 'lc11',
          lcUrl: 'https://leetcode.com/problems/container-with-most-water/',
          nc: 'https://neetcode.io/problems/max-water-container',
          yt: 'https://www.youtube.com/watch?v=UuiTKBwPgAo',
          name: 'Container With Most Water',
          lc: 'LC 11',
          hint: 'Opposite-ends. Area = width × min(height[L], height[R]). <strong>Ask yourself:</strong> if you move the taller wall inward, can area ever increase?'
        },
        {
          id: 'lc75',
          lcUrl: 'https://leetcode.com/problems/sort-colors/',
          yt: 'https://www.youtube.com/watch?v=4xbWSRZHqac',
          name: 'Sort Colors (Dutch National Flag)',
          lc: 'LC 75',
          hint: 'Three-pointer variant. Maintain three regions: 0s | 1s | unknown | 2s. Draw the array state after each swap — the invariant becomes clear.'
        }
      ],
      stretch: [
        {
          id: 'lc42',
          lcUrl: 'https://leetcode.com/problems/trapping-rain-water/',
          nc: 'https://neetcode.io/problems/trapping-rain-water',
          yt: 'https://www.youtube.com/watch?v=ZI2z5pq0TqA',
          name: 'Trapping Rain Water',
          lc: 'LC 42',
          hint: 'Opposite-ends. Water at position i = min(maxLeft, maxRight) − height[i]. <strong>Key insight:</strong> move the pointer on the side with the smaller max — that side is the bottleneck.'
        },
        {
          id: 'lc16',
          lcUrl: 'https://leetcode.com/problems/3sum-closest/',
          name: '3Sum Closest',
          lc: 'LC 16',
          hint: 'Same structure as 3Sum. Instead of exact match, track the closest sum seen so far. Same movement logic, different termination.'
        }
      ]
    },
    selfCheck: [
      'Why does the opposite-ends approach never miss the correct pair?',
      'In 3Sum, why do we sort first even though it costs O(n log n)?',
      'What invariant does the write pointer maintain in remove-duplicates?',
      'In Trapping Rain Water, why does moving the smaller-max pointer guarantee correctness?',
      'What is the time and space complexity of each variant?'
    ]
  },

  // ── Phase 1 ──────────────────────────────────────────────────────────────

  sliding_window: {
    id: 'sliding_window',
    title: 'Sliding Window',
    phase: 'Phase 1 — Week 1',
    frequency: 'Extremely High',
    dependsOn: ['Two Pointers'],
    unlocks: ['Monotonic Deque'],
    idea: `A <strong>sliding window</strong> is a subarray (or substring) of fixed or variable size that you move across the data without restarting from scratch each time. Instead of recomputing the window from zero on every step, you <em>add one element on the right and remove one on the left</em> — O(1) update instead of O(k) recomputation.\n\nThere are two variants:\n<strong>Fixed-size window</strong> — window size k is given. Slide it across, maintaining a running aggregate (sum, count, max).\n<strong>Variable-size window</strong> — find the smallest or largest window satisfying a condition. Expand right freely, shrink from left when the condition is violated.`,
    variants: [
      {
        label: 'Variant 1: Fixed Size Window',
        visual: `Problem: max sum of any subarray of size k=3
arr = [2, 1, 5, 1, 3, 2]

Initial window:
[<span class="hl2">2  1  5</span>  1  3  2]   sum = 8

Slide right (add arr[3]=1, remove arr[0]=2):
[2  <span class="hl2">1  5  1</span>  3  2]   sum = 8-2+1 = 7

Slide right (add arr[4]=3, remove arr[1]=1):
[2  1  <span class="hl2">5  1  3</span>  2]   sum = 7-1+3 = 9  ← new max

Slide right (add arr[5]=2, remove arr[2]=5):
[2  1  5  <span class="hl2">1  3  2</span>]   sum = 9-5+2 = 6

<span class="hl">Answer: 9</span>  —  never recomputed from scratch.`,
        note: null
      },
      {
        label: 'Variant 2: Variable Size Window (expand/shrink)',
        visual: `Problem: smallest subarray with sum ≥ target=7
arr = [2, 3, 1, 2, 4, 3]

Expand R until sum ≥ 7, then shrink L:

<span class="hl2">L</span>=0 <span class="hl">R</span>=0: [2]           sum=2  < 7, expand R
<span class="hl2">L</span>=0 <span class="hl">R</span>=1: [2,3]         sum=5  < 7, expand R
<span class="hl2">L</span>=0 <span class="hl">R</span>=2: [2,3,1]       sum=6  < 7, expand R
<span class="hl2">L</span>=0 <span class="hl">R</span>=3: [2,3,1,2]     sum=8  ≥ 7 ✓ len=4, shrink L
<span class="hl2">L</span>=1 <span class="hl">R</span>=3: [3,1,2]       sum=6  < 7, expand R
<span class="hl2">L</span>=1 <span class="hl">R</span>=4: [3,1,2,4]     sum=10 ≥ 7 ✓ len=4, shrink L
<span class="hl2">L</span>=2 <span class="hl">R</span>=4: [1,2,4]       sum=7  ≥ 7 ✓ <span class="hl">len=3</span>, shrink L
<span class="hl2">L</span>=3 <span class="hl">R</span>=4: [2,4]         sum=6  < 7, expand R
<span class="hl2">L</span>=3 <span class="hl">R</span>=5: [2,4,3]       sum=9  ≥ 7 ✓ len=3, shrink L
<span class="hl2">L</span>=4 <span class="hl">R</span>=5: [4,3]         sum=7  ≥ 7 ✓ <span class="hl">len=2</span>, shrink L
<span class="hl2">L</span>=5 <span class="hl">R</span>=5: [3]           sum=3  < 7, R done.

Answer: <span class="hl">2</span>`,
        note: null
      }
    ],
    templates: [
      {
        label: 'Fixed Size Window',
        code: `<span class="kw">public int</span> <span class="fn">fixedWindow</span>(<span class="ty">int</span>[] arr, <span class="ty">int</span> k) {
    <span class="ty">int</span> windowSum = <span class="nu">0</span>;
    <span class="ty">int</span> maxSum    = <span class="ty">Integer</span>.MIN_VALUE;

    <span class="kw">for</span> (<span class="ty">int</span> i = <span class="nu">0</span>; i < arr.length; i++) {
        windowSum += arr[i];                         <span class="cm">// expand right</span>

        <span class="kw">if</span> (i >= k - <span class="nu">1</span>) {                           <span class="cm">// window is full</span>
            maxSum = <span class="ty">Math</span>.max(maxSum, windowSum);
            windowSum -= arr[i - (k - <span class="nu">1</span>)];          <span class="cm">// shrink left</span>
        }
    }

    <span class="kw">return</span> maxSum;
}`
      },
      {
        label: 'Variable Size Window',
        code: `<span class="kw">public int</span> <span class="fn">variableWindow</span>(<span class="ty">int</span>[] arr, <span class="ty">int</span> target) {
    <span class="ty">int</span> left   = <span class="nu">0</span>;
    <span class="ty">int</span> sum    = <span class="nu">0</span>;
    <span class="ty">int</span> result = <span class="ty">Integer</span>.MAX_VALUE;

    <span class="kw">for</span> (<span class="ty">int</span> right = <span class="nu">0</span>; right < arr.length; right++) {
        sum += arr[right];                           <span class="cm">// expand right</span>

        <span class="kw">while</span> (sum >= target) {                      <span class="cm">// condition met → shrink</span>
            result = <span class="ty">Math</span>.min(result, right - left + <span class="nu">1</span>);
            sum -= arr[left];
            left++;
        }
    }

    <span class="kw">return</span> result == <span class="ty">Integer</span>.MAX_VALUE ? <span class="nu">0</span> : result;
}`
      },
      {
        label: 'Variable Window with HashMap (distinct characters)',
        code: `<span class="kw">public int</span> <span class="fn">longestSubstringKDistinct</span>(<span class="ty">String</span> s, <span class="ty">int</span> k) {
    <span class="ty">Map</span><<span class="ty">Character</span>, <span class="ty">Integer</span>> freq = <span class="kw">new</span> <span class="ty">HashMap</span><>();
    <span class="ty">int</span> left = <span class="nu">0</span>, result = <span class="nu">0</span>;

    <span class="kw">for</span> (<span class="ty">int</span> right = <span class="nu">0</span>; right < s.length(); right++) {
        freq.merge(s.charAt(right), <span class="nu">1</span>, <span class="ty">Integer</span>::sum);  <span class="cm">// expand</span>

        <span class="kw">while</span> (freq.size() > k) {                        <span class="cm">// violated → shrink</span>
            <span class="ty">char</span> lc = s.charAt(left++);
            freq.merge(lc, -<span class="nu">1</span>, <span class="ty">Integer</span>::sum);
            <span class="kw">if</span> (freq.get(lc) == <span class="nu">0</span>) freq.remove(lc);
        }

        result = <span class="ty">Math</span>.max(result, right - left + <span class="nu">1</span>);
    }

    <span class="kw">return</span> result;
}`
      }
    ],
    signals: [
      { cue: '"subarray" or "substring" + size k given', pattern: 'Fixed window' },
      { cue: '"longest/shortest subarray" satisfying a condition', pattern: 'Variable window' },
      { cue: '"at most k distinct", "no repeating characters"', pattern: 'Variable window + HashMap' },
      { cue: 'Contiguous elements only (not subsequence)', pattern: 'Sliding window (not DP)' }
    ],
    mistakes: [
      {
        title: 'Using an inner for-loop instead of while to shrink',
        body: 'Shrinking must be a <code>while</code> loop, not <code>if</code>. The condition may still be violated after one shrink — keep shrinking until it\'s satisfied.'
      },
      {
        title: 'Off-by-one on fixed window removal',
        body: 'When window is full at index i, the element leaving is <code>arr[i - (k-1)]</code>, not <code>arr[i - k]</code>. Draw it out if unsure.'
      },
      {
        title: 'Forgetting to remove zero-count keys from HashMap',
        body: 'If you use a map to track frequencies, remove the key when its count hits 0. Otherwise <code>map.size()</code> gives the wrong distinct count.'
      },
      {
        title: 'Applying sliding window to non-contiguous problems',
        body: 'Sliding window only works when elements are contiguous. If the problem asks for subsequences (not subarrays), you likely need DP instead.'
      }
    ],
    complexity: [
      { variant: 'Fixed window', time: 'O(n)', space: 'O(1)' },
      { variant: 'Variable window', time: 'O(n) — each element enters and leaves at most once', space: 'O(1) or O(k) with map' }
    ],
    problems: {
      warmup: [
        {
          id: 'sw_lc643',
          lcUrl: 'https://leetcode.com/problems/maximum-average-subarray-i/',
          name: 'Maximum Average Subarray I',
          lc: 'LC 643',
          hint: 'Fixed window of size k. Maintain a running sum, update max at each full window. <strong>Ask:</strong> what element leaves when the window slides?'
        },
        {
          id: 'sw_lc1343',
          lcUrl: 'https://leetcode.com/problems/number-of-sub-arrays-of-size-k-and-average-greater-than-or-equal-to-threshold/',
          name: 'Number of Sub-arrays of Size K and Average ≥ Threshold',
          lc: 'LC 1343',
          hint: 'Fixed window. Count windows whose average meets the threshold. Same structure as 643.'
        }
      ],
      core: [
        {
          id: 'sw_lc3',
          lcUrl: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
          nc: 'https://neetcode.io/problems/longest-substring-without-duplicates',
          yt: 'https://www.youtube.com/watch?v=wiGpQwVHdE0',
          name: 'Longest Substring Without Repeating Characters',
          lc: 'LC 3',
          hint: 'Variable window. Use a HashSet to track characters in the window. <strong>When to shrink:</strong> when you\'re about to add a character already in the window.'
        },
        {
          id: 'sw_lc209',
          lcUrl: 'https://leetcode.com/problems/minimum-size-subarray-sum/',
          nc: 'https://neetcode.io/problems/minimum-size-subarray-sum',
          name: 'Minimum Size Subarray Sum',
          lc: 'LC 209',
          hint: 'Variable window, minimize length. Expand until sum ≥ target, then shrink and record length. <strong>Key:</strong> shrink with a while loop, not if.'
        },
        {
          id: 'sw_lc567',
          lcUrl: 'https://leetcode.com/problems/permutation-in-string/',
          nc: 'https://neetcode.io/problems/permutation-string',
          yt: 'https://www.youtube.com/watch?v=UbyhOgBN834',
          name: 'Permutation in String',
          lc: 'LC 567',
          hint: 'Fixed window of size s1.length(). Use a frequency array for s1. At each window position, check if window frequencies match. <strong>Optimization:</strong> track a "matches" counter instead of comparing arrays every time.'
        }
      ],
      stretch: [
        {
          id: 'sw_lc76',
          lcUrl: 'https://leetcode.com/problems/minimum-window-substring/',
          nc: 'https://neetcode.io/problems/minimum-window-with-characters',
          yt: 'https://www.youtube.com/watch?v=jSto0O4AJbM',
          name: 'Minimum Window Substring',
          lc: 'LC 76',
          hint: 'Variable window with two frequency maps. Expand until all required characters are covered, then shrink to minimize. <strong>Key:</strong> a "formed" counter tracks how many distinct chars are satisfied — avoids comparing maps on every step.'
        },
        {
          id: 'sw_lc424',
          lcUrl: 'https://leetcode.com/problems/longest-repeating-character-replacement/',
          nc: 'https://neetcode.io/problems/longest-repeating-substring-with-replacement',
          yt: 'https://www.youtube.com/watch?v=gqXU1UyA8pk',
          name: 'Longest Repeating Character Replacement',
          lc: 'LC 424',
          hint: 'Variable window. The window is valid when <code>(windowSize - maxFreq) ≤ k</code>. The trick: maxFreq never needs to decrease — only expand the window when you find a higher maxFreq.'
        }
      ]
    },
    selfCheck: [
      'What is the difference between fixed and variable window? When do you use each?',
      'Why is the variable window O(n) even though there\'s a while loop inside the for loop?',
      'In the HashMap variant, why must you remove keys with zero count?',
      'In LC 424 (Character Replacement), why does maxFreq never need to decrease?',
      'Could you solve LC 3 without a window? What would the complexity be?'
    ]
  },

  prefix_sum: {
    id: 'prefix_sum',
    title: 'Prefix Sum',
    phase: 'Phase 1 — Week 2',
    frequency: 'High',
    dependsOn: [],
    unlocks: ['2D DP', 'Range queries'],
    idea: `A <strong>prefix sum array</strong> stores the cumulative sum up to each index. Once built, <em>any range sum [i, j] is a single O(1) subtraction</em> instead of a loop.\n\nprefix[j] - prefix[i-1] = sum of arr[i..j]\n\nThe deeper use: when combined with a HashMap, prefix sums can answer "how many subarrays have sum exactly k" in O(n) — a pattern that looks impossible at first glance.`,
    variants: [
      {
        label: 'Basic: Range Sum Query',
        visual: `arr    = [3,  1,  4,  1,  5,  9,  2]
index  =  0   1   2   3   4   5   6

Build prefix (prefix[0] = 0 as sentinel):
prefix = [0,  3,  4,  8,  9, 14, 23, 25]

Query: sum of arr[2..5] (inclusive)?
  = prefix[6] - prefix[2]
  = 23 - 4
  = <span class="hl">19</span>   (4+1+5+9 = 19 ✓)

<span class="hl3">No loop needed after O(n) build.</span>`,
        note: null
      },
      {
        label: 'Advanced: Subarray Sum Equals K (HashMap)',
        visual: `Problem: count subarrays with sum = k

Key insight: if prefix[j] - prefix[i] = k,
then there's a subarray [i+1..j] with sum k.
Equivalently: prefix[j] - k = prefix[i].

arr = [1, 2, 3],  k = 3

prefix sums seen so far (with count):
{ 0:1 }  ← always seed with 0

i=0: prefix=1, look for 1-3=-2 → not in map. Add {1:1}
i=1: prefix=3, look for 3-3= 0 → <span class="hl">found! count+=1</span>. Add {3:1}
i=2: prefix=6, look for 6-3= 3 → <span class="hl">found! count+=1</span>. Add {6:1}

Answer: <span class="hl">2</span>  (subarrays [1,2] and [3])`,
        note: null
      }
    ],
    templates: [
      {
        label: 'Build Prefix Array + Range Query',
        code: `<span class="cm">// Build</span>
<span class="ty">int</span>[] prefix = <span class="kw">new</span> <span class="ty">int</span>[arr.length + <span class="nu">1</span>]; <span class="cm">// prefix[0] = 0 sentinel</span>
<span class="kw">for</span> (<span class="ty">int</span> i = <span class="nu">0</span>; i < arr.length; i++) {
    prefix[i + <span class="nu">1</span>] = prefix[i] + arr[i];
}

<span class="cm">// Query: sum of arr[l..r] (0-indexed, inclusive)</span>
<span class="kw">int</span> <span class="fn">rangeSum</span>(<span class="ty">int</span> l, <span class="ty">int</span> r) {
    <span class="kw">return</span> prefix[r + <span class="nu">1</span>] - prefix[l];
}`
      },
      {
        label: 'Subarray Sum Equals K (HashMap pattern)',
        code: `<span class="kw">public int</span> <span class="fn">subarraySum</span>(<span class="ty">int</span>[] arr, <span class="ty">int</span> k) {
    <span class="ty">Map</span><<span class="ty">Integer</span>, <span class="ty">Integer</span>> prefixCount = <span class="kw">new</span> <span class="ty">HashMap</span>();
    prefixCount.put(<span class="nu">0</span>, <span class="nu">1</span>);  <span class="cm">// empty prefix has sum 0</span>

    <span class="ty">int</span> sum = <span class="nu">0</span>, count = <span class="nu">0</span>;

    <span class="kw">for</span> (<span class="ty">int</span> num : arr) {
        sum += num;
        count += prefixCount.getOrDefault(sum - k, <span class="nu">0</span>); <span class="cm">// how many prefixes = sum-k?</span>
        prefixCount.merge(sum, <span class="nu">1</span>, <span class="ty">Integer</span>::sum);
    }

    <span class="kw">return</span> count;
}`
      }
    ],
    signals: [
      { cue: '"range sum query" or "sum between indices i and j"', pattern: 'Build prefix array, O(1) queries' },
      { cue: '"count subarrays with sum equal to k"', pattern: 'Prefix sum + HashMap' },
      { cue: '"subarray with sum divisible by k"', pattern: 'Prefix sum mod k + HashMap' },
      { cue: 'Multiple range queries on the same static array', pattern: 'Prefix array (amortize the cost)' }
    ],
    mistakes: [
      {
        title: 'Off-by-one in prefix array indexing',
        body: 'Always use a 1-indexed prefix array with a sentinel 0 at index 0. Range sum [l, r] is <code>prefix[r+1] - prefix[l]</code>. Mixing 0-indexed and 1-indexed prefix arrays is the most common bug.'
      },
      {
        title: 'Forgetting to seed the HashMap with {0: 1}',
        body: 'In the subarray sum pattern, you must put <code>(0, 1)</code> in the map before iterating. Without it, subarrays starting from index 0 are never counted.'
      },
      {
        title: 'Using prefix sum on non-static arrays',
        body: 'If the array is modified after building the prefix array, the prefix array is stale. Prefix sum is for static arrays — use a Segment Tree or Binary Indexed Tree for updates.'
      }
    ],
    complexity: [
      { variant: 'Build prefix array', time: 'O(n)', space: 'O(n)' },
      { variant: 'Range sum query', time: 'O(1) per query', space: 'O(1)' },
      { variant: 'Subarray sum = k (HashMap)', time: 'O(n)', space: 'O(n)' }
    ],
    problems: {
      warmup: [
        {
          id: 'ps_lc303',
          lcUrl: 'https://leetcode.com/problems/range-sum-query-immutable/',
          name: 'Range Sum Query — Immutable',
          lc: 'LC 303',
          hint: 'Pure prefix array problem. Build once in the constructor, answer each query in O(1). <strong>Watch:</strong> the indexing — use a length+1 array with prefix[0]=0.'
        },
        {
          id: 'ps_lc1480',
          lcUrl: 'https://leetcode.com/problems/running-sum-of-1d-array/',
          name: 'Running Sum of 1D Array',
          lc: 'LC 1480',
          hint: 'Build the prefix array in-place. Simplest possible problem — understand the build step here before moving on.'
        }
      ],
      core: [
        {
          id: 'ps_lc560',
          lcUrl: 'https://leetcode.com/problems/subarray-sum-equals-k/',
          nc: 'https://neetcode.io/problems/subarray-sum-equals-k',
          yt: 'https://www.youtube.com/watch?v=fFVZt-6sgyo',
          name: 'Subarray Sum Equals K',
          lc: 'LC 560',
          hint: 'The HashMap pattern. <strong>Key insight:</strong> if current prefix sum minus k exists in the map, there\'s a subarray ending here with sum k. Seed with {0:1} before the loop.'
        },
        {
          id: 'ps_lc525',
          lcUrl: 'https://leetcode.com/problems/contiguous-array/',
          yt: 'https://www.youtube.com/watch?v=agB1LyObUNE',
          name: 'Contiguous Array',
          lc: 'LC 525',
          hint: 'Replace 0s with -1s. Now the problem becomes: longest subarray with sum 0. That\'s a prefix sum + HashMap problem — store the first index where each prefix sum appears.'
        }
      ],
      stretch: [
        {
          id: 'ps_lc974',
          lcUrl: 'https://leetcode.com/problems/subarray-sums-divisible-by-k/',
          name: 'Subarray Sums Divisible by K',
          lc: 'LC 974',
          hint: 'Prefix sum mod k. Two indices i, j have the same prefix mod → their subarray sum is divisible by k. <strong>Edge case:</strong> Java\'s % can return negative — fix with <code>(sum % k + k) % k</code>.'
        },
        {
          id: 'ps_lc1124',
          lcUrl: 'https://leetcode.com/problems/longest-well-performing-interval/',
          name: 'Longest Well-Performing Interval',
          lc: 'LC 1124',
          hint: 'Convert hours > 8 to +1, else -1. Find the longest subarray with positive sum. Store first occurrence of each prefix sum in a map, then scan backwards.'
        }
      ]
    },
    selfCheck: [
      'Why do we use a length+1 prefix array with prefix[0]=0 instead of length prefix array?',
      'In the HashMap pattern, why must we seed with {0: 1} before iterating?',
      'Explain in one sentence why prefix[j] - prefix[i] gives the subarray sum from i to j-1.',
      'How would you modify the prefix sum approach to find subarrays with sum divisible by k?',
      'When does prefix sum NOT apply? What structure would you use instead for mutable arrays?'
    ]
  },

  hashing: {
    id: 'hashing',
    title: 'Hashing / Frequency Map',
    phase: 'Phase 1 — Week 2',
    frequency: 'Extremely High',
    dependsOn: [],
    unlocks: ['Sliding Window advanced', 'Graph adjacency'],
    idea: `A <strong>HashMap</strong> gives you O(1) insert, lookup, and delete. It's not a standalone pattern — it's a <em>tool you attach to other patterns</em> to eliminate an inner loop.\n\nThe core move: instead of scanning an array to check if something exists, store it in a map first. A scan that was O(n) becomes O(1).\n\nThe three most common uses in interviews:\n<strong>1. Frequency counting</strong> — count occurrences of each element.\n<strong>2. Complement lookup</strong> — store what you've seen, check if the complement exists (Two Sum).\n<strong>3. Grouping</strong> — group elements by a derived key (anagrams share a sorted key).`,
    variants: [
      {
        label: 'Frequency Count',
        visual: `Problem: find the first non-repeating character

s = "leetcode"

Pass 1 — build frequency map:
{ l:1, e:3, t:1, c:1, o:1, d:1 }

Pass 2 — scan in order, return first with freq=1:
l → freq=1 → <span class="hl">return 'l'</span>

O(n) instead of O(n²) nested check.`,
        note: null
      },
      {
        label: 'Complement Lookup (Two Sum)',
        visual: `arr = [2, 7, 11, 15],  target = 9

seen = {}

i=0: num=2, need 9-2=7 → not in seen. Store {2:0}
i=1: num=7, need 9-7=2 → <span class="hl">2 is in seen at index 0!</span>
     return [0, 1]

<span class="hl3">The map turns the inner loop (find complement) into O(1).</span>`,
        note: null
      },
      {
        label: 'Grouping by Derived Key',
        visual: `Problem: group anagrams

words = ["eat","tea","tan","ate","nat","bat"]

Key each word by its sorted characters:
"eat" → "aet"
"tea" → "aet"  ← same key as "eat"
"tan" → "ant"
"ate" → "aet"  ← same key
"nat" → "ant"  ← same key as "tan"
"bat" → "abt"

Map:
{ "aet": ["eat","tea","ate"],
  "ant": ["tan","nat"],
  "abt": ["bat"] }

<span class="hl">Return map values.</span>`,
        note: null
      }
    ],
    templates: [
      {
        label: 'Frequency Map',
        code: `<span class="ty">Map</span><<span class="ty">Integer</span>, <span class="ty">Integer</span>> freq = <span class="kw">new</span> <span class="ty">HashMap</span>();

<span class="kw">for</span> (<span class="ty">int</span> num : arr) {
    freq.merge(num, <span class="nu">1</span>, <span class="ty">Integer</span>::sum); <span class="cm">// cleaner than getOrDefault+put</span>
}

<span class="cm">// or with getOrDefault:</span>
freq.put(num, freq.getOrDefault(num, <span class="nu">0</span>) + <span class="nu">1</span>);`
      },
      {
        label: 'Complement Lookup (Two Sum)',
        code: `<span class="kw">public int</span>[] <span class="fn">twoSum</span>(<span class="ty">int</span>[] nums, <span class="ty">int</span> target) {
    <span class="ty">Map</span><<span class="ty">Integer</span>, <span class="ty">Integer</span>> seen = <span class="kw">new</span> <span class="ty">HashMap</span>();

    <span class="kw">for</span> (<span class="ty">int</span> i = <span class="nu">0</span>; i < nums.length; i++) {
        <span class="ty">int</span> complement = target - nums[i];

        <span class="kw">if</span> (seen.containsKey(complement)) {
            <span class="kw">return new int</span>[] { seen.get(complement), i };
        }

        seen.put(nums[i], i); <span class="cm">// store AFTER the check (avoid using same element twice)</span>
    }

    <span class="kw">return new int</span>[] {};
}`
      },
      {
        label: 'Grouping by Key',
        code: `<span class="ty">Map</span><<span class="ty">String</span>, <span class="ty">List</span><<span class="ty">String</span>>> groups = <span class="kw">new</span> <span class="ty">HashMap</span>();

<span class="kw">for</span> (<span class="ty">String</span> word : words) {
    <span class="ty">char</span>[] chars = word.toCharArray();
    <span class="ty">Arrays</span>.sort(chars);
    <span class="ty">String</span> key = <span class="kw">new</span> <span class="ty">String</span>(chars);        <span class="cm">// derived key</span>

    groups.computeIfAbsent(key, k -> <span class="kw">new</span> <span class="ty">ArrayList</span><>()).add(word);
}

<span class="kw">return new</span> <span class="ty">ArrayList</span><>(groups.values());`
      }
    ],
    signals: [
      { cue: '"find if element exists" + O(n²) naive approach', pattern: 'Replace inner loop with HashMap lookup' },
      { cue: '"count occurrences", "most frequent", "find duplicate"', pattern: 'Frequency map' },
      { cue: '"two numbers that sum to target"', pattern: 'Complement lookup map' },
      { cue: '"group by property", "anagrams", "same pattern"', pattern: 'Group by derived key' },
      { cue: '"first/last occurrence"', pattern: 'Map value = index' }
    ],
    mistakes: [
      {
        title: 'Storing value before checking complement in Two Sum',
        body: 'Always check if the complement exists <em>before</em> storing the current element. Otherwise you might pair an element with itself when <code>target = 2 * num</code>.'
      },
      {
        title: 'Using array instead of map for large value ranges',
        body: 'A frequency array works (and is faster) when values are bounded (e.g., lowercase letters → size 26). Use a HashMap when values are arbitrary integers — an array of size 10⁹ will OOM.'
      },
      {
        title: 'Forgetting HashMap equality for arrays as keys',
        body: 'Arrays don\'t work as HashMap keys in Java — <code>new int[]{1,2}</code> and <code>new int[]{1,2}</code> are different keys. Use <code>Arrays.toString(arr)</code> or sort and convert to String.'
      }
    ],
    complexity: [
      { variant: 'HashMap insert / lookup', time: 'O(1) average', space: 'O(n)' },
      { variant: 'Frequency count pass', time: 'O(n)', space: 'O(k) — k distinct values' },
      { variant: 'Group anagrams (sort key)', time: 'O(n · m log m) — m = word length', space: 'O(n)' }
    ],
    problems: {
      warmup: [
        {
          id: 'hm_lc1',
          lcUrl: 'https://leetcode.com/problems/two-sum/',
          nc: 'https://neetcode.io/problems/two-integer-sum',
          yt: 'https://www.youtube.com/watch?v=KLlXCFG5TnA',
          name: 'Two Sum',
          lc: 'LC 1',
          hint: 'Complement lookup. Store num→index as you go. <strong>Remember:</strong> check before storing so you don\'t use the same element twice.'
        },
        {
          id: 'hm_lc217',
          lcUrl: 'https://leetcode.com/problems/contains-duplicate/',
          nc: 'https://neetcode.io/problems/duplicate-integer',
          name: 'Contains Duplicate',
          lc: 'LC 217',
          hint: 'HashSet, not HashMap. Add each element — if it\'s already there, return true. One line of logic.'
        },
        {
          id: 'hm_lc242',
          lcUrl: 'https://leetcode.com/problems/valid-anagram/',
          nc: 'https://neetcode.io/problems/is-anagram',
          name: 'Valid Anagram',
          lc: 'LC 242',
          hint: 'Frequency array of size 26 (lowercase only). Increment for s, decrement for t. If all zeros → anagram.'
        }
      ],
      core: [
        {
          id: 'hm_lc49',
          lcUrl: 'https://leetcode.com/problems/group-anagrams/',
          nc: 'https://neetcode.io/problems/anagram-groups',
          yt: 'https://www.youtube.com/watch?v=vzdNOK2oB2E',
          name: 'Group Anagrams',
          lc: 'LC 49',
          hint: 'Group by sorted-character key. <strong>In Java:</strong> <code>Arrays.sort(chars)</code> then <code>new String(chars)</code> as the map key.'
        },
        {
          id: 'hm_lc347',
          lcUrl: 'https://leetcode.com/problems/top-k-frequent-elements/',
          nc: 'https://neetcode.io/problems/top-k-elements-in-list',
          yt: 'https://www.youtube.com/watch?v=YPTqKIgVk-k',
          name: 'Top K Frequent Elements',
          lc: 'LC 347',
          hint: 'Frequency map first, then either a min-heap of size k (O(n log k)) or bucket sort by frequency (O(n)). <strong>For interviews:</strong> know both approaches.'
        },
        {
          id: 'hm_lc128',
          lcUrl: 'https://leetcode.com/problems/longest-consecutive-sequence/',
          nc: 'https://neetcode.io/problems/longest-consecutive-sequence',
          yt: 'https://www.youtube.com/watch?v=P6RZZMu_maU',
          name: 'Longest Consecutive Sequence',
          lc: 'LC 128',
          hint: 'Put all numbers in a HashSet. For each number, only start counting if <code>num-1</code> is NOT in the set (it\'s the start of a sequence). Then count up. O(n) total.'
        }
      ],
      stretch: [
        {
          id: 'hm_lc380',
          lcUrl: 'https://leetcode.com/problems/insert-delete-getrandom-o1/',
          yt: 'https://www.youtube.com/watch?v=j4KwhBziOpg',
          name: 'Insert Delete GetRandom O(1)',
          lc: 'LC 380',
          hint: 'Combine a HashMap (value→index) with an ArrayList (for random access). The tricky part: delete in O(1) by swapping with the last element, then removing the last.'
        },
        {
          id: 'hm_lc454',
          lcUrl: 'https://leetcode.com/problems/4sum-ii/',
          name: '4Sum II',
          lc: 'LC 454',
          hint: 'Split into two pairs. Store all sums of nums1[i]+nums2[j] in a map. Then count how many nums3[k]+nums4[l] equal the negative of a map key. O(n²) not O(n⁴).'
        }
      ]
    },
    selfCheck: [
      'Why do you check for the complement BEFORE adding to the map in Two Sum?',
      'When would you use a frequency array (int[26]) instead of a HashMap?',
      'Why don\'t arrays work as HashMap keys in Java? What do you use instead?',
      'In Longest Consecutive Sequence, why do you only start counting from numbers where num-1 is absent?',
      'What is the time complexity of Group Anagrams and why?'
    ]
  },

  sorting_greedy: {
    id: 'sorting_greedy',
    title: 'Sorting + Greedy',
    phase: 'Phase 1 — Week 3',
    frequency: 'High',
    dependsOn: [],
    unlocks: ['Intervals (merge, overlap)', 'Heap'],
    idea: `<strong>Greedy</strong> means: at each step, make the locally optimal choice and never reconsider. It works when the problem has the <em>greedy choice property</em> — local optima lead to a global optimum.\n\n<strong>Sorting first</strong> is the most common setup for greedy problems. Once sorted, the "greedy choice" becomes obvious — you always process the smallest interval end, the earliest deadline, the shortest job, etc.\n\nThe key question: <em>"If I process elements in this order, does making the greedy choice at each step guarantee the best overall result?"</em> You usually prove it by contradiction — assume a swap leads to a better solution, then show it can't.`,
    variants: [
      {
        label: 'Interval Scheduling (sort by end time)',
        visual: `Problem: maximum number of non-overlapping intervals

intervals = [[1,3],[2,4],[3,5],[6,8]]

Sort by END time:
[[1,3],[2,4],[3,5],[6,8]]  (already sorted)

Greedy: always pick the interval that ends earliest.

Pick [1,3]. lastEnd = 3.
[2,4]: starts at 2 < lastEnd=3 → skip (overlaps)
[3,5]: starts at 3 = lastEnd=3 → <span class="hl">pick</span>. lastEnd = 5.
[6,8]: starts at 6 > lastEnd=5 → <span class="hl">pick</span>. lastEnd = 8.

Count = <span class="hl">3</span>

<span class="hl3">Why sort by end?</span> Picking the earliest-ending interval leaves
maximum room for future intervals. Any other choice is worse or equal.`,
        note: null
      },
      {
        label: 'Two-Array Greedy (sort both, match greedily)',
        visual: `Problem: assign tasks to workers — minimize time
tasks = [3,1,2],  workers = [4,2,3]

Sort both:
tasks   = [1, 2, 3]
workers = [2, 3, 4]

Match smallest task to smallest capable worker:
task=1 → worker=2 ✓  (2 ≥ 1)
task=2 → worker=3 ✓
task=3 → worker=4 ✓

All tasks assigned. Greedy: never "waste" a large
worker on a small task if a smaller worker can do it.`,
        note: null
      }
    ],
    templates: [
      {
        label: 'Interval Merge',
        code: `<span class="kw">public int</span>[][] <span class="fn">merge</span>(<span class="ty">int</span>[][] intervals) {
    <span class="ty">Arrays</span>.sort(intervals, (a, b) -> a[<span class="nu">0</span>] - b[<span class="nu">0</span>]); <span class="cm">// sort by start</span>

    <span class="ty">List</span><<span class="ty">int</span>[]> result = <span class="kw">new</span> <span class="ty">ArrayList</span><>();
    <span class="ty">int</span>[] current = intervals[<span class="nu">0</span>];

    <span class="kw">for</span> (<span class="ty">int</span> i = <span class="nu">1</span>; i < intervals.length; i++) {
        <span class="kw">if</span> (intervals[i][<span class="nu">0</span>] <= current[<span class="nu">1</span>]) {         <span class="cm">// overlaps</span>
            current[<span class="nu">1</span>] = <span class="ty">Math</span>.max(current[<span class="nu">1</span>], intervals[i][<span class="nu">1</span>]);
        } <span class="kw">else</span> {
            result.add(current);
            current = intervals[i];
        }
    }

    result.add(current);
    <span class="kw">return</span> result.toArray(<span class="kw">new int</span>[<span class="nu">0</span>][]);
}`
      },
      {
        label: 'Non-Overlapping Intervals (Greedy, sort by end)',
        code: `<span class="kw">public int</span> <span class="fn">eraseOverlapIntervals</span>(<span class="ty">int</span>[][] intervals) {
    <span class="ty">Arrays</span>.sort(intervals, (a, b) -> a[<span class="nu">1</span>] - b[<span class="nu">1</span>]); <span class="cm">// sort by END</span>

    <span class="ty">int</span> count   = <span class="nu">0</span>;
    <span class="ty">int</span> lastEnd = <span class="ty">Integer</span>.MIN_VALUE;

    <span class="kw">for</span> (<span class="ty">int</span>[] interval : intervals) {
        <span class="kw">if</span> (interval[<span class="nu">0</span>] >= lastEnd) {   <span class="cm">// no overlap → take it</span>
            count++;
            lastEnd = interval[<span class="nu">1</span>];
        }
        <span class="cm">// else: skip — removing this interval is the greedy choice</span>
    }

    <span class="kw">return</span> intervals.length - count; <span class="cm">// intervals to remove</span>
}`
      },
      {
        label: 'Greedy with Custom Comparator',
        code: `<span class="cm">// Sort by a derived property — example: sort strings to form largest number</span>
<span class="ty">String</span>[] strs = ...;
<span class="ty">Arrays</span>.sort(strs, (a, b) -> (b + a).compareTo(a + b)); <span class="cm">// compare concatenation order</span>`
      }
    ],
    signals: [
      { cue: '"intervals", "overlap", "merge", "schedule"', pattern: 'Sort by start or end, then greedy sweep' },
      { cue: '"minimum number of X to cover Y"', pattern: 'Greedy — sort and take as few as possible' },
      { cue: '"maximum number of non-overlapping"', pattern: 'Sort by end time, greedy pick' },
      { cue: '"assign / match two arrays optimally"', pattern: 'Sort both, match greedily' },
      { cue: 'Problem has "exchange argument" feel — swapping two adjacent choices does not improve', pattern: 'Greedy ordering' }
    ],
    mistakes: [
      {
        title: 'Sorting by start when you should sort by end',
        body: 'For interval scheduling (maximize non-overlapping), sort by END time. Sorting by start is correct for merge-intervals but wrong for scheduling. Think about which property you\'re optimizing.'
      },
      {
        title: 'Applying greedy to problems that need DP',
        body: 'Greedy fails when a local choice forecloses a globally better option. Classic trap: coin change with arbitrary denominations. Always ask "can a future element make my current greedy choice wrong?"'
      },
      {
        title: 'Integer overflow in comparator',
        body: '<code>(a, b) -> a - b</code> overflows when a is large positive and b is large negative. Use <code>Integer.compare(a, b)</code> or <code>a[0] - b[0]</code> only when values are bounded.'
      }
    ],
    complexity: [
      { variant: 'Sort + single pass', time: 'O(n log n)', space: 'O(1) or O(n) for result' },
      { variant: 'Greedy without sort', time: 'O(n)', space: 'O(1)' }
    ],
    problems: {
      warmup: [
        {
          id: 'sg_lc455',
          lcUrl: 'https://leetcode.com/problems/assign-cookies/',
          name: 'Assign Cookies',
          lc: 'LC 455',
          hint: 'Sort both arrays. Match smallest sufficient cookie to smallest child. Two-pointer walk through both sorted arrays.'
        },
        {
          id: 'sg_lc1710',
          lcUrl: 'https://leetcode.com/problems/maximum-units-on-a-truck/',
          name: 'Maximum Units on a Truck',
          lc: 'LC 1710',
          hint: 'Sort by units per box descending. Greedily take as many of the highest-unit boxes as the truck allows.'
        }
      ],
      core: [
        {
          id: 'sg_lc56',
          lcUrl: 'https://leetcode.com/problems/merge-intervals/',
          nc: 'https://neetcode.io/problems/merge-intervals',
          yt: 'https://www.youtube.com/watch?v=44H3cEC2fFM',
          name: 'Merge Intervals',
          lc: 'LC 56',
          hint: 'Sort by start. Walk through — if current interval overlaps with last in result, extend its end. <strong>Overlap condition:</strong> next.start ≤ current.end.'
        },
        {
          id: 'sg_lc435',
          lcUrl: 'https://leetcode.com/problems/non-overlapping-intervals/',
          nc: 'https://neetcode.io/problems/non-overlapping-intervals',
          name: 'Non-overlapping Intervals',
          lc: 'LC 435',
          hint: 'Sort by END. Greedily keep intervals — pick one if it doesn\'t overlap the last kept. Answer = total − kept. <strong>Why end?</strong> Earliest-ending interval leaves maximum room.'
        },
        {
          id: 'sg_lc134',
          lcUrl: 'https://leetcode.com/problems/gas-station/',
          yt: 'https://www.youtube.com/watch?v=lJwbPZGo05A',
          name: 'Gas Station',
          lc: 'LC 134',
          hint: 'Two key observations: (1) if total gas ≥ total cost, a solution exists. (2) Start from the point after the last place where running sum went negative. O(n), no sort needed.'
        }
      ],
      stretch: [
        {
          id: 'sg_lc45',
          lcUrl: 'https://leetcode.com/problems/jump-game-ii/',
          nc: 'https://neetcode.io/problems/jump-game-ii',
          name: 'Jump Game II',
          lc: 'LC 45',
          hint: 'Greedy BFS-style. Track the furthest you can reach in the current "level" and the furthest reachable at all. When you reach the end of current level, increment jumps. O(n).'
        },
        {
          id: 'sg_lc767',
          lcUrl: 'https://leetcode.com/problems/reorganize-string/',
          yt: 'https://www.youtube.com/watch?v=2g_b1aYTHeg',
          name: 'Reorganize String',
          lc: 'LC 767',
          hint: 'Greedy + frequency. Always place the most frequent remaining character that\'s different from the last. Use a max-heap. If most frequent has count > (n+1)/2 → impossible.'
        }
      ]
    },
    selfCheck: [
      'Why do we sort by end time (not start) for interval scheduling?',
      'How do you know when greedy is safe vs. when you need DP? What\'s the key question to ask?',
      'In Merge Intervals, what is the overlap condition and what do you do when overlap is detected?',
      'Why does the Gas Station greedy work — why is restarting after the last deficit point correct?',
      'What causes integer overflow in a comparator and how do you avoid it?'
    ]
  },

  // ── Phase 2 ──────────────────────────────────────────────────────────────

  binary_search: {
    id: 'binary_search',
    title: 'Binary Search',
    phase: 'Phase 2 — Week 4',
    frequency: 'Extremely High',
    dependsOn: [],
    unlocks: ['Search on answer', 'Rotated array problems'],
    idea: `Binary search eliminates <em>half the search space</em> with each comparison — O(log n) instead of O(n). Most people learn it only on sorted arrays, but the real interview power is <strong>search on answer</strong>: when you can't search the data directly, binary search over the range of possible answers instead.\n\nThe key insight: binary search works on any space where you can define a <em>monotonic predicate</em> — a condition that is false for all values on one side and true for all values on the other. Find the boundary.\n\n<strong>Three templates exist.</strong> Picking the wrong one causes off-by-one bugs. Understand when to use each.`,
    variants: [
      {
        label: 'Classic: Find exact target in sorted array',
        visual: `arr = [1, 3, 5, 7, 9, 11, 13],  target = 7

lo=0, hi=6
mid=3 → arr[3]=7 == target → <span class="hl">found at index 3</span>

Another: target = 6
lo=0, hi=6, mid=3 → arr[3]=7 > 6 → hi=mid-1=2
lo=0, hi=2, mid=1 → arr[1]=3 < 6 → lo=mid+1=2
lo=2, hi=2, mid=2 → arr[2]=5 < 6 → lo=mid+1=3
lo=3 > hi=2 → <span class="hl">not found</span>`,
        note: null
      },
      {
        label: 'Find leftmost position satisfying condition (lower bound)',
        visual: `arr = [1, 2, 2, 2, 3, 4],  target = 2
Find first index where arr[i] >= target.

lo=0, hi=5
mid=2 → arr[2]=2 >= 2 → condition true → hi=mid=2, record mid
lo=0, hi=2, mid=1 → arr[1]=2 >= 2 → true → hi=mid=1, record mid
lo=0, hi=1, mid=0 → arr[0]=1 >= 2 → false → lo=mid+1=1
lo=1 == hi=1 → <span class="hl">answer = 1</span>

<span class="hl3">Pattern: when condition is true, shrink hi. Answer is lo at the end.</span>`,
        note: null
      },
      {
        label: 'Search on Answer',
        visual: `Problem: Koko eats bananas. n piles, h hours. Find minimum eating speed.

Piles = [3, 6, 7, 11],  h = 8

The answer (speed) is in range [1, max(piles)=11].
Binary search over this range.

For a given speed k, canFinish() = sum(ceil(pile/k)) <= h

lo=1, hi=11, mid=6:
  ceil(3/6)+ceil(6/6)+ceil(7/6)+ceil(11/6) = 1+1+2+2 = 6 <= 8 → <span class="hl">possible, go lower</span>
  hi=6
lo=1, hi=6, mid=3:
  ceil(3/3)+ceil(6/3)+ceil(7/3)+ceil(11/3) = 1+2+3+4 = 10 > 8 → <span class="hl3">too slow</span>
  lo=4
lo=4, hi=6, mid=5:
  1+2+2+3 = 8 <= 8 → possible, hi=5
lo=4, hi=5, mid=4:
  1+2+2+3 = 8 <= 8 → possible, hi=4
lo=4 == hi=4 → <span class="hl">answer = 4</span>`,
        note: null
      }
    ],
    templates: [
      {
        label: 'Classic — find exact target',
        code: `<span class="kw">public int</span> <span class="fn">binarySearch</span>(<span class="ty">int</span>[] arr, <span class="ty">int</span> target) {
    <span class="ty">int</span> lo = <span class="nu">0</span>, hi = arr.length - <span class="nu">1</span>;

    <span class="kw">while</span> (lo <= hi) {
        <span class="ty">int</span> mid = lo + (hi - lo) / <span class="nu">2</span>; <span class="cm">// avoids overflow vs (lo+hi)/2</span>

        <span class="kw">if</span> (arr[mid] == target)      <span class="kw">return</span> mid;
        <span class="kw">else if</span> (arr[mid] < target)  lo = mid + <span class="nu">1</span>;
        <span class="kw">else</span>                         hi = mid - <span class="nu">1</span>;
    }

    <span class="kw">return</span> -<span class="nu">1</span>; <span class="cm">// not found</span>
}`
      },
      {
        label: 'Lower bound — leftmost index satisfying condition',
        code: `<span class="kw">public int</span> <span class="fn">lowerBound</span>(<span class="ty">int</span>[] arr, <span class="ty">int</span> target) {
    <span class="ty">int</span> lo = <span class="nu">0</span>, hi = arr.length; <span class="cm">// hi = length (one past end)</span>

    <span class="kw">while</span> (lo < hi) {             <span class="cm">// note: strict less-than</span>
        <span class="ty">int</span> mid = lo + (hi - lo) / <span class="nu">2</span>;

        <span class="kw">if</span> (arr[mid] < target) lo = mid + <span class="nu">1</span>;
        <span class="kw">else</span>                   hi = mid;      <span class="cm">// condition met — but go left</span>
    }

    <span class="kw">return</span> lo; <span class="cm">// first index where arr[i] >= target</span>
}`
      },
      {
        label: 'Search on Answer',
        code: `<span class="kw">public int</span> <span class="fn">searchOnAnswer</span>(...) {
    <span class="ty">int</span> lo = minPossibleAnswer;
    <span class="ty">int</span> hi = maxPossibleAnswer;

    <span class="kw">while</span> (lo < hi) {
        <span class="ty">int</span> mid = lo + (hi - lo) / <span class="nu">2</span>;

        <span class="kw">if</span> (<span class="fn">canAchieve</span>(mid)) {
            hi = mid;      <span class="cm">// mid works — try smaller (minimization)</span>
        } <span class="kw">else</span> {
            lo = mid + <span class="nu">1</span>; <span class="cm">// mid doesn't work — need bigger</span>
        }
    }

    <span class="kw">return</span> lo; <span class="cm">// smallest value that satisfies canAchieve()</span>
}

<span class="cm">// For maximization: flip condition, return hi</span>`
      }
    ],
    signals: [
      { cue: 'Sorted array + find target / position', pattern: 'Classic binary search' },
      { cue: '"Find minimum X such that condition holds"', pattern: 'Search on answer (binary search on range)' },
      { cue: '"Find maximum X such that condition holds"', pattern: 'Search on answer (flip condition)' },
      { cue: 'O(log n) required in problem or obvious from constraints (n up to 10⁹)', pattern: 'Binary search on answer' },
      { cue: 'Rotated sorted array', pattern: 'Modified binary search — determine which half is sorted' }
    ],
    mistakes: [
      {
        title: 'Using (lo + hi) / 2 — integer overflow',
        body: 'When lo and hi are large ints, lo+hi overflows. Always use <code>lo + (hi - lo) / 2</code>.'
      },
      {
        title: 'Wrong loop condition: lo <= hi vs lo < hi',
        body: 'Use <code>lo <= hi</code> for classic exact-match search. Use <code>lo < hi</code> for lower/upper bound templates. Mixing them causes infinite loops or missed answers.'
      },
      {
        title: 'Setting hi = mid - 1 in lower bound template',
        body: 'In the lower bound template, when the condition is met you set <code>hi = mid</code> (not <code>mid - 1</code>). You\'re not discarding mid — it might be the answer.'
      },
      {
        title: 'Not defining canAchieve() clearly before coding',
        body: 'In search-on-answer problems, write out the predicate function first and verify it\'s monotonic (false...false...true...true, or vice versa). If it\'s not monotonic, binary search won\'t work.'
      }
    ],
    complexity: [
      { variant: 'Classic binary search', time: 'O(log n)', space: 'O(1)' },
      { variant: 'Search on answer', time: 'O(log(range) × cost of canAchieve)', space: 'O(1)' }
    ],
    problems: {
      warmup: [
        {
          id: 'bs_lc704',
          lcUrl: 'https://leetcode.com/problems/binary-search/',
          nc: 'https://neetcode.io/problems/binary-search',
          name: 'Binary Search',
          lc: 'LC 704',
          hint: 'Pure classic template. Get the template memorized here — every other binary search problem builds on it.'
        },
        {
          id: 'bs_lc35',
          lcUrl: 'https://leetcode.com/problems/search-insert-position/',
          name: 'Search Insert Position',
          lc: 'LC 35',
          hint: 'Lower bound template. Return lo after the loop — it\'s the index where target would be inserted.'
        }
      ],
      core: [
        {
          id: 'bs_lc33',
          lcUrl: 'https://leetcode.com/problems/search-in-rotated-sorted-array/',
          nc: 'https://neetcode.io/problems/find-target-in-rotated-sorted-array',
          yt: 'https://www.youtube.com/watch?v=U8XENwh8Oy8',
          name: 'Search in Rotated Sorted Array',
          lc: 'LC 33',
          hint: 'At mid, one half is always fully sorted. Check which half, then determine if target is in that half. <strong>Key:</strong> <code>arr[lo] <= arr[mid]</code> tells you the left half is sorted.'
        },
        {
          id: 'bs_lc153',
          lcUrl: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/',
          nc: 'https://neetcode.io/problems/find-minimum-in-rotated-sorted-array',
          yt: 'https://www.youtube.com/watch?v=nIVW4P8b1VA',
          name: 'Find Minimum in Rotated Sorted Array',
          lc: 'LC 153',
          hint: 'The minimum is the only element smaller than its predecessor. Use lower bound: if <code>arr[mid] > arr[hi]</code>, minimum is in the right half.'
        },
        {
          id: 'bs_lc875',
          lcUrl: 'https://leetcode.com/problems/koko-eating-bananas/',
          nc: 'https://neetcode.io/problems/eating-bananas',
          yt: 'https://www.youtube.com/watch?v=U2SozAs9RzA',
          name: 'Koko Eating Bananas',
          lc: 'LC 875',
          hint: 'Search on answer. Range is [1, max(piles)]. <code>canFinish(k)</code> = total hours at speed k ≤ h. Use <code>Math.ceil(pile / (double) k)</code> or <code>(pile + k - 1) / k</code>.'
        }
      ],
      stretch: [
        {
          id: 'bs_lc4',
          lcUrl: 'https://leetcode.com/problems/median-of-two-sorted-arrays/',
          nc: 'https://neetcode.io/problems/median-of-two-sorted-arrays',
          yt: 'https://www.youtube.com/watch?v=q6IEA26hvXc',
          name: 'Median of Two Sorted Arrays',
          lc: 'LC 4',
          hint: 'Binary search on the partition point of the smaller array. Ensure left halves of both arrays combined have the right count. Hard — understand the partition logic before coding.'
        },
        {
          id: 'bs_lc2064',
          lcUrl: 'https://leetcode.com/problems/minimized-maximum-of-products-distributed-to-any-store/',
          name: 'Minimized Maximum of Products Distributed to Any Store',
          lc: 'LC 2064',
          hint: 'Search on answer. Binary search on the maximum products per store. <code>canDistribute(max)</code> = sum of ceil(quantity/max) ≤ n stores.'
        }
      ]
    },
    selfCheck: [
      'Why do we use lo + (hi - lo) / 2 instead of (lo + hi) / 2?',
      'What is the difference between lo <= hi and lo < hi as loop conditions? When do you use each?',
      'In lower bound template, why do we set hi = mid instead of hi = mid - 1?',
      'Describe the search-on-answer pattern in one sentence — what is being binary searched?',
      'In LC 33 (Rotated Sorted Array), how do you determine which half is sorted?'
    ]
  },

  stack: {
    id: 'stack',
    title: 'Stack',
    phase: 'Phase 2 — Week 4',
    frequency: 'High',
    dependsOn: [],
    unlocks: ['Monotonic Deque', 'Tree DFS iterative'],
    idea: `A stack gives you O(1) push, pop, and peek. Its power in interviews comes from the <strong>monotonic stack</strong> — a stack that maintains a sorted order (increasing or decreasing). This lets you find the <em>next greater element</em>, <em>next smaller element</em>, or solve histogram-area problems in O(n) instead of O(n²).\n\nThe key intuition: when a new element <em>breaks the monotonic property</em>, all elements it breaks are no longer useful — pop them and process. Each element is pushed and popped at most once → O(n) total.`,
    variants: [
      {
        label: 'Monotonic Stack — Next Greater Element',
        visual: `arr = [2, 1, 5, 3, 6, 4]
Find next greater element for each index.

stack = []  (stores indices, maintaining decreasing values)
result = [-1,-1,-1,-1,-1,-1]

i=0: val=2. Stack empty → push 0.        stack=[0]
i=1: val=1. arr[0]=2 > 1 → push 1.      stack=[0,1]
i=2: val=5. arr[1]=1 < 5 → pop 1, result[1]=5
            arr[0]=2 < 5 → pop 0, result[0]=5
            Stack empty → push 2.         stack=[2]
i=3: val=3. arr[2]=5 > 3 → push 3.      stack=[2,3]
i=4: val=6. arr[3]=3 < 6 → pop 3, result[3]=6
            arr[2]=5 < 6 → pop 2, result[2]=6
            Stack empty → push 4.         stack=[4]
i=5: val=4. arr[4]=6 > 4 → push 5.      stack=[4,5]

End: remaining on stack have no greater → result stays -1.
result = [<span class="hl">5,5,6,6,-1,-1</span>]`,
        note: null
      },
      {
        label: 'Stack for Validity — Matching Brackets',
        visual: `s = "({[]})"

i=0: '(' → push. stack=['(']
i=1: '{' → push. stack=['(', '{']
i=2: '[' → push. stack=['(', '{', '[']
i=3: ']' → closing. Pop '['. Matches ✓. stack=['(', '{']
i=4: '}' → closing. Pop '{'. Matches ✓. stack=['(']
i=5: ')' → closing. Pop '('. Matches ✓. stack=[]

Stack empty at end → <span class="hl">valid</span>`,
        note: null
      }
    ],
    templates: [
      {
        label: 'Monotonic Decreasing Stack (Next Greater)',
        code: `<span class="kw">public int</span>[] <span class="fn">nextGreaterElement</span>(<span class="ty">int</span>[] arr) {
    <span class="ty">int</span>[] result = <span class="kw">new int</span>[arr.length];
    <span class="ty">Arrays</span>.fill(result, -<span class="nu">1</span>);
    <span class="ty">Deque</span><<span class="ty">Integer</span>> stack = <span class="kw">new</span> <span class="ty">ArrayDeque</span>(); <span class="cm">// stores indices</span>

    <span class="kw">for</span> (<span class="ty">int</span> i = <span class="nu">0</span>; i < arr.length; i++) {
        <span class="kw">while</span> (!stack.isEmpty() && arr[stack.peek()] < arr[i]) {
            result[stack.pop()] = arr[i]; <span class="cm">// arr[i] is next greater for popped index</span>
        }
        stack.push(i);
    }

    <span class="kw">return</span> result; <span class="cm">// remaining on stack have result = -1</span>
}`
      },
      {
        label: 'Valid Parentheses',
        code: `<span class="kw">public boolean</span> <span class="fn">isValid</span>(<span class="ty">String</span> s) {
    <span class="ty">Deque</span><<span class="ty">Character</span>> stack = <span class="kw">new</span> <span class="ty">ArrayDeque</span>();

    <span class="kw">for</span> (<span class="ty">char</span> c : s.toCharArray()) {
        <span class="kw">if</span> (c == <span class="st">'('</span> || c == <span class="st">'{'</span> || c == <span class="st">'['</span>) {
            stack.push(c);
        } <span class="kw">else</span> {
            <span class="kw">if</span> (stack.isEmpty()) <span class="kw">return false</span>;
            <span class="ty">char</span> top = stack.pop();
            <span class="kw">if</span> (c == <span class="st">')'</span> && top != <span class="st">'('</span>) <span class="kw">return false</span>;
            <span class="kw">if</span> (c == <span class="st">'}'</span> && top != <span class="st">'{'</span>) <span class="kw">return false</span>;
            <span class="kw">if</span> (c == <span class="st">']'</span> && top != <span class="st">'['</span>) <span class="kw">return false</span>;
        }
    }

    <span class="kw">return</span> stack.isEmpty();
}`
      },
      {
        label: 'Largest Rectangle in Histogram',
        code: `<span class="kw">public int</span> <span class="fn">largestRectangle</span>(<span class="ty">int</span>[] heights) {
    <span class="ty">Deque</span><<span class="ty">Integer</span>> stack = <span class="kw">new</span> <span class="ty">ArrayDeque</span>(); <span class="cm">// monotonic increasing</span>
    <span class="ty">int</span> maxArea = <span class="nu">0</span>;

    <span class="kw">for</span> (<span class="ty">int</span> i = <span class="nu">0</span>; i <= heights.length; i++) {
        <span class="ty">int</span> h = (i == heights.length) ? <span class="nu">0</span> : heights[i]; <span class="cm">// sentinel 0 flushes stack</span>

        <span class="kw">while</span> (!stack.isEmpty() && heights[stack.peek()] > h) {
            <span class="ty">int</span> height = heights[stack.pop()];
            <span class="ty">int</span> width  = stack.isEmpty() ? i : i - stack.peek() - <span class="nu">1</span>;
            maxArea = <span class="ty">Math</span>.max(maxArea, height * width);
        }
        stack.push(i);
    }

    <span class="kw">return</span> maxArea;
}`
      }
    ],
    signals: [
      { cue: '"next greater/smaller element" for each position', pattern: 'Monotonic stack' },
      { cue: '"valid parentheses", "matching brackets"', pattern: 'Stack for pair matching' },
      { cue: '"largest rectangle", "maximal area" in histogram', pattern: 'Monotonic increasing stack' },
      { cue: 'Need to undo/revisit the most recent element', pattern: 'Stack (LIFO property)' },
      { cue: '"daily temperatures", "stock span"', pattern: 'Monotonic stack — store indices' }
    ],
    mistakes: [
      {
        title: 'Storing values instead of indices in the stack',
        body: 'Always store <em>indices</em>, not values. You need the index to compute widths (histogram), distances (temperatures), and to fill the result array at the right position.'
      },
      {
        title: 'Wrong monotonic direction',
        body: 'For next GREATER element, maintain a DECREASING stack (pop when you see something larger). For next SMALLER, maintain INCREASING (pop when smaller). Flip = wrong answer.'
      },
      {
        title: 'Using Stack<> instead of Deque<> in Java',
        body: '<code>Stack</code> in Java is synchronized and slow. Use <code>Deque&lt;Integer&gt; stack = new ArrayDeque&lt;&gt;()</code>. Use <code>push/pop/peek</code> for stack semantics.'
      },
      {
        title: 'Forgetting the sentinel in histogram problems',
        body: 'In largest rectangle, loop to <code>i = heights.length</code> with a sentinel height of 0. Without it, bars remaining on the stack at the end are never processed.'
      }
    ],
    complexity: [
      { variant: 'Monotonic stack', time: 'O(n) — each element pushed and popped once', space: 'O(n)' },
      { variant: 'Valid parentheses', time: 'O(n)', space: 'O(n)' }
    ],
    problems: {
      warmup: [
        {
          id: 'st_lc20',
          lcUrl: 'https://leetcode.com/problems/valid-parentheses/',
          nc: 'https://neetcode.io/problems/validate-parentheses',
          yt: 'https://www.youtube.com/watch?v=WTzjTskDFMg',
          name: 'Valid Parentheses',
          lc: 'LC 20',
          hint: 'Push opening brackets. On closing bracket, check if top matches. Return true only if stack is empty at end.'
        },
        {
          id: 'st_lc155',
          lcUrl: 'https://leetcode.com/problems/min-stack/',
          nc: 'https://neetcode.io/problems/minimum-stack',
          yt: 'https://www.youtube.com/watch?v=qkLl7nAwDPo',
          name: 'Min Stack',
          lc: 'LC 155',
          hint: 'Maintain two stacks — one normal, one tracking the minimum at each level. When you push to main, push current min to min-stack. When you pop, pop both.'
        }
      ],
      core: [
        {
          id: 'st_lc739',
          lcUrl: 'https://leetcode.com/problems/daily-temperatures/',
          nc: 'https://neetcode.io/problems/daily-temperatures',
          yt: 'https://www.youtube.com/watch?v=cTBiBSnjO3c',
          name: 'Daily Temperatures',
          lc: 'LC 739',
          hint: 'Monotonic decreasing stack of indices. When today\'s temp > temp at stack top, pop and record the distance. <strong>Result[i] = currentIndex − poppedIndex.</strong>'
        },
        {
          id: 'st_lc496',
          lcUrl: 'https://leetcode.com/problems/next-greater-element-i/',
          name: 'Next Greater Element I',
          lc: 'LC 496',
          hint: 'Build a next-greater map for nums2 using monotonic stack, then look up each element of nums1. Classic monotonic stack — good to internalize the template here.'
        },
        {
          id: 'st_lc84',
          lcUrl: 'https://leetcode.com/problems/largest-rectangle-in-histogram/',
          nc: 'https://neetcode.io/problems/largest-rectangle-in-histogram',
          yt: 'https://www.youtube.com/watch?v=zx5Sw9130L0',
          name: 'Largest Rectangle in Histogram',
          lc: 'LC 84',
          hint: 'Monotonic increasing stack. Each bar\'s maximum width extends left to the previous smaller bar and right to the next smaller bar. The sentinel (height 0 at end) flushes all remaining bars.'
        }
      ],
      stretch: [
        {
          id: 'st_lc42',
          lcUrl: 'https://leetcode.com/problems/trapping-rain-water/',
          nc: 'https://neetcode.io/problems/trapping-rain-water',
          yt: 'https://www.youtube.com/watch?v=ZI2z5pq0TqA',
          name: 'Trapping Rain Water (Stack approach)',
          lc: 'LC 42',
          hint: 'Alternative to two-pointer. Use a monotonic stack — when a taller bar is seen, the water trapped is bounded by current bar and stack top\'s predecessor. Compare both approaches.'
        },
        {
          id: 'st_lc85',
          lcUrl: 'https://leetcode.com/problems/maximal-rectangle/',
          yt: 'https://www.youtube.com/watch?v=g8bSdXCG-lA',
          name: 'Maximal Rectangle',
          lc: 'LC 85',
          hint: 'Build a histogram row by row (running column heights). Apply LC 84\'s largest rectangle to each row. The answer is the max across all rows.'
        }
      ]
    },
    selfCheck: [
      'Why do we store indices (not values) in the monotonic stack?',
      'For "next greater element", should the stack be monotonic increasing or decreasing? Why?',
      'Why is Deque preferred over Stack in Java?',
      'In the histogram problem, what does the sentinel value of 0 accomplish?',
      'Trace through [3,1,2] with the next-greater template — what is on the stack at each step?'
    ]
  },

  linked_list: {
    id: 'linked_list',
    title: 'Linked List',
    phase: 'Phase 2 — Week 5',
    frequency: 'High',
    dependsOn: ['Two Pointers'],
    unlocks: ['Tree traversal (node manipulation)'],
    idea: `Linked list problems are almost entirely about <strong>pointer manipulation</strong>. Unlike arrays, there is no index — you navigate by following <code>next</code> pointers.\n\nThe three techniques that cover 90% of linked list problems:\n<strong>1. Fast/slow pointers</strong> — cycle detection, middle of list, kth from end.\n<strong>2. Dummy head node</strong> — simplifies edge cases when the head itself might change.\n<strong>3. Reverse in-place</strong> — many problems require reversing the whole list or a sub-section.\n\nThe golden rule: <em>draw the pointer state before and after each operation</em>. One wrong assignment order corrupts the list.`,
    variants: [
      {
        label: 'Reverse a Linked List (in-place)',
        visual: `Original: 1 → 2 → 3 → 4 → null

prev=null, curr=1

Step 1: next=2,  curr.next=null,  prev=1,  curr=2
        null ← 1    2 → 3 → 4

Step 2: next=3,  curr.next=1,    prev=2,  curr=3
        null ← 1 ← 2    3 → 4

Step 3: next=4,  curr.next=2,    prev=3,  curr=4
        null ← 1 ← 2 ← 3    4

Step 4: next=null, curr.next=3,  prev=4,  curr=null
        null ← 1 ← 2 ← 3 ← 4

<span class="hl">New head = prev = 4</span>`,
        note: null
      },
      {
        label: 'Fast/Slow — Find Middle',
        visual: `List: 1 → 2 → 3 → 4 → 5 → null

slow=1, fast=1

Step 1: slow=2, fast=3
Step 2: slow=3, fast=5
Step 3: fast.next=null → stop

<span class="hl">Middle = slow = 3</span>

For even length (1→2→3→4):
Step 1: slow=2, fast=3
Step 2: slow=3, fast=null (fast=fast.next.next would be null)
Middle = slow = 3 (second middle — adjust condition for first middle)`,
        note: null
      },
      {
        label: 'Dummy Head Node',
        visual: `Problem: delete node with value 3 from 1→2→3→4

Without dummy: if head.val==3, head=head.next (special case)
With dummy:    dummy→1→2→3→4,  prev=dummy

Walk prev until prev.next.val == 3:
  prev=dummy → prev.next.val=1 ≠ 3
  prev=1     → prev.next.val=2 ≠ 3
  prev=2     → prev.next.val=3 == 3 → <span class="hl">prev.next = prev.next.next</span>

dummy→1→2→4  →  return dummy.next = 1→2→4

<span class="hl3">Dummy eliminates the "is head the target?" special case.</span>`,
        note: null
      }
    ],
    templates: [
      {
        label: 'Reverse Linked List',
        code: `<span class="kw">public</span> <span class="ty">ListNode</span> <span class="fn">reverse</span>(<span class="ty">ListNode</span> head) {
    <span class="ty">ListNode</span> prev = <span class="kw">null</span>;
    <span class="ty">ListNode</span> curr = head;

    <span class="kw">while</span> (curr != <span class="kw">null</span>) {
        <span class="ty">ListNode</span> next = curr.next; <span class="cm">// save next FIRST</span>
        curr.next = prev;           <span class="cm">// reverse pointer</span>
        prev = curr;                <span class="cm">// advance prev</span>
        curr = next;                <span class="cm">// advance curr</span>
    }

    <span class="kw">return</span> prev; <span class="cm">// new head</span>
}`
      },
      {
        label: 'Fast / Slow — Middle of List',
        code: `<span class="kw">public</span> <span class="ty">ListNode</span> <span class="fn">findMiddle</span>(<span class="ty">ListNode</span> head) {
    <span class="ty">ListNode</span> slow = head;
    <span class="ty">ListNode</span> fast = head;

    <span class="kw">while</span> (fast != <span class="kw">null</span> && fast.next != <span class="kw">null</span>) {
        slow = slow.next;
        fast = fast.next.next;
    }

    <span class="kw">return</span> slow; <span class="cm">// middle (second middle for even length)</span>
}`
      },
      {
        label: 'Dummy Head + Pointer Walk',
        code: `<span class="kw">public</span> <span class="ty">ListNode</span> <span class="fn">removeElements</span>(<span class="ty">ListNode</span> head, <span class="ty">int</span> val) {
    <span class="ty">ListNode</span> dummy = <span class="kw">new</span> <span class="ty">ListNode</span>(<span class="nu">0</span>);
    dummy.next = head;
    <span class="ty">ListNode</span> prev = dummy;

    <span class="kw">while</span> (prev.next != <span class="kw">null</span>) {
        <span class="kw">if</span> (prev.next.val == val) {
            prev.next = prev.next.next; <span class="cm">// skip node</span>
        } <span class="kw">else</span> {
            prev = prev.next;
        }
    }

    <span class="kw">return</span> dummy.next;
}`
      }
    ],
    signals: [
      { cue: '"cycle in linked list", "middle of list", "kth from end"', pattern: 'Fast/slow pointers' },
      { cue: '"reverse a linked list" or sub-section of it', pattern: 'In-place reversal with prev/curr/next' },
      { cue: 'Head node might be deleted or changed', pattern: 'Dummy head node' },
      { cue: '"merge two sorted lists", "merge k sorted lists"', pattern: 'Dummy head + pointer weaving' },
      { cue: '"palindrome linked list"', pattern: 'Find middle → reverse second half → compare' }
    ],
    mistakes: [
      {
        title: 'Not saving next before reversing pointer',
        body: 'In reversal, always save <code>ListNode next = curr.next</code> before doing <code>curr.next = prev</code>. If you reverse first, you lose the reference to the rest of the list.'
      },
      {
        title: 'Off-by-one in fast/slow for kth from end',
        body: 'To find kth from end, advance fast by k steps first, then move both until fast reaches null. Practice: k=1 gives the last node. Draw it out to verify.'
      },
      {
        title: 'Forgetting to null-terminate after splitting',
        body: 'When splitting a list (e.g., finding middle for palindrome check), set <code>slow.next = null</code> to terminate the first half. Otherwise you have a circular-looking structure.'
      },
      {
        title: 'Mutating the list when the problem expects the original intact',
        body: 'Some problems ask you to check a property (palindrome) without modifying. Either restore the list after checking or be explicit with the interviewer that you\'re modifying it.'
      }
    ],
    complexity: [
      { variant: 'Reversal', time: 'O(n)', space: 'O(1)' },
      { variant: 'Fast/slow pointer', time: 'O(n)', space: 'O(1)' },
      { variant: 'Dummy head walk', time: 'O(n)', space: 'O(1)' }
    ],
    problems: {
      warmup: [
        {
          id: 'll_lc206',
          lcUrl: 'https://leetcode.com/problems/reverse-linked-list/',
          nc: 'https://neetcode.io/problems/reverse-a-linked-list',
          yt: 'https://www.youtube.com/watch?v=G0_I-ZF0S38',
          name: 'Reverse Linked List',
          lc: 'LC 206',
          hint: 'Pure reversal template. Three variables: prev, curr, next. Memorize the order: save next → flip pointer → advance both.'
        },
        {
          id: 'll_lc21',
          lcUrl: 'https://leetcode.com/problems/merge-two-sorted-lists/',
          nc: 'https://neetcode.io/problems/merge-two-sorted-linked-lists',
          yt: 'https://www.youtube.com/watch?v=XIdigk956u0',
          name: 'Merge Two Sorted Lists',
          lc: 'LC 21',
          hint: 'Dummy head. Compare heads of both lists, attach the smaller one, advance that pointer. Return dummy.next.'
        }
      ],
      core: [
        {
          id: 'll_lc143',
          lcUrl: 'https://leetcode.com/problems/reorder-list/',
          nc: 'https://neetcode.io/problems/reorder-linked-list',
          yt: 'https://www.youtube.com/watch?v=S5bfdUTrKLM',
          name: 'Reorder List',
          lc: 'LC 143',
          hint: 'Three steps: (1) find middle with slow/fast, (2) reverse second half, (3) merge the two halves by interleaving. Each step is a sub-problem you already know.'
        },
        {
          id: 'll_lc19',
          lcUrl: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/',
          nc: 'https://neetcode.io/problems/remove-node-from-end-of-linked-list',
          yt: 'https://www.youtube.com/watch?v=XVuQxVej6y8',
          name: 'Remove Nth Node From End of List',
          lc: 'LC 19',
          hint: 'Dummy head + fast/slow. Advance fast by n+1 steps (use dummy as starting point), then move both until fast is null. prev.next = prev.next.next.'
        },
        {
          id: 'll_lc142',
          lcUrl: 'https://leetcode.com/problems/linked-list-cycle-ii/',
          nc: 'https://neetcode.io/problems/find-duplicate-number',
          yt: 'https://www.youtube.com/watch?v=wjYnzkAhcNk',
          name: 'Linked List Cycle II',
          lc: 'LC 142',
          hint: 'Phase 1: detect cycle (slow/fast meet). Phase 2: reset one pointer to head, move both one step at a time — they meet at the cycle start. This requires the mathematical proof to trust.'
        }
      ],
      stretch: [
        {
          id: 'll_lc25',
          lcUrl: 'https://leetcode.com/problems/reverse-nodes-in-k-group/',
          nc: 'https://neetcode.io/problems/reverse-nodes-in-k-group',
          yt: 'https://www.youtube.com/watch?v=1UOPsfP85V4',
          name: 'Reverse Nodes in k-Group',
          lc: 'LC 25',
          hint: 'Reverse k nodes at a time. Use a helper that reverses a sublist and returns the new head and tail. Dummy head ties groups together. Track the tail of the previous group to connect.'
        },
        {
          id: 'll_lc148',
          lcUrl: 'https://leetcode.com/problems/sort-list/',
          yt: 'https://www.youtube.com/watch?v=TGveA1oFDkU',
          name: 'Sort List',
          lc: 'LC 148',
          hint: 'Merge sort on a linked list. Split at middle (fast/slow), sort each half recursively, merge. O(n log n) time, O(log n) space for recursion stack.'
        }
      ]
    },
    selfCheck: [
      'In list reversal, why must you save next BEFORE reversing the pointer?',
      'How does the dummy head node eliminate edge cases? Give a concrete example.',
      'In Cycle II, why does resetting one pointer to head after detection find the cycle start?',
      'What are the three steps to check if a linked list is a palindrome in O(1) space?',
      'What is the time and space complexity of merge sort on a linked list?'
    ]
  },

  queue_deque: {
    id: 'queue_deque',
    title: 'Queue + Monotonic Deque',
    phase: 'Phase 2 — Week 5',
    frequency: 'Medium',
    dependsOn: ['Stack', 'Sliding Window'],
    unlocks: ['Graph BFS', 'Tree level-order'],
    idea: `A <strong>Queue</strong> (FIFO) is the backbone of BFS — you'll use it again in graphs and trees. A <strong>Deque</strong> (double-ended queue) can be used as both a stack and a queue, and enables the <strong>monotonic deque</strong> pattern.\n\nThe <strong>monotonic deque</strong> solves the sliding window maximum/minimum in O(n) — a problem that's O(nk) naively. It works exactly like the monotonic stack but also removes elements from the front when they fall outside the window.\n\nIn Java: always use <code>ArrayDeque</code>. Never use <code>LinkedList</code> as a queue — it has poor cache performance.`,
    variants: [
      {
        label: 'Sliding Window Maximum (Monotonic Deque)',
        visual: `arr = [1, 3, -1, -3, 5, 3, 6, 7],  k = 3

Deque stores INDICES. Front = largest in window.

i=0: val=1.  Deque empty → add. dq=[0]
i=1: val=3.  arr[0]=1 < 3 → pop 0. Add 1. dq=[1]
i=2: val=-1. arr[1]=3 > -1 → add. dq=[1,2]  → window full: result=[<span class="hl">3</span>]
i=3: val=-3. arr[2]=-1 > -3 → add. dq=[1,2,3] → result=[3,<span class="hl">3</span>]
i=4: val=5.  arr[3]=-3<5→pop, arr[2]=-1<5→pop, arr[1]=3<5→pop. Add 4. dq=[4] → result=[3,3,<span class="hl">5</span>]
i=5: val=3.  front=4 still in window. arr[4]=5>3→add. dq=[4,5] → result=[3,3,5,<span class="hl">5</span>]
i=6: val=6.  arr[5]=3<6→pop, arr[4]=5<6→pop. Add 6. dq=[6] → result=[3,3,5,5,<span class="hl">6</span>]
i=7: val=7.  arr[6]=6<7→pop. Add 7. dq=[7] → result=[3,3,5,5,6,<span class="hl">7</span>]

Result: <span class="hl">[3,3,5,5,6,7]</span>`,
        note: null
      },
      {
        label: 'BFS with Queue',
        visual: `Tree:     1
        / \\
       2   3
      / \\
     4   5

Level-order BFS:
queue = [1]

Poll 1 → output 1, enqueue [2, 3]. queue=[2,3]
Poll 2 → output 2, enqueue [4, 5]. queue=[3,4,5]
Poll 3 → output 3, no children.   queue=[4,5]
Poll 4 → output 4.                queue=[5]
Poll 5 → output 5.                queue=[]

Output: <span class="hl">1 2 3 4 5</span>  (level order)`,
        note: null
      }
    ],
    templates: [
      {
        label: 'Monotonic Deque — Sliding Window Maximum',
        code: `<span class="kw">public int</span>[] <span class="fn">maxSlidingWindow</span>(<span class="ty">int</span>[] arr, <span class="ty">int</span> k) {
    <span class="ty">int</span>[] result = <span class="kw">new int</span>[arr.length - k + <span class="nu">1</span>];
    <span class="ty">Deque</span><<span class="ty">Integer</span>> dq = <span class="kw">new</span> <span class="ty">ArrayDeque</span>(); <span class="cm">// stores indices</span>

    <span class="kw">for</span> (<span class="ty">int</span> i = <span class="nu">0</span>; i < arr.length; i++) {
        <span class="cm">// remove indices outside the window from front</span>
        <span class="kw">if</span> (!dq.isEmpty() && dq.peekFirst() < i - k + <span class="nu">1</span>) dq.pollFirst();

        <span class="cm">// maintain decreasing order — remove smaller values from back</span>
        <span class="kw">while</span> (!dq.isEmpty() && arr[dq.peekLast()] < arr[i]) dq.pollLast();

        dq.offerLast(i);

        <span class="kw">if</span> (i >= k - <span class="nu">1</span>) result[i - k + <span class="nu">1</span>] = arr[dq.peekFirst()];
    }

    <span class="kw">return</span> result;
}`
      },
      {
        label: 'BFS Template (Graph / Tree)',
        code: `<span class="ty">Queue</span><<span class="ty">Integer</span>> queue = <span class="kw">new</span> <span class="ty">ArrayDeque</span>();
<span class="ty">Set</span><<span class="ty">Integer</span>> visited = <span class="kw">new</span> <span class="ty">HashSet</span>();

queue.offer(start);
visited.add(start);

<span class="kw">while</span> (!queue.isEmpty()) {
    <span class="ty">int</span> node = queue.poll();
    <span class="cm">// process node</span>

    <span class="kw">for</span> (<span class="ty">int</span> neighbor : graph.get(node)) {
        <span class="kw">if</span> (!visited.contains(neighbor)) {
            visited.add(neighbor);
            queue.offer(neighbor);
        }
    }
}`
      }
    ],
    signals: [
      { cue: '"sliding window maximum" or "sliding window minimum"', pattern: 'Monotonic deque' },
      { cue: '"level order traversal", "BFS", "shortest path in unweighted graph"', pattern: 'Queue-based BFS' },
      { cue: 'Need both stack and queue behavior', pattern: 'Deque (ArrayDeque)' }
    ],
    mistakes: [
      {
        title: 'Using LinkedList instead of ArrayDeque',
        body: 'In Java, always use <code>ArrayDeque</code> for both stack and queue use cases. <code>LinkedList</code> works but has worse cache performance and more memory overhead.'
      },
      {
        title: 'Removing from the wrong end of the deque',
        body: 'Elements that fall out of the window are removed from the <em>front</em>. Elements that break the monotonic property are removed from the <em>back</em>. Confusing these gives wrong results.'
      },
      {
        title: 'Not checking if front index is still in window',
        body: 'Before recording the window maximum (<code>arr[dq.peekFirst()]</code>), check that <code>dq.peekFirst() >= i - k + 1</code>. Stale indices from previous windows corrupt the result.'
      }
    ],
    complexity: [
      { variant: 'Monotonic deque (sliding window max)', time: 'O(n) — each element added/removed once', space: 'O(k)' },
      { variant: 'BFS', time: 'O(V + E)', space: 'O(V)' }
    ],
    problems: {
      warmup: [
        {
          id: 'qd_lc933',
          lcUrl: 'https://leetcode.com/problems/number-of-recent-calls/',
          name: 'Number of Recent Calls',
          lc: 'LC 933',
          hint: 'Queue. Add each call timestamp, then remove all timestamps from the front that are outside the 3000ms window. Queue size = answer.'
        },
        {
          id: 'qd_lc232',
          lcUrl: 'https://leetcode.com/problems/implement-queue-using-stacks/',
          nc: 'https://neetcode.io/problems/implement-queue-using-stacks',
          name: 'Implement Queue using Stacks',
          lc: 'LC 232',
          hint: 'Use two stacks. Push to stack1. For pop/peek, if stack2 is empty, pour all of stack1 into stack2 (reverses order). Amortized O(1) per operation.'
        }
      ],
      core: [
        {
          id: 'qd_lc239',
          lcUrl: 'https://leetcode.com/problems/sliding-window-maximum/',
          nc: 'https://neetcode.io/problems/sliding-window-maximum',
          yt: 'https://www.youtube.com/watch?v=DfljaUwZsOk',
          name: 'Sliding Window Maximum',
          lc: 'LC 239',
          hint: 'The canonical monotonic deque problem. Follow the template exactly. <strong>Store indices, not values.</strong> Remove from front when out of window, from back when breaking monotonic order.'
        },
        {
          id: 'qd_lc102',
          lcUrl: 'https://leetcode.com/problems/binary-tree-level-order-traversal/',
          nc: 'https://neetcode.io/problems/level-order-traversal-of-binary-tree',
          name: 'Binary Tree Level Order Traversal',
          lc: 'LC 102',
          hint: 'BFS with a size snapshot. At the start of each level, record queue.size() — that\'s how many nodes belong to this level. Process exactly that many before moving to the next level.'
        }
      ],
      stretch: [
        {
          id: 'qd_lc862',
          lcUrl: 'https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/',
          name: 'Shortest Subarray with Sum at Least K',
          lc: 'LC 862',
          hint: 'Combine prefix sums with a monotonic deque. For each right index, pop from the front of the deque while prefix[right] - prefix[front] >= k. Maintains increasing prefix sums in deque.'
        }
      ]
    },
    selfCheck: [
      'Why do we store indices (not values) in the monotonic deque?',
      'In the sliding window max, why do we remove from the front AND the back of the deque?',
      'What is the amortized time complexity of the monotonic deque? Why O(n) and not O(nk)?',
      'Why is ArrayDeque preferred over LinkedList in Java for queue operations?',
      'Explain the two-stack queue trick and its amortized complexity.'
    ]
  },

  heap: {
    id: 'heap',
    title: 'Heap / Priority Queue',
    phase: 'Phase 2 — Week 6',
    frequency: 'High',
    dependsOn: [],
    unlocks: ['Dijkstra shortest path', 'Greedy scheduling'],
    idea: `A <strong>heap</strong> gives you O(log n) insert and O(log n) extract-min/max, with O(1) peek at the min/max. Java's <code>PriorityQueue</code> is a min-heap by default.\n\nThe core use cases:\n<strong>1. Top-K problems</strong> — maintain a heap of size K instead of sorting everything.\n<strong>2. K-way merge</strong> — merge K sorted lists by always extracting the minimum.\n<strong>3. Streaming data</strong> — maintain median or Kth largest as elements arrive.\n\nThe key insight: whenever you see "Kth largest/smallest" or "top K", your first thought should be a heap of size K — O(n log K) instead of O(n log n) sort.`,
    variants: [
      {
        label: 'Top-K with Min-Heap of size K',
        visual: `Problem: Kth largest element in array
arr = [3, 2, 1, 5, 6, 4],  k = 2

Use a MIN-heap of size k.
(Min-heap of size k keeps the k largest elements seen.
 The root = kth largest.)

Add 3: heap=[3]
Add 2: heap=[2,3]
Add 1: heap size=2, 1 < heap.peek()=2 → skip
Add 5: heap=[2,3], 5 > peek=2 → add, then poll min → heap=[3,5]
Add 6: 6 > peek=3 → add, poll → heap=[5,6]
Add 4: 4 < peek=5 → skip

heap.peek() = <span class="hl">5</span>  (2nd largest ✓)`,
        note: null
      },
      {
        label: 'Find Median — Two Heaps',
        visual: `Maintain:
  maxHeap (left half)  — max at top = lower half's max
  minHeap (right half) — min at top = upper half's min

Invariant: maxHeap.size() == minHeap.size() or maxHeap.size() == minHeap.size()+1

Stream: [5, 3, 8, 1]

Add 5: maxHeap=[5],    minHeap=[]      median=5
Add 3: maxHeap=[3,5]→rebalance→maxHeap=[3], minHeap=[5]  median=(3+5)/2=4
Add 8: add to right → minHeap=[5,8], rebalance → maxHeap=[3,5], minHeap=[8]  median=5
Add 1: add to left → maxHeap=[1,3,5]→rebalance→maxHeap=[1,3], minHeap=[5,8]  median=(3+5)/2=4

<span class="hl3">Two heaps maintain the median in O(log n) per insert.</span>`,
        note: null
      }
    ],
    templates: [
      {
        label: 'Kth Largest — Min-Heap of size K',
        code: `<span class="kw">public int</span> <span class="fn">findKthLargest</span>(<span class="ty">int</span>[] nums, <span class="ty">int</span> k) {
    <span class="ty">PriorityQueue</span><<span class="ty">Integer</span>> minHeap = <span class="kw">new</span> <span class="ty">PriorityQueue</span><>(); <span class="cm">// min-heap, size k</span>

    <span class="kw">for</span> (<span class="ty">int</span> num : nums) {
        minHeap.offer(num);
        <span class="kw">if</span> (minHeap.size() > k) minHeap.poll(); <span class="cm">// evict the smallest</span>
    }

    <span class="kw">return</span> minHeap.peek(); <span class="cm">// kth largest = smallest in heap of k largest</span>
}`
      },
      {
        label: 'Max-Heap in Java',
        code: `<span class="cm">// Java PriorityQueue is a MIN-heap by default.</span>
<span class="cm">// For MAX-heap, reverse the comparator:</span>
<span class="ty">PriorityQueue</span><<span class="ty">Integer</span>> maxHeap = <span class="kw">new</span> <span class="ty">PriorityQueue</span><>(<span class="ty">Collections</span>.reverseOrder());

<span class="cm">// For custom objects (e.g., sort by frequency):</span>
<span class="ty">PriorityQueue</span><<span class="ty">int</span>[]> pq = <span class="kw">new</span> <span class="ty">PriorityQueue</span><>((a, b) -> a[<span class="nu">1</span>] - b[<span class="nu">1</span>]); <span class="cm">// sort by index 1</span>`
      },
      {
        label: 'K-Way Merge',
        code: `<span class="kw">public</span> <span class="ty">int</span>[] <span class="fn">mergeKSorted</span>(<span class="ty">int</span>[][] arrays) {
    <span class="cm">// heap stores [value, arrayIndex, elementIndex]</span>
    <span class="ty">PriorityQueue</span><<span class="ty">int</span>[]> pq = <span class="kw">new</span> <span class="ty">PriorityQueue</span><>((a, b) -> a[<span class="nu">0</span>] - b[<span class="nu">0</span>]);

    <span class="kw">for</span> (<span class="ty">int</span> i = <span class="nu">0</span>; i < arrays.length; i++) {
        <span class="kw">if</span> (arrays[i].length > <span class="nu">0</span>)
            pq.offer(<span class="kw">new int</span>[] { arrays[i][<span class="nu">0</span>], i, <span class="nu">0</span> });
    }

    <span class="ty">List</span><<span class="ty">Integer</span>> result = <span class="kw">new</span> <span class="ty">ArrayList</span><>();
    <span class="kw">while</span> (!pq.isEmpty()) {
        <span class="ty">int</span>[] top = pq.poll();
        result.add(top[<span class="nu">0</span>]);
        <span class="ty">int</span> ai = top[<span class="nu">1</span>], ei = top[<span class="nu">2</span>];
        <span class="kw">if</span> (ei + <span class="nu">1</span> < arrays[ai].length)
            pq.offer(<span class="kw">new int</span>[] { arrays[ai][ei + <span class="nu">1</span>], ai, ei + <span class="nu">1</span> });
    }

    <span class="kw">return</span> result.stream().mapToInt(<span class="ty">Integer</span>::intValue).toArray();
}`
      }
    ],
    signals: [
      { cue: '"Kth largest", "Kth smallest", "top K frequent"', pattern: 'Min-heap or max-heap of size K' },
      { cue: '"merge K sorted lists/arrays"', pattern: 'K-way merge with min-heap' },
      { cue: '"find median from a data stream"', pattern: 'Two heaps (max-heap + min-heap)' },
      { cue: '"closest K points", "K nearest"', pattern: 'Max-heap of size K (evict farthest)' },
      { cue: 'Need the minimum/maximum repeatedly as data changes', pattern: 'Heap (dynamic sorted order)' }
    ],
    mistakes: [
      {
        title: 'Using max-heap when you need min-heap for Top-K largest',
        body: 'To find the K largest elements, use a MIN-heap of size K — it keeps the K largest and the root (minimum of those) is the Kth largest. A max-heap would require sorting all n elements.'
      },
      {
        title: 'Forgetting Collections.reverseOrder() for max-heap',
        body: 'Java\'s PriorityQueue is a min-heap. For a max-heap: <code>new PriorityQueue&lt;&gt;(Collections.reverseOrder())</code>. For custom comparators, flip the subtraction: <code>(a,b) -> b-a</code> or <code>(a,b) -> b[0]-a[0]</code>.'
      },
      {
        title: 'Integer overflow in comparator',
        body: '<code>(a,b) -> a-b</code> overflows for large integers. Use <code>Integer.compare(a,b)</code> or <code>Collections.reverseOrder()</code> instead.'
      },
      {
        title: 'Heapifying an existing array vs inserting one by one',
        body: 'Building a heap by inserting n elements one-by-one is O(n log n). Java\'s <code>new PriorityQueue&lt;&gt;(Arrays.asList(arr))</code> uses Floyd\'s algorithm and runs in O(n). Prefer it when you have all elements upfront.'
      }
    ],
    complexity: [
      { variant: 'Insert / extract', time: 'O(log n)', space: 'O(n)' },
      { variant: 'Peek min/max', time: 'O(1)', space: '-' },
      { variant: 'Top-K from n elements', time: 'O(n log K)', space: 'O(K)' },
      { variant: 'K-way merge of n total elements', time: 'O(n log K)', space: 'O(K)' },
      { variant: 'Build heap from n elements', time: 'O(n) — Floyd\'s algorithm', space: 'O(n)' }
    ],
    problems: {
      warmup: [
        {
          id: 'hp_lc703',
          lcUrl: 'https://leetcode.com/problems/kth-largest-element-in-a-stream/',
          name: 'Kth Largest Element in a Stream',
          lc: 'LC 703',
          hint: 'Min-heap of size k. In the constructor, add all initial elements. In add(), push new element and pop if size > k. Return heap.peek().'
        },
        {
          id: 'hp_lc1046',
          lcUrl: 'https://leetcode.com/problems/last-stone-weight/',
          name: 'Last Stone Weight',
          lc: 'LC 1046',
          hint: 'Max-heap. Repeatedly extract top two, compute difference, push back if nonzero. Return heap.peek() or 0.'
        }
      ],
      core: [
        {
          id: 'hp_lc215',
          lcUrl: 'https://leetcode.com/problems/kth-largest-element-in-an-array/',
          nc: 'https://neetcode.io/problems/kth-largest-element-in-an-array',
          yt: 'https://www.youtube.com/watch?v=XEmy13g1Qxc',
          name: 'Kth Largest Element in an Array',
          lc: 'LC 215',
          hint: 'Min-heap of size k. Walk the array — if element > heap.peek(), pop and push. After full pass, heap.peek() is the answer. Also know the quickselect O(n) average approach.'
        },
        {
          id: 'hp_lc347',
          lcUrl: 'https://leetcode.com/problems/top-k-frequent-elements/',
          nc: 'https://neetcode.io/problems/top-k-elements-in-list',
          yt: 'https://www.youtube.com/watch?v=YPTqKIgVk-k',
          name: 'Top K Frequent Elements',
          lc: 'LC 347',
          hint: 'Build frequency map, then use min-heap of size k sorted by frequency. Evict elements with lowest frequency. Alternatively, bucket sort by frequency for O(n).'
        },
        {
          id: 'hp_lc23',
          lcUrl: 'https://leetcode.com/problems/merge-k-sorted-lists/',
          nc: 'https://neetcode.io/problems/merge-k-sorted-linked-lists',
          yt: 'https://www.youtube.com/watch?v=q5a5OiGbT6Q',
          name: 'Merge K Sorted Lists',
          lc: 'LC 23',
          hint: 'K-way merge. Push the head of each list into a min-heap. Each poll gives the next smallest node — push its next into the heap. Use dummy head to build the result.'
        }
      ],
      stretch: [
        {
          id: 'hp_lc295',
          lcUrl: 'https://leetcode.com/problems/find-median-from-data-stream/',
          nc: 'https://neetcode.io/problems/find-median-in-a-data-stream',
          yt: 'https://www.youtube.com/watch?v=itmhHWaHupI',
          name: 'Find Median from Data Stream',
          lc: 'LC 295',
          hint: 'Two heaps: maxHeap for lower half, minHeap for upper half. Invariant: maxHeap.size() >= minHeap.size() and maxHeap.size() <= minHeap.size() + 1. Rebalance after each insert.'
        },
        {
          id: 'hp_lc778',
          lcUrl: 'https://leetcode.com/problems/swim-in-rising-water/',
          yt: 'https://www.youtube.com/watch?v=amvrKlMLuGY',
          name: 'Swim in Rising Water',
          lc: 'LC 778',
          hint: 'Min-heap BFS (Dijkstra-style). Heap stores [time, row, col]. Always expand the cell with minimum time. Answer is when you reach bottom-right.'
        }
      ]
    },
    selfCheck: [
      'To find the Kth LARGEST, do you use a min-heap or max-heap? Why?',
      'How do you create a max-heap in Java? What\'s the comparator?',
      'What is the time complexity of Top-K using a heap vs. sorting? When does each win?',
      'In the two-heap median problem, what invariant do you maintain between the two heaps?',
      'Why is building a heap from an array O(n) and not O(n log n)?'
    ]
  },

  // ── Phase 3 ──────────────────────────────────────────────────────────────

  recursion_backtracking: {
    id: 'recursion_backtracking',
    title: 'Recursion + Backtracking',
    phase: 'Phase 3 — Week 7',
    frequency: 'High',
    dependsOn: [],
    unlocks: ['Binary Tree', 'Graph DFS', 'DP (memoization)'],
    idea: `<strong>Recursion</strong> is solving a problem by reducing it to a smaller version of itself. Every recursive solution has two parts: a <em>base case</em> (the smallest problem you can answer directly) and a <em>recursive case</em> (reduce the problem and trust the recursion handles the rest).\n\n<strong>Backtracking</strong> is recursion with an undo step. You build a candidate solution incrementally — if a path leads to a dead end, you <em>undo the last choice</em> and try the next option. Think of it as exploring a decision tree: go down a branch, realize it's wrong, climb back up, try another branch.\n\nThe mental model: <em>draw the recursion tree first, always.</em> Every backtracking problem has the same skeleton — the only thing that changes is what "choose", "explore", and "unchoose" mean for that specific problem.`,
    variants: [
      {
        label: 'Recursion Tree — Subsets',
        visual: `Problem: all subsets of [1, 2, 3]

At each element, two choices: include or exclude.

                    []
               /         \\
            [1]            []
           /   \\          /  \\
        [1,2]  [1]      [2]   []
        / \\    / \\      / \\   / \\
    [1,2,3][1,2][1,3][1][2,3][2][3][]

Every leaf = a valid subset. 2^n leaves for n elements.
<span class="hl">Collect result at every node (not just leaves) for subsets.</span>`,
        note: null
      },
      {
        label: 'Backtracking Skeleton — Permutations',
        visual: `Problem: all permutations of [1, 2, 3]

                     []
          /           |           \\
        [1]          [2]          [3]
       /   \\        /   \\        /   \\
    [1,2] [1,3] [2,1] [2,3] [3,1] [3,2]
      |     |     |     |     |     |
  [1,2,3][1,3,2][2,1,3][2,3,1][3,1,2][3,2,1]

At each node: choose an unused element, explore, then
<span class="hl">unchoose</span> (mark as unused again) before trying the next.`,
        note: null
      }
    ],
    templates: [
      {
        label: 'Subsets (include / exclude)',
        code: `<span class="kw">public</span> <span class="ty">List</span><<span class="ty">List</span><<span class="ty">Integer</span>>> <span class="fn">subsets</span>(<span class="ty">int</span>[] nums) {
    <span class="ty">List</span><<span class="ty">List</span><<span class="ty">Integer</span>>> result = <span class="kw">new</span> <span class="ty">ArrayList</span><>();
    <span class="fn">backtrack</span>(nums, <span class="nu">0</span>, <span class="kw">new</span> <span class="ty">ArrayList</span>(), result);
    <span class="kw">return</span> result;
}

<span class="kw">private void</span> <span class="fn">backtrack</span>(<span class="ty">int</span>[] nums, <span class="ty">int</span> start,
                        <span class="ty">List</span><<span class="ty">Integer</span>> current,
                        <span class="ty">List</span><<span class="ty">List</span><<span class="ty">Integer</span>>> result) {
    result.add(<span class="kw">new</span> <span class="ty">ArrayList</span><>(current)); <span class="cm">// snapshot — every node is a valid subset</span>

    <span class="kw">for</span> (<span class="ty">int</span> i = start; i < nums.length; i++) {
        current.add(nums[i]);                     <span class="cm">// choose</span>
        <span class="fn">backtrack</span>(nums, i + <span class="nu">1</span>, current, result); <span class="cm">// explore</span>
        current.remove(current.size() - <span class="nu">1</span>);      <span class="cm">// unchoose</span>
    }
}`
      },
      {
        label: 'Permutations (used[] array)',
        code: `<span class="kw">private void</span> <span class="fn">backtrack</span>(<span class="ty">int</span>[] nums, <span class="ty">boolean</span>[] used,
                        <span class="ty">List</span><<span class="ty">Integer</span>> current,
                        <span class="ty">List</span><<span class="ty">List</span><<span class="ty">Integer</span>>> result) {
    <span class="kw">if</span> (current.size() == nums.length) {
        result.add(<span class="kw">new</span> <span class="ty">ArrayList</span><>(current)); <span class="cm">// base case: full permutation</span>
        <span class="kw">return</span>;
    }

    <span class="kw">for</span> (<span class="ty">int</span> i = <span class="nu">0</span>; i < nums.length; i++) {
        <span class="kw">if</span> (used[i]) <span class="kw">continue</span>;
        used[i] = <span class="kw">true</span>;
        current.add(nums[i]);                   <span class="cm">// choose</span>
        <span class="fn">backtrack</span>(nums, used, current, result); <span class="cm">// explore</span>
        current.remove(current.size() - <span class="nu">1</span>);    <span class="cm">// unchoose</span>
        used[i] = <span class="kw">false</span>;
    }
}`
      },
      {
        label: 'Combination Sum (reuse allowed)',
        code: `<span class="kw">private void</span> <span class="fn">backtrack</span>(<span class="ty">int</span>[] candidates, <span class="ty">int</span> start,
                        <span class="ty">int</span> remaining, <span class="ty">List</span><<span class="ty">Integer</span>> current,
                        <span class="ty">List</span><<span class="ty">List</span><<span class="ty">Integer</span>>> result) {
    <span class="kw">if</span> (remaining == <span class="nu">0</span>) {
        result.add(<span class="kw">new</span> <span class="ty">ArrayList</span><>(current));
        <span class="kw">return</span>;
    }
    <span class="kw">if</span> (remaining < <span class="nu">0</span>) <span class="kw">return</span>; <span class="cm">// prune</span>

    <span class="kw">for</span> (<span class="ty">int</span> i = start; i < candidates.length; i++) {
        current.add(candidates[i]);
        <span class="fn">backtrack</span>(candidates, i, remaining - candidates[i], current, result); <span class="cm">// i not i+1: reuse allowed</span>
        current.remove(current.size() - <span class="nu">1</span>);
    }
}`
      }
    ],
    signals: [
      { cue: '"all subsets", "all combinations", "generate all"', pattern: 'Backtracking — collect at every node' },
      { cue: '"all permutations", "all arrangements"', pattern: 'Backtracking with used[] array' },
      { cue: '"valid", "check if possible" with choices at each step', pattern: 'Backtracking with pruning' },
      { cue: '"word search", "path in grid"', pattern: 'Backtracking on 2D grid with visited[][]' },
      { cue: '"N-Queens", "Sudoku solver"', pattern: 'Backtracking with constraint checking' }
    ],
    mistakes: [
      {
        title: 'Not making a deep copy when adding to result',
        body: 'Always do <code>result.add(new ArrayList&lt;&gt;(current))</code>, not <code>result.add(current)</code>. If you add the reference, all result entries point to the same list and end up empty after backtracking.'
      },
      {
        title: 'Forgetting to unchoose (the backtrack step)',
        body: 'Every "choose" must have a matching "unchoose". Missing the remove/undo step means the current list keeps growing across branches and produces wrong results.'
      },
      {
        title: 'Duplicate results due to missing pruning',
        body: 'For subsets/combinations with duplicate elements, sort first and skip duplicates: <code>if (i > start && nums[i] == nums[i-1]) continue;</code>. Without this, [1,2] appears multiple times if there are two 1s.'
      },
      {
        title: 'Not pruning early enough',
        body: 'In combination sum, check <code>if (remaining < 0) return</code> before the loop, not inside it. Pruning early cuts entire subtrees and is the difference between TLE and passing.'
      }
    ],
    complexity: [
      { variant: 'Subsets', time: 'O(2^n × n) — 2^n subsets, O(n) to copy each', space: 'O(n) recursion depth' },
      { variant: 'Permutations', time: 'O(n! × n)', space: 'O(n)' },
      { variant: 'Combination sum', time: 'O(2^target) in worst case', space: 'O(target) recursion depth' }
    ],
    problems: {
      warmup: [
        {
          id: 'bt_lc78',
          lcUrl: 'https://leetcode.com/problems/subsets/',
          nc: 'https://neetcode.io/problems/subsets',
          yt: 'https://www.youtube.com/watch?v=REOH22Xwdkk',
          name: 'Subsets',
          lc: 'LC 78',
          hint: 'Use the include/exclude template. Add current to result at the start of every call (before the loop). Start index prevents revisiting earlier elements.'
        },
        {
          id: 'bt_lc77',
          lcUrl: 'https://leetcode.com/problems/combinations/',
          yt: 'https://www.youtube.com/watch?v=q0s6m7AiM7o',
          name: 'Combinations',
          lc: 'LC 77',
          hint: 'Same as subsets but only collect when current.size() == k. Prune early: if remaining spots needed > remaining candidates, return.'
        }
      ],
      core: [
        {
          id: 'bt_lc46',
          lcUrl: 'https://leetcode.com/problems/permutations/',
          nc: 'https://neetcode.io/problems/permutations',
          yt: 'https://www.youtube.com/watch?v=s7AvT7cGdSo',
          name: 'Permutations',
          lc: 'LC 46',
          hint: 'Used[] array marks which elements are taken. Collect when current.size() == nums.length. Every element is a candidate at each position — no start index needed.'
        },
        {
          id: 'bt_lc39',
          lcUrl: 'https://leetcode.com/problems/combination-sum/',
          nc: 'https://neetcode.io/problems/combination-target-sum',
          yt: 'https://www.youtube.com/watch?v=GBKI9VSKdGg',
          name: 'Combination Sum',
          lc: 'LC 39',
          hint: 'Same element can be reused — pass i (not i+1) to the next call. Prune when remaining < 0. Collect when remaining == 0.'
        },
        {
          id: 'bt_lc79',
          lcUrl: 'https://leetcode.com/problems/word-search/',
          nc: 'https://neetcode.io/problems/search-for-word',
          yt: 'https://www.youtube.com/watch?v=pfiQ_PS1g8E',
          name: 'Word Search',
          lc: 'LC 79',
          hint: 'Backtracking on a 2D grid. Mark cell as visited before recursing (e.g., set to \'#\'), restore after. 4-directional DFS from each starting cell.'
        }
      ],
      stretch: [
        {
          id: 'bt_lc51',
          lcUrl: 'https://leetcode.com/problems/n-queens/',
          nc: 'https://neetcode.io/problems/n-queens',
          yt: 'https://www.youtube.com/watch?v=Ph95IHmRp5M',
          name: 'N-Queens',
          lc: 'LC 51',
          hint: 'Place one queen per row. Track which columns, diagonals (row-col), and anti-diagonals (row+col) are under attack using three sets. Prune immediately if any conflict.'
        },
        {
          id: 'bt_lc37',
          lcUrl: 'https://leetcode.com/problems/sudoku-solver/',
          yt: 'https://www.youtube.com/watch?v=JzONv5kaPJM',
          name: 'Sudoku Solver',
          lc: 'LC 37',
          hint: 'Find the next empty cell, try digits 1-9, validate constraints (row, col, 3×3 box), recurse. If recursion returns false, backtrack. Return true when the board is full.'
        }
      ]
    },
    selfCheck: [
      'Why do you need new ArrayList<>(current) when adding to result, instead of adding current directly?',
      'What is the difference between the subsets template (start index) and permutations template (used[])?',
      'In combination sum, why do you pass i instead of i+1 to the recursive call?',
      'How do you handle duplicate elements in subsets (LC 90)? What extra step is needed?',
      'Draw the recursion tree for subsets([1,2]) — how many nodes total? How many leaves?'
    ]
  },

  binary_tree: {
    id: 'binary_tree',
    title: 'Binary Tree Traversals',
    phase: 'Phase 3 — Week 7',
    frequency: 'Extremely High',
    dependsOn: ['Recursion + Backtracking'],
    unlocks: ['BST', 'Tree DP', 'Graph BFS/DFS'],
    idea: `Trees are the most asked data structure in FAANG interviews. Almost every tree problem is a DFS or BFS traversal with some logic added at each node.\n\n<strong>DFS (recursive)</strong> — preorder, inorder, postorder. The position of where you process the node (before/between/after children) determines which traversal it is.\n\n<strong>BFS (level order)</strong> — use a queue. Process all nodes of one level before moving to the next.\n\nThe key insight: <em>think about what information flows up from children vs. down from parent.</em> Most DFS problems pass information upward (return values from children). Some pass it downward (parameters to children).`,
    variants: [
      {
        label: 'DFS — Three Traversal Orders',
        visual: `Tree:      1
          / \\
         2   3
        / \\
       4   5

Preorder  (root → left → right): <span class="hl">1 2 4 5 3</span>
  Process node BEFORE visiting children.
  Use: copy tree, serialize tree.

Inorder   (left → root → right): <span class="hl">4 2 5 1 3</span>
  Process node BETWEEN children.
  Use: BST gives sorted order.

Postorder (left → right → root): <span class="hl">4 5 2 3 1</span>
  Process node AFTER children.
  Use: delete tree, compute subtree values (height, sum).`,
        note: null
      },
      {
        label: 'BFS — Level Order',
        visual: `Tree:      1
          / \\
         2   3
        / \\   \\
       4   5   6

queue = [1]
Level 1: poll 1   → output [1],   enqueue [2,3]
Level 2: poll 2,3 → output [2,3], enqueue [4,5,6]
Level 3: poll 4,5,6 → output [4,5,6]

Result: [[<span class="hl">1</span>],[<span class="hl2">2,3</span>],[<span class="hl3">4,5,6</span>]]

<span class="hl3">Key trick:</span> snapshot queue.size() at start of each level.
Process exactly that many nodes before moving to next level.`,
        note: null
      },
      {
        label: 'Information flowing UP vs DOWN',
        visual: `UP (return values): height, diameter, path sum
  Each child returns something useful to the parent.

  int height(node):
    if node == null: return 0
    leftH  = height(node.left)   ← gets info from left
    rightH = height(node.right)  ← gets info from right
    return 1 + max(leftH, rightH) ← passes result up

DOWN (parameters): path from root, running sum
  Parent passes context to children.

  void pathSum(node, currentSum):
    currentSum += node.val        ← parent passes down
    pathSum(node.left, currentSum)
    pathSum(node.right, currentSum)`,
        note: null
      }
    ],
    templates: [
      {
        label: 'DFS — Recursive (Postorder example)',
        code: `<span class="kw">public int</span> <span class="fn">height</span>(<span class="ty">TreeNode</span> node) {
    <span class="kw">if</span> (node == <span class="kw">null</span>) <span class="kw">return</span> <span class="nu">0</span>;              <span class="cm">// base case</span>

    <span class="ty">int</span> leftH  = <span class="fn">height</span>(node.left);           <span class="cm">// explore left</span>
    <span class="ty">int</span> rightH = <span class="fn">height</span>(node.right);          <span class="cm">// explore right</span>

    <span class="kw">return</span> <span class="nu">1</span> + <span class="ty">Math</span>.max(leftH, rightH);       <span class="cm">// process & return up</span>
}`
      },
      {
        label: 'BFS — Level Order',
        code: `<span class="kw">public</span> <span class="ty">List</span><<span class="ty">List</span><<span class="ty">Integer</span>>> <span class="fn">levelOrder</span>(<span class="ty">TreeNode</span> root) {
    <span class="ty">List</span><<span class="ty">List</span><<span class="ty">Integer</span>>> result = <span class="kw">new</span> <span class="ty">ArrayList</span><>();
    <span class="kw">if</span> (root == <span class="kw">null</span>) <span class="kw">return</span> result;

    <span class="ty">Queue</span><<span class="ty">TreeNode</span>> queue = <span class="kw">new</span> <span class="ty">ArrayDeque</span><>();
    queue.offer(root);

    <span class="kw">while</span> (!queue.isEmpty()) {
        <span class="ty">int</span> size = queue.size();                 <span class="cm">// nodes in current level</span>
        <span class="ty">List</span><<span class="ty">Integer</span>> level = <span class="kw">new</span> <span class="ty">ArrayList</span><>();

        <span class="kw">for</span> (<span class="ty">int</span> i = <span class="nu">0</span>; i < size; i++) {
            <span class="ty">TreeNode</span> node = queue.poll();
            level.add(node.val);
            <span class="kw">if</span> (node.left  != <span class="kw">null</span>) queue.offer(node.left);
            <span class="kw">if</span> (node.right != <span class="kw">null</span>) queue.offer(node.right);
        }

        result.add(level);
    }

    <span class="kw">return</span> result;
}`
      },
      {
        label: 'DFS with Global State (Diameter pattern)',
        code: `<span class="kw">private int</span> maxDiameter = <span class="nu">0</span>; <span class="cm">// global — updated at each node</span>

<span class="kw">public int</span> <span class="fn">diameterOfBinaryTree</span>(<span class="ty">TreeNode</span> root) {
    <span class="fn">depth</span>(root);
    <span class="kw">return</span> maxDiameter;
}

<span class="kw">private int</span> <span class="fn">depth</span>(<span class="ty">TreeNode</span> node) {
    <span class="kw">if</span> (node == <span class="kw">null</span>) <span class="kw">return</span> <span class="nu">0</span>;

    <span class="ty">int</span> left  = <span class="fn">depth</span>(node.left);
    <span class="ty">int</span> right = <span class="fn">depth</span>(node.right);

    maxDiameter = <span class="ty">Math</span>.max(maxDiameter, left + right); <span class="cm">// path through this node</span>

    <span class="kw">return</span> <span class="nu">1</span> + <span class="ty">Math</span>.max(left, right);                  <span class="cm">// height returned up</span>
}`
      }
    ],
    signals: [
      { cue: '"height", "depth", "balanced"', pattern: 'Postorder DFS — children compute first, parent uses result' },
      { cue: '"level order", "zigzag", "right side view"', pattern: 'BFS with level size snapshot' },
      { cue: '"path sum", "root to leaf"', pattern: 'Preorder DFS — pass running sum down as parameter' },
      { cue: '"diameter", "max path sum" through any node', pattern: 'Postorder DFS with global variable updated at each node' },
      { cue: '"lowest common ancestor"', pattern: 'Postorder DFS — check left and right subtrees, propagate up' }
    ],
    mistakes: [
      {
        title: 'Confusing height and depth',
        body: 'Height = edges from node to deepest leaf (computed bottom-up). Depth = edges from root to node (passed top-down). Most problems use height — it\'s computed in postorder with return values.'
      },
      {
        title: 'Missing the null base case',
        body: 'Every tree DFS must handle <code>if (node == null) return ...</code> before anything else. Missing it causes NullPointerException on leaf nodes\' children.'
      },
      {
        title: 'Updating the global answer too early (preorder instead of postorder)',
        body: 'For diameter/max-path-sum, update the global answer AFTER computing both children — you need both subtree values to compute the path through the current node.'
      },
      {
        title: 'Not snapshotting queue.size() for level order',
        body: 'In BFS level order, capture <code>int size = queue.size()</code> at the start of each level before the for-loop. If you call queue.size() inside the loop, it changes as you enqueue children.'
      }
    ],
    complexity: [
      { variant: 'DFS (any order)', time: 'O(n) — visits every node once', space: 'O(h) — h = tree height; O(n) worst case for skewed tree' },
      { variant: 'BFS level order', time: 'O(n)', space: 'O(w) — w = max width of tree' }
    ],
    problems: {
      warmup: [
        {
          id: 'bt_lc104',
          lcUrl: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/',
          nc: 'https://neetcode.io/problems/depth-of-binary-tree',
          name: 'Maximum Depth of Binary Tree',
          lc: 'LC 104',
          hint: 'Postorder DFS. Return 0 for null. Return 1 + max(left, right) at each node. Can also do BFS — count levels.'
        },
        {
          id: 'bt_lc226',
          lcUrl: 'https://leetcode.com/problems/invert-binary-tree/',
          nc: 'https://neetcode.io/problems/invert-a-binary-tree',
          yt: 'https://www.youtube.com/watch?v=OnSn2XEQ4MY',
          name: 'Invert Binary Tree',
          lc: 'LC 226',
          hint: 'At each node, swap left and right children, then recurse on both. Order doesn\'t matter (pre or postorder both work). Base case: null → return null.'
        },
        {
          id: 'bt_lc543',
          lcUrl: 'https://leetcode.com/problems/diameter-of-binary-tree/',
          nc: 'https://neetcode.io/problems/binary-tree-diameter',
          yt: 'https://www.youtube.com/watch?v=bkxqA8Rfv04',
          name: 'Diameter of Binary Tree',
          lc: 'LC 543',
          hint: 'Postorder DFS. At each node, diameter through it = left depth + right depth. Update a global max. Return 1 + max(left, right) (height) up to the parent.'
        }
      ],
      core: [
        {
          id: 'bt_lc102',
          lcUrl: 'https://leetcode.com/problems/binary-tree-level-order-traversal/',
          nc: 'https://neetcode.io/problems/level-order-traversal-of-binary-tree',
          yt: 'https://www.youtube.com/watch?v=6ZnyEApgFYg',
          name: 'Binary Tree Level Order Traversal',
          lc: 'LC 102',
          hint: 'BFS. Snapshot queue.size() at start of each level. Inner for-loop processes exactly that many nodes. Collect into a level list, add to result.'
        },
        {
          id: 'bt_lc124',
          lcUrl: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/',
          nc: 'https://neetcode.io/problems/binary-tree-maximum-path-sum',
          yt: 'https://www.youtube.com/watch?v=Hr5cWUld4vU',
          name: 'Binary Tree Maximum Path Sum',
          lc: 'LC 124',
          hint: 'Postorder DFS. At each node, max gain from left = max(0, dfs(left)), same for right. Update global max with node.val + leftGain + rightGain. Return node.val + max(leftGain, rightGain) upward.'
        },
        {
          id: 'bt_lc236',
          lcUrl: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/',
          nc: 'https://neetcode.io/problems/lowest-common-ancestor-in-binary-tree',
          yt: 'https://www.youtube.com/watch?v=gs2LMfuOR9k',
          name: 'Lowest Common Ancestor of a Binary Tree',
          lc: 'LC 236',
          hint: 'Postorder DFS. If node == p or q, return node. Recurse left and right. If both return non-null, current node is LCA. If only one is non-null, bubble that up.'
        }
      ],
      stretch: [
        {
          id: 'bt_lc297',
          lcUrl: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/',
          nc: 'https://neetcode.io/problems/serialize-and-deserialize-binary-tree',
          yt: 'https://www.youtube.com/watch?v=u4JAi2JJhI8',
          name: 'Serialize and Deserialize Binary Tree',
          lc: 'LC 297',
          hint: 'Preorder DFS for serialize — append node value or "null" marker. For deserialize, use a queue of tokens and rebuild preorder recursively. The null markers encode structure.'
        },
        {
          id: 'bt_lc987',
          lcUrl: 'https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/',
          name: 'Vertical Order Traversal of a Binary Tree',
          lc: 'LC 987',
          hint: 'DFS assigning (col, row) to each node. Group nodes by col into a TreeMap (sorted). Within each col, sort by row then value. Collect into result.'
        }
      ]
    },
    selfCheck: [
      'What are the three DFS orders? Give a one-line use case for each.',
      'In postorder DFS, when exactly do you process the current node — before or after children?',
      'In the diameter problem, why do you update the global max AFTER computing both children?',
      'For level order BFS, why must you snapshot queue.size() before the for-loop?',
      'In LCA, what do you return when both left and right recursive calls return non-null?'
    ]
  },

  bst: {
    id: 'bst',
    title: 'Binary Search Tree',
    phase: 'Phase 3 — Week 8',
    frequency: 'High',
    dependsOn: ['Binary Tree Traversals'],
    unlocks: ['Balanced BST (AVL, Red-Black — conceptual)'],
    idea: `A BST is a binary tree with one extra invariant: <em>every node in the left subtree is smaller, every node in the right subtree is larger.</em> This ordering property is what makes BSTs powerful — it lets you eliminate half the tree at every step, just like binary search on an array.\n\nThe key operations:\n<strong>Search / Insert / Delete</strong> — all O(h) where h is height. Balanced BST → O(log n). Degenerate (sorted input) → O(n).\n<strong>Inorder traversal of a BST gives sorted order.</strong> This single fact unlocks many BST problems.\n\nWhen you see a BST problem, always ask: <em>"Can I use the ordering property to prune one subtree entirely?"</em>`,
    variants: [
      {
        label: 'BST Search — Eliminate Half at Each Step',
        visual: `BST:       8
          / \\
         3   10
        / \\    \\
       1   6    14
          / \\   /
         4   7 13

Search for 6:
  node=8:  6 < 8 → go left
  node=3:  6 > 3 → go right
  node=6:  6 == 6 → <span class="hl">found!</span>

Search for 5:
  node=8 → left, node=3 → right
  node=6 → left, node=4 → right
  node=null → <span class="hl">not found</span>`,
        note: null
      },
      {
        label: 'Inorder = Sorted Output',
        visual: `BST:       4
          / \\
         2   6
        / \\ / \\
       1  3 5  7

Inorder (left → root → right):
1 → 2 → 3 → 4 → 5 → 6 → 7

<span class="hl">Always sorted.</span>

This means: "Kth smallest in BST" = stop at the Kth
node during inorder traversal.`,
        note: null
      }
    ],
    templates: [
      {
        label: 'Search in BST',
        code: `<span class="kw">public</span> <span class="ty">TreeNode</span> <span class="fn">search</span>(<span class="ty">TreeNode</span> root, <span class="ty">int</span> target) {
    <span class="kw">if</span> (root == <span class="kw">null</span> || root.val == target) <span class="kw">return</span> root;

    <span class="kw">if</span> (target < root.val) <span class="kw">return</span> <span class="fn">search</span>(root.left,  target);
    <span class="kw">else</span>                   <span class="kw">return</span> <span class="fn">search</span>(root.right, target);
}`
      },
      {
        label: 'Insert into BST',
        code: `<span class="kw">public</span> <span class="ty">TreeNode</span> <span class="fn">insert</span>(<span class="ty">TreeNode</span> root, <span class="ty">int</span> val) {
    <span class="kw">if</span> (root == <span class="kw">null</span>) <span class="kw">return new</span> <span class="ty">TreeNode</span>(val); <span class="cm">// found insertion point</span>

    <span class="kw">if</span> (val < root.val) root.left  = <span class="fn">insert</span>(root.left,  val);
    <span class="kw">else</span>               root.right = <span class="fn">insert</span>(root.right, val);

    <span class="kw">return</span> root;
}`
      },
      {
        label: 'Kth Smallest (Inorder with counter)',
        code: `<span class="kw">private int</span> count = <span class="nu">0</span>, result = <span class="nu">0</span>;

<span class="kw">public int</span> <span class="fn">kthSmallest</span>(<span class="ty">TreeNode</span> root, <span class="ty">int</span> k) {
    <span class="fn">inorder</span>(root, k);
    <span class="kw">return</span> result;
}

<span class="kw">private void</span> <span class="fn">inorder</span>(<span class="ty">TreeNode</span> node, <span class="ty">int</span> k) {
    <span class="kw">if</span> (node == <span class="kw">null</span>) <span class="kw">return</span>;

    <span class="fn">inorder</span>(node.left, k);   <span class="cm">// go left first (smallest)</span>

    count++;
    <span class="kw">if</span> (count == k) { result = node.val; <span class="kw">return</span>; }

    <span class="fn">inorder</span>(node.right, k);
}`
      },
      {
        label: 'Validate BST',
        code: `<span class="kw">public boolean</span> <span class="fn">isValidBST</span>(<span class="ty">TreeNode</span> root) {
    <span class="kw">return</span> <span class="fn">validate</span>(root, <span class="ty">Long</span>.MIN_VALUE, <span class="ty">Long</span>.MAX_VALUE);
}

<span class="kw">private boolean</span> <span class="fn">validate</span>(<span class="ty">TreeNode</span> node, <span class="ty">long</span> min, <span class="ty">long</span> max) {
    <span class="kw">if</span> (node == <span class="kw">null</span>) <span class="kw">return true</span>;

    <span class="kw">if</span> (node.val <= min || node.val >= max) <span class="kw">return false</span>;

    <span class="kw">return</span> <span class="fn">validate</span>(node.left,  min,       node.val) <span class="cm">// left must be < node.val</span>
        && <span class="fn">validate</span>(node.right, node.val,  max);      <span class="cm">// right must be > node.val</span>
}`
      }
    ],
    signals: [
      { cue: '"kth smallest/largest" in a BST', pattern: 'Inorder traversal — stop at kth node' },
      { cue: '"validate BST", "is valid BST"', pattern: 'DFS with min/max bounds passed down' },
      { cue: '"lowest common ancestor" in a BST', pattern: 'Use ordering — if both p,q < node go left, if both > go right, else current node is LCA' },
      { cue: '"convert sorted array to BST"', pattern: 'Recursively pick midpoint as root (like binary search)' },
      { cue: '"inorder successor/predecessor"', pattern: 'BST ordering — successor is leftmost in right subtree' }
    ],
    mistakes: [
      {
        title: 'Validating BST by only checking immediate children',
        body: 'Wrong: checking <code>node.left.val < node.val</code> at each node. A node\'s left subtree must be smaller than ALL ancestors, not just the parent. Pass min/max bounds down through the recursion.'
      },
      {
        title: 'Using Integer bounds when node values can be Integer.MIN_VALUE',
        body: 'If nodes can hold Integer.MIN_VALUE or Integer.MAX_VALUE, using int bounds causes wrong comparisons. Use <code>Long.MIN_VALUE</code> and <code>Long.MAX_VALUE</code> as initial bounds.'
      },
      {
        title: 'Treating BST operations as O(log n) unconditionally',
        body: 'BST operations are O(h). For a balanced BST, h = log n. For a degenerate BST (inserting sorted input), h = n, giving O(n) operations. Always clarify "balanced" with the interviewer.'
      }
    ],
    complexity: [
      { variant: 'Search / Insert / Delete (balanced)', time: 'O(log n)', space: 'O(h)' },
      { variant: 'Search / Insert / Delete (degenerate)', time: 'O(n)', space: 'O(n)' },
      { variant: 'Inorder traversal', time: 'O(n)', space: 'O(h)' }
    ],
    problems: {
      warmup: [
        {
          id: 'bst_lc700',
          lcUrl: 'https://leetcode.com/problems/search-in-a-binary-search-tree/',
          name: 'Search in a Binary Search Tree',
          lc: 'LC 700',
          hint: 'Pure BST search template. If val < root.val go left, else go right. Base case: null or match.'
        },
        {
          id: 'bst_lc701',
          lcUrl: 'https://leetcode.com/problems/insert-into-a-binary-search-tree/',
          name: 'Insert into a Binary Search Tree',
          lc: 'LC 701',
          hint: 'Recurse left or right, assign the return value back to root.left or root.right. When root is null, return a new node — that\'s the insertion point.'
        }
      ],
      core: [
        {
          id: 'bst_lc98',
          lcUrl: 'https://leetcode.com/problems/validate-binary-search-tree/',
          nc: 'https://neetcode.io/problems/valid-binary-search-tree',
          yt: 'https://www.youtube.com/watch?v=s6ATEkipzow',
          name: 'Validate Binary Search Tree',
          lc: 'LC 98',
          hint: 'Pass min and max bounds down. Left child\'s max tightens to node.val. Right child\'s min tightens to node.val. Use Long bounds to handle Integer edge values.'
        },
        {
          id: 'bst_lc230',
          lcUrl: 'https://leetcode.com/problems/kth-smallest-element-in-a-bst/',
          nc: 'https://neetcode.io/problems/kth-smallest-integer-in-bst',
          yt: 'https://www.youtube.com/watch?v=5LUXSvjmGCw',
          name: 'Kth Smallest Element in a BST',
          lc: 'LC 230',
          hint: 'Inorder traversal with a counter. Decrement k at each node. When k reaches 0, you\'ve found the answer. Stop recursing after finding it.'
        },
        {
          id: 'bst_lc235',
          lcUrl: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/',
          nc: 'https://neetcode.io/problems/lowest-common-ancestor-in-binary-search-tree',
          yt: 'https://www.youtube.com/watch?v=gs2LMfuOR9k',
          name: 'Lowest Common Ancestor of a BST',
          lc: 'LC 235',
          hint: 'Use the BST property — if both p and q are less than current, LCA is in the left subtree. If both greater, go right. Otherwise, current node is the LCA.'
        }
      ],
      stretch: [
        {
          id: 'bst_lc108',
          lcUrl: 'https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/',
          yt: 'https://www.youtube.com/watch?v=0K0uCMYq5ng',
          name: 'Convert Sorted Array to Binary Search Tree',
          lc: 'LC 108',
          hint: 'Recursively pick the midpoint as root. Left half becomes left subtree, right half becomes right subtree. Produces a height-balanced BST.'
        },
        {
          id: 'bst_lc99',
          lcUrl: 'https://leetcode.com/problems/recover-binary-search-tree/',
          yt: 'https://www.youtube.com/watch?v=4Mvy0rFbnKA',
          name: 'Recover Binary Search Tree',
          lc: 'LC 99',
          hint: 'Inorder traversal — in a valid BST, inorder is always sorted. Find the two nodes that are out of order. First violation: first node > second. Second violation: second node < first. Swap their values.'
        }
      ]
    },
    selfCheck: [
      'What single property defines a BST, and why does inorder traversal produce sorted output?',
      'Why is checking only immediate parent-child relationships insufficient for BST validation?',
      'In LCA of a BST, how does the ordering property simplify the solution vs. a general binary tree?',
      'What is the worst-case height of a BST and when does it occur?',
      'How do you find the inorder successor of a node in a BST?'
    ]
  },

  tree_dp: {
    id: 'tree_dp',
    title: 'Tree DP / Path Problems',
    phase: 'Phase 3 — Week 8',
    frequency: 'Medium',
    dependsOn: ['Binary Tree Traversals', 'Recursion + Backtracking'],
    unlocks: ['DP on graphs'],
    idea: `Tree DP is a pattern where you compute the answer using values returned from children — the "DP" part is that each subtree's result is used exactly once, and the recursion builds the answer bottom-up.\n\nThe key distinction from regular tree DFS: in tree DP, a node makes a <em>local decision</em> based on what its children return, and that decision affects what it returns to its parent.\n\nThe trickiest part is the <strong>rerooting</strong> insight: when the path can pass through any node (not just root-to-leaf), the answer at each node is computed from both subtrees simultaneously — you update a global answer, then return only the best single-branch value upward.`,
    variants: [
      {
        label: 'Path Through Node vs Path Returned Up',
        visual: `Problem: Maximum Path Sum (any node to any node)

Tree:    -10
         /  \\
        9    20
            /  \\
           15   7

At node 15: gain = 15. Return 15 up.
At node 7:  gain = 7.  Return 7 up.
At node 20:
  leftGain  = max(0, 15) = 15
  rightGain = max(0, 7)  = 7
  <span class="hl">Path THROUGH 20 = 20+15+7 = 42</span>  ← update global max
  Return 20 + max(15,7) = 35 UP    ← can only go one direction

At node 9: gain = 9. Return 9.
At node -10:
  leftGain  = max(0, 9)  = 9
  rightGain = max(0, 35) = 35
  Path through -10 = -10+9+35 = 34  → global max stays 42
  Return -10 + 35 = 25

<span class="hl">Answer: 42</span>`,
        note: null
      }
    ],
    templates: [
      {
        label: 'Generic Tree DP (path through any node)',
        code: `<span class="kw">private int</span> globalMax = <span class="ty">Integer</span>.MIN_VALUE;

<span class="kw">public int</span> <span class="fn">solve</span>(<span class="ty">TreeNode</span> root) {
    <span class="fn">dfs</span>(root);
    <span class="kw">return</span> globalMax;
}

<span class="kw">private int</span> <span class="fn">dfs</span>(<span class="ty">TreeNode</span> node) {
    <span class="kw">if</span> (node == <span class="kw">null</span>) <span class="kw">return</span> <span class="nu">0</span>;

    <span class="cm">// get best gain from each child (ignore negative — take 0 instead)</span>
    <span class="ty">int</span> left  = <span class="ty">Math</span>.max(<span class="nu">0</span>, <span class="fn">dfs</span>(node.left));
    <span class="ty">int</span> right = <span class="ty">Math</span>.max(<span class="nu">0</span>, <span class="fn">dfs</span>(node.right));

    <span class="cm">// path THROUGH this node (both children connected) — update global</span>
    globalMax = <span class="ty">Math</span>.max(globalMax, node.val + left + right);

    <span class="cm">// return the best single-branch value to parent (can't go both ways)</span>
    <span class="kw">return</span> node.val + <span class="ty">Math</span>.max(left, right);
}`
      },
      {
        label: 'Tree DP — Check if Balanced',
        code: `<span class="kw">public boolean</span> <span class="fn">isBalanced</span>(<span class="ty">TreeNode</span> root) {
    <span class="kw">return</span> <span class="fn">checkHeight</span>(root) != -<span class="nu">1</span>;
}

<span class="kw">private int</span> <span class="fn">checkHeight</span>(<span class="ty">TreeNode</span> node) {
    <span class="kw">if</span> (node == <span class="kw">null</span>) <span class="kw">return</span> <span class="nu">0</span>;

    <span class="ty">int</span> left = <span class="fn">checkHeight</span>(node.left);
    <span class="kw">if</span> (left == -<span class="nu">1</span>) <span class="kw">return</span> -<span class="nu">1</span>;   <span class="cm">// propagate failure up</span>

    <span class="ty">int</span> right = <span class="fn">checkHeight</span>(node.right);
    <span class="kw">if</span> (right == -<span class="nu">1</span>) <span class="kw">return</span> -<span class="nu">1</span>;

    <span class="kw">if</span> (<span class="ty">Math</span>.abs(left - right) > <span class="nu">1</span>) <span class="kw">return</span> -<span class="nu">1</span>; <span class="cm">// unbalanced — signal failure</span>

    <span class="kw">return</span> <span class="nu">1</span> + <span class="ty">Math</span>.max(left, right);
}`
      }
    ],
    signals: [
      { cue: '"maximum/minimum path sum" through any two nodes', pattern: 'Tree DP — update global at each node, return single-branch up' },
      { cue: '"diameter" of tree (longest path between any two nodes)', pattern: 'Same pattern — diameter = left depth + right depth at each node' },
      { cue: '"is the tree balanced"', pattern: 'Tree DP — return -1 as sentinel for unbalanced, height otherwise' },
      { cue: '"maximum sum of non-adjacent nodes" in a tree', pattern: 'Tree DP — at each node decide include or exclude, return both options upward' }
    ],
    mistakes: [
      {
        title: 'Returning left + right to parent instead of max(left, right)',
        body: 'You update the global max with <code>left + right + node.val</code> (path through this node). But you can only return ONE branch upward — a path can\'t split. Return <code>node.val + max(left, right)</code>.'
      },
      {
        title: 'Not clamping negative gains to 0',
        body: 'If a subtree has negative max gain, including it makes the path worse. Clamp with <code>Math.max(0, dfs(child))</code> — this means "don\'t extend the path into this subtree if it hurts".'
      },
      {
        title: 'Initializing globalMax to 0 instead of Integer.MIN_VALUE',
        body: 'If all nodes are negative, the answer is a single (least-negative) node. Initializing to 0 incorrectly implies an empty path is valid. Use <code>Integer.MIN_VALUE</code>.'
      }
    ],
    complexity: [
      { variant: 'Tree DP (any path problem)', time: 'O(n) — each node visited once', space: 'O(h) recursion stack' }
    ],
    problems: {
      warmup: [
        {
          id: 'tdp_lc543',
          lcUrl: 'https://leetcode.com/problems/diameter-of-binary-tree/',
          nc: 'https://neetcode.io/problems/binary-tree-diameter',
          yt: 'https://www.youtube.com/watch?v=bkxqA8Rfv04',
          name: 'Diameter of Binary Tree',
          lc: 'LC 543',
          hint: 'Diameter at each node = left depth + right depth. Update global max. Return 1 + max(left, right) upward. This is the simplest tree DP — master it before moving on.'
        },
        {
          id: 'tdp_lc110',
          lcUrl: 'https://leetcode.com/problems/balanced-binary-tree/',
          nc: 'https://neetcode.io/problems/balanced-binary-tree',
          name: 'Balanced Binary Tree',
          lc: 'LC 110',
          hint: 'Return height normally, but return -1 as a sentinel if subtree is unbalanced. Propagate -1 upward immediately when detected.'
        }
      ],
      core: [
        {
          id: 'tdp_lc124',
          lcUrl: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/',
          nc: 'https://neetcode.io/problems/binary-tree-maximum-path-sum',
          yt: 'https://www.youtube.com/watch?v=Hr5cWUld4vU',
          name: 'Binary Tree Maximum Path Sum',
          lc: 'LC 124',
          hint: 'The canonical tree DP problem. At each node: clamp children gains to 0, update global with left+right+node.val, return node.val+max(left,right). Initialize globalMax to Integer.MIN_VALUE.'
        },
        {
          id: 'tdp_lc1372',
          lcUrl: 'https://leetcode.com/problems/longest-zigzag-path-in-a-binary-tree/',
          name: 'Longest ZigZag Path in a Binary Tree',
          lc: 'LC 1372',
          hint: 'DFS passing direction and current length. At each node, extending in the same direction resets count to 1. Extending in the opposite direction increments. Update global max at each node.'
        }
      ],
      stretch: [
        {
          id: 'tdp_lc337',
          lcUrl: 'https://leetcode.com/problems/house-robber-iii/',
          yt: 'https://www.youtube.com/watch?v=nHR8ytpzz7c',
          name: 'House Robber III',
          lc: 'LC 337',
          hint: 'At each node, return a pair [rob, skip] — max money if you rob this node vs. skip it. rob = node.val + left.skip + right.skip. skip = max(left.rob, left.skip) + max(right.rob, right.skip).'
        },
        {
          id: 'tdp_lc968',
          lcUrl: 'https://leetcode.com/problems/binary-tree-cameras/',
          yt: 'https://www.youtube.com/watch?v=iCJBfAR98pc',
          name: 'Binary Tree Cameras',
          lc: 'LC 968',
          hint: 'Greedy tree DP. Each node returns one of three states: 0=not covered, 1=has camera, 2=covered without camera. Place cameras at leaves\' parents (postorder). If child returns 0, parent must have camera.'
        }
      ]
    },
    selfCheck: [
      'In max path sum, why do you return node.val + max(left,right) to the parent, not node.val + left + right?',
      'Why do you clamp subtree gains to 0 with Math.max(0, dfs(child))?',
      'Why initialize globalMax to Integer.MIN_VALUE, not 0?',
      'What two values does each node return in House Robber III, and what do they mean?',
      'How is tree DP different from regular postorder DFS — what extra thing happens at each node?'
    ]
  },

  trie: {
    id: 'trie',
    title: 'Trie',
    phase: 'Phase 3 — Week 9',
    frequency: 'Medium',
    dependsOn: ['Hashing / Frequency Map'],
    unlocks: ['Advanced string search'],
    idea: `A <strong>Trie</strong> (prefix tree) is a tree where each node represents one character and paths from root to nodes represent prefixes. It's the right structure when you need to:\n<strong>1.</strong> Check if a word exists: O(m) where m = word length.\n<strong>2.</strong> Check if any word starts with a prefix: O(m).\n<strong>3.</strong> Find all words sharing a prefix.\n\nA HashMap can check exact word existence in O(1), but it can't answer prefix queries without checking all keys. Trie trades space for prefix query efficiency.\n\nIn Java, each TrieNode typically has a <code>TrieNode[26]</code> children array (for lowercase letters) and a boolean <code>isEnd</code> flag.`,
    variants: [
      {
        label: 'Trie Structure and Insert',
        visual: `Insert: "cat", "car", "card", "care"

root
 └─ c
     └─ a
         └─ t (isEnd=true)  ← "cat"
         └─ r (isEnd=true)  ← "car"
             └─ d (isEnd=true)  ← "card"
             └─ e (isEnd=true)  ← "care"

Search "car"  → follow c→a→r, isEnd=true  → <span class="hl">found</span>
Search "ca"   → follow c→a,   isEnd=false → <span class="hl">not a word, but a prefix</span>
Search "cat"  → follow c→a→t, isEnd=true  → <span class="hl">found</span>
Search "cab"  → c→a→b=null                → <span class="hl">not found</span>`,
        note: null
      }
    ],
    templates: [
      {
        label: 'Trie Node + Insert + Search + StartsWith',
        code: `<span class="kw">class</span> <span class="ty">TrieNode</span> {
    <span class="ty">TrieNode</span>[] children = <span class="kw">new</span> <span class="ty">TrieNode</span>[<span class="nu">26</span>];
    <span class="ty">boolean</span> isEnd = <span class="kw">false</span>;
}

<span class="kw">class</span> <span class="ty">Trie</span> {
    <span class="kw">private</span> <span class="ty">TrieNode</span> root = <span class="kw">new</span> <span class="ty">TrieNode</span>();

    <span class="kw">public void</span> <span class="fn">insert</span>(<span class="ty">String</span> word) {
        <span class="ty">TrieNode</span> node = root;
        <span class="kw">for</span> (<span class="ty">char</span> c : word.toCharArray()) {
            <span class="ty">int</span> i = c - <span class="st">'a'</span>;
            <span class="kw">if</span> (node.children[i] == <span class="kw">null</span>)
                node.children[i] = <span class="kw">new</span> <span class="ty">TrieNode</span>();
            node = node.children[i];
        }
        node.isEnd = <span class="kw">true</span>;
    }

    <span class="kw">public boolean</span> <span class="fn">search</span>(<span class="ty">String</span> word) {
        <span class="ty">TrieNode</span> node = <span class="fn">traverse</span>(word);
        <span class="kw">return</span> node != <span class="kw">null</span> && node.isEnd;
    }

    <span class="kw">public boolean</span> <span class="fn">startsWith</span>(<span class="ty">String</span> prefix) {
        <span class="kw">return</span> <span class="fn">traverse</span>(prefix) != <span class="kw">null</span>;
    }

    <span class="kw">private</span> <span class="ty">TrieNode</span> <span class="fn">traverse</span>(<span class="ty">String</span> s) {
        <span class="ty">TrieNode</span> node = root;
        <span class="kw">for</span> (<span class="ty">char</span> c : s.toCharArray()) {
            <span class="ty">int</span> i = c - <span class="st">'a'</span>;
            <span class="kw">if</span> (node.children[i] == <span class="kw">null</span>) <span class="kw">return null</span>;
            node = node.children[i];
        }
        <span class="kw">return</span> node;
    }
}`
      },
      {
        label: 'Trie + Backtracking (Word Search II)',
        code: `<span class="cm">// Build trie from word list, then DFS on grid</span>
<span class="kw">private void</span> <span class="fn">dfs</span>(<span class="ty">char</span>[][] board, <span class="ty">int</span> r, <span class="ty">int</span> c,
                  <span class="ty">TrieNode</span> node, <span class="ty">StringBuilder</span> path,
                  <span class="ty">Set</span><<span class="ty">String</span>> result) {
    <span class="kw">if</span> (r < <span class="nu">0</span> || r >= board.length || c < <span class="nu">0</span> || c >= board[<span class="nu">0</span>].length) <span class="kw">return</span>;
    <span class="ty">char</span> ch = board[r][c];
    <span class="kw">if</span> (ch == <span class="st">'#'</span> || node.children[ch - <span class="st">'a'</span>] == <span class="kw">null</span>) <span class="kw">return</span>; <span class="cm">// prune</span>

    node = node.children[ch - <span class="st">'a'</span>];
    path.append(ch);
    <span class="kw">if</span> (node.isEnd) result.add(path.toString());

    board[r][c] = <span class="st">'#'</span>;                                        <span class="cm">// mark visited</span>
    <span class="ty">int</span>[][] dirs = {{<span class="nu">0</span>,<span class="nu">1</span>},{<span class="nu">0</span>,-<span class="nu">1</span>},{<span class="nu">1</span>,<span class="nu">0</span>},{-<span class="nu">1</span>,<span class="nu">0</span>}};
    <span class="kw">for</span> (<span class="ty">int</span>[] d : dirs) <span class="fn">dfs</span>(board, r+d[<span class="nu">0</span>], c+d[<span class="nu">1</span>], node, path, result);
    board[r][c] = ch;                                           <span class="cm">// restore</span>
    path.deleteCharAt(path.length() - <span class="nu">1</span>);
}`
      }
    ],
    signals: [
      { cue: '"implement autocomplete", "prefix search"', pattern: 'Trie with startsWith' },
      { cue: '"find all words on a board" (multiple words)', pattern: 'Trie + backtracking DFS on grid' },
      { cue: '"word dictionary with wildcard \'.\'"', pattern: 'Trie with DFS on \'.\' to try all children' },
      { cue: 'Many strings sharing prefixes, prefix queries are frequent', pattern: 'Trie (more efficient than repeated HashMap lookups)' }
    ],
    mistakes: [
      {
        title: 'Confusing search() and startsWith()',
        body: '<code>search("car")</code> requires node.isEnd = true at the end. <code>startsWith("car")</code> just requires the path to exist — isEnd doesn\'t matter. Many bugs come from forgetting to check isEnd in search.'
      },
      {
        title: 'Using a HashMap<Character, TrieNode> when array suffices',
        body: 'For lowercase English letters, <code>TrieNode[26]</code> with index <code>c - \'a\'</code> is faster and simpler. Use a HashMap only when the character set is large or unknown.'
      },
      {
        title: 'Not restoring board cells in Word Search II',
        body: 'When using trie + backtracking on a grid, mark the cell as visited (e.g., set to \'#\') before recursing and restore it after. Without this, a cell can be used twice in the same path.'
      }
    ],
    complexity: [
      { variant: 'Insert / Search / StartsWith', time: 'O(m) — m = word length', space: 'O(m) per word, O(total characters) total' },
      { variant: 'Word Search II (board + word list)', time: 'O(M × 4 × 3^(L-1)) — M=cells, L=word length', space: 'O(total word characters) for trie' }
    ],
    problems: {
      warmup: [
        {
          id: 'tr_lc208',
          lcUrl: 'https://leetcode.com/problems/implement-trie-prefix-tree/',
          nc: 'https://neetcode.io/problems/implement-prefix-tree',
          yt: 'https://www.youtube.com/watch?v=oobqoCJlHA0',
          name: 'Implement Trie (Prefix Tree)',
          lc: 'LC 208',
          hint: 'Build the TrieNode class and the three methods from the template. The traverse() helper avoids code duplication between search and startsWith.'
        }
      ],
      core: [
        {
          id: 'tr_lc211',
          lcUrl: 'https://leetcode.com/problems/design-add-and-search-words-data-structure/',
          nc: 'https://neetcode.io/problems/design-word-search-data-structure',
          yt: 'https://www.youtube.com/watch?v=BTf05gs_8iU',
          name: 'Design Add and Search Words Data Structure',
          lc: 'LC 211',
          hint: 'Trie where \'.\' is a wildcard. In search, when you see \'.\', try all 26 children recursively. Use DFS through the trie for wildcard positions.'
        },
        {
          id: 'tr_lc648',
          lcUrl: 'https://leetcode.com/problems/replace-words/',
          name: 'Replace Words',
          lc: 'LC 648',
          hint: 'Build a trie from the root dictionary. For each word in the sentence, traverse the trie character by character — if you hit an isEnd node, replace the word with the prefix so far.'
        }
      ],
      stretch: [
        {
          id: 'tr_lc212',
          lcUrl: 'https://leetcode.com/problems/word-search-ii/',
          nc: 'https://neetcode.io/problems/search-for-word-ii',
          yt: 'https://www.youtube.com/watch?v=asbcE9mZz_U',
          name: 'Word Search II',
          lc: 'LC 212',
          hint: 'Build trie from word list. DFS on every board cell, navigating the trie simultaneously — prune when the trie has no child for the current character. Collect words when isEnd is hit. Optimization: remove words from trie after finding them.'
        }
      ]
    },
    selfCheck: [
      'What is the difference between search() and startsWith() in a trie?',
      'Why use TrieNode[26] instead of HashMap<Character, TrieNode>? When would you prefer the HashMap?',
      'In Word Search II, how does the trie enable pruning that a plain set of words cannot?',
      'What does the isEnd flag represent — why not just store the full word at a leaf?',
      'What is the space complexity of a trie storing n words of average length m?'
    ]
  },

  // ── Phase 4 ──────────────────────────────────────────────────────────────

  graph_bfs_dfs: {
    id: 'graph_bfs_dfs',
    title: 'Graph BFS / DFS',
    phase: 'Phase 4 — Week 10',
    frequency: 'Extremely High',
    dependsOn: ['Queue + Monotonic Deque', 'Recursion + Backtracking'],
    unlocks: ['Topological Sort', 'Union Find', 'Shortest Path'],
    idea: `A graph is a set of nodes connected by edges. Unlike trees, graphs can have cycles — so you must track <em>visited</em> nodes to avoid infinite loops.\n\n<strong>DFS</strong> — go as deep as possible before backtracking. Uses a stack (recursion call stack, or explicit). Good for: connected components, cycle detection, path existence, flood fill.\n\n<strong>BFS</strong> — explore all neighbors at the current depth before going deeper. Uses a queue. Good for: <em>shortest path in an unweighted graph</em> (BFS always finds it first), level-by-level processing.\n\nThe two representations you'll encounter: <strong>adjacency list</strong> (most common in interview problems) and <strong>implicit graph</strong> (2D grid — neighbors are the 4 or 8 adjacent cells).`,
    variants: [
      {
        label: 'Graph Representations',
        visual: `Adjacency List (most common in code):
graph = {
  0: [1, 2],
  1: [0, 3],
  2: [0],
  3: [1]
}

2D Grid as Implicit Graph:
grid = [[1,1,0],
        [1,0,0],
        [0,0,1]]

Neighbors of cell (r,c): (r±1,c) and (r,c±1)
No need to build explicit adjacency list.`,
        note: null
      },
      {
        label: 'BFS — Shortest Path in Unweighted Graph',
        visual: `Graph: 0─1─3
              |
              2

Find shortest path from 0 to 3.

queue=[0], visited={0}, dist={0:0}

Poll 0 → neighbors [1,2]:
  1 unvisited → dist[1]=1, enqueue. visited={0,1,2}
  2 unvisited → dist[2]=1, enqueue.
  queue=[1,2]

Poll 1 → neighbors [0,3]:
  0 visited → skip
  3 unvisited → dist[3]=<span class="hl">2</span>, enqueue.
  queue=[2,3]

Poll 2 → neighbors [0]: all visited.
Poll 3 → target reached. Distance = <span class="hl">2</span>.

<span class="hl3">BFS guarantees shortest path in unweighted graphs
because it explores by increasing distance.</span>`,
        note: null
      },
      {
        label: 'DFS — Flood Fill / Connected Components',
        visual: `grid = [[1,1,0],    Find number of islands (connected 1s).
         [1,0,0],
         [0,0,1]]

DFS from (0,0): mark (0,0),(0,1),(1,0) visited → island 1
DFS from (2,2): mark (2,2) visited → island 2

<span class="hl">Answer: 2 islands</span>

At each unvisited land cell: run DFS to mark
entire connected component as visited,
increment island count.`,
        note: null
      }
    ],
    templates: [
      {
        label: 'Graph BFS — Shortest Path',
        code: `<span class="kw">public int</span> <span class="fn">bfs</span>(<span class="ty">Map</span><<span class="ty">Integer</span>,<span class="ty">List</span><<span class="ty">Integer</span>>> graph, <span class="ty">int</span> src, <span class="ty">int</span> dst) {
    <span class="ty">Queue</span><<span class="ty">Integer</span>> queue   = <span class="kw">new</span> <span class="ty">ArrayDeque</span>();
    <span class="ty">Set</span><<span class="ty">Integer</span>>   visited = <span class="kw">new</span> <span class="ty">HashSet</span>();
    queue.offer(src);
    visited.add(src);
    <span class="ty">int</span> dist = <span class="nu">0</span>;

    <span class="kw">while</span> (!queue.isEmpty()) {
        <span class="ty">int</span> size = queue.size();          <span class="cm">// nodes at current distance</span>
        <span class="kw">for</span> (<span class="ty">int</span> i = <span class="nu">0</span>; i < size; i++) {
            <span class="ty">int</span> node = queue.poll();
            <span class="kw">if</span> (node == dst) <span class="kw">return</span> dist;

            <span class="kw">for</span> (<span class="ty">int</span> nb : graph.getOrDefault(node, <span class="ty">Collections</span>.emptyList())) {
                <span class="kw">if</span> (!visited.contains(nb)) {
                    visited.add(nb);
                    queue.offer(nb);
                }
            }
        }
        dist++;
    }
    <span class="kw">return</span> -<span class="nu">1</span>; <span class="cm">// not reachable</span>
}`
      },
      {
        label: 'Graph DFS — Connected Components',
        code: `<span class="kw">public int</span> <span class="fn">countComponents</span>(<span class="ty">int</span> n, <span class="ty">int</span>[][] edges) {
    <span class="ty">List</span><<span class="ty">List</span><<span class="ty">Integer</span>>> graph = <span class="kw">new</span> <span class="ty">ArrayList</span>();
    <span class="kw">for</span> (<span class="ty">int</span> i = <span class="nu">0</span>; i < n; i++) graph.add(<span class="kw">new</span> <span class="ty">ArrayList</span>());
    <span class="kw">for</span> (<span class="ty">int</span>[] e : edges) {
        graph.get(e[<span class="nu">0</span>]).add(e[<span class="nu">1</span>]);
        graph.get(e[<span class="nu">1</span>]).add(e[<span class="nu">0</span>]);
    }

    <span class="ty">boolean</span>[] visited = <span class="kw">new boolean</span>[n];
    <span class="ty">int</span> count = <span class="nu">0</span>;
    <span class="kw">for</span> (<span class="ty">int</span> i = <span class="nu">0</span>; i < n; i++) {
        <span class="kw">if</span> (!visited[i]) { <span class="fn">dfs</span>(graph, visited, i); count++; }
    }
    <span class="kw">return</span> count;
}

<span class="kw">private void</span> <span class="fn">dfs</span>(<span class="ty">List</span><<span class="ty">List</span><<span class="ty">Integer</span>>> graph, <span class="ty">boolean</span>[] visited, <span class="ty">int</span> node) {
    visited[node] = <span class="kw">true</span>;
    <span class="kw">for</span> (<span class="ty">int</span> nb : graph.get(node))
        <span class="kw">if</span> (!visited[nb]) <span class="fn">dfs</span>(graph, visited, nb);
}`
      },
      {
        label: 'Grid BFS — Multi-Source',
        code: `<span class="cm">// Multi-source BFS: start from ALL sources simultaneously</span>
<span class="cm">// Classic use: 0-1 matrix (distance from nearest 0)</span>
<span class="kw">public int</span>[][] <span class="fn">updateMatrix</span>(<span class="ty">int</span>[][] mat) {
    <span class="ty">int</span> m = mat.length, n = mat[<span class="nu">0</span>].length;
    <span class="ty">int</span>[][] dist = <span class="kw">new int</span>[m][n];
    <span class="ty">Queue</span><<span class="ty">int</span>[]> queue = <span class="kw">new</span> <span class="ty">ArrayDeque</span>();

    <span class="kw">for</span> (<span class="ty">int</span> r = <span class="nu">0</span>; r < m; r++)
        <span class="kw">for</span> (<span class="ty">int</span> c = <span class="nu">0</span>; c < n; c++) {
            <span class="kw">if</span> (mat[r][c] == <span class="nu">0</span>) { queue.offer(<span class="kw">new int</span>[]{r,c}); }
            <span class="kw">else</span>                  { dist[r][c] = <span class="ty">Integer</span>.MAX_VALUE; }
        }

    <span class="ty">int</span>[][] dirs = {{<span class="nu">0</span>,<span class="nu">1</span>},{<span class="nu">0</span>,-<span class="nu">1</span>},{<span class="nu">1</span>,<span class="nu">0</span>},{-<span class="nu">1</span>,<span class="nu">0</span>}};
    <span class="kw">while</span> (!queue.isEmpty()) {
        <span class="ty">int</span>[] cur = queue.poll();
        <span class="kw">for</span> (<span class="ty">int</span>[] d : dirs) {
            <span class="ty">int</span> nr = cur[<span class="nu">0</span>]+d[<span class="nu">0</span>], nc = cur[<span class="nu">1</span>]+d[<span class="nu">1</span>];
            <span class="kw">if</span> (nr>=<span class="nu">0</span> && nr<m && nc>=<span class="nu">0</span> && nc<n && dist[nr][nc]==<span class="ty">Integer</span>.MAX_VALUE) {
                dist[nr][nc] = dist[cur[<span class="nu">0</span>]][cur[<span class="nu">1</span>]] + <span class="nu">1</span>;
                queue.offer(<span class="kw">new int</span>[]{nr, nc});
            }
        }
    }
    <span class="kw">return</span> dist;
}`
      }
    ],
    signals: [
      { cue: '"connected components", "number of islands", "flood fill"', pattern: 'DFS or BFS — mark visited, count components' },
      { cue: '"shortest path" in unweighted graph or grid', pattern: 'BFS — guarantees shortest path' },
      { cue: '"can you reach X from Y"', pattern: 'DFS — simpler when only reachability needed' },
      { cue: '"distance from nearest X" for every cell', pattern: 'Multi-source BFS — enqueue all sources at start' },
      { cue: '"cycle in undirected/directed graph"', pattern: 'DFS with visited + recursion stack (directed) or parent tracking (undirected)' }
    ],
    mistakes: [
      {
        title: 'Marking visited after enqueue, not before',
        body: 'Mark a node visited <em>when you enqueue it</em>, not when you dequeue it. If you wait until dequeue, the same node gets enqueued multiple times — O(V+E) becomes O(V²) or causes wrong answers.'
      },
      {
        title: 'Using BFS for cycle detection in directed graphs',
        body: 'BFS detects cycles in undirected graphs (check if neighbor is visited and not the parent). For directed graphs, you need DFS with a recursion stack (or topological sort — if it fails, there\'s a cycle).'
      },
      {
        title: 'Forgetting bounds check in grid problems',
        body: 'Always check <code>r >= 0 && r < rows && c >= 0 && c < cols</code> before accessing grid[r][c]. Missing any condition causes ArrayIndexOutOfBoundsException.'
      },
      {
        title: 'Rebuilding the graph inside the wrong function',
        body: 'Build the adjacency list once before any DFS/BFS calls, not inside the recursive DFS. Rebuilding per call is O(V+E) wasted work per node.'
      }
    ],
    complexity: [
      { variant: 'BFS / DFS on graph', time: 'O(V + E)', space: 'O(V) — visited set + queue/stack' },
      { variant: 'BFS / DFS on grid (m×n)', time: 'O(m × n)', space: 'O(m × n)' },
      { variant: 'Multi-source BFS', time: 'O(m × n)', space: 'O(m × n)' }
    ],
    problems: {
      warmup: [
        {
          id: 'gr_lc733',
          lcUrl: 'https://leetcode.com/problems/flood-fill/',
          yt: 'https://www.youtube.com/watch?v=aehEcTEPtCs',
          name: 'Flood Fill',
          lc: 'LC 733',
          hint: 'DFS from the starting cell. Change color as you visit. Only recurse into cells with the original color. Base case: out of bounds or wrong color.'
        },
        {
          id: 'gr_lc200',
          lcUrl: 'https://leetcode.com/problems/number-of-islands/',
          nc: 'https://neetcode.io/problems/count-number-of-islands',
          yt: 'https://www.youtube.com/watch?v=pV2kpPD66nE',
          name: 'Number of Islands',
          lc: 'LC 200',
          hint: 'For each unvisited land cell (\'1\'), run DFS to mark the whole island visited (change to \'0\' or use a visited array). Count how many DFS calls you make.'
        }
      ],
      core: [
        {
          id: 'gr_lc994',
          lcUrl: 'https://leetcode.com/problems/rotting-oranges/',
          nc: 'https://neetcode.io/problems/rotting-fruit',
          yt: 'https://www.youtube.com/watch?v=y704fEOx0s0',
          name: 'Rotting Oranges',
          lc: 'LC 994',
          hint: 'Multi-source BFS. Enqueue all rotten oranges at time 0. BFS spreads rot level by level — each level = 1 minute. Answer = total levels elapsed. If fresh oranges remain after BFS, return -1.'
        },
        {
          id: 'gr_lc207',
          lcUrl: 'https://leetcode.com/problems/course-schedule/',
          nc: 'https://neetcode.io/problems/course-schedule',
          yt: 'https://www.youtube.com/watch?v=EgI5nU9etnU',
          name: 'Course Schedule',
          lc: 'LC 207',
          hint: 'Directed graph cycle detection via DFS. Three states per node: 0=unvisited, 1=in-progress, 2=done. If you visit an in-progress node, there\'s a cycle → return false.'
        },
        {
          id: 'gr_lc130',
          lcUrl: 'https://leetcode.com/problems/surrounded-regions/',
          nc: 'https://neetcode.io/problems/surrounded-regions',
          name: 'Surrounded Regions',
          lc: 'LC 130',
          hint: 'Reverse thinking: instead of finding enclosed regions, mark all \'O\'s connected to the border as safe (DFS from border cells). Flip remaining \'O\'s to \'X\', restore safe ones to \'O\'.'
        }
      ],
      stretch: [
        {
          id: 'gr_lc127',
          lcUrl: 'https://leetcode.com/problems/word-ladder/',
          nc: 'https://neetcode.io/problems/word-ladder',
          yt: 'https://www.youtube.com/watch?v=h9iTnkgv05E',
          name: 'Word Ladder',
          lc: 'LC 127',
          hint: 'BFS where each word is a node and edges connect words differing by one letter. For each word, generate all one-letter variants and check if they\'re in the word list. Shortest path = answer.'
        },
        {
          id: 'gr_lc286',
          lcUrl: 'https://leetcode.com/problems/walls-and-gates/',
          name: 'Walls and Gates',
          lc: 'LC 286',
          hint: 'Multi-source BFS from all gates simultaneously. BFS naturally fills in minimum distances — each cell gets updated only once with its shortest distance to any gate.'
        }
      ]
    },
    selfCheck: [
      'Why must you mark nodes visited when enqueuing, not when dequeuing?',
      'Why does BFS guarantee the shortest path in an unweighted graph but DFS does not?',
      'In directed graph cycle detection with DFS, what are the three node states and what does each mean?',
      'What is multi-source BFS and when is it more efficient than running BFS from each source separately?',
      'For a grid of size m×n, what is the time and space complexity of BFS/DFS?'
    ]
  },

  topological_sort: {
    id: 'topological_sort',
    title: 'Topological Sort',
    phase: 'Phase 4 — Week 10',
    frequency: 'High',
    dependsOn: ['Graph BFS / DFS'],
    unlocks: ['DP on DAGs'],
    idea: `Topological sort orders nodes in a <strong>Directed Acyclic Graph (DAG)</strong> so that every edge goes from left to right — if there's an edge A → B, then A appears before B in the ordering. It's the answer to any "dependency ordering" problem.\n\n<strong>Two algorithms:</strong>\n<strong>Kahn's (BFS-based)</strong> — track in-degree of each node. Start with all nodes that have no dependencies (in-degree 0). Process them, reduce neighbors' in-degrees, enqueue newly zero-in-degree nodes. If all nodes are processed → valid DAG. If nodes remain → cycle exists.\n\n<strong>DFS-based</strong> — DFS on every node, push to a stack on the way back up (postorder). Reverse the stack to get topological order.\n\nKahn's is usually preferred in interviews — it detects cycles naturally and is iterative.`,
    variants: [
      {
        label: `Kahn's Algorithm (BFS + In-degree)`,
        visual: `Courses: 0→2, 1→2, 1→3, 2→4 (prerequisite → course)

In-degree: {0:0, 1:0, 2:2, 3:1, 4:1}

Queue (in-degree 0): [0, 1]   order=[]

Poll 0 → order=[0], reduce neighbors: 2 in-degree 1
Poll 1 → order=[0,1], reduce: 2→0 (enqueue), 3→0 (enqueue)
  queue=[2,3]

Poll 2 → order=[0,1,2], reduce: 4→0 (enqueue)
Poll 3 → order=[0,1,2,3]
  queue=[4]

Poll 4 → order=[0,1,2,3,4]

Processed 5 nodes == total nodes → <span class="hl">no cycle, valid order</span>
If processed < total → <span class="hl3">cycle detected</span>`,
        note: null
      },
      {
        label: 'DFS-based Topological Sort',
        visual: `Graph: A→C, B→C, B→D, C→E

DFS from A: go deep to C→E. E has no neighbors.
  Push E, then C, then A.
DFS from B: C already visited. Push D, then B.

Stack (push order): E, C, A, D, B
Reverse: <span class="hl">B, D, A, C, E</span>  or  <span class="hl">A, B, C, D, E</span>

(Multiple valid orderings exist for the same DAG)`,
        note: null
      }
    ],
    templates: [
      {
        label: `Kahn's Algorithm`,
        code: `<span class="kw">public int</span>[] <span class="fn">topoSort</span>(<span class="ty">int</span> n, <span class="ty">int</span>[][] prerequisites) {
    <span class="ty">List</span><<span class="ty">List</span><<span class="ty">Integer</span>>> graph  = <span class="kw">new</span> <span class="ty">ArrayList</span>();
    <span class="ty">int</span>[] inDegree = <span class="kw">new int</span>[n];
    <span class="kw">for</span> (<span class="ty">int</span> i = <span class="nu">0</span>; i < n; i++) graph.add(<span class="kw">new</span> <span class="ty">ArrayList</span>());

    <span class="kw">for</span> (<span class="ty">int</span>[] pre : prerequisites) {
        graph.get(pre[<span class="nu">1</span>]).add(pre[<span class="nu">0</span>]); <span class="cm">// pre[1] must come before pre[0]</span>
        inDegree[pre[<span class="nu">0</span>]]++;
    }

    <span class="ty">Queue</span><<span class="ty">Integer</span>> queue = <span class="kw">new</span> <span class="ty">ArrayDeque</span>();
    <span class="kw">for</span> (<span class="ty">int</span> i = <span class="nu">0</span>; i < n; i++)
        <span class="kw">if</span> (inDegree[i] == <span class="nu">0</span>) queue.offer(i);

    <span class="ty">int</span>[] order = <span class="kw">new int</span>[n];
    <span class="ty">int</span>   idx   = <span class="nu">0</span>;

    <span class="kw">while</span> (!queue.isEmpty()) {
        <span class="ty">int</span> node = queue.poll();
        order[idx++] = node;
        <span class="kw">for</span> (<span class="ty">int</span> nb : graph.get(node))
            <span class="kw">if</span> (--inDegree[nb] == <span class="nu">0</span>) queue.offer(nb);
    }

    <span class="kw">return</span> idx == n ? order : <span class="kw">new int</span>[<span class="nu">0</span>]; <span class="cm">// empty = cycle detected</span>
}`
      },
      {
        label: 'DFS-based Topological Sort',
        code: `<span class="kw">private void</span> <span class="fn">dfs</span>(<span class="ty">int</span> node, <span class="ty">boolean</span>[] visited,
                  <span class="ty">Deque</span><<span class="ty">Integer</span>> stack,
                  <span class="ty">List</span><<span class="ty">List</span><<span class="ty">Integer</span>>> graph) {
    visited[node] = <span class="kw">true</span>;
    <span class="kw">for</span> (<span class="ty">int</span> nb : graph.get(node))
        <span class="kw">if</span> (!visited[nb]) <span class="fn">dfs</span>(nb, visited, stack, graph);
    stack.push(node); <span class="cm">// push AFTER all descendants are processed</span>
}

<span class="cm">// In main: run dfs for each unvisited node, then pop stack for order</span>`
      }
    ],
    signals: [
      { cue: '"prerequisites", "course schedule", "build order"', pattern: 'Topological sort — dependency ordering' },
      { cue: '"can all tasks be completed" with dependencies', pattern: 'Kahn\'s — if processed count < n, cycle exists' },
      { cue: '"order in which to compile modules", "job scheduling"', pattern: 'Topological sort' },
      { cue: 'Problem mentions a DAG explicitly', pattern: 'Topological sort or DP on DAG' }
    ],
    mistakes: [
      {
        title: 'Building edges in the wrong direction',
        body: 'If "A is a prerequisite of B" means A must come before B, the edge goes A → B. An edge in the adjacency list represents "completing A unlocks B". Getting this backwards reverses the entire ordering.'
      },
      {
        title: 'Not detecting cycles — returning partial order silently',
        body: 'Always check <code>idx == n</code> after Kahn\'s. If fewer than n nodes were processed, a cycle exists. Returning a partial order as if valid is a silent wrong answer.'
      },
      {
        title: 'Applying topological sort to undirected or cyclic graphs',
        body: 'Topological sort is only defined for Directed Acyclic Graphs. On an undirected graph, every edge creates a "cycle" in both directions. On a cyclic directed graph, it will correctly return empty — but don\'t confuse that with "no valid ordering exists for a valid DAG."'
      }
    ],
    complexity: [
      { variant: 'Kahn\'s (BFS)', time: 'O(V + E)', space: 'O(V + E)' },
      { variant: 'DFS-based', time: 'O(V + E)', space: 'O(V + E)' }
    ],
    problems: {
      warmup: [
        {
          id: 'ts_lc207',
          lcUrl: 'https://leetcode.com/problems/course-schedule/',
          nc: 'https://neetcode.io/problems/course-schedule',
          yt: 'https://www.youtube.com/watch?v=EgI5nU9etnU',
          name: 'Course Schedule',
          lc: 'LC 207',
          hint: 'Kahn\'s algorithm. If you can process all n courses (idx == n), return true. If any remain with in-degree > 0, there\'s a cycle — return false.'
        }
      ],
      core: [
        {
          id: 'ts_lc210',
          lcUrl: 'https://leetcode.com/problems/course-schedule-ii/',
          nc: 'https://neetcode.io/problems/course-schedule-ii',
          yt: 'https://www.youtube.com/watch?v=Akt3glAwyfY',
          name: 'Course Schedule II',
          lc: 'LC 210',
          hint: 'Same as Course Schedule but return the actual order array. Kahn\'s naturally produces it. Return empty array if cycle detected.'
        },
        {
          id: 'ts_lc310',
          lcUrl: 'https://leetcode.com/problems/minimum-height-trees/',
          yt: 'https://www.youtube.com/watch?v=bfmaiGQFg1Q',
          name: 'Minimum Height Trees',
          lc: 'LC 310',
          hint: 'Topological sort in reverse — trim leaf nodes (degree 1) layer by layer toward the center. The last 1 or 2 nodes remaining are the roots of minimum height trees.'
        }
      ],
      stretch: [
        {
          id: 'ts_lc269',
          lcUrl: 'https://leetcode.com/problems/alien-dictionary/',
          nc: 'https://neetcode.io/problems/foreign-dictionary',
          yt: 'https://www.youtube.com/watch?v=6kTZYvNNyps',
          name: 'Alien Dictionary',
          lc: 'LC 269',
          hint: 'Compare adjacent words to derive character ordering edges. Build a directed graph of character precedences. Run topological sort. If cycle → invalid. Edge case: if word[i] is a prefix of word[i-1] and word[i] comes after → invalid.'
        },
        {
          id: 'ts_lc444',
          lcUrl: 'https://leetcode.com/problems/sequence-reconstruction/',
          name: 'Sequence Reconstruction',
          lc: 'LC 444',
          hint: 'Check if org is the UNIQUE topological ordering of the graph built from seqs. At every step of Kahn\'s, the queue must have exactly one node — if ever >1, the ordering is not unique.'
        }
      ]
    },
    selfCheck: [
      'What does "in-degree" mean and why do we start Kahn\'s with in-degree-0 nodes?',
      'After running Kahn\'s, how do you detect a cycle? What does it mean when idx < n?',
      'What is the direction of an edge in the graph for "A is a prerequisite of B"?',
      'In the DFS-based approach, why do you push a node to the stack AFTER visiting all its descendants?',
      'Can a graph have multiple valid topological orderings? Give an example.'
    ]
  },

  union_find: {
    id: 'union_find',
    title: 'Union Find (DSU)',
    phase: 'Phase 4 — Week 11',
    frequency: 'High',
    dependsOn: ['Graph BFS / DFS'],
    unlocks: ['Minimum Spanning Tree (Kruskal)'],
    idea: `Union Find (Disjoint Set Union) is a data structure that tracks which elements belong to the same group (component). It supports two operations in near-O(1) each:\n<strong>find(x)</strong> — which group does x belong to? Returns the root/representative of x's group.\n<strong>union(x, y)</strong> — merge the groups of x and y.\n\nWith two optimizations — <em>path compression</em> and <em>union by rank</em> — both operations run in O(α(n)) amortized, where α is the inverse Ackermann function, effectively O(1) for all practical inputs.\n\nUse it when you repeatedly need to: check if two nodes are connected, merge components, or count distinct components — and you don't need the actual path between them.`,
    variants: [
      {
        label: 'Path Compression + Union by Rank',
        visual: `Initial: each node is its own parent.
parent = [0, 1, 2, 3, 4]
rank   = [0, 0, 0, 0, 0]

union(0,1): find(0)=0, find(1)=1 → attach 1 under 0
  parent = [0, 0, 2, 3, 4],  rank[0]=1

union(1,2): find(1)→parent[1]=0 (root), find(2)=2 → attach 2 under 0
  parent = [0, 0, 0, 3, 4]

union(3,4): parent = [0, 0, 0, 3, 3],  rank[3]=1

find(2) with path compression:
  2 → parent[2]=0 (root). Return 0.
  (No long chain — compression keeps tree flat.)

union(2,3): find(2)=0, find(3)=3 → rank[0]==rank[3]=1 → attach 3 under 0, rank[0]=2
  parent = [0, 0, 0, 0, 3]

<span class="hl">All in one component. find(4) → 4→3→0.</span>
After compression: parent[4]=0 directly.`,
        note: null
      }
    ],
    templates: [
      {
        label: 'Union Find — Full Implementation',
        code: `<span class="kw">class</span> <span class="ty">UnionFind</span> {
    <span class="kw">private int</span>[] parent, rank;
    <span class="kw">private int</span> components;

    <span class="fn">UnionFind</span>(<span class="ty">int</span> n) {
        parent = <span class="kw">new int</span>[n];
        rank   = <span class="kw">new int</span>[n];
        components = n;
        <span class="kw">for</span> (<span class="ty">int</span> i = <span class="nu">0</span>; i < n; i++) parent[i] = i;
    }

    <span class="kw">public int</span> <span class="fn">find</span>(<span class="ty">int</span> x) {
        <span class="kw">if</span> (parent[x] != x)
            parent[x] = <span class="fn">find</span>(parent[x]); <span class="cm">// path compression</span>
        <span class="kw">return</span> parent[x];
    }

    <span class="kw">public boolean</span> <span class="fn">union</span>(<span class="ty">int</span> x, <span class="ty">int</span> y) {
        <span class="ty">int</span> rx = <span class="fn">find</span>(x), ry = <span class="fn">find</span>(y);
        <span class="kw">if</span> (rx == ry) <span class="kw">return false</span>; <span class="cm">// already connected — this edge is a cycle</span>

        <span class="kw">if</span>      (rank[rx] < rank[ry]) parent[rx] = ry;
        <span class="kw">else if</span> (rank[rx] > rank[ry]) parent[ry] = rx;
        <span class="kw">else</span>                          { parent[ry] = rx; rank[rx]++; }

        components--;
        <span class="kw">return true</span>;
    }

    <span class="kw">public boolean</span> <span class="fn">connected</span>(<span class="ty">int</span> x, <span class="ty">int</span> y) { <span class="kw">return</span> <span class="fn">find</span>(x) == <span class="fn">find</span>(y); }
    <span class="kw">public int</span>     <span class="fn">count</span>()                   { <span class="kw">return</span> components; }
}`
      }
    ],
    signals: [
      { cue: '"connected components" with dynamic edge additions', pattern: 'Union Find — more efficient than BFS/DFS for repeated queries' },
      { cue: '"detect cycle" in an undirected graph', pattern: 'Union Find — if union() returns false, edge creates a cycle' },
      { cue: '"number of provinces", "friend circles"', pattern: 'Union Find — count components' },
      { cue: '"minimum spanning tree" (Kruskal)', pattern: 'Union Find — add edges in weight order, skip if already connected' },
      { cue: 'Edges are added dynamically and you need to query connectivity', pattern: 'Union Find (vs BFS/DFS which rebuild from scratch)' }
    ],
    mistakes: [
      {
        title: 'Forgetting path compression in find()',
        body: 'Without path compression, repeated find() calls on a tall tree are O(n). The one-line recursive compression <code>parent[x] = find(parent[x])</code> flattens the tree automatically.'
      },
      {
        title: 'Decrementing components even when nodes were already connected',
        body: 'Only decrement components when the two nodes were in different sets (union returned true). If find(x) == find(y) before union, they\'re already connected — don\'t count it as a merge.'
      },
      {
        title: 'Using Union Find when you need the actual path',
        body: 'Union Find tells you IF two nodes are connected, not HOW. If the problem asks for the path itself, use BFS/DFS.'
      }
    ],
    complexity: [
      { variant: 'find() / union() with both optimizations', time: 'O(α(n)) ≈ O(1) amortized', space: 'O(n)' },
      { variant: 'find() without path compression', time: 'O(n) worst case', space: 'O(n)' }
    ],
    problems: {
      warmup: [
        {
          id: 'uf_lc547',
          lcUrl: 'https://leetcode.com/problems/number-of-provinces/',
          yt: 'https://www.youtube.com/watch?v=bBKkV7X5Ghs',
          name: 'Number of Provinces',
          lc: 'LC 547',
          hint: 'Union Find on n nodes. For each edge (isConnected[i][j]==1), union i and j. Answer = uf.count() at the end.'
        },
        {
          id: 'uf_lc684',
          lcUrl: 'https://leetcode.com/problems/redundant-connection/',
          nc: 'https://neetcode.io/problems/redundant-connection',
          yt: 'https://www.youtube.com/watch?v=FXWRE4e54O0',
          name: 'Redundant Connection',
          lc: 'LC 684',
          hint: 'Process edges in order. Union each edge. If union() returns false (already connected), that edge is redundant — return it.'
        }
      ],
      core: [
        {
          id: 'uf_lc200',
          lcUrl: 'https://leetcode.com/problems/number-of-islands/',
          nc: 'https://neetcode.io/problems/count-number-of-islands',
          yt: 'https://www.youtube.com/watch?v=pV2kpPD66nE',
          name: 'Number of Islands (Union Find approach)',
          lc: 'LC 200',
          hint: 'Alternative to BFS/DFS. Convert 2D grid to 1D index (r*cols + c). Union each land cell with its land neighbors. Answer = number of distinct components among land cells.'
        },
        {
          id: 'uf_lc721',
          lcUrl: 'https://leetcode.com/problems/accounts-merge/',
          nc: 'https://neetcode.io/problems/accounts-merge',
          yt: 'https://www.youtube.com/watch?v=6st4IxEF-90',
          name: 'Accounts Merge',
          lc: 'LC 721',
          hint: 'Union all emails in each account together. Use a map from email → owner name. After all unions, group emails by their root representative. Sort each group and prepend the owner name.'
        }
      ],
      stretch: [
        {
          id: 'uf_lc1202',
          lcUrl: 'https://leetcode.com/problems/smallest-string-with-swaps/',
          name: 'Smallest String With Swaps',
          lc: 'LC 1202',
          hint: 'Union all index pairs. Group indices by their root. Within each group, sort the characters and place them back in sorted index order. Characters within a connected component can be rearranged freely.'
        },
        {
          id: 'uf_lc1579',
          lcUrl: 'https://leetcode.com/problems/remove-max-number-of-edges-to-keep-graph-fully-traversable/',
          name: 'Remove Max Number of Edges to Keep Graph Fully Traversable',
          lc: 'LC 1579',
          hint: 'Two separate Union Finds (one for Alice, one for Bob). Add type-3 edges first (shared). Then add type-1 (Alice only) and type-2 (Bob only). Count edges added with union()==false — those are removable.'
        }
      ]
    },
    selfCheck: [
      'What does path compression do and why does it not change correctness?',
      'What does union by rank prevent? What would happen without it?',
      'How do you use Union Find to detect a cycle in an undirected graph?',
      'When would you prefer Union Find over BFS/DFS for connectivity problems?',
      'What is the time complexity of n union() and find() operations with both optimizations?'
    ]
  },

  shortest_path: {
    id: 'shortest_path',
    title: 'Shortest Path (Dijkstra)',
    phase: 'Phase 4 — Week 11',
    frequency: 'Medium',
    dependsOn: ['Graph BFS / DFS', 'Heap / Priority Queue'],
    unlocks: ['A* search (conceptual)'],
    idea: `<strong>Dijkstra's algorithm</strong> finds the shortest path from a source to all other nodes in a graph with <em>non-negative edge weights</em>. It's BFS with a priority queue — instead of exploring by hop count, you explore by total distance.\n\nThe key idea: always expand the unvisited node with the smallest known distance. When a node is first popped from the min-heap, its distance is finalized — any future path to it would be longer.\n\n<strong>When to use what:</strong>\n- Unweighted graph → BFS (O(V+E))\n- Weighted graph, non-negative weights → Dijkstra (O((V+E) log V))\n- Negative weights → Bellman-Ford (O(VE)) — not commonly asked\n- All-pairs shortest path → Floyd-Warshall (O(V³))`,
    variants: [
      {
        label: `Dijkstra's — Step by Step`,
        visual: `Graph (weighted, directed):
  0 →(4)→ 1 →(1)→ 3
  0 →(2)→ 2 →(5)→ 3

Source = 0. Find shortest distance to all nodes.

dist = {0:0, 1:∞, 2:∞, 3:∞}
heap = [(0, node=0)]

Pop (0,0): process neighbors
  → 1: dist=0+4=4, push (4,1). dist[1]=4
  → 2: dist=0+2=2, push (2,2). dist[2]=2
  heap=[(2,2),(4,1)]

Pop (2,2): process neighbors
  → 3: dist=2+5=7, push (7,3). dist[3]=7
  heap=[(4,1),(7,3)]

Pop (4,1): process neighbors
  → 3: dist=4+1=5 < dist[3]=7 → update! push (5,3). dist[3]=5
  heap=[(5,3),(7,3)]

Pop (5,3): reached 3, dist=<span class="hl">5</span>.
Pop (7,3): dist[3]=5 < 7 → <span class="hl3">skip (stale entry)</span>

Shortest distances: {0:0, 1:4, 2:2, 3:<span class="hl">5</span>}`,
        note: null
      }
    ],
    templates: [
      {
        label: `Dijkstra's Algorithm`,
        code: `<span class="kw">public int</span>[] <span class="fn">dijkstra</span>(<span class="ty">int</span> n, <span class="ty">List</span><<span class="ty">List</span><<span class="ty">int</span>[]>> graph, <span class="ty">int</span> src) {
    <span class="ty">int</span>[] dist = <span class="kw">new int</span>[n];
    <span class="ty">Arrays</span>.fill(dist, <span class="ty">Integer</span>.MAX_VALUE);
    dist[src] = <span class="nu">0</span>;

    <span class="cm">// min-heap: [distance, node]</span>
    <span class="ty">PriorityQueue</span><<span class="ty">int</span>[]> pq = <span class="kw">new</span> <span class="ty">PriorityQueue</span><>((a,b) -> a[<span class="nu">0</span>] - b[<span class="nu">0</span>]);
    pq.offer(<span class="kw">new int</span>[]{<span class="nu">0</span>, src});

    <span class="kw">while</span> (!pq.isEmpty()) {
        <span class="ty">int</span>[] cur  = pq.poll();
        <span class="ty">int</span>  d     = cur[<span class="nu">0</span>], node = cur[<span class="nu">1</span>];

        <span class="kw">if</span> (d > dist[node]) <span class="kw">continue</span>; <span class="cm">// stale entry — skip</span>

        <span class="kw">for</span> (<span class="ty">int</span>[] edge : graph.get(node)) {
            <span class="ty">int</span> nb = edge[<span class="nu">0</span>], wt = edge[<span class="nu">1</span>];
            <span class="kw">if</span> (dist[node] + wt < dist[nb]) {
                dist[nb] = dist[node] + wt;
                pq.offer(<span class="kw">new int</span>[]{dist[nb], nb});
            }
        }
    }

    <span class="kw">return</span> dist;
}`
      }
    ],
    signals: [
      { cue: '"shortest path" in a weighted graph with non-negative weights', pattern: 'Dijkstra\'s algorithm' },
      { cue: '"minimum cost to reach destination"', pattern: 'Dijkstra\'s — cost is the edge weight' },
      { cue: '"minimum time/effort/risk" to traverse a grid', pattern: 'Dijkstra\'s on an implicit grid graph' },
      { cue: 'Unweighted graph + shortest path', pattern: 'BFS (simpler, O(V+E) vs Dijkstra\'s O((V+E) log V))' }
    ],
    mistakes: [
      {
        title: 'Not skipping stale heap entries',
        body: 'When you update a node\'s distance, you push a new entry but the old one stays in the heap. When the old (stale) entry is popped, check <code>if (d > dist[node]) continue</code>. Without this, you process nodes multiple times and get wrong answers.'
      },
      {
        title: 'Using Dijkstra with negative edge weights',
        body: 'Dijkstra\'s relies on the assumption that once a node is finalized, no shorter path exists. Negative edges break this — a longer path followed by a large negative edge could be shorter. Use Bellman-Ford for negative weights.'
      },
      {
        title: 'Integer overflow when adding distances',
        body: 'If dist[node] is Integer.MAX_VALUE (unreachable) and you add a weight, it overflows to a negative number. Guard with <code>if (dist[node] == Integer.MAX_VALUE) continue</code>, or use long.'
      }
    ],
    complexity: [
      { variant: 'Dijkstra with binary heap', time: 'O((V + E) log V)', space: 'O(V + E)' },
      { variant: 'BFS (unweighted)', time: 'O(V + E)', space: 'O(V)' },
      { variant: 'Bellman-Ford (negative weights)', time: 'O(V × E)', space: 'O(V)' }
    ],
    problems: {
      warmup: [
        {
          id: 'sp_lc1971',
          lcUrl: 'https://leetcode.com/problems/find-if-path-exists-in-graph/',
          name: 'Find if Path Exists in Graph',
          lc: 'LC 1971',
          hint: 'Unweighted — use BFS or Union Find. Good warm-up to confirm you know when NOT to use Dijkstra.'
        }
      ],
      core: [
        {
          id: 'sp_lc743',
          lcUrl: 'https://leetcode.com/problems/network-delay-time/',
          nc: 'https://neetcode.io/problems/network-delay-time',
          yt: 'https://www.youtube.com/watch?v=EaphyqKTFag',
          name: 'Network Delay Time',
          lc: 'LC 743',
          hint: 'Classic Dijkstra. Find the max of all shortest distances from source k. If any node is unreachable (dist == MAX_VALUE), return -1.'
        },
        {
          id: 'sp_lc1631',
          lcUrl: 'https://leetcode.com/problems/path-with-minimum-effort/',
          yt: 'https://www.youtube.com/watch?v=XQlTFKLQ5Zw',
          name: 'Path With Minimum Effort',
          lc: 'LC 1631',
          hint: 'Dijkstra on a grid. The "distance" is the maximum absolute difference along the path (not sum). dist[r][c] = minimum possible max-effort to reach (r,c). Update if new path has lower max-effort.'
        }
      ],
      stretch: [
        {
          id: 'sp_lc787',
          lcUrl: 'https://leetcode.com/problems/cheapest-flights-within-k-stops/',
          nc: 'https://neetcode.io/problems/cheapest-flight-path',
          yt: 'https://www.youtube.com/watch?v=5eIK3zUdYmE',
          name: 'Cheapest Flights Within K Stops',
          lc: 'LC 787',
          hint: 'Modified Dijkstra or Bellman-Ford for K steps. Heap state = [cost, node, stops_remaining]. Only relax if stops > 0. BFS/DP approach (iterate K+1 times over all edges) also works.'
        },
        {
          id: 'sp_lc778',
          lcUrl: 'https://leetcode.com/problems/swim-in-rising-water/',
          yt: 'https://www.youtube.com/watch?v=amvrKlMLuGY',
          name: 'Swim in Rising Water',
          lc: 'LC 778',
          hint: 'Dijkstra where "distance" to a cell = max grid value along the path. Heap: [max_value_so_far, row, col]. When you pop the destination, that\'s your answer.'
        }
      ]
    },
    selfCheck: [
      'Why do you skip a heap entry when d > dist[node]? What would happen if you didn\'t?',
      'Why does Dijkstra fail with negative edge weights? Give a concrete counterexample.',
      'When should you use BFS vs Dijkstra? What is the key difference between the two scenarios?',
      'What is the time complexity of Dijkstra with a binary heap and why?',
      'In the grid variant, how do you adapt Dijkstra when "distance" means max effort rather than sum of weights?'
    ]
  },

  // ── Phase 5 ──────────────────────────────────────────────────────────────

  dp_1d: {
    id: 'dp_1d',
    title: '1D Dynamic Programming',
    phase: 'Phase 5 — Week 12',
    frequency: 'Extremely High',
    dependsOn: ['Recursion + Backtracking'],
    unlocks: ['2D DP', 'DP on Intervals', 'Knapsack'],
    idea: `Dynamic Programming is recursion with memory. When a recursive solution recomputes the same subproblems, you memoize the results — compute each subproblem once, store it, reuse it.\n\n<strong>Two ways to implement DP:</strong>\n<em>Top-down (memoization)</em> — write the recursion, add a cache. Intuitive, follows the natural subproblem structure.\n<em>Bottom-up (tabulation)</em> — fill a table iteratively from base cases upward. No recursion overhead, often more space-efficient.\n\n<strong>The four steps to solve any DP problem:</strong>\n1. Define what <code>dp[i]</code> means in plain English.\n2. Write the recurrence — how does <code>dp[i]</code> depend on smaller subproblems?\n3. Identify base cases.\n4. Determine the fill order (usually left to right for 1D).`,
    variants: [
      {
        label: 'Linear DP — Fibonacci / Climb Stairs',
        visual: `Problem: how many ways to climb n stairs (1 or 2 steps at a time)?

dp[i] = number of ways to reach stair i

Base cases: dp[0]=1, dp[1]=1
Recurrence: dp[i] = dp[i-1] + dp[i-2]
  (last step was 1 stair → came from i-1)
  (last step was 2 stairs → came from i-2)

i:    0  1  2  3  4  5
dp:   1  1  2  3  5  8

<span class="hl">Answer for n=5: dp[5] = 8</span>

Space optimization: only need last two values → O(1) space.`,
        note: null
      },
      {
        label: 'Choice DP — House Robber',
        visual: `nums = [2, 7, 9, 3, 1]
dp[i] = max money robbing from house 0..i

At each house: rob it (can't take i-1) OR skip it.
dp[i] = max(dp[i-2] + nums[i],  dp[i-1])
          rob house i              skip house i

i=0: dp[0] = 2
i=1: dp[1] = max(2, 7) = 7
i=2: dp[2] = max(dp[0]+9, dp[1]) = max(11, 7) = <span class="hl">11</span>
i=3: dp[3] = max(dp[1]+3, dp[2]) = max(10, 11) = <span class="hl">11</span>
i=4: dp[4] = max(dp[2]+1, dp[3]) = max(12, 11) = <span class="hl">12</span>

<span class="hl">Answer: 12</span>`,
        note: null
      },
      {
        label: 'Prefix DP — Longest Increasing Subsequence',
        visual: `nums = [10, 9, 2, 5, 3, 7, 101, 18]
dp[i] = length of LIS ending at index i

For each i, look back at all j < i where nums[j] < nums[i]:
  dp[i] = max(dp[j] + 1) over all valid j

dp: [1,  1,  1,  2,  2,  3,   4,   4]
     10   9   2   5   3   7  101  18

<span class="hl">Answer: max(dp) = 4</span>  ([2,3,7,101] or [2,5,7,101])`,
        note: null
      }
    ],
    templates: [
      {
        label: 'Top-Down (Memoization)',
        code: `<span class="kw">private</span> <span class="ty">Map</span><<span class="ty">Integer</span>,<span class="ty">Integer</span>> memo = <span class="kw">new</span> <span class="ty">HashMap</span>();

<span class="kw">public int</span> <span class="fn">dp</span>(<span class="ty">int</span> i) {
    <span class="kw">if</span> (i <= <span class="nu">1</span>) <span class="kw">return</span> i;            <span class="cm">// base case</span>
    <span class="kw">if</span> (memo.containsKey(i)) <span class="kw">return</span> memo.get(i);

    <span class="ty">int</span> result = <span class="fn">dp</span>(i - <span class="nu">1</span>) + <span class="fn">dp</span>(i - <span class="nu">2</span>); <span class="cm">// recurrence</span>
    memo.put(i, result);
    <span class="kw">return</span> result;
}`
      },
      {
        label: 'Bottom-Up (Tabulation) — House Robber',
        code: `<span class="kw">public int</span> <span class="fn">rob</span>(<span class="ty">int</span>[] nums) {
    <span class="ty">int</span> n = nums.length;
    <span class="kw">if</span> (n == <span class="nu">1</span>) <span class="kw">return</span> nums[<span class="nu">0</span>];

    <span class="ty">int</span>[] dp = <span class="kw">new int</span>[n];
    dp[<span class="nu">0</span>] = nums[<span class="nu">0</span>];
    dp[<span class="nu">1</span>] = <span class="ty">Math</span>.max(nums[<span class="nu">0</span>], nums[<span class="nu">1</span>]);

    <span class="kw">for</span> (<span class="ty">int</span> i = <span class="nu">2</span>; i < n; i++)
        dp[i] = <span class="ty">Math</span>.max(dp[i-<span class="nu">2</span>] + nums[i], dp[i-<span class="nu">1</span>]);

    <span class="kw">return</span> dp[n-<span class="nu">1</span>];
}

<span class="cm">// Space-optimized to O(1):</span>
<span class="kw">public int</span> <span class="fn">robOptimized</span>(<span class="ty">int</span>[] nums) {
    <span class="ty">int</span> prev2 = <span class="nu">0</span>, prev1 = <span class="nu">0</span>;
    <span class="kw">for</span> (<span class="ty">int</span> num : nums) {
        <span class="ty">int</span> curr = <span class="ty">Math</span>.max(prev2 + num, prev1);
        prev2 = prev1;
        prev1 = curr;
    }
    <span class="kw">return</span> prev1;
}`
      },
      {
        label: 'LIS — O(n²) DP',
        code: `<span class="kw">public int</span> <span class="fn">lengthOfLIS</span>(<span class="ty">int</span>[] nums) {
    <span class="ty">int</span>[] dp = <span class="kw">new int</span>[nums.length];
    <span class="ty">Arrays</span>.fill(dp, <span class="nu">1</span>); <span class="cm">// every element alone = LIS of 1</span>
    <span class="ty">int</span> max = <span class="nu">1</span>;

    <span class="kw">for</span> (<span class="ty">int</span> i = <span class="nu">1</span>; i < nums.length; i++) {
        <span class="kw">for</span> (<span class="ty">int</span> j = <span class="nu">0</span>; j < i; j++) {
            <span class="kw">if</span> (nums[j] < nums[i])
                dp[i] = <span class="ty">Math</span>.max(dp[i], dp[j] + <span class="nu">1</span>);
        }
        max = <span class="ty">Math</span>.max(max, dp[i]);
    }
    <span class="kw">return</span> max;
}`
      }
    ],
    signals: [
      { cue: '"number of ways to reach", "minimum/maximum cost to reach"', pattern: '1D DP — define dp[i] as answer for first i elements' },
      { cue: '"can\'t use adjacent elements" (house robber style)', pattern: 'dp[i] = max(dp[i-2] + val, dp[i-1])' },
      { cue: '"longest increasing subsequence", "longest subsequence with property"', pattern: 'dp[i] = best answer ending at index i, look back at all j < i' },
      { cue: '"overlapping subproblems" — recursion recomputes same inputs', pattern: 'Add memoization — top-down DP' },
      { cue: '"minimum jumps", "minimum cost path"', pattern: '1D DP — dp[i] = best way to reach position i' }
    ],
    mistakes: [
      {
        title: 'Not defining dp[i] precisely before coding',
        body: 'The most common DP bug. Write out in English exactly what dp[i] represents before touching code. If you can\'t state it clearly, you can\'t write the recurrence correctly.'
      },
      {
        title: 'Wrong base cases',
        body: 'Base cases are the foundation — everything else builds on them. For LIS, dp[i]=1 (each element alone). For climb stairs, dp[0]=1, dp[1]=1. Spend time verifying base cases manually before running.'
      },
      {
        title: 'Off-by-one when space-optimizing',
        body: 'When collapsing dp[i-2] and dp[i-1] into two variables, be careful about update order. Update curr first, then assign prev2=prev1, prev1=curr. Doing it out of order overwrites values you still need.'
      },
      {
        title: 'Returning dp[n-1] vs max(dp)',
        body: 'For problems like house robber, dp[n-1] is the answer (best up to last house). For LIS, the answer is max(dp) — the LIS might not end at the last element. Know which one your problem needs.'
      }
    ],
    complexity: [
      { variant: 'Linear DP (Fibonacci / Climb stairs)', time: 'O(n)', space: 'O(n) table, O(1) optimized' },
      { variant: 'Choice DP (House Robber)', time: 'O(n)', space: 'O(1) optimized' },
      { variant: 'LIS — DP', time: 'O(n²)', space: 'O(n)' },
      { variant: 'LIS — Binary Search', time: 'O(n log n)', space: 'O(n)' }
    ],
    problems: {
      warmup: [
        {
          id: 'dp1_lc70',
          lcUrl: 'https://leetcode.com/problems/climbing-stairs/',
          nc: 'https://neetcode.io/problems/climbing-stairs',
          yt: 'https://www.youtube.com/watch?v=Y0lT9Fck7qI',
          name: 'Climbing Stairs',
          lc: 'LC 70',
          hint: 'dp[i] = ways to reach stair i. Recurrence: dp[i] = dp[i-1] + dp[i-2]. Base: dp[1]=1, dp[2]=2. Notice it\'s Fibonacci — space-optimize to two variables.'
        },
        {
          id: 'dp1_lc746',
          lcUrl: 'https://leetcode.com/problems/min-cost-climbing-stairs/',
          yt: 'https://www.youtube.com/watch?v=ktmzAZWkEK8',
          name: 'Min Cost Climbing Stairs',
          lc: 'LC 746',
          hint: 'dp[i] = min cost to reach stair i. dp[i] = min(dp[i-1], dp[i-2]) + cost[i]. Answer = min(dp[n-1], dp[n-2]).'
        }
      ],
      core: [
        {
          id: 'dp1_lc198',
          lcUrl: 'https://leetcode.com/problems/house-robber/',
          nc: 'https://neetcode.io/problems/house-robber',
          yt: 'https://www.youtube.com/watch?v=73r3KWiEvyk',
          name: 'House Robber',
          lc: 'LC 198',
          hint: 'dp[i] = max money from houses 0..i. Recurrence: dp[i] = max(dp[i-2]+nums[i], dp[i-1]). Space-optimize to two variables after getting it working with the array.'
        },
        {
          id: 'dp1_lc300',
          lcUrl: 'https://leetcode.com/problems/longest-increasing-subsequence/',
          nc: 'https://neetcode.io/problems/longest-increasing-subsequence',
          yt: 'https://www.youtube.com/watch?v=cjWnW0hdF1Y',
          name: 'Longest Increasing Subsequence',
          lc: 'LC 300',
          hint: 'dp[i] = length of LIS ending at index i. For each i, scan all j < i — if nums[j] < nums[i], dp[i] = max(dp[i], dp[j]+1). Answer = max(dp). Know the O(n log n) patience sort approach too.'
        },
        {
          id: 'dp1_lc139',
          lcUrl: 'https://leetcode.com/problems/word-break/',
          nc: 'https://neetcode.io/problems/word-break',
          yt: 'https://www.youtube.com/watch?v=Sx9NNgInc3A',
          name: 'Word Break',
          lc: 'LC 139',
          hint: 'dp[i] = can the first i characters be segmented. For each i, try all j < i — if dp[j] is true AND s[j..i] is in the dictionary, dp[i] = true. Base: dp[0] = true.'
        }
      ],
      stretch: [
        {
          id: 'dp1_lc213',
          lcUrl: 'https://leetcode.com/problems/house-robber-ii/',
          nc: 'https://neetcode.io/problems/house-robber-ii',
          yt: 'https://www.youtube.com/watch?v=rWAJCfYYOvM',
          name: 'House Robber II',
          lc: 'LC 213',
          hint: 'Houses arranged in a circle — first and last are adjacent. Solve twice: once on nums[0..n-2], once on nums[1..n-1]. Take the max. Reduces to two House Robber I problems.'
        },
        {
          id: 'dp1_lc32',
          lcUrl: 'https://leetcode.com/problems/longest-valid-parentheses/',
          yt: 'https://www.youtube.com/watch?v=VdQuwtEd10M',
          name: 'Longest Valid Parentheses',
          lc: 'LC 32',
          hint: 'dp[i] = length of longest valid substring ending at i. Only meaningful when s[i]==\')\'. Two cases: s[i-1]==\'(\' → dp[i]=dp[i-2]+2. s[i-1]==\')\' and s[i-dp[i-1]-1]==\'(\' → dp[i]=dp[i-1]+2+dp[i-dp[i-1]-2].'
        }
      ]
    },
    selfCheck: [
      'What are the four steps to solve any DP problem?',
      'What is the difference between top-down (memoization) and bottom-up (tabulation)?',
      'In House Robber, why is dp[i] = max(dp[i-2]+nums[i], dp[i-1]) and not dp[i-1]+nums[i]?',
      'In LIS, why is the answer max(dp) and not dp[n-1]?',
      'How do you space-optimize House Robber from O(n) to O(1)? What is the update order?'
    ]
  },

  dp_2d: {
    id: 'dp_2d',
    title: '2D Dynamic Programming',
    phase: 'Phase 5 — Week 12',
    frequency: 'High',
    dependsOn: ['1D Dynamic Programming'],
    unlocks: ['DP on Intervals', 'Knapsack variants'],
    idea: `2D DP adds a second dimension to the state — usually because the problem involves <em>two sequences</em> (strings, arrays) or a <em>grid</em>.\n\n<code>dp[i][j]</code> typically means: the answer considering the first i elements of one sequence and first j elements of another (or the answer at grid cell (i,j)).\n\n<strong>The three most important 2D DP problems:</strong>\n<em>Longest Common Subsequence</em> — foundation for diff tools, DNA alignment.\n<em>Edit Distance</em> — minimum operations to transform one string to another.\n<em>Unique Paths</em> — counting paths through a grid.\n\nThe key skill: correctly identifying what changes when you move from dp[i-1][j], dp[i][j-1], or dp[i-1][j-1] — each represents a different "last decision".`,
    variants: [
      {
        label: 'LCS — Two-Sequence DP',
        visual: `s1 = "abcde",  s2 = "ace"
dp[i][j] = LCS of s1[0..i-1] and s2[0..j-1]

     ""  a  c  e
""  [ 0  0  0  0 ]
a   [ 0  1  1  1 ]
b   [ 0  1  1  1 ]
c   [ 0  1  2  2 ]
d   [ 0  1  2  2 ]
e   [ 0  1  2  <span class="hl">3</span> ]

Recurrence:
  if s1[i-1]==s2[j-1]: dp[i][j] = dp[i-1][j-1] + 1  (characters match)
  else:                dp[i][j] = max(dp[i-1][j], dp[i][j-1])  (skip one)

<span class="hl">Answer: dp[5][3] = 3</span>  ("ace")`,
        note: null
      },
      {
        label: 'Edit Distance — Three Operations',
        visual: `s1="horse",  s2="ros"
dp[i][j] = min edits to convert s1[0..i-1] to s2[0..j-1]

     ""  r  o  s
""  [ 0  1  2  3 ]
h   [ 1  1  2  3 ]
o   [ 2  2  1  2 ]
r   [ 3  2  2  2 ]
s   [ 4  3  3  2 ]
e   [ 5  4  4  <span class="hl">3</span> ]

Recurrence:
  if s1[i-1]==s2[j-1]: dp[i][j] = dp[i-1][j-1]         (no edit needed)
  else: dp[i][j] = 1 + min(
    dp[i-1][j],    ← delete from s1
    dp[i][j-1],    ← insert into s1
    dp[i-1][j-1]   ← replace
  )`,
        note: null
      }
    ],
    templates: [
      {
        label: 'Longest Common Subsequence',
        code: `<span class="kw">public int</span> <span class="fn">lcs</span>(<span class="ty">String</span> s1, <span class="ty">String</span> s2) {
    <span class="ty">int</span> m = s1.length(), n = s2.length();
    <span class="ty">int</span>[][] dp = <span class="kw">new int</span>[m+<span class="nu">1</span>][n+<span class="nu">1</span>]; <span class="cm">// +1 for empty string base case</span>

    <span class="kw">for</span> (<span class="ty">int</span> i = <span class="nu">1</span>; i <= m; i++) {
        <span class="kw">for</span> (<span class="ty">int</span> j = <span class="nu">1</span>; j <= n; j++) {
            <span class="kw">if</span> (s1.charAt(i-<span class="nu">1</span>) == s2.charAt(j-<span class="nu">1</span>))
                dp[i][j] = dp[i-<span class="nu">1</span>][j-<span class="nu">1</span>] + <span class="nu">1</span>;
            <span class="kw">else</span>
                dp[i][j] = <span class="ty">Math</span>.max(dp[i-<span class="nu">1</span>][j], dp[i][j-<span class="nu">1</span>]);
        }
    }
    <span class="kw">return</span> dp[m][n];
}`
      },
      {
        label: 'Edit Distance',
        code: `<span class="kw">public int</span> <span class="fn">minDistance</span>(<span class="ty">String</span> s1, <span class="ty">String</span> s2) {
    <span class="ty">int</span> m = s1.length(), n = s2.length();
    <span class="ty">int</span>[][] dp = <span class="kw">new int</span>[m+<span class="nu">1</span>][n+<span class="nu">1</span>];

    <span class="kw">for</span> (<span class="ty">int</span> i = <span class="nu">0</span>; i <= m; i++) dp[i][<span class="nu">0</span>] = i; <span class="cm">// delete all of s1</span>
    <span class="kw">for</span> (<span class="ty">int</span> j = <span class="nu">0</span>; j <= n; j++) dp[<span class="nu">0</span>][j] = j; <span class="cm">// insert all of s2</span>

    <span class="kw">for</span> (<span class="ty">int</span> i = <span class="nu">1</span>; i <= m; i++) {
        <span class="kw">for</span> (<span class="ty">int</span> j = <span class="nu">1</span>; j <= n; j++) {
            <span class="kw">if</span> (s1.charAt(i-<span class="nu">1</span>) == s2.charAt(j-<span class="nu">1</span>))
                dp[i][j] = dp[i-<span class="nu">1</span>][j-<span class="nu">1</span>];
            <span class="kw">else</span>
                dp[i][j] = <span class="nu">1</span> + <span class="ty">Math</span>.min(dp[i-<span class="nu">1</span>][j-<span class="nu">1</span>],
                               <span class="ty">Math</span>.min(dp[i-<span class="nu">1</span>][j], dp[i][j-<span class="nu">1</span>]));
        }
    }
    <span class="kw">return</span> dp[m][n];
}`
      },
      {
        label: 'Unique Paths in Grid',
        code: `<span class="kw">public int</span> <span class="fn">uniquePaths</span>(<span class="ty">int</span> m, <span class="ty">int</span> n) {
    <span class="ty">int</span>[][] dp = <span class="kw">new int</span>[m][n];

    <span class="kw">for</span> (<span class="ty">int</span> i = <span class="nu">0</span>; i < m; i++) dp[i][<span class="nu">0</span>] = <span class="nu">1</span>; <span class="cm">// left column: only one way</span>
    <span class="kw">for</span> (<span class="ty">int</span> j = <span class="nu">0</span>; j < n; j++) dp[<span class="nu">0</span>][j] = <span class="nu">1</span>; <span class="cm">// top row: only one way</span>

    <span class="kw">for</span> (<span class="ty">int</span> i = <span class="nu">1</span>; i < m; i++)
        <span class="kw">for</span> (<span class="ty">int</span> j = <span class="nu">1</span>; j < n; j++)
            dp[i][j] = dp[i-<span class="nu">1</span>][j] + dp[i][j-<span class="nu">1</span>]; <span class="cm">// came from above or left</span>

    <span class="kw">return</span> dp[m-<span class="nu">1</span>][n-<span class="nu">1</span>];
}`
      }
    ],
    signals: [
      { cue: '"longest common subsequence/substring", "shortest common supersequence"', pattern: '2D DP on two strings — dp[i][j] over prefixes' },
      { cue: '"edit distance", "minimum insertions/deletions to match"', pattern: '2D DP — three operations at each cell' },
      { cue: '"number of paths in a grid", "minimum path sum"', pattern: '2D DP — dp[i][j] = best answer to reach cell (i,j)' },
      { cue: '"is s3 an interleaving of s1 and s2"', pattern: '2D DP — dp[i][j] = can s3[0..i+j-1] be formed from s1[0..i-1] and s2[0..j-1]' }
    ],
    mistakes: [
      {
        title: 'Using 0-indexed strings without the +1 offset in dp table',
        body: 'Always make the dp table (m+1)×(n+1) for string problems. dp[i][j] corresponds to s1[i-1] and s2[j-1]. Row 0 and column 0 represent empty strings — these are your base cases.'
      },
      {
        title: 'Mixing up the three edit distance operations',
        body: 'Delete: dp[i-1][j] (remove char from s1). Insert: dp[i][j-1] (add char to s1). Replace: dp[i-1][j-1] (swap char). Forgetting which diagonal/row/col maps to which operation is the most common edit distance bug.'
      },
      {
        title: 'Not initializing grid boundary base cases',
        body: 'For grid DP (unique paths, min path sum), the first row and column are base cases — there\'s only one way to reach them (all right or all down). Forgetting to initialize them leaves zeros, which corrupts the fill.'
      }
    ],
    complexity: [
      { variant: 'LCS / Edit Distance', time: 'O(m × n)', space: 'O(m × n), optimizable to O(min(m,n))' },
      { variant: 'Unique Paths / Grid DP', time: 'O(m × n)', space: 'O(m × n), optimizable to O(n)' }
    ],
    problems: {
      warmup: [
        {
          id: 'dp2_lc62',
          lcUrl: 'https://leetcode.com/problems/unique-paths/',
          nc: 'https://neetcode.io/problems/count-paths',
          yt: 'https://www.youtube.com/watch?v=IlEsdxuD4lY',
          name: 'Unique Paths',
          lc: 'LC 62',
          hint: 'dp[i][j] = number of paths to reach cell (i,j). Comes from above (dp[i-1][j]) or left (dp[i][j-1]). First row and column all = 1 (only one way).'
        },
        {
          id: 'dp2_lc64',
          lcUrl: 'https://leetcode.com/problems/minimum-path-sum/',
          yt: 'https://www.youtube.com/watch?v=pGMsrvt0fpk',
          name: 'Minimum Path Sum',
          lc: 'LC 64',
          hint: 'dp[i][j] = min cost to reach (i,j). dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1]). Initialize first row and column as running sums.'
        }
      ],
      core: [
        {
          id: 'dp2_lc1143',
          lcUrl: 'https://leetcode.com/problems/longest-common-subsequence/',
          nc: 'https://neetcode.io/problems/longest-common-subsequence',
          yt: 'https://www.youtube.com/watch?v=Ua0GhsJSlWM',
          name: 'Longest Common Subsequence',
          lc: 'LC 1143',
          hint: 'dp[i][j] = LCS of s1[0..i-1] and s2[0..j-1]. Match: dp[i-1][j-1]+1. No match: max(dp[i-1][j], dp[i][j-1]). Use the visual from the card — draw the table first.'
        },
        {
          id: 'dp2_lc72',
          lcUrl: 'https://leetcode.com/problems/edit-distance/',
          nc: 'https://neetcode.io/problems/edit-distance',
          yt: 'https://www.youtube.com/watch?v=XYi2-LPrwm4',
          name: 'Edit Distance',
          lc: 'LC 72',
          hint: 'dp[i][j] = min edits to convert s1[0..i-1] to s2[0..j-1]. Base cases: dp[i][0]=i, dp[0][j]=j. Three operations: delete, insert, replace. Draw the table for "horse" → "ros" before coding.'
        },
        {
          id: 'dp2_lc97',
          lcUrl: 'https://leetcode.com/problems/interleaving-string/',
          yt: 'https://www.youtube.com/watch?v=3Rw3p9LrgvE',
          name: 'Interleaving String',
          lc: 'LC 97',
          hint: 'dp[i][j] = can s3[0..i+j-1] be formed from s1[0..i-1] and s2[0..j-1]. Recurrence: dp[i][j] = (dp[i-1][j] && s1[i-1]==s3[i+j-1]) || (dp[i][j-1] && s2[j-1]==s3[i+j-1]).'
        }
      ],
      stretch: [
        {
          id: 'dp2_lc115',
          lcUrl: 'https://leetcode.com/problems/distinct-subsequences/',
          yt: 'https://www.youtube.com/watch?v=-RDzMJ33nx8',
          name: 'Distinct Subsequences',
          lc: 'LC 115',
          hint: 'dp[i][j] = number of ways s[0..i-1] contains t[0..j-1] as subsequence. If s[i-1]==t[j-1]: dp[i][j] = dp[i-1][j-1] + dp[i-1][j]. Else: dp[i][j] = dp[i-1][j]. Base: dp[i][0]=1.'
        },
        {
          id: 'dp2_lc1312',
          lcUrl: 'https://leetcode.com/problems/minimum-insertion-steps-to-make-a-string-palindrome/',
          yt: 'https://www.youtube.com/watch?v=xPBLEj41rFU',
          name: 'Minimum Insertion Steps to Make a String Palindrome',
          lc: 'LC 1312',
          hint: 'Minimum insertions = n - LPS (Longest Palindromic Subsequence). LPS = LCS(s, reverse(s)). So reduce to an LCS problem on the string and its reverse.'
        }
      ]
    },
    selfCheck: [
      'In LCS, what does dp[i][j] mean? What is the recurrence when s1[i-1] == s2[j-1]? When not?',
      'In Edit Distance, which cell (dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) maps to delete, insert, replace?',
      'Why do 2D string DP tables have size (m+1)×(n+1) and not m×n?',
      'How do you space-optimize an LCS or Edit Distance table from O(mn) to O(n)?',
      'How does Longest Palindromic Subsequence reduce to LCS?'
    ]
  },

  dp_intervals: {
    id: 'dp_intervals',
    title: 'DP on Intervals',
    phase: 'Phase 5 — Week 12',
    frequency: 'Medium',
    dependsOn: ['2D Dynamic Programming'],
    unlocks: [],
    idea: `Interval DP solves problems defined on contiguous subarrays or substrings, where the answer for a larger interval depends on answers for smaller sub-intervals inside it.\n\n<code>dp[i][j]</code> = answer for the interval [i, j].\n\nThe fill order matters — you must solve all smaller intervals before larger ones. Typically: iterate by <em>length</em> of interval from 2 up to n, then iterate over all starting positions i.\n\n<strong>The "split point" trick:</strong> for each interval [i,j], try every possible split point k (i ≤ k < j). The answer for [i,j] is derived from the best combination of [i,k] and [k+1,j] (or similar sub-intervals depending on the problem).`,
    variants: [
      {
        label: 'Burst Balloons — Interval DP',
        visual: `nums = [3, 1, 5, 8]  (with virtual 1s at boundaries)
Full array: [1, 3, 1, 5, 8, 1]

dp[i][j] = max coins from bursting all balloons in (i,j) exclusive
           where nums[i] and nums[j] are the boundaries (NOT burst).

Fill by interval length:
  Length 2: dp[0][2], dp[1][3], dp[2][4], dp[3][5]
  dp[0][2]: k=1 → burst balloon 1 last → nums[0]*nums[1]*nums[2] = 1*3*1 = 3
  ...

  Length 3: dp[0][3], dp[1][4], dp[2][5]
  dp[0][3]: try k=1,2 as the LAST balloon burst in (0,3)
    k=1: dp[0][1] + nums[0]*nums[1]*nums[3] + dp[1][3] = 0 + 1*3*5 + 10 = 25
    k=2: dp[0][2] + nums[0]*nums[2]*nums[3] + dp[2][3] = 3 + 1*1*5 + 40 = 48... (simplified)

<span class="hl">Key insight: think of k as the LAST balloon burst in the range,
not the first — boundaries are stable until k is burst.</span>`,
        note: null
      },
      {
        label: 'Palindrome Partitioning — Interval DP',
        visual: `s = "aab"
dp[i][j] = min cuts to partition s[i..j] into palindromes

dp[i][i] = 0 (single char, no cuts needed)

isPalin[i][j] precomputed:
  isPalin[0][0]=T, isPalin[1][1]=T, isPalin[2][2]=T
  isPalin[0][1]='a'=='a'→T, isPalin[1][2]='a'!='b'→F
  isPalin[0][2]='a'!='b'→F

dp[0][1]: isPalin[0][1]=T → dp[0][1]=0
dp[1][2]: isPalin[1][2]=F → try k=1: dp[1][1]+1+dp[2][2]=0+1+0=1
dp[0][2]: isPalin[0][2]=F → try k=0: dp[0][0]+1+dp[1][2]=0+1+1=2
                              try k=1: dp[0][1]+1+dp[2][2]=0+1+0=<span class="hl">1</span>

Answer: <span class="hl">1</span>  (["aa","b"])`,
        note: null
      }
    ],
    templates: [
      {
        label: 'Interval DP Template',
        code: `<span class="ty">int</span>[][] dp = <span class="kw">new int</span>[n][n];

<span class="cm">// Base cases: intervals of length 1</span>
<span class="kw">for</span> (<span class="ty">int</span> i = <span class="nu">0</span>; i < n; i++) dp[i][i] = <span class="cm">/* base value */</span> <span class="nu">0</span>;

<span class="cm">// Fill by increasing interval length</span>
<span class="kw">for</span> (<span class="ty">int</span> len = <span class="nu">2</span>; len <= n; len++) {
    <span class="kw">for</span> (<span class="ty">int</span> i = <span class="nu">0</span>; i <= n - len; i++) {
        <span class="ty">int</span> j = i + len - <span class="nu">1</span>;
        dp[i][j] = <span class="ty">Integer</span>.MAX_VALUE; <span class="cm">// or MIN depending on problem</span>

        <span class="cm">// Try every split point k</span>
        <span class="kw">for</span> (<span class="ty">int</span> k = i; k < j; k++) {
            dp[i][j] = <span class="ty">Math</span>.min(dp[i][j],
                dp[i][k] + dp[k+<span class="nu">1</span>][j] + <span class="fn">cost</span>(i, k, j));
        }
    }
}

<span class="cm">// Answer is typically dp[0][n-1]</span>`
      },
      {
        label: 'Burst Balloons',
        code: `<span class="kw">public int</span> <span class="fn">maxCoins</span>(<span class="ty">int</span>[] nums) {
    <span class="ty">int</span> n = nums.length;
    <span class="ty">int</span>[] arr = <span class="kw">new int</span>[n + <span class="nu">2</span>];       <span class="cm">// pad with virtual 1s</span>
    arr[<span class="nu">0</span>] = arr[n+<span class="nu">1</span>] = <span class="nu">1</span>;
    <span class="kw">for</span> (<span class="ty">int</span> i = <span class="nu">0</span>; i < n; i++) arr[i+<span class="nu">1</span>] = nums[i];

    <span class="ty">int</span> m = n + <span class="nu">2</span>;
    <span class="ty">int</span>[][] dp = <span class="kw">new int</span>[m][m]; <span class="cm">// dp[i][j] = max coins in open interval (i,j)</span>

    <span class="kw">for</span> (<span class="ty">int</span> len = <span class="nu">2</span>; len < m; len++) {
        <span class="kw">for</span> (<span class="ty">int</span> i = <span class="nu">0</span>; i <= m - len - <span class="nu">1</span>; i++) {
            <span class="ty">int</span> j = i + len;
            <span class="kw">for</span> (<span class="ty">int</span> k = i+<span class="nu">1</span>; k < j; k++) {  <span class="cm">// k = last balloon burst in (i,j)</span>
                dp[i][j] = <span class="ty">Math</span>.max(dp[i][j],
                    dp[i][k] + arr[i]*arr[k]*arr[j] + dp[k][j]);
            }
        }
    }
    <span class="kw">return</span> dp[<span class="nu">0</span>][m-<span class="nu">1</span>];
}`
      }
    ],
    signals: [
      { cue: '"burst balloons", "remove boxes", "stone game"', pattern: 'Interval DP — try every split point k' },
      { cue: '"minimum cost to merge/split array"', pattern: 'Interval DP — cost depends on sub-interval results' },
      { cue: '"palindrome partitioning" — minimum cuts', pattern: 'Interval DP with isPalin precomputation' },
      { cue: 'Answer for range [i,j] depends on sub-ranges inside it', pattern: 'Interval DP — fill by interval length' }
    ],
    mistakes: [
      {
        title: 'Filling the table in the wrong order (by i, not by length)',
        body: 'Interval DP must be filled by <em>increasing interval length</em>, not by increasing i. dp[i][j] depends on dp[i][k] and dp[k+1][j] which are shorter intervals — those must be filled first.'
      },
      {
        title: 'Thinking of k as the first operation, not the last',
        body: 'In burst balloons, thinking of k as the first balloon burst is correct for some framings but leads to complex boundary reasoning. The elegant formulation is k = the LAST balloon burst — boundaries arr[i] and arr[j] remain stable.'
      },
      {
        title: 'Not precomputing isPalindrome for palindrome problems',
        body: 'Computing isPalindrome inside the DP loop makes it O(n³) per cell = O(n⁴) total. Precompute all isPalin[i][j] in O(n²) first, then use it as an O(1) lookup inside the DP.'
      }
    ],
    complexity: [
      { variant: 'Interval DP (e.g., Burst Balloons)', time: 'O(n³) — n² intervals × n split points', space: 'O(n²)' },
      { variant: 'Palindrome Partitioning with precomputation', time: 'O(n²)', space: 'O(n²)' }
    ],
    problems: {
      warmup: [
        {
          id: 'di_lc5',
          lcUrl: 'https://leetcode.com/problems/longest-palindromic-substring/',
          nc: 'https://neetcode.io/problems/longest-palindromic-substring',
          yt: 'https://www.youtube.com/watch?v=XYQecbcd6_c',
          name: 'Longest Palindromic Substring',
          lc: 'LC 5',
          hint: 'Either expand around center (O(n²) time, O(1) space) or interval DP. For interval DP: isPalin[i][j] = s[i]==s[j] && isPalin[i+1][j-1]. Fill by length. Track longest.'
        }
      ],
      core: [
        {
          id: 'di_lc132',
          lcUrl: 'https://leetcode.com/problems/palindrome-partitioning-ii/',
          yt: 'https://www.youtube.com/watch?v=_H8V5hJUGd0',
          name: 'Palindrome Partitioning II',
          lc: 'LC 132',
          hint: 'Precompute isPalin[i][j]. Then 1D DP: dp[i] = min cuts for s[0..i]. For each i, if isPalin[0][i] → dp[i]=0. Else try all j: if isPalin[j+1][i] → dp[i]=min(dp[i], dp[j]+1).'
        },
        {
          id: 'di_lc312',
          lcUrl: 'https://leetcode.com/problems/burst-balloons/',
          nc: 'https://neetcode.io/problems/burst-balloons',
          yt: 'https://www.youtube.com/watch?v=VFskby7lUbw',
          name: 'Burst Balloons',
          lc: 'LC 312',
          hint: 'Pad with virtual 1s. dp[i][j] = max coins from open interval (i,j). Key: k is the LAST balloon burst in (i,j), so boundaries arr[i] and arr[j] are still present when k is burst.'
        }
      ],
      stretch: [
        {
          id: 'di_lc375',
          lcUrl: 'https://leetcode.com/problems/guess-number-higher-or-lower-ii/',
          name: 'Guess Number Higher or Lower II',
          lc: 'LC 375',
          hint: 'dp[i][j] = min money to guarantee a win on range [i,j]. Try each k as the guess: cost = k + max(dp[i][k-1], dp[k+1][j]). Take min over all k. Fill by interval length.'
        },
        {
          id: 'di_lc664',
          lcUrl: 'https://leetcode.com/problems/strange-printer/',
          yt: 'https://www.youtube.com/watch?v=xkQGBvMHaKU',
          name: 'Strange Printer',
          lc: 'LC 664',
          hint: 'dp[i][j] = min turns to print s[i..j]. If s[i]==s[j]: dp[i][j]=dp[i][j-1] (extend last turn). Else: try every split k, dp[i][j]=min(dp[i][k]+dp[k+1][j]).'
        }
      ]
    },
    selfCheck: [
      'Why must interval DP be filled by increasing length, not by increasing i?',
      'In Burst Balloons, why is it easier to think of k as the LAST balloon burst rather than the first?',
      'What is the time complexity of interval DP and where does each factor (n, n, n) come from?',
      'How do you precompute all isPalin[i][j] values in O(n²)?',
      'What is the recurrence for Palindrome Partitioning II and how is it different from the interval DP template?'
    ]
  },

  dp_knapsack: {
    id: 'dp_knapsack',
    title: 'Knapsack / Subset DP',
    phase: 'Phase 5 — Week 12',
    frequency: 'High',
    dependsOn: ['1D Dynamic Programming'],
    unlocks: [],
    idea: `The knapsack family of problems all share the same skeleton: you have a set of items and a capacity, and you decide for each item whether to <em>include</em> or <em>exclude</em> it to optimize some objective.\n\n<strong>0/1 Knapsack</strong> — each item used at most once. dp[i][w] = max value using first i items with capacity w.\n<strong>Unbounded Knapsack</strong> — each item used unlimited times (coin change). dp[w] = min coins to make amount w.\n<strong>Subset Sum / Partition</strong> — special case where values = weights and you ask "can we reach exactly W?"\n\nThe crucial optimization: 0/1 knapsack's 2D table can be compressed to 1D by iterating the capacity <em>right to left</em> (prevents using an item twice). Unbounded knapsack iterates <em>left to right</em> (allows reuse).`,
    variants: [
      {
        label: '0/1 Knapsack — Include or Exclude',
        visual: `items = [(wt=1,val=1), (wt=3,val=4), (wt=4,val=5)]
capacity = 4

dp[i][w] = max value using items 0..i-1 with capacity w

     w=0 w=1 w=2 w=3 w=4
i=0:  0   0   0   0   0   (no items)
i=1:  0   1   1   1   1   (can take item0: wt=1,val=1)
i=2:  0   1   1   4   5   (can take item1: wt=3,val=4)
i=3:  0   1   1   4   <span class="hl">5</span>   (item2 wt=4,val=5 — same as before)

For each cell: max(skip item, take item if wt fits)
dp[i][w] = max(dp[i-1][w],  dp[i-1][w-wt[i]] + val[i])

<span class="hl">Answer: dp[3][4] = 5</span>`,
        note: null
      },
      {
        label: 'Coin Change — Unbounded Knapsack',
        visual: `coins = [1, 2, 5],  amount = 11

dp[w] = min coins to make amount w
dp[0] = 0,  dp[1..11] = ∞ initially

w=1: try coin 1 → dp[0]+1=1. dp[1]=1
w=2: try coin 1 → dp[1]+1=2. try coin 2 → dp[0]+1=1. dp[2]=1
w=3: try 1→2, try 2→dp[1]+1=2. dp[3]=2
w=4: try 1→3, try 2→dp[2]+1=2. dp[4]=2
w=5: try 1→3, try 2→dp[3]+1=3, try 5→dp[0]+1=1. dp[5]=1
...
w=11: try 1→dp[10]+1, try 2→dp[9]+1, try 5→dp[6]+1=2+1=<span class="hl">3</span>

<span class="hl">Answer: 3</span>  (5+5+1)`,
        note: null
      },
      {
        label: 'Partition Equal Subset Sum — Subset DP',
        visual: `nums = [1, 5, 11, 5]
Sum = 22, target = 11. Can we partition into two equal subsets?

dp[w] = can we reach sum w using some subset?
dp[0] = true,  dp[1..11] = false

Process 1: dp[1] = dp[0] = true
Process 5: dp[6]=dp[1]=true, dp[5]=dp[0]=true
Process 11: dp[11]=dp[0]=<span class="hl">true</span>!

Answer: <span class="hl">true</span>  ({1,5,5} and {11})

<span class="hl3">Fill right to left to avoid using an item twice.</span>`,
        note: null
      }
    ],
    templates: [
      {
        label: '0/1 Knapsack — 1D Space-Optimized',
        code: `<span class="kw">public int</span> <span class="fn">knapsack</span>(<span class="ty">int</span>[] weights, <span class="ty">int</span>[] values, <span class="ty">int</span> capacity) {
    <span class="ty">int</span>[] dp = <span class="kw">new int</span>[capacity + <span class="nu">1</span>];

    <span class="kw">for</span> (<span class="ty">int</span> i = <span class="nu">0</span>; i < weights.length; i++) {
        <span class="kw">for</span> (<span class="ty">int</span> w = capacity; w >= weights[i]; w--) { <span class="cm">// RIGHT TO LEFT</span>
            dp[w] = <span class="ty">Math</span>.max(dp[w], dp[w - weights[i]] + values[i]);
        }
    }

    <span class="kw">return</span> dp[capacity];
}`
      },
      {
        label: 'Coin Change — Unbounded (Left to Right)',
        code: `<span class="kw">public int</span> <span class="fn">coinChange</span>(<span class="ty">int</span>[] coins, <span class="ty">int</span> amount) {
    <span class="ty">int</span>[] dp = <span class="kw">new int</span>[amount + <span class="nu">1</span>];
    <span class="ty">Arrays</span>.fill(dp, amount + <span class="nu">1</span>); <span class="cm">// fill with impossible sentinel</span>
    dp[<span class="nu">0</span>] = <span class="nu">0</span>;

    <span class="kw">for</span> (<span class="ty">int</span> w = <span class="nu">1</span>; w <= amount; w++) {
        <span class="kw">for</span> (<span class="ty">int</span> coin : coins) {
            <span class="kw">if</span> (coin <= w)
                dp[w] = <span class="ty">Math</span>.min(dp[w], dp[w - coin] + <span class="nu">1</span>);
        }
    }

    <span class="kw">return</span> dp[amount] > amount ? -<span class="nu">1</span> : dp[amount];
}`
      },
      {
        label: 'Partition Equal Subset Sum (0/1 Knapsack)',
        code: `<span class="kw">public boolean</span> <span class="fn">canPartition</span>(<span class="ty">int</span>[] nums) {
    <span class="ty">int</span> sum = <span class="nu">0</span>;
    <span class="kw">for</span> (<span class="ty">int</span> n : nums) sum += n;
    <span class="kw">if</span> (sum % <span class="nu">2</span> != <span class="nu">0</span>) <span class="kw">return false</span>;

    <span class="ty">int</span> target = sum / <span class="nu">2</span>;
    <span class="ty">boolean</span>[] dp = <span class="kw">new boolean</span>[target + <span class="nu">1</span>];
    dp[<span class="nu">0</span>] = <span class="kw">true</span>;

    <span class="kw">for</span> (<span class="ty">int</span> num : nums) {
        <span class="kw">for</span> (<span class="ty">int</span> w = target; w >= num; w--) { <span class="cm">// RIGHT TO LEFT — 0/1 (no reuse)</span>
            dp[w] = dp[w] || dp[w - num];
        }
    }

    <span class="kw">return</span> dp[target];
}`
      }
    ],
    signals: [
      { cue: '"can we reach sum X", "partition into equal subsets"', pattern: '0/1 Knapsack — boolean dp, iterate right to left' },
      { cue: '"minimum coins to make amount", "coin change"', pattern: 'Unbounded knapsack — iterate left to right (reuse allowed)' },
      { cue: '"count subsets with sum X"', pattern: '0/1 Knapsack — count dp, iterate right to left' },
      { cue: '"each item used at most once"', pattern: '0/1 Knapsack — right to left inner loop' },
      { cue: '"each item used unlimited times"', pattern: 'Unbounded knapsack — left to right inner loop' }
    ],
    mistakes: [
      {
        title: 'Iterating left to right for 0/1 knapsack',
        body: 'In the 1D optimized knapsack, iterating left to right lets you use the same item multiple times (because dp[w-wt] already reflects the current item). Iterate <em>right to left</em> to ensure each item is only used once.'
      },
      {
        title: 'Filling coin change dp with Integer.MAX_VALUE',
        body: 'If dp is filled with Integer.MAX_VALUE, then dp[w-coin]+1 overflows. Use amount+1 as the sentinel — it\'s larger than any valid answer, and there\'s no overflow risk.'
      },
      {
        title: 'Forgetting to check if sum is odd before partition problems',
        body: 'If the total sum is odd, it\'s impossible to split into two equal subsets — return false immediately. This short-circuit prevents unnecessary computation and a subtle off-by-one in the target.'
      },
      {
        title: 'Confusing "number of ways" vs "minimum coins"',
        body: '"Number of ways to make amount" uses addition (dp[w] += dp[w-coin]). "Minimum coins" uses min (dp[w] = min(dp[w], dp[w-coin]+1)). The loop structure is the same — only the operation changes.'
      }
    ],
    complexity: [
      { variant: '0/1 Knapsack (2D)', time: 'O(n × W)', space: 'O(n × W)' },
      { variant: '0/1 Knapsack (1D optimized)', time: 'O(n × W)', space: 'O(W)' },
      { variant: 'Unbounded Knapsack / Coin Change', time: 'O(n × W)', space: 'O(W)' }
    ],
    problems: {
      warmup: [
        {
          id: 'dk_lc416',
          lcUrl: 'https://leetcode.com/problems/partition-equal-subset-sum/',
          nc: 'https://neetcode.io/problems/partition-equal-subset-sum',
          yt: 'https://www.youtube.com/watch?v=IsvocB5BJhw',
          name: 'Partition Equal Subset Sum',
          lc: 'LC 416',
          hint: 'Target = sum/2. Boolean dp[w] = can we reach sum w. For each num, iterate w from target down to num (right to left). dp[w] |= dp[w-num]. Return dp[target].'
        }
      ],
      core: [
        {
          id: 'dk_lc322',
          lcUrl: 'https://leetcode.com/problems/coin-change/',
          nc: 'https://neetcode.io/problems/coin-change',
          yt: 'https://www.youtube.com/watch?v=H9bfqozjoqs',
          name: 'Coin Change',
          lc: 'LC 322',
          hint: 'Unbounded — iterate w from 1 to amount, try each coin. dp[w] = min(dp[w], dp[w-coin]+1). Initialize dp with amount+1 (sentinel). Return dp[amount] > amount ? -1 : dp[amount].'
        },
        {
          id: 'dk_lc518',
          lcUrl: 'https://leetcode.com/problems/coin-change-ii/',
          nc: 'https://neetcode.io/problems/coin-change-ii',
          yt: 'https://www.youtube.com/watch?v=Mjy4hd2xgrs',
          name: 'Coin Change II',
          lc: 'LC 518',
          hint: 'Count number of combinations. Iterate each coin in outer loop, amounts in inner loop (LEFT to right — coins can be reused). dp[w] += dp[w-coin]. Return dp[amount].'
        },
        {
          id: 'dk_lc494',
          lcUrl: 'https://leetcode.com/problems/target-sum/',
          nc: 'https://neetcode.io/problems/target-sum',
          yt: 'https://www.youtube.com/watch?v=g0npyaQtAQM',
          name: 'Target Sum',
          lc: 'LC 494',
          hint: 'Assign + or - to each number. Reduce to: find subset with sum = (total+target)/2 — count subsets. If (total+target) is odd or target > total, return 0. Then count subsets using 0/1 knapsack.'
        }
      ],
      stretch: [
        {
          id: 'dk_lc474',
          lcUrl: 'https://leetcode.com/problems/ones-and-zeroes/',
          yt: 'https://www.youtube.com/watch?v=NmnFnb1LnJE',
          name: 'Ones and Zeroes',
          lc: 'LC 474',
          hint: '2D 0/1 Knapsack — capacity is (m zeros, n ones). dp[i][j] = max strings using at most i zeros and j ones. For each string, iterate i and j right to left. dp[i][j] = max(dp[i][j], dp[i-zeros][j-ones]+1).'
        },
        {
          id: 'dk_lc1049',
          lcUrl: 'https://leetcode.com/problems/last-stone-weight-ii/',
          yt: 'https://www.youtube.com/watch?v=gdH-S9BSFMU',
          name: 'Last Stone Weight II',
          lc: 'LC 1049',
          hint: 'Equivalent to partition equal subset sum — find subset closest to sum/2. Minimum difference = total - 2*maxReachable. dp[w] = can we reach sum w using some subset. Find largest true w ≤ sum/2.'
        }
      ]
    },
    selfCheck: [
      'Why do you iterate right to left for 0/1 knapsack but left to right for unbounded knapsack?',
      'In Coin Change, why use amount+1 as sentinel instead of Integer.MAX_VALUE?',
      'What is the key difference between Coin Change (LC 322) and Coin Change II (LC 518) — what changes in the recurrence?',
      'How does Partition Equal Subset Sum reduce to a 0/1 knapsack problem?',
      'In Target Sum (LC 494), how do you convert the +/- assignment problem into a subset sum problem?'
    ]
  }
};

const RHYTHM = [
  { day: 'Mon', task: 'Read pattern card.\nUnderstand template fully.' },
  { day: 'Tue', task: 'Warm-up problem.\nShould feel easy by end of day.' },
  { day: 'Wed', task: 'Core problem #1.\n45 min hard cap.' },
  { day: 'Thu', task: 'Core problem #2.\nFocus on edge cases.' },
  { day: 'Fri', task: 'Stretch problem.\nTimer on — simulate interview.' },
  { day: 'Sat', task: 'Re-solve one problem from scratch without notes.' },
  { day: 'Sun', task: 'Review week.\nUpdate self-check boxes.' }
];
