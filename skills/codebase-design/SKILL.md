---
name: codebase-design
description: Use when designing or improving module interfaces, seams, adapters, test surfaces, or architecture for deeper, more maintainable code.
---

# Codebase Design

## Overview

Codebase design uses deep-module vocabulary to place complexity behind small, meaningful interfaces. The goal is leverage for callers, locality for maintainers, and tests that exercise behavior through the same seam callers use.

## When to Use

Use this skill when:

- Designing a new module, interface, adapter, or seam.
- Refactoring shallow pass-through code.
- Making code easier to test without exposing internals.
- Reviewing whether a proposed abstraction earns its place.
- Preparing architectural candidates for `improve-codebase-architecture`.

Use `test-driven-development` for implementation after the design is chosen.

## Vocabulary

| Term | Meaning |
| --- | --- |
| Module | Anything with an interface and an implementation: function, class, package, or vertical slice. |
| Interface | Everything a caller must know: signature, invariants, ordering, errors, configuration, and performance expectations. |
| Implementation | The code hidden behind the interface. |
| Seam | A place where behavior can vary without editing the caller. |
| Adapter | A concrete implementation that fits a seam. |
| Depth | The amount of useful behavior behind the interface. |
| Leverage | More capability per unit of interface the caller learns. |
| Locality | Change and verification concentrated in one place. |

## Process

1. Name the module and its caller-facing interface.
2. Apply the deletion test: if the module vanished, would complexity reappear across callers?
3. Keep the seam real.
   - One adapter is a maybe.
   - Two adapters or a clear test/runtime variation make the seam stronger.
4. Make the interface the test surface.
   - Prefer behavior tests through the public seam.
   - Avoid adding test-only internals.
5. Hide complexity that callers should not coordinate themselves.
6. Reject pass-through abstractions unless they create real locality or leverage.

## Common Rationalizations

| Rationalization | Reality |
| --- | --- |
| "A small implementation means a simple module." | Depth is measured at the interface, not by implementation size. |
| "A seam might be useful later." | Future variation is not enough. Prefer the seam when variation is real. |
| "Tests need access to internals." | If behavior cannot be tested through the interface, the interface may be wrong. |
| "More methods make the module flexible." | More surface makes callers learn and coordinate more. |

## Red Flags

- The interface is nearly as complex as the implementation.
- Callers must know ordering rules that the module could own.
- A new adapter has no second implementation or credible variation point.
- Tests mock most of the module instead of exercising its behavior.
- A proposed refactor moves code without increasing locality.

## Verification

Before accepting a design:

- The module, interface, seam, and adapter roles are named.
- The deletion test supports keeping the module.
- Tests can target the caller-facing interface.
- The design reduces caller knowledge or concentrates change.
- Tradeoffs and rejected alternatives are explicit.
