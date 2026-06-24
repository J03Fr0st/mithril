# Accessibility Checklist

Quick reference for WCAG 2.1 AA-oriented frontend review. Use with the `frontend-ui-engineering` and `browser-testing-with-devtools` skills.

## Keyboard

- [ ] All interactive elements are reachable with Tab.
- [ ] Focus order follows the visual and logical reading order.
- [ ] Focus is visible and not removed without replacement styling.
- [ ] Custom widgets support expected keys such as Enter, Space, Escape, and arrow keys.
- [ ] No keyboard trap exists; users can leave every component.
- [ ] Modals trap focus while open and restore focus on close.
- [ ] Skip-to-content is available where page navigation is repeated.

## Semantics and Screen Readers

- [ ] Page has one `h1`; headings do not skip levels.
- [ ] Landmarks use semantic elements such as `main`, `nav`, `header`, and `footer`.
- [ ] Images have useful `alt` text or `alt=""` when decorative.
- [ ] Inputs have visible labels or a justified accessible name.
- [ ] Buttons and links have descriptive names; icon-only controls use `aria-label`.
- [ ] Tables use header cells and scope where data relationships matter.
- [ ] Dynamic status and error changes use appropriate live regions.

## Visual and Interaction

- [ ] Normal text contrast is at least 4.5:1; large text and UI components meet at least 3:1.
- [ ] Color is not the only way to show state, error, or success.
- [ ] Text can resize to 200% without overlap or loss of function.
- [ ] Touch targets are at least 44 by 44 CSS pixels where practical.
- [ ] No content flashes more than three times per second.
- [ ] Loading, empty, error, and success states are meaningful.

## Forms

- [ ] Required fields are indicated by text or shape, not color alone.
- [ ] Errors are specific, visible, and associated with the field.
- [ ] Form-level errors are summarized and focusable when needed.
- [ ] Known fields use appropriate `type` and `autocomplete`.
- [ ] Validation does not rely on client-side checks as a security boundary.

## Common Fixes

| Problem | Better Shape |
| --- | --- |
| `div` used as a button | Use `button` unless navigation requires `a`. |
| Empty icon button | Add visible text or `aria-label`. |
| Color-only error state | Add text, icon, and programmatic association. |
| Custom dropdown without keyboard support | Use native `select` or a complete ARIA combobox/listbox pattern. |
| Removed outline | Style focus visibly instead of hiding it. |

## Verification

- [ ] Keyboard-only pass completed.
- [ ] Browser accessibility tree checked for names, roles, and structure.
- [ ] Automated audit run where available.
- [ ] Screen reader spot-check completed for high-risk flows.
- [ ] Findings are reported with exact page, viewport, and component context.
