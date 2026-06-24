---
name: frontend-ui-engineering
description: Use when building, modifying, reviewing, or polishing user-facing interfaces, components, layouts, forms, responsive behavior, interaction states, or visual design quality.
---

# Frontend UI Engineering

## Overview

Build interfaces that are usable, accessible, performant, and consistent with the product's design language. Frontend quality is proven in the browser and by user workflows, not by component code alone.

Use `browser-testing-with-devtools` for runtime verification and `test-driven-development` for behavior that should be guarded.

## When to Use

- Creating or changing pages, components, forms, navigation, dashboards, settings, onboarding, or empty states.
- Implementing responsive layouts, loading states, error states, optimistic updates, or interactions.
- Reviewing UI for polish, accessibility, performance, and design-system adherence.
- Fixing visual defects or UX regressions.

## Process

1. Start from the user's workflow.
   - Identify the primary action, supporting information, states, and error paths.
   - Build the usable surface first, not a marketing shell unless that is the actual request.

2. Match the existing design system.
   - Use established components, tokens, spacing, type scale, icon set, and interaction patterns.
   - Avoid generic AI-looking defaults: one-note palettes, oversized cards, gratuitous gradients, and decorative clutter.

3. Structure components for clarity.
   - Separate data fetching from presentation when it reduces coupling.
   - Prefer composition over large configuration objects.
   - Keep component responsibilities focused and names domain-specific.

4. Preserve accessibility from the first render.
   - Use semantic elements before ARIA.
   - Provide labels, visible focus, logical heading order, keyboard support, and meaningful status announcements.
   - Do not rely on color alone.

5. Design every state.
   - Loading, empty, error, disabled, pending, success, and overflow states should be intentional.
   - Realistic content length must fit without overlap at mobile and desktop widths.

6. Verify in a browser.
   - Check console, network, DOM, accessibility tree, screenshots, and relevant breakpoints.
   - Use `performance-optimization` when metrics reveal slowness.

## Common Rationalizations

| Rationalization | Reality |
| --- | --- |
| "We can polish later." | Layout, state, and accessibility debt compound quickly. |
| "The design is not final." | Existing design-system defaults still apply. |
| "It works with my test data." | Real content length and narrow screens reveal overflow and hierarchy problems. |
| "Accessibility is a nice-to-have." | Accessibility is a product and engineering quality bar. |
| "The component test passed." | Tests do not prove layout, contrast, focus order, or runtime rendering. |

## Red Flags

- Interactive elements are `div` or `span` without native semantics.
- Icon-only controls lack accessible names.
- Missing loading, empty, error, or disabled states.
- Text overlaps, truncates badly, or changes layout unexpectedly.
- Raw colors, arbitrary spacing, or inconsistent radius values bypass the design system.
- UI changes ship without browser verification.
- Performance-sensitive screens render unbounded lists or large assets.

## Verification

- Primary workflow works end to end in the browser.
- Console is clean for the changed flow.
- Layout is checked at mobile, tablet, laptop, and wide desktop widths relevant to the app.
- Keyboard navigation, focus management, labels, headings, and dynamic announcements are verified.
- Loading, empty, error, and success states are present where applicable.
- Performance and bundle impact are considered for large assets, lists, or heavy interactions.
- Use `references/accessibility-checklist.md` and report final evidence through `verification-before-completion`.
