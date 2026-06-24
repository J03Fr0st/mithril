# Observability Checklist

Quick reference for production telemetry. Use with the `observability-and-instrumentation` skill.

## Start With Questions

- [ ] Two to four on-call questions are written for the feature.
- [ ] Every log, metric, trace, dashboard, and alert maps to a question.
- [ ] The signal type is appropriate: metrics show that, traces show where, logs show why.

## Structured Logs

- [ ] Logs are structured records with stable event names.
- [ ] Correlation or request ID is attached at the boundary and propagated downstream.
- [ ] Levels are consistent: error for broken invariant, warn for handled degradation, info for significant event, debug for development detail.
- [ ] Fields are allowlisted.
- [ ] No secrets, tokens, passwords, auth headers, full request bodies, or unredacted PII are logged.
- [ ] External calls include sanitized metadata such as dependency name, status, latency, and attempt count.

## Metrics

- [ ] RED metrics exist for endpoints and dependencies: rate, errors, duration.
- [ ] USE metrics exist for resources: utilization, saturation, errors.
- [ ] Latency uses histograms with p50, p95, and p99.
- [ ] Labels come from bounded sets such as route template, status class, method, queue, and provider.
- [ ] Labels do not include user IDs, tenant IDs, emails, raw URLs, request IDs, or error messages.
- [ ] Queues track depth, age, processing duration, success, and failure.

## Tracing

- [ ] Tracing starts before instrumented modules initialize.
- [ ] HTTP, database, queue, and external calls propagate context.
- [ ] Manual spans represent meaningful work units.
- [ ] Span attributes avoid secrets and PII.
- [ ] One representative request can be followed end to end.

## Alerting and Dashboards

- [ ] Alerts are symptom-based: error rate, p99 latency, queue age, data integrity, or critical business failure.
- [ ] Cause metrics such as CPU, memory, and restarts live on dashboards unless they require immediate action.
- [ ] Every alert has owner, threshold, duration, severity, and runbook.
- [ ] No alert fires regularly without action.
- [ ] Dashboards answer the on-call questions and use a useful default time range.

## Verify Telemetry

- [ ] Induced error can be found by correlation ID.
- [ ] Test traffic produces expected metric series and sane values.
- [ ] Trace view shows no broken service boundaries.
- [ ] New alert was test-fired or dry-run checked.
- [ ] On-call can diagnose the staged failure from telemetry without reading source.
