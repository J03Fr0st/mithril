---
name: performance-optimization
description: Use when performance requirements, regressions, Core Web Vitals, load times, latency, throughput, memory, bundle size, or scalability concerns need measurement and improvement.
---

# Performance Optimization

## Overview

Measure before optimizing. Performance work without a baseline is guessing, and guessing often adds complexity without improving what users feel.

Use `systematic-debugging` to reproduce performance regressions, `browser-testing-with-devtools` for browser traces, and `implementation-standards` to keep optimizations maintainable.

## When to Use

- Specs include load-time, response-time, throughput, memory, or bundle budgets.
- Users, monitoring, CI, or browser metrics report slowness.
- Core Web Vitals are outside target ranges.
- A change may introduce N+1 queries, unbounded rendering, heavy assets, or large bundles.
- Profiling has identified a bottleneck that needs a fix.

Do not optimize before evidence shows a performance problem or a clear budget risk.

## Process

1. Define the user-visible symptom and budget.
   - Name the flow, page, endpoint, job, or interaction.
   - State the threshold: p95 latency, Core Web Vital, memory ceiling, bundle size, queue age, or throughput.

2. Measure a baseline.
   - Use representative data, device, network, and environment.
   - Capture numbers before changing code.

3. Identify the bottleneck.
   - Frontend: network waterfall, bundle size, long tasks, re-render cost, images, fonts, layout shift.
   - Backend: query plan, N+1 access, indexes, payload size, synchronous work, locks, connection pool, external dependency.
   - Infrastructure: CPU, memory, queue depth, cold starts, cache hit rate, geography.

4. Fix the specific bottleneck.
   - Prefer bounded data access, pagination, batching, caching, code splitting, image sizing, and scheduling long work.
   - Avoid broad rewrites or memoization everywhere.
   - Preserve correctness and existing tests.

5. Measure again and guard.
   - Compare before/after numbers.
   - Add monitoring, performance tests, budgets, or regression checks when the risk is durable.

## Common Rationalizations

| Rationalization | Reality |
| --- | --- |
| "This optimization is obvious." | Without measurement, you do not know whether it moves the user-visible metric. |
| "It is fast on my machine." | Local hardware, data, cache, and network rarely match users. |
| "We will optimize later." | Obvious unbounded work and large assets become harder to fix after users depend on them. |
| "The framework handles performance." | Frameworks do not prevent N+1 queries, oversized payloads, or bad asset choices. |
| "Memoization is harmless." | Extra caching adds memory, invalidation, and complexity. |

## Red Flags

- No before/after numbers.
- Average latency is reported without p95 or p99.
- Lists, queries, or renders are unbounded.
- Images lack dimensions, responsive sizing, or appropriate loading priority.
- Bundle size grows without review.
- Main-thread work blocks interactions.
- Caches have no invalidation, cap, or ownership.
- Optimization changes weaken tests or readability without measured benefit.

## Verification

- Baseline and post-change measurements are recorded with environment details.
- The identified bottleneck matches the user-visible symptom.
- Core Web Vitals targets are met where browser UX is involved: LCP <= 2.5s, INP <= 200ms, CLS <= 0.1.
- Backend/API p95 and p99 latency are within the agreed budget.
- No new N+1 query, unbounded fetch, or unbounded render path remains.
- Existing behavior tests pass after the optimization.
- Use `references/performance-checklist.md` and report final evidence through `verification-before-completion`.
