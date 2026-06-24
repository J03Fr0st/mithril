# Testing Patterns

Quick reference for behavior-focused tests. Use with the `test-driven-development` skill.

## Test Shape

Use Arrange, Act, Assert:

- Arrange: create inputs, fixtures, dependencies, and preconditions.
- Act: call the public function, endpoint, command, or user action.
- Assert: check the externally observable result.

Prefer one behavior per test. If the test name needs "and", split it unless the combined behavior is the contract.

## Naming

Good test names describe behavior and condition:

- `creates a task with default pending status`
- `returns 422 when title is empty`
- `does not expose passwordHash in user response`
- `announces validation errors to screen readers`

Avoid names such as `works`, `test1`, or `handles bad input`.

## Assertion Guidance

- Assert outcomes, not implementation details.
- Assert specific values where possible.
- Use broad matchers only for non-essential generated fields.
- For errors, assert the error type or stable code rather than brittle prose unless message text is a contract.
- Always await asynchronous assertions so failures cannot be swallowed.

## What to Mock

Mock at slow, unsafe, or external boundaries:

- Database, filesystem, network, payment provider, email/SMS provider, clock, randomness, browser APIs, and third-party services.

Avoid mocking:

- The unit under test, pure helpers, validation logic, business rules, or code whose behavior the test is meant to prove.

Prefer fakes when they make behavior clearer than interaction mocks.

## Component and Browser Tests

- Query elements by role, label, text, or accessible name before test IDs.
- Verify keyboard behavior and focus for interactions.
- Include loading, empty, error, disabled, and success states.
- Pair automated component tests with browser checks for layout, console, network, and accessibility when visual behavior matters.

## API and Integration Tests

- Test through the public HTTP, command, package, or service boundary.
- Cover success, validation failure, authentication failure, authorization failure, not-found, and conflict cases as risk warrants.
- Use realistic fixtures and reset state between tests.
- Assert response shape, status, headers, and side effects that are part of the contract.
- Treat third-party and model outputs as untrusted inputs in tests.

## End-to-End Tests

- Reserve E2E for critical user flows and integration risks.
- Keep flows short and deterministic.
- Avoid asserting every detail through E2E when smaller tests cover it.
- Capture screenshots or traces on failure when the tool supports it.

## Anti-Patterns

| Anti-Pattern | Problem | Better Shape |
| --- | --- | --- |
| Test passes before implementation | It did not prove missing behavior | Fix the RED step. |
| Snapshot everything | Reviewers stop reading diffs | Assert meaningful contract fields. |
| Shared mutable state | Tests influence each other | Isolate setup and teardown. |
| Permanent skipped tests | Hidden broken behavior | Fix or delete. |
| Over-mocking | Tests call choreography | Test observable behavior. |
| Test-only production hooks | Public API polluted by tests | Use existing seams or improve design. |
| Manual-only verification | No regression guard | Automate the important check. |

## Verification

- [ ] New behavior has a failing test before implementation unless explicitly out of scope.
- [ ] Tests exercise public seams.
- [ ] Tests fail for the intended reason when behavior is absent.
- [ ] Tests are deterministic and independent.
- [ ] Focused and relevant broader suites pass after the final edit.
