# Definition of Done

A standing quality bar for every change. Acceptance criteria answer "did we build this task?"; the Definition of Done answers "is this ready to count as finished?".

## Correctness

- [ ] Task acceptance criteria are met.
- [ ] Changed behavior was verified at runtime or through an equivalent executable check.
- [ ] New behavior has tests that would fail without the change and pass with it, unless the change is pure static documentation or generated output.
- [ ] Existing relevant tests still pass.
- [ ] Edge cases and error paths are handled, not only the happy path.
- [ ] Public interfaces preserve compatibility or include a migration plan.

## Quality

- [ ] Change is scoped to the task; unrelated refactors, formatting, and generated artifacts are separate.
- [ ] Code follows local style, naming, module boundaries, and existing patterns.
- [ ] No speculative abstractions, options, dependencies, or configurability were added.
- [ ] No duplicated business logic or confusing control flow was introduced.
- [ ] No debug output, commented-out code, or unused imports remain from the change.
- [ ] Review through `code-review-and-quality` has no unresolved critical or required findings.

## Safety

- [ ] Security implications were checked for untrusted input, auth, secrets, data, external integrations, and model output.
- [ ] Authorization, validation, and data-loss protections were not weakened.
- [ ] Accessibility was checked for browser-facing changes.
- [ ] Performance budget or regression risk was considered for heavy data, rendering, network, or asset changes.
- [ ] Observability exists for new production-critical paths.

## Integration

- [ ] Configuration, migrations, feature flags, and environment assumptions are accounted for.
- [ ] Rollback or disable path exists for risky changes.
- [ ] Documentation is updated for public behavior, setup, operations, or architectural decisions.
- [ ] The change works with the broader system, not only in isolation.

## Evidence

- [ ] Exact verification commands or manual checks are recorded.
- [ ] Failures, skipped checks, and unavailable tools are reported honestly.
- [ ] Final status uses fresh evidence through `verification-before-completion`.
