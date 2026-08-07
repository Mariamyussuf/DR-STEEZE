---
name: Cinematic Editorial
colors:
  surface: '#141313'
  surface-dim: '#141313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2b2a2a'
  surface-container-highest: '#353434'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c4c7c7'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#8e9192'
  outline-variant: '#444748'
  surface-tint: '#c9c6c5'
  primary: '#c9c6c5'
  on-primary: '#313030'
  primary-container: '#0d0d0d'
  on-primary-container: '#7c7a7a'
  inverse-primary: '#5f5e5e'
  secondary: '#c6c6c7'
  on-secondary: '#2f3131'
  secondary-container: '#454747'
  on-secondary-container: '#b4b5b5'
  tertiary: '#d7c3b0'
  on-tertiary: '#3a2e21'
  tertiary-container: '#140b03'
  on-tertiary-container: '#887867'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c9c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474646'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c7'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#454747'
  tertiary-fixed: '#f4dfcb'
  tertiary-fixed-dim: '#d7c3b0'
  on-tertiary-fixed: '#241a0e'
  on-tertiary-fixed-variant: '#524436'
  background: '#141313'
  on-background: '#e5e2e1'
  surface-variant: '#353434'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 84px
    fontWeight: '700'
    lineHeight: 90px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 52px
    letterSpacing: -0.01em
  headline-xl:
    fontFamily: Playfair Display
    fontSize: 60px
    fontWeight: '600'
    lineHeight: 68px
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '500'
    lineHeight: 48px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 32px
    letterSpacing: 0.01em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 28px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.15em
spacing:
  margin-desktop: 80px
  margin-mobile: 24px
  gutter: 32px
  section-gap: 160px
  stack-sm: 12px
  stack-md: 24px
---

## Brand & Style

This design system embodies the intersection of high-fashion editorial and cinematic precision. It is designed for a Creative Director whose work demands an atmosphere of prestige, intentionality, and timelessness. The aesthetic is rooted in **Minimalism** and **High-Contrast Editorial** styles, prioritizing visual breathing room and a "gallery" feel.

The emotional response should be one of quiet confidence. Like a luxury boutique or an art-house film, the UI does not compete for attention; it provides a sophisticated stage for high-fidelity creative content. Large-scale imagery, stark typography, and a deliberate absence of decorative clutter define the visual language.

## Colors

The palette is strictly curated to evoke luxury and depth. The primary background is a deep **Matte Black (#0D0D0D)**, providing a void-like canvas that allows photography and video to resonate. Typography is rendered in **Pure White (#FFFFFF)** for maximum legibility and authority.

Accents are used sparingly to guide the eye and denote value. **Warm Beige (#D9C5B2)** is utilized for secondary information and subtle dividers, while **Elegant Gold (#C5A059)** is reserved for interactive highlights, hover states, and premium signifiers.

## Typography

The typography system follows a traditional editorial hierarchy. **Playfair Display** serves as the authoritative voice for all headings and display text, utilizing high contrast between thick and thin strokes to convey luxury. 

**Inter** provides a neutral, systematic balance for body copy, ensuring clarity in long-form creative descriptions. **Label-caps** should be used for metadata, categories, and small navigational elements to maintain a structured, architectural feel. On mobile devices, display sizes are aggressively scaled down to preserve the intentionality of the layout without causing horizontal scrolling.

## Layout & Spacing

This design system utilizes an **Editorial Grid** model. The layout is centered on a 12-column grid for desktop with generous 80px outer margins to create a "frame" effect around the content. 

Spacing is used as a design element itself. **Section-gap (160px)** ensures that different creative projects have clear visual separation, allowing each piece of work to breathe. On mobile, the grid collapses to 4 columns with 24px margins. Content should often be offset from the center or span unconventional column counts (e.g., a 7-column wide image with a 3-column text block) to mimic high-end magazine layouts.

## Elevation & Depth

In a matte-black environment, depth is achieved through **Tonal Layers** and **Backdrop Blurs** rather than traditional shadows. 

1.  **Base Layer:** The deepest layer is the matte black background.
2.  **Surface Layer:** Elevated cards or containers use a slightly lighter off-black (#161616) with no shadow.
3.  **Glassmorphism:** Navigation bars and overlays use a high-density background blur (30px+) with 80% opacity matte black to maintain a cinematic feel.
4.  **Outlines:** Interactive elements use low-contrast, 1px solid borders in the beige or gold palette to define edges without adding visual weight.

## Shapes

The shape language is strictly **Sharp (0px)**. To maintain a high-fashion, Leica-inspired precision, all buttons, image containers, and input fields must have perfectly square corners. This emphasizes the "frame" and reinforces the architectural nature of the creative work. Rounding is only permitted for standard iconography where strictly necessary for recognition.

## Components

### Navigation
A sticky, minimal top navigation bar. Use the **label-caps** typography for menu items. The background should be a translucent matte black with a 1px bottom border in #D9C5B2 (10% opacity).

### Ghost Buttons
Buttons are defined by a 1px white border with no fill. On hover, the border and text transition smoothly to **Elegant Gold (#C5A059)**. Text within buttons should be set in **label-caps**.

### Masonry Grids
For photography portfolios, use a variable-height masonry grid. Maintain a consistent 32px gutter. Ensure images are color-corrected to sit harmoniously against the matte black background.

### Video Containers
Cinematic work should be presented in edge-to-edge containers where possible, or follow the 12-column grid with no padding. Auto-playing videos should be muted and have a 1px gold progress bar at the bottom of the frame.

### Input Fields
Underline-only inputs. 1px white bottom border that turns gold on focus. Placeholder text should be set in **body-md** with 50% opacity.

### Chips / Tags
Small, sharp-cornered boxes with #D9C5B2 borders and white text. Used for project categories or year stamps.