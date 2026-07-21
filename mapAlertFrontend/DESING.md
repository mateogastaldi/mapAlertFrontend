---
name: Signal Green
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#3e4a3f'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#6e7a6e'
  outline-variant: '#bdcabb'
  surface-tint: '#006d35'
  primary: '#006b33'
  on-primary: '#ffffff'
  primary-container: '#008742'
  on-primary-container: '#f6fff3'
  inverse-primary: '#66de89'
  secondary: '#595f65'
  on-secondary: '#ffffff'
  secondary-container: '#dde3eb'
  on-secondary-container: '#5f656c'
  tertiary: '#006951'
  on-tertiary: '#ffffff'
  tertiary-container: '#008467'
  on-tertiary-container: '#f5fff8'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#83fba3'
  primary-fixed-dim: '#66de89'
  on-primary-fixed: '#00210c'
  on-primary-fixed-variant: '#005226'
  secondary-fixed: '#dde3eb'
  secondary-fixed-dim: '#c1c7ce'
  on-secondary-fixed: '#161c22'
  on-secondary-fixed-variant: '#41474e'
  tertiary-fixed: '#77f9d0'
  tertiary-fixed-dim: '#58dcb5'
  on-tertiary-fixed: '#002117'
  on-tertiary-fixed-variant: '#00513e'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
typography:
  headline-xl:
    fontFamily: Manrope
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style

This design system is built for a modern, tech-focused utility that prioritizes real-time information, location intelligence, and user safety. The brand personality is **alert, precise, and dependable**, striking a balance between high-tech capability and human-centric accessibility.

The visual style is **Corporate / Modern** with a slight lean toward **Glassmorphism**. It utilizes clean lines, generous white space, and subtle depth to organize complex data. The aesthetic reflects the logo's geometry: combining the organic curves of the map pin with the rhythmic, digital signals of notification waves. The UI should evoke a sense of "informed calm"—providing critical updates without inducing panic through chaotic layouts.

## Colors

The palette is anchored by **Signal Green**, a vibrant and high-visibility hue derived directly from the primary brand mark. This color signifies "active," "safe," and "on," making it the primary driver for actions and status indicators.

- **Primary:** #01964b (Signal Green) – Used for primary buttons, active states, and brand-critical iconography.
- **Secondary:** #343a40 (Slate Gray) – Derived from the "map" portion of the wordmark, used for deep text and grounding elements.
- **Tertiary:** #63e6be (Mint Tint) – A lighter, digital-first green used for background washes, chips, and subtle accents.
- **Neutral:** A scale of cool grays from #F8F9FA to #DEE2E6, ensuring the interface remains clean and the green elements pop with maximum contrast.

The system defaults to a **light mode** to maintain high legibility in outdoor or high-glare environments typical of navigation and mapping apps.

## Typography

The typography strategy uses a three-tier approach to balance technical precision with modern friendliness.

**Manrope** is used for headlines. Its geometric but slightly softened terminals mirror the curvature of the logo icon. It provides a strong, authoritative voice for titles and critical alerts.

**Inter** is the workhorse for body copy and interface elements. Its high X-height and neutral character ensure that dense information remains readable across all screen sizes.

**JetBrains Mono** is introduced for labels, coordinates, timestamps, and metadata. This monospaced font injects a "tech-focused" aesthetic, suggesting data-driven accuracy and real-time computation.

## Layout & Spacing

The design system utilizes a **fluid grid** model based on an 8px square rhythm. This ensures consistent alignment and visual harmony between components.

- **Desktop:** A 12-column grid with a 24px gutter. Content is centered with a max-width of 1280px.
- **Tablet:** An 8-column grid with a 16px gutter and 24px side margins.
- **Mobile:** A 4-column grid with a 12px gutter and 16px side margins.

Spacing should be used to create clear groupings. Large `lg` and `xl` gaps should be used between distinct sections, while `xs` and `sm` units manage the internal relationships within cards and list items.

## Elevation & Depth

Visual hierarchy is managed through **tonal layers** and **ambient shadows**. 

The base surface is the lightest neutral (#F8F9FA). Secondary "container" surfaces (like cards or sidebars) use pure white (#FFFFFF) and are elevated using soft, diffused shadows with a subtle green tint (e.g., `rgba(1, 150, 75, 0.08)`) to tie the depth back to the brand color.

For high-priority overlays, such as map tooltips or alert modals, use a **glassmorphic** effect: a white semi-transparent background (80% opacity) with a 12px backdrop blur. This allows the user to maintain a sense of context (like seeing the map underneath) while focusing on the foreground task.

## Shapes

The shape language is **Rounded**, reflecting the map pin's circular elements. 

A standard border-radius of `0.5rem` (8px) is applied to buttons, input fields, and small UI components. Larger containers like cards and modals use a `1rem` (16px) radius to feel more approachable. 

The use of fully circular "pill" shapes is reserved exclusively for status badges and chips to differentiate them from actionable buttons.

## Components

### Buttons
- **Primary:** Solid Signal Green (#01964b) with white text. High-contrast, bold weight.
- **Secondary:** Slate Gray (#343a40) outlines with 1px stroke.
- **Ghost:** No background, Signal Green text, used for less urgent actions.

### Input Fields
Inputs use a soft gray background with a 1px border. On focus, the border transitions to Signal Green with a subtle outer glow. Labels use the `label-md` typography level for a technical feel.

### Cards
Cards are white with a 1px soft border (#DEE2E6). They should use the `rounded-lg` (16px) radius. Content inside should follow the 8px spacing rhythm.

### Chips & Badges
Small, pill-shaped indicators. Use the Tertiary Mint (#63e6be) background with Primary Green text for "active" or "safe" states. For "alerts," use a high-visibility orange or red, but maintain the same pill shape for consistency.

### Maps & Markers
Map pins should mimic the logo icon's silhouette. Real-time "pulses" (as seen in the logo's signal waves) can be used as animated CSS rings around active location markers to indicate live tracking.