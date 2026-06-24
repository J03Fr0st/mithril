---
name: dispatching-parallel-agents
description: Use when two or more independent investigations or tasks can run concurrently without shared state, shared files, or sequential dependencies
---

# Dispatching Parallel Agents

## Overview

Parallel agents are useful when independent problem domains can be investigated or implemented concurrently. The controller identifies independence, gives each agent a narrow brief, then integrates and verifies the results.

Core rule: one agent per independent domain. If the work shares files, state, or decisions, sequence it instead.

## When to Use

Use this skill when:

- Multiple failures are in unrelated subsystems.
- Several investigations can proceed without sharing state.
- Independent tasks have no ordering dependency.
- Each agent can receive a focused, self-contained brief.

Do not use it when failures might share a root cause, when tasks edit the same files, or when one task's output defines another task's interface.

## Process

1. Group the work by independent domain.
2. Confirm each group has separate files, state, commands, and success criteria.
3. Write one focused prompt per agent:
   - exact scope
   - relevant errors or requirements
   - constraints
   - expected output format
4. Dispatch independent agents in the same response when the platform supports true parallelism.
5. Review every result yourself.
6. Check for conflicts across changed files and conclusions.
7. Run the full integration verification after applying results.

## Common Rationalizations

| Rationalization | Reality |
| --- | --- |
| "Many tasks means parallel tasks." | Independence, not quantity, decides parallelism. |
| "The agents can coordinate." | Agents should not rely on each other unless you sequence them. |
| "A broad prompt saves time." | Broad prompts waste context and invite scope drift. |
| "Individual success means integrated success." | The controller must run integration verification. |

## Red Flags

- Agents would modify the same files.
- Agents need decisions from each other.
- The root cause is unknown and may be shared.
- The prompt says "fix all failures" instead of one scoped domain.
- No final integration check is planned.

## Verification

After parallel work returns:

- Each agent result was read and understood.
- File and decision conflicts were checked.
- The integrated diff is scoped and coherent.
- The relevant targeted checks and full integration checks were run.
- Remaining uncertainties are reported instead of smoothed over.
