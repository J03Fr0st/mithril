---
name: domain-modeling
description: Use when project domain terms, glossary entries, context maps, or ADR-worthy decisions need to be created, sharpened, reconciled, or recorded.
---

# Domain Modeling

## Overview

Domain modeling keeps project language precise. It challenges vague terms, reconciles glossary conflicts, records durable decisions, and keeps `CONTEXT.md`, `CONTEXT-MAP.md`, and ADRs useful without turning them into specs.

## When to Use

Use this skill when:

- A discussion introduces or changes a project domain term.
- The user uses one word for multiple concepts, or multiple words for one concept.
- A plan needs to respect existing domain language before becoming an issue, PRD, or design.
- A decision may need an ADR.
- Another skill needs active glossary or ADR maintenance.

Do not use this skill merely to read existing terms. Reading project vocabulary is a normal input to other skills.

## Process

1. Locate the relevant domain docs.
   - If `CONTEXT-MAP.md` exists, use it to find the relevant context glossary.
   - Otherwise use the root `CONTEXT.md` when present.
   - Read ADRs that touch the area under discussion.
2. Challenge unclear language immediately.
   - Name the conflicting definitions.
   - Offer a precise candidate term.
   - Use concrete scenarios to expose edge cases.
3. Check code when a domain claim is about existing behavior.
4. Update glossary entries lazily.
   - Create `CONTEXT.md` only when a real term has been resolved.
   - Keep glossary entries about domain meaning, not implementation details.
5. Offer ADRs sparingly.
   - Use an ADR only for a decision that is hard to reverse, surprising without context, and chosen from real alternatives.

## Common Rationalizations

| Rationalization | Reality |
| --- | --- |
| "Everyone knows what this means." | Future agents and reviewers only know what the repo records. |
| "Implementation details help define the term." | Glossaries define domain meaning; specs and code define implementation. |
| "An ADR is safer for every choice." | Routine choices bury the decisions that actually need history. |
| "We can clean up the wording later." | Domain language decays fastest while decisions are fresh. |

## Red Flags

- A term is used differently in code, docs, and conversation.
- A glossary entry describes tables, files, functions, or UI rather than domain meaning.
- A plan introduces a new concept without naming it.
- An ADR is being written without alternatives.
- An ADR conflict is ignored because the new plan feels obvious.

## Verification

Before leaving domain-modeling work:

- Relevant glossary and ADR sources were checked when present.
- New or changed terms are precise, singular, and implementation-free.
- ADRs record only durable tradeoffs.
- Any code-vs-language contradiction is reported.
- Follow-on work uses the canonical terms.
