---
name: grill-with-docs
description: Use when a plan or design needs stress testing against project language, CONTEXT.md, ADRs, existing code, or durable decision records.
---

# Grill With Docs

## Overview

`grill-with-docs` combines the interview pressure of `grilling` with the glossary and decision discipline of `domain-modeling`. It is for plans where terminology, domain boundaries, or recorded architectural decisions are part of the risk.

## When to Use

Use this skill when:

- A plan uses fuzzy, overloaded, or conflicting project terms.
- The plan should be checked against `CONTEXT.md`, `CONTEXT-MAP.md`, or ADRs before approval.
- A design discussion is likely to create or refine domain vocabulary.
- A decision may deserve an ADR because it is hard to reverse, surprising without context, and chosen from real alternatives.

If the user only wants a conversation without doc updates, use the `grilling` skill.

## Process

1. Read the relevant domain glossary and ADRs before questioning the plan.
2. Start the `grilling` loop: one question at a time, with a recommended answer and tradeoff.
3. When a domain term is resolved, update the relevant glossary immediately through `domain-modeling`.
4. When an architectural decision meets the ADR threshold, propose recording it and write only after the user agrees.
5. Cross-check claims against code when the codebase can answer them.

## Common Rationalizations

| Rationalization | Reality |
| --- | --- |
| "Docs can wait until the end." | The exact term or decision often gets blurred later. Capture it when it lands. |
| "I can just read the glossary." | Reading is consumption. This skill updates the model when the conversation changes it. |
| "Every decision needs an ADR." | ADRs are for durable, surprising tradeoffs, not routine implementation notes. |
| "The user knows what the term means." | Shared vocabulary matters because future agents and reviewers will read the artifact. |

## Red Flags

- A term in the plan conflicts with `CONTEXT.md`.
- The plan contradicts an ADR without acknowledging it.
- You are creating a glossary entry that includes implementation details.
- You are writing an ADR for a reversible or obvious choice.
- The session is producing decisions but no durable artifact.

## Verification

Before leaving the session:

- Relevant glossary and ADR files were checked, or their absence was treated as non-blocking.
- `grilling` was run one question at a time.
- Resolved vocabulary changes were captured through `domain-modeling`.
- ADRs were offered only for durable tradeoffs.
- Any unresolved terminology or ADR conflict is clearly reported.
