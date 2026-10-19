---
name: Silk Dark
colors:
  surface: '#10131d'
  surface-dim: '#10131d'
  surface-bright: '#363944'
  surface-container-lowest: '#0b0e18'
  surface-container-low: '#181b26'
  surface-container: '#1c1f2a'
  surface-container-high: '#272a34'
  surface-container-highest: '#323440'
  on-surface: '#e0e1f0'
  on-surface-variant: '#c7c4d7'
  inverse-surface: '#e0e1f0'
  inverse-on-surface: '#2d303b'
  outline: '#908fa0'
  outline-variant: '#464554'
  surface-tint: '#c0c1ff'
  primary: '#c0c1ff'
  on-primary: '#1000a9'
  primary-container: '#8083ff'
  on-primary-container: '#0d0096'
  inverse-primary: '#494bd6'
  secondary: '#bdc2ff'
  on-secondary: '#131e8c'
  secondary-container: '#2f3aa3'
  on-secondary-container: '#a8afff'
  tertiary: '#7bd0ff'
  on-tertiary: '#00354a'
  tertiary-container: '#009bd1'
  on-tertiary-container: '#002d40'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#e0e0ff'
  secondary-fixed-dim: '#bdc2ff'
  on-secondary-fixed: '#000767'
  on-secondary-fixed-variant: '#2f3aa3'
  tertiary-fixed: '#c4e7ff'
  tertiary-fixed-dim: '#7bd0ff'
  on-tertiary-fixed: '#001e2c'
  on-tertiary-fixed-variant: '#004c69'
  background: '#10131d'
  on-background: '#e0e1f0'
  surface-variant: '#323440'
typography:
  headline-display:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.025em
  headline-display-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: -0.005em
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: 0em
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: 0.005em
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.03em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  gutter-lg: 2rem
  margin: 2rem
  margin-sm: 1rem
  margin-lg: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system expresses a refined, tactile neomorphism tuned precisely for dark mode. The north star is "Dark Extruded Slate & Tactile Luminescence." The visual posture avoids both hyper-flat minimalism and harsh high-contrast borders. Instead, it recreates physical depth through extruded slate forms, soft ambient occlusion, directional micro-highlights, and luminous violet energy.

