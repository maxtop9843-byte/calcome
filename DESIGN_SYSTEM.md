# CalcLab Design System

CalcLab uses a calm, precise visual language inspired by high-trust financial and productivity products. Interfaces should feel modern and polished without decoration competing with the calculation. The system is mobile-first and token-driven.

## Typography

- Use the Korean-capable system sans-serif stack. This avoids a render-blocking font download while selecting Pretendard, Apple SD Gothic Neo, Noto Sans KR, or Malgun Gothic when available.
- Body text defaults to 16px with a 1.5-1.7 line height. Never use body text below 14px.
- Use a compact type scale: 14, 16, 18, 24, 32, 48, and 60px where space permits.
- Headings are semibold with tight tracking; body and labels are regular or medium.
- Use tabular numerals for changing values, comparisons, tables, and results.
- Keep line lengths near 45-75 characters and avoid relying on weight alone for hierarchy.

## Colors

Use semantic CSS tokens rather than literal colors in components. The neutral base is cool and quiet; indigo is the primary action and focus color. Green and red communicate positive and negative meaning only when accompanied by text or icons. Chart colors must remain distinguishable in both themes and never be the sole carrier of information.

Core tokens are `background`, `foreground`, `card`, `popover`, `primary`, `secondary`, `muted`, `accent`, `destructive`, `border`, `input`, `ring`, and `chart-1` through `chart-5`.

## Light theme

Use an off-white page background, white elevated surfaces, charcoal text, restrained cool-gray borders, and indigo actions. Shadows are subtle and reserved for floating layers; structure should primarily come from spacing and borders.

## Dark theme

Use a deep blue-charcoal background rather than pure black, slightly lighter surfaces, soft white primary text, and a brighter indigo primary. Preserve semantic contrast and hierarchy instead of mechanically inverting light colors. Theme selection will eventually respect the system preference and a user choice.

## Spacing

Use a 4px base grid. Preferred steps are 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, and 80px. Start compact inside controls and generous between sections. Mobile page gutters are 20px; increase to 32px on larger screens. Avoid one-off spacing values.

## Border radius

- Small controls and tags: 6-8px
- Inputs and buttons: 10-12px
- Cards and dialogs: 12-16px
- Pills: fully rounded only when the shape communicates a compact status or filter

Nested surfaces should not have a larger radius than their container.

## Buttons

Use primary buttons for the single most important action, secondary or outline buttons for alternatives, ghost buttons for low-emphasis actions, and destructive styling only for destructive actions. Minimum touch target is 44 by 44px even when the visual control is smaller. Every state needs clear hover, active, focus-visible, disabled, and loading feedback. Labels use specific verbs.

## Inputs

Place persistent labels above inputs; placeholders are examples, not labels. Show units beside or within the control without obscuring the editable value. Use appropriate mobile input modes. Validation messages identify the problem and resolution, remain associated with the field, and do not depend on color. Preserve user input after errors.

## Cards

Cards group one coherent concept. Prefer a border on the page surface and add a subtle shadow only when elevation matters. Use consistent header, content, and footer spacing. Avoid deeply nested cards. Calculator result cards should prioritize the primary result, then assumptions and details.

## Tables

Use tables only for truly tabular comparisons. Provide a caption or nearby heading, semantic headers, right-aligned tabular numbers, visible row focus/hover where interactive, and explicit units. On small screens, allow intentional horizontal scrolling with a visible cue or transform the data into labeled rows without losing relationships.

## Charts

Charts support the numeric result; they do not replace it. Include a title, accessible summary, units, legend, and data table or equivalent detail. Use the semantic chart palette, direct labels when practical, and patterns or markers when color distinction is insufficient. Tooltips must work by keyboard and touch. Avoid 3D effects and decorative animation.

## Icons

Use Lucide icons through the established component layer. Default sizes are 16, 20, and 24px with consistent stroke weight. Icons supplement visible labels; icon-only controls require an accessible name and tooltip where meaning is not universal. Do not mix icon families.

## Advertisement placeholders

No advertisements are implemented in the foundation. Future reserved placements must use a neutral `Advertisement` label, have fixed responsive dimensions to prevent layout shift, stay outside forms and result hierarchy, and never resemble navigation or product controls. A missing advertisement collapses cleanly. Content and calculator use always take priority.

## Responsive behavior

Design from a 320px-wide viewport upward. Use content-driven breakpoints, single-column forms on small screens, and progressive enhancement for side-by-side input/result layouts. Navigation, tables, charts, and dialogs must remain operable with touch and keyboard. Do not hide essential content on mobile. Test zoom to 200%, long Korean labels, dynamic type, safe areas, landscape orientation, and reduced motion.
