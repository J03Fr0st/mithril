---
name: requesting-code-review
description: Use when completing tasks, finishing significant changes, reaching a review gate, or preparing to merge so a reviewer can check requirements and code quality
---

# Requesting Code Review

## Overview

Code review is a quality gate, not ceremony. Give a reviewer a focused package containing what changed, what it was supposed to do, and the diff range. Then act on the findings before continuing.

Core rule: review early enough that findings are cheap to fix.

## When to Use

Use this skill:

- After each task in `subagent-driven-development`.
- At explicit review checkpoints in a plan.
- After a significant direct implementation task.
- Before merge, PR creation, or branch completion.
- When stuck and a fresh technical review would help.

## Review Package

Provide the reviewer:

- Description of the work.
- Requirements, plan task, or acceptance criteria.
- Base and head commit SHAs or an equivalent diff file.
- Commands already run and their results.
- Known concerns or deferred Minor findings.

Ask the reviewer to report requirement gaps and code-quality issues separately, with severity and concrete file references.

## Common Rationalizations

| Rationalization | Reality |
| --- | --- |
| "The change is too small to review." | Small changes still ship bugs when unchecked. |
| "Tests passed, so review is unnecessary." | Tests do not prove scope, maintainability, or requirement coverage. |
| "The reviewer can inspect my chat." | Reviewers need requirements and diffs, not conversation history. |
| "Important findings can wait." | Important issues should be fixed before proceeding. |

## Red Flags

- No clear base/head range for the review.
- Review prompt omits acceptance criteria.
- The reviewer is asked to rubber-stamp or avoid specific findings.
- Critical or Important findings are ignored.
- Review feedback is implemented without technical evaluation.

## Verification

Before moving on after review:

- The review package included requirements and the relevant diff.
- Critical findings are fixed.
- Important findings are fixed or explicitly adjudicated with the user.
- Minor findings are recorded if deferred.
- Any fixes have their own verification evidence.
- Use `receiving-code-review` before implementing review feedback.
