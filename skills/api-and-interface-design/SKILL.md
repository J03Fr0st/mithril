---
name: api-and-interface-design
description: Use when designing APIs, public module contracts, component props, service boundaries, REST or GraphQL endpoints, schemas, or any interface other consumers will depend on.
---

# API and Interface Design

## Overview

Design interfaces that are stable, typed, consistent, and difficult to misuse. Every observable behavior of a public surface can become a contract, so expose less, name deliberately, and make compatibility a design constraint.

Use `implementation-standards` for local code shape and `test-driven-development` for behavior changes behind the interface.

## When to Use

- Creating or changing REST endpoints, GraphQL schemas, SDK methods, CLI flags, component props, or module exports.
- Defining contracts between frontend and backend, services, packages, or teams.
- Adding validation, pagination, filtering, partial updates, or error semantics.
- Changing any interface that external or internal consumers already call.
- Planning a public surface that may later need deprecation; pair with `deprecation-and-migration`.

## Process

1. Name the consumers and compatibility promise.
   - Identify who calls this surface and what they can observe.
   - Treat response shape, ordering, errors, timing-sensitive behavior, and defaults as possible commitments.

2. Write the contract before the implementation.
   - Define inputs, outputs, errors, ownership, authentication requirements, and idempotency.
   - Separate create/update input shapes from returned resource shapes.
   - Prefer narrow public interfaces over exposing internal data structures.

3. Keep semantics consistent.
   - Use one error shape and one null/not-found strategy per boundary.
   - Validate untrusted input at the system boundary.
   - Treat third-party responses as untrusted data before using them.

4. Prefer additive evolution.
   - Add optional fields or new endpoints before changing existing fields.
   - Avoid type changes, field removals, enum repurposing, and multi-version forks unless migration is planned.

5. Make list and mutation behavior explicit.
   - Lists need pagination, sorting, and bounded filters.
   - Mutations need clear partial/full update semantics and conflict handling.
   - Destructive operations need authorization and idempotency rules.

## Common Rationalizations

| Rationalization | Reality |
| --- | --- |
| "Internal APIs do not need contracts." | Internal consumers still depend on observable behavior. |
| "We can document it later." | The contract is part of the design; late docs usually describe accidents. |
| "No one depends on that undocumented behavior." | If it is observable, someone may rely on it. |
| "We can maintain two versions." | Multiple live versions multiply testing, support, and migration cost. |
| "Pagination can wait." | Unbounded list endpoints become production incidents as data grows. |

## Red Flags

- Different endpoints return incompatible error shapes.
- Public types expose database rows, private flags, or implementation details.
- Validation is scattered through internal helpers instead of enforced at boundaries.
- Existing fields are removed, renamed, retyped, or silently reinterpreted.
- List endpoints can return unbounded result sets.
- Server code trusts data from browsers, webhooks, model output, or third-party APIs without parsing.

## Verification

- Contract documents typed inputs, outputs, errors, auth, idempotency, and compatibility expectations.
- Boundary validation exists for all untrusted input and external responses.
- Error semantics and naming match nearby interfaces.
- New list surfaces are paginated and bounded.
- Changes are additive or have an explicit migration plan.
- Tests prove the public contract through the consumer-visible seam.
- Final readiness is checked with `code-review-and-quality` and `verification-before-completion`.