### Brand Personality & Emotional Posture
- **Atmospheric & Immersive:** Deep slate-indigo bases (#0e111b) craft a serene, focused canvas that minimizes optical fatigue during long creative workflows.
- **Dimensional & Physical:** UI elements feel molded, cast, and extruded from fine matte stone or machined composites. Physicality is expressed through directional light rather than hard boundaries.
- **Controlled Luminescence:** Accents in electric indigo and soft violet slice through deep neutral planes with soft glows, delivering an interface that feels quiet, modern, and high-performance.

### Design Aesthetic
The aesthetic bridges soft dark neomorphism with precision ergonomics. Surfaces do not rely on flat color fills; they employ low-pitch radial gradients, dual-light specular highlights (top-left light incidence), deep ambient occlusion (bottom-right shadows), and tactile inset depressions for interactive states.

## Colors

The palette is engineered around dark extruded indigo-slate tiers, illuminated by focused spectral highlights and functional semantic accents.

### Tonal Hierarchy
- **Canvas Base (`#0e111b`):** The absolute grounding canvas. Used behind all structural shells, application rails, and base viewports.
- **Surface Tier 1 (`#151824`):** Molded cards, standard structural groupings, and background panels.
- **Surface Tier 2 (`#1c2030`):** Floating extruded elements, actionable card containers, modal backdrops, and detached surfaces.
- **Surface Tier 3 / Raised (`#24293d`):** Primary interactive elements in unpressed states, pill controls, floating toolbars, and hover overlays.

### Accents & Luminescence
- **Primary Indigo (`#6366f1`):** Core action driver, active pill containers, and focused state glows.
- **Secondary Violet (`#818cf8`):** Specular accent, interactive hover halos, and secondary badges.
- **Tertiary Sky Blue (`#38bdf8`):** Informational callouts, active system states, and fine analytics indicators.

### Semantics & Status
- **Success (`#34d399`):** Emerald; active states, live deployments, positive trends.
- **Warning (`#fbbf24`):** Amber; system notices, pending actions, cautions.
- **Critical / Danger (`#f87171`):** Rose; destructive actions, error badges, failed conditions.
- **Info (`#38bdf8`):** Sky; informational chips, context alerts.

### Text Contrast Tiers
- **Text High-Emphasis:** `#f1f5f9` (Slate 100) — Primary headlines and critical metrics.
- **Text Medium-Emphasis:** `#94a3b8` (Slate 400) — Body copy, field labels, metadata.
- **Text Low-Emphasis / Muted:** `#475569` (Slate 600) — Placeholders, inactive icons, hairline indicators.

## Typography

The typography uses Plus Jakarta Sans across all roles to ensure geometric balance, open letterforms, and structural legibility against dark slate surfaces.

### Editorial Hierarchy & Tracking
- **Display and Large Headlines:** Tightened tracking (`-0.025em` to `-0.015em`) binds large characters together, balancing the visual weight of extruded panels.
- **Body Rhythm:** Calibrated to `16px` base at `26px` line-height for effortless readability across documentation, dashboards, and workflows.
- **Labels & Micro-data:** Modest tracking (`0.01em` to `0.03em`) and medium/semibold weights ensure legibility when set in low-opacity slate colors or rendered inside recessed tags.

## Layout & Spacing

The layout model pairs a fluid 12-column grid system with generous macro-spacing to honor the expansive feel of creator interfaces.

### Grid & Breakpoints
- **Desktop (1280px and above):** 12-column layout, `3rem` section margin (`margin-lg`), `2rem` column gutter (`gutter-lg`). Maximizes content workspace while preserving neomorphic separation.
- **Tablet (768px – 1279px):** 8-column layout, `2rem` outer margin (`margin`), `1.5rem` gutter (`gutter`). Dense cards reflow to dual-column blocks.
- **Mobile (below 768px):** 4-column layout, `1rem` margin (`margin-sm`), `1rem` gutter (`gutter-sm`). Layouts drop to single column; extruded controls scale to full-width touch areas.

### Spatial Rhythm
- **Internal Component Spacing:** Strict adherence to 4px/8px increments. Dense components use `space-xs` (4px) and `space-sm` (8px). Medium module paddings use `space-md` (16px) and `space-lg` (24px).
- **Macro Separation:** Section breaks leverage `space-xl` (40px) to prevent soft drop shadows and physical extrusions from visually colliding.

## Elevation & Depth

Tactile neomorphism on dark slate depends on directional light physics rather than bright white gradients. The key source angle is 135° (top-left to bottom-right).

### The Dual-Light Specular Formula
- **Top-Left Highlight:** A crisp, directional specular edge applied via `box-shadow: -1px -1px 0px 0px rgba(255, 255, 255, 0.08)` or a subtle inset equivalent.
- **Bottom-Right Shadow:** A deep ambient occlusion shadow via `box-shadow: 4px 6px 16px 0px rgba(0, 0, 0, 0.5)`.

### Elevation Levels

#### 0. Flat / Recessed (Pressed States, Inputs, Sliders)
- **Background:** `#0e111b` (Base) or `#151824`
- **Shadow:** Inset physical drop: `inset 2px 2px 5px rgba(0, 0, 0, 0.6), inset -1px -1px 3px rgba(255, 255, 255, 0.04)`
- **Border:** 1px solid `rgba(255, 255, 255, 0.03)`

#### 1. Extruded Low (Cards, Group Containers, Panels)
- **Background:** `#151824`
- **Shadow:** `-2px -2px 6px rgba(255, 255, 255, 0.03), 4px 6px 14px rgba(0, 0, 0, 0.45)`
- **Border:** 1px solid `rgba(255, 255, 255, 0.05)`

#### 2. Extruded Mid (Action Buttons, Interactive Cards, Badges)
- **Background:** `#1c2030`
- **Shadow:** `-3px -3px 8px rgba(255, 255, 255, 0.05), 6px 10px 20px rgba(0, 0, 0, 0.55)`
- **Border:** 1px solid `rgba(255, 255, 255, 0.07)`

#### 3. Floating / Luminescent (Toolbars, Modals, Primary Action Focus)
- **Background:** Linear gradient (145deg, `#24293d`, `#1c2030`)
- **Shadow:** `-4px -4px 12px rgba(255, 255, 255, 0.06), 12px 18px 30px rgba(0, 0, 0, 0.65), 0 0 24px rgba(99, 102, 241, 0.15)`
- **Border:** 1px solid `rgba(255, 255, 255, 0.1)`

## Shapes

The geometry uses rounded corners to complement the extruded aesthetic. Rounded edges allow specular edge highlights to wrap cleanly around objects.

### Corner Radius Mapping
- **Cards & Containers:** `16px` to `20px` (`rounded-xl`). Generous curvature keeps massive slate containers soft and approachable.
- **Buttons, Controls & Form Elements:** `10px` to `12px` (`rounded-lg`). Provides a stable, tactile target.
- **Pills, Badges & Toggles:** Fully rounded at `9999px` (`rounded-full`). Delivers physical slip and switch tactile cues.
- **Micro Elements (Checkboxes, Tooltips):** `6px` to `8px`.

## Components

### Buttons
- **Primary:** Background: Linear gradient (`135deg, #6366f1, #4f46e5`). Text: White (`#ffffff`), `label-lg`. Padding: `12px 24px`. Radius: `10px`. Shadow: `-2px -2px 6px rgba(255,255,255,0.15), 4px 8px 18px rgba(0,0,0,0.4), 0 0 16px rgba(99,102,241,0.4)`. Active state: scale `0.98`, shadow collapses to inset glow.
- **Secondary (Extruded Slate):** Background: `#1c2030`. Text: `#f1f5f9`. Border: 1px solid `rgba(255,255,255,0.08)`. Shadow: `-2px -2px 6px rgba(255,255,255,0.04), 4px 6px 14px rgba(0,0,0,0.5)`. Hover: Background shifts to `#24293d` with violet specular trace. Active: Inset shadow `inset 2px 2px 4px rgba(0,0,0,0.5)`.
- **Ghost:** Background transparent, text `#94a3b8`. Hover: Extruded slate surface `#151824`, text `#f1f5f9`.

### Input Fields & Textareas
- **Resting:** Background: `#0e111b`. Height: `44px`. Radius: `10px`. Border: 1px solid `rgba(255,255,255,0.04)`. Shadow: `inset 2px 2px 6px rgba(0,0,0,0.5), inset -1px -1px 3px rgba(255,255,255,0.03)`. Text: `#f1f5f9`. Placeholder: `#475569`.
- **Focus:** Border: 1px solid `#6366f1`. Shadow: `inset 2px 2px 5px rgba(0,0,0,0.4), 0 0 12px rgba(99,102,241,0.2)`.

### Cards
- **Structural Card:** Background: `#151824`. Radius: `18px`. Padding: `24px`. Border: 1px solid `rgba(255, 255, 255, 0.05)`. Shadow: `-2px -2px 8px rgba(255, 255, 255, 0.03), 6px 12px 24px rgba(0, 0, 0, 0.45)`.
- **Interactive Extruded Card:** Background: `#1c2030`. Radius: `16px`. Transition: `all 0.2s cubic-bezier(0.16, 1, 0.3, 1)`. Hover: translateY `-2px`, shadow deepens with subtle violet ambient luminescence (`0 8px 24px rgba(99,102,241,0.12)`).

### Chips & Filter Pills
- **Unselected:** Background: `#151824`. Radius: `9999px`. Padding: `6px 14px`. Text: `#94a3b8`, `label-md`. Shadow: `-1px -1px 3px rgba(255,255,255,0.04), 2px 3px 6px rgba(0,0,0,0.4)`.
- **Selected:** Background: `#24293d`. Border: 1px solid `rgba(99,102,241,0.4)`. Text: `#818cf8`. Shadow: `0 0 10px rgba(99,102,241,0.25), inset -1px -1px 2px rgba(255,255,255,0.08)`.

### Checkboxes & Radio Buttons
- **Unchecked Container:** Size: `20px * 20px`. Radius: Checkbox `6px`, Radio `9999px`. Background: `#0e111b`. Shadow: `inset 2px 2px 4px rgba(0,0,0,0.6), inset -1px -1px 2px rgba(255,255,255,0.05)`.
- **Checked Container:** Background: `#6366f1`. Shadow: `0 0 8px rgba(99,102,241,0.5)`. Icon: Solid white check / center radio dot.

### Lists & Navigation Rows
- **Container:** Background: `#151824`. Radius: `16px`. Padding: `8px`.
- **Item Row:** Radius: `10px`. Padding: `12px 16px`. Background: transparent.
- **Item Hover:** Background: `#1c2030`. Shadow: `-1px -1px 3px rgba(255,255,255,0.04), 2px 4px 8px rgba(0,0,0,0.3)`. Text: `#f1f5f9`.
- **Item Active:** Inset shadow: `inset 1px 1px 3px rgba(0,0,0,0.4)`. Text: `#818cf8`.

### Specialized Creator Component: Tactile Slider
- **Track:** Height: `6px`. Radius: `9999px`. Background: `#0e111b`. Inset shadow: `inset 1px 1px 3px rgba(0,0,0,0.7)`.
- **Active Range:** Background: `#6366f1`. Shadow: `0 0 8px rgba(99,102,241,0.4)`.
- **Thumb:** Size: `22px * 22px`. Radius: `9999px`. Background: `#24293d`. Border: 1px solid `rgba(255,255,255,0.15)`. Shadow: `-2px -2px 4px rgba(255,255,255,0.08), 2px 4px 8px rgba(0,0,0,0.6), 0 0 8px rgba(99,102,241,0.3)`.