# Performance Checklist

Quick reference for performance reviews. Use with the `performance-optimization` and `browser-testing-with-devtools` skills.

## Targets and Measurement

- [ ] User-visible flow, endpoint, job, or interaction is named.
- [ ] Budget is explicit: Core Web Vital, p95/p99 latency, throughput, memory, bundle size, or queue age.
- [ ] Baseline measurement exists before changes.
- [ ] Post-change measurement uses comparable device, network, data, and environment.
- [ ] Results include p95 or p99 where latency matters, not only averages.

## Core Web Vitals

| Metric | Good | Needs Work | Poor |
| --- | --- | --- | --- |
| LCP | <= 2.5s | <= 4.0s | > 4.0s |
| INP | <= 200ms | <= 500ms | > 500ms |
| CLS | <= 0.1 | <= 0.25 | > 0.25 |

## Frontend

- [ ] Images use modern formats, responsive sizes, explicit dimensions, and correct loading priority.
- [ ] LCP image is not lazy-loaded and can use high fetch priority.
- [ ] Below-the-fold images are lazy and async decoded.
- [ ] Initial JavaScript bundle stays within the project budget.
- [ ] Heavy routes or features are code-split.
- [ ] Long tasks over 50ms are broken up or moved off the main thread.
- [ ] Memoization is used only where profiling shows benefit.
- [ ] Third-party scripts are audited, deferred, or replaced with facades where possible.
- [ ] Animations use transform and opacity rather than layout-triggering properties.
- [ ] Long lists use pagination or virtualization.
- [ ] Text, fonts, and layout reserve space to avoid CLS.

## Backend and Data

- [ ] No N+1 query pattern remains.
- [ ] List endpoints are paginated and bounded.
- [ ] Queries used for filtering or sorting have appropriate indexes.
- [ ] Expensive work is batched, cached, queued, or moved out of request path.
- [ ] Caches have a size limit, TTL or invalidation strategy, and owner.
- [ ] Payloads are bounded and compressed where appropriate.
- [ ] Connection pools, timeouts, retries, and circuit behavior are configured for dependencies.
- [ ] Slow query and dependency timing are observable.

## Infrastructure

- [ ] Static assets use content hashes and long cache lifetimes.
- [ ] CDN or edge delivery is considered for global users.
- [ ] Health checks cover dependencies needed for readiness.
- [ ] Queue depth, saturation, and worker lag are visible.
- [ ] Autoscaling or capacity assumptions match expected traffic.

## Common Anti-Patterns

| Anti-Pattern | Impact | Better Shape |
| --- | --- | --- |
| N+1 queries | Linear database load | Join, include, batch, or prefetch. |
| Unbounded lists | Memory and latency growth | Paginate or virtualize. |
| Average-only latency | Tail pain hidden | Track p95 and p99. |
| Images without dimensions | Layout shift | Reserve dimensions and responsive sources. |
| Memoization everywhere | Memory and complexity | Profile first. |
| Cache without invalidation | Stale or inconsistent data | Define TTL, cap, and invalidation. |

## Verification

- [ ] Bottleneck is identified with evidence.
- [ ] Before/after numbers show the target metric improved or stayed within budget.
- [ ] Behavior tests still pass.
- [ ] Monitoring or budget guard exists when regression risk remains.
