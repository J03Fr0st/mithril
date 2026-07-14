# Adopting Mithril in New and Established Codebases

Mithril's lifecycle is the same in every project, but the safest rollout depends on the codebase. A greenfield project can use the full workflow from its first feature. An established codebase should adopt incrementally, beginning with context and verification around the areas that will change.

For installation, see [Getting Started](getting-started.md) and the host-specific setup guides. For the active workflow surface, see the [Mithril README](../README.md).

## Choose a Path

| Signal | Greenfield | Brownfield |
| --- | --- | --- |
| Existing behavior | Little or none | Significant, sometimes undocumented |
| Tests | Established from the first change | Uneven or absent around legacy paths |
| Conventions | Still forming | Established in code and team habits |
| Change risk | Usually narrow | Hidden dependencies can widen the blast radius |
| Adoption strategy | Full lifecycle immediately | Incremental and verification-first |

If the project has already shipped, has external users, or contains behavior the team cannot confidently explain, start with the brownfield path. Both paths converge on the same steady state.

## Path A — Greenfield: Full Lifecycle From Day One

### Install and establish project context

1. Install Mithril using the guide for the current host.
2. Make `using-mithril` available as the sole active router.
3. Run `setup-mithril-project` when the repository needs tracker, triage-label, or domain-document conventions.
4. Record the real stack, commands, boundaries, and vocabulary in the repository's existing agent rules and domain docs.

### Define before building

Use the lifecycle in order for the first real feature:

```text
/spec   -> approved intent or a tracker-backed spec
/plan   -> docs/mithril/plans/YYYY-MM-DD-<feature>.md
/build  -> one approved, test-driven slice at a time
/review -> correctness and risk review before integration
/ship   -> launch, release, and branch-integration checks
```

Commands choose when a workflow begins; skills provide the process. Keep `using-mithril` as the router rather than loading every skill into every session.

### Establish these disciplines early

- **`test-driven-development`** — use a failing test before each behavior change so coverage debt never becomes the default.
- **`implementation-standards`** — let repository tools and local conventions shape code, seams, naming, and evidence.
- **`security-and-hardening`** — treat input, authentication, secrets, dependencies, and external services as design boundaries.
- **`documentation-and-adrs`** — capture consequential decisions while their constraints and rejected alternatives are still fresh.

### Add specialist workflows when the boundary appears

| First occurrence | Add |
| --- | --- |
| Public API or module contract | `api-and-interface-design` |
| User-facing interface | `frontend-ui-engineering`, then `browser-testing-with-devtools` for browser proof |
| CI or release automation | `ci-cd-and-automation` |
| Production deployment | `observability-and-instrumentation`, `shipping-and-launch` |
| Measurable performance requirement | `performance-optimization` |

### Greenfield traps

- Skipping `/spec` because the change looks small but still contains unresolved behavior or scope.
- Loading the entire skill catalog rather than routing by the current lifecycle phase.
- Treating tests, security, observability, or decisions as cleanup work for later.
- Keeping plans vague instead of making each slice independently verifiable.

## Path B — Brownfield: Incremental and Verification-First

In an established codebase, the first risk is changing behavior that nobody has fully specified. Begin with workflows that help the agent understand and protect the system, then expand into implementation.

### Phase 1 — Establish context and inspect safely

1. Use **`context-engineering`** to capture the commands, directory meanings, conventions, boundaries, and known landmines that are true today.
2. Use **`code-review-and-quality`** on incoming changes. Review delivers value without adding runtime behavior.
3. Use **`systematic-debugging`** for existing failures so reproduction, reduction, evidence, and regression protection replace speculative fixes.
4. Add **`doubt-driven-development`** when unfamiliar code or high reversal cost makes independent adversarial review worthwhile.

### Phase 2 — Put tests around the next change

- Add **characterization tests** at the public seam before changing untested legacy behavior. These tests record what the system does now, including behavior that may later be deliberately changed.
- Apply **`test-driven-development`** to every new behavior and bug fix in the touched area.
- Use **`code-simplification`** only after behavior is protected; understand why a structure exists before removing it.
- Keep refactors and behavior changes separable so failures can be reviewed, reverted, and bisected.

Do not chase global coverage before useful work can begin. Build the safety net around the next approved change and ratchet coverage outward as the codebase evolves.

### Phase 3 — Run new work through the full lifecycle

New features in an old repository use the same sequence as greenfield work:

```text
/spec -> /plan -> /build -> /review -> /ship
```

- Put explicit legacy boundaries in the approved intent and plan.
- Use `api-and-interface-design` where new code meets established behavior.
- Use `security-and-hardening` first as an assessment of the touched attack surface, then as a gate for the new change.
- Save executable plans under `docs/mithril/plans/` unless the user or repository convention selects another location.

### Phase 4 — Reduce and observe the legacy surface

- Use **`deprecation-and-migration`** to replace old behavior without creating permanent compatibility layers or zombie code.
- Add **`observability-and-instrumentation`** first along paths that cause incidents or are difficult to diagnose.
- Use **`performance-optimization`** only with measurements that identify the actual bottleneck.
- Record architectural decisions and operational constraints as they become understood.

### Brownfield traps

- Big-bang adoption that attempts to redesign the whole repository before protecting current behavior.
- Refactoring untested code without characterization tests.
- Inferring project conventions from whichever file the agent happened to read first.
- Assuming strange legacy behavior is accidental before tracing its callers and constraints.
- Adding gates temporarily and then removing them instead of ratcheting quality upward.

## The Paths Converge

Both paths end with lifecycle work routed through `using-mithril`, approved intent before implementation, test-driven slices, evidence-backed review, and explicit shipping checks.

| | Greenfield | Brownfield |
| --- | --- | --- |
| First emphasis | Shape and build the first feature correctly | Understand and protect current behavior |
| TDD posture | Universal from the first behavior | Universal for new behavior; characterization tests around legacy seams |
| Refactoring rule | Keep changes small as the structure emerges | Protect behavior first, then simplify |
| Main risk | Skipping discipline because the project is young | Changing undocumented, load-bearing behavior |
| Convergence point | Full lifecycle immediately | Full lifecycle for new work while legacy safety improves incrementally |
