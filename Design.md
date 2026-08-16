---
version: "superdesign-alpha"
name: "Nocturne rail"
description: "Near-black editorial-dark system carried by a hand-painted twilight illustration, IBM Plex Serif display type, and a single violet accent rationed to CTAs and a vertical progress rail."
colors:
  background: "#13111C"
  surface: "#1C1A28"
  surface-alt: "#0B0B0F"
  border: "#33323E"
  text-primary: "#F7F7F8"
  text-secondary: "#A1A0AB"
  text-tertiary: "#6B7280"
  accent: "#59497A"
  accent-success: "#428A72"
  accent-pink: "#F9A8D4"
  white: "#FFFFFF"
typography:
  display-lg:
    fontFamily: "IBM Plex Serif"
    fontSize: "54px"
    fontWeight: 500
    lineHeight: "1.12"
    letterSpacing: "-2px"
  headline-md:
    fontFamily: "IBM Plex Serif"
    fontSize: "36px"
    fontWeight: 400
    lineHeight: "1.33"
    letterSpacing: "-0.7px"
  body-md:
    fontFamily: "Helvetica"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: "1"
  body-ui:
    fontFamily: "Inter"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: "1.4"
  label-mono:
    fontFamily: "JetBrains Mono"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: "1.4"
spacing:
  base: "4px"
  gap: "24px"
  gap-lg: "32px"
  section-padding: "96px"
rounded:
  control: "6px"
  control-alt: "8px"
  card: "12px"
  card-lg: "16px"
  pill: "9999px"
components:
  button-primary:
    background: "#59497A"
    text-color: "#F7F7F8"
    radius: "8px"
    height: "40px"
    padding: "0px 20px"
    note: "observed hero primary — solid violet fill with an arrow glyph, corners read as slightly-rounded"
  button-secondary-outline:
    background: "transparent"
    border: "1px solid #33323E"
    text-color: "#F7F7F8"
    radius: "8px"
    height: "40px"
    padding: "0px 20px"
  button-nav-ghost:
    background: "transparent"
    text-color: "#F7F7F8"
    radius: "6px"
    height: "32px"
    padding: "6px 12px"
  button-nav-cta:
    background: "transparent"
    text-color: "#F7F7F8"
    radius: "6px"
    height: "40px"
    padding: "0px 12px"
    hover-background: "rgba(255, 255, 255, 0.05)"
  button-midpage-solid:
    background: "#291839"
    text-color: "#F7F7F8"
    radius: "8px"
    height: "32px"
    padding: "0px"
  card-console-panel:
    background: "#1C1A28"
    radius: "12px"
    padding: "0px"
    border: "1px solid #33323E"
  card-mini-status:
    background: "#1C1A28"
    radius: "12px"
    padding: "16px"
    border: "1px solid rgba(255,255,255,0.2)"
  card-logo-tile:
    background: "transparent"
    radius: "0px"
    padding: "24px"
    border: "1px solid #33323E"
---
# Nocturne rail
Source: https://railway.com

## Overview
This is a dark-mode-default developer console dressed in editorial illustration rather than mesh-gradient hero cliché: a full-bleed hand-painted twilight/dawn scene (clouds, mountains, a passing train) sits behind the hero and dissolves into flat near-black (`#13111C`) for the entire remainder of the page. The pairing is deliberate — IBM Plex Serif display type gives the headlines a literary, almost travel-poster weight, while UI chrome (nav, buttons, dashboard mockups) runs on Inter/Helvetica/JetBrains Mono, keeping the product itself legible and technical. One violet accent (`#59497A`) is rationed to the single primary action and a vertical timeline rail; everything else is grayscale ink on near-black surfaces.

## Composition
The first screen is centered and sparse: logo-left navbar, a centered serif headline, one sentence of support copy, a two-button cluster, then a large console screenshot cropped at the fold — deliberately teasing rather than showing the full product. Scrolling reveals the illustration continuing (mountains, a train silhouette) before flattening into a two-row logo strip, then a long alternating feature column: a persistent left-hand vertical rail with small step-indicator icons pins each section to a stage in a pipeline narrative (build → network → scale → observe). Each stage is a fixed two-column split — serif headline + body + checklist on the left, a floating product-mockup card on the right — never full-width, keeping density low and giving every claim room to breathe. This rejects a dense feature-grid alternative in favor of a slow, scroll-paced narrative rail, trading information density for a stronger sense of sequence.

## Colors
Background is `#13111C`, a near-black warm charcoal-violet that dominates roughly three quarters of measured area and reads as the page's true black — the pixel-field's `#181818`/`#181830`/`#183030` clusters are this same near-black shifting hue under the illustration's cloud and mountain washes. Surface panels (console mockups, logo tiles) sit one step up on `#1C1A28` with hairline `#33323E` borders. Text ink is `#F7F7F8` for primary copy and pure `#FFFFFF` for emphasis, with `#A1A0AB` for secondary/metadata and `#6B7280` for the most muted labels. The violet accent `#59497A` appears only on the hero's primary button and the mid-page solid button (`#291839`, a darker violet variant) — otherwise color is rationed further into small semantic sparks: a teal-green (`#428A72`) status/success dot, a pink (`#F9A8D4`) link underline, and chart-line colors (blue, pink, amber, purple) confined to the observability dashboard mockup. Large stretches of body copy, borders, and structural chrome are left intentionally uncolored gray-on-black.

## Typography
Display headlines run IBM Plex Serif 54px/500, line-height 1.12, tracking -2px — used once per screen, centered in the hero. Section headlines drop to IBM Plex Serif 36px/400, line-height 1.33, tracking -0.7px, always left-aligned beside the rail. Body copy is Helvetica 16px/400 at lh 1 for hero support lines, while dense UI text (nav items, mockup labels, chips) runs Inter at 14px/400 with `#FFFFFF` ink and `#A1A0AB` secondary tone. A JetBrains Mono label face appears on system-status microcopy (e.g. the footer's monospace status line) — the signature accent face is IBM Plex Serif itself, used exclusively for headline-weight moments and nowhere else, creating a hard hierarchy break between "editorial statement" and "console interface."

## Layout
Content is capped at max-width 1160px with 96px section padding and a 24–32px spacing rhythm throughout (base unit reads as 4px, gaps stepping 4/6/12/16/24/32). The logo strip is a strict 2-row × 6-column uniform grid (widths ~100% container per row split evenly, no spans). Feature stages use a 12-column grid but only ever occupy two visual tracks — text column narrow, mockup column wide-right — confirmed by measured row maps of `6/83 | 100` and `6/49 | 100 | 6/91`, i.e. a slim rail-icon gutter plus one dominant content column, not a multi-card grid. The dashboard mockup itself is a uniform card grid: two rows of three equal metric-chart tiles (~35% width each, `35/35/35 | 35/35/35`), a classic card-grid pattern, not bento. The architecture-canvas mockup on the first screen is its own dense nested composition (multiple stacked tile rows from 100% down to 13% width) simulating a live infra diagram rather than a content grid. Nothing here uses masonry or dense-packed asymmetry — every grid is uniform-column, rhythm comes from vertical stage pacing, not spatial variety.

## Components
- **Navbar**: fixed top, logo mark + wordmark left, 5 nav items (4 with dropdown chevrons + 1 plain link) center-left, "Sign in" text link + a filled "Book a demo"-style CTA right. Height ~64px, transparent background over the illustration. Nav ghost buttons: transparent fill, `#F7F7F8` text, radius 6px, height 32px, padding 6px 12px. The rightmost CTA button is taller (height 40px, radius 6px, padding 0 12px, transparent) with hover state `rgba(255,255,255,0.05)` — a subtle utility highlight, not a solid fill.
- **Hero primary button**: an observed near-white-to-violet solid pill, `#59497A` fill, `#F7F7F8` text, radius ~8px (slightly-rounded, not full pill), height ~40px, paired with a trailing arrow glyph — this is the single most emphasized control on the page, sitting directly under the headline.
- **Hero secondary button**: outline variant beside the primary, transparent fill, 1px `#33323E` border, `#F7F7F8` text, same 8px radius and 40px height — visually quieter, no fill.
- **Console/architecture mockup card**: appears directly below the hero fold. One instance, full content-width, `#1C1A28`-toned panel with 0px outer radius at this scale (bleeds into the illustration frame), containing a nested tab bar (Architecture/Observability/Logs/Settings/Share), a canvas of infrastructure nodes, and a floating deploy-status toast — internal tile rows measured from 100% down to 13% width, simulating live product chrome.
- **Logo strip band**: mid-page, one wide panel split into 2 rows × 6 columns, each cell a bordered tile (`#33323E` hairline dividers) holding a single monochrome partner logotype, vertically centered, no padding beyond the cell itself — a flat trust-signal grid, not cards.
- **Feature-stage rail entries** (×4 visible: build/deploy, network/connect, scale/grow, monitor/observe): each is a two-column split anchored to a vertical timeline rail on the far left (small ship-wheel/circle icons marking stage progress). Left column, top to bottom: a small pill-shaped eyebrow chip (e.g. teal-bordered for "network," amber-bordered for "scale" — radius ~9999px, 1px colored border, transparent fill), a two-line serif headline, one sentence of `#A1A0AB` body copy, a text link with arrow, then a divided checklist of 2 rows — each row an icon + bold micro-label + supporting gray sentence, separated by hairline dividers, ending in a small icon cluster ("alternative to" row of competitor glyphs). Right column: one floating product-mockup card per stage (status panel with colored TCP/metric badges, or a resource-usage card with green/gray pixel-grid bars) — `#1C1A28` surface, ~12px radius, no visible heavy shadow, sitting on a soft radial glow.
- **Observability dashboard mockup**: one large full-width panel, dark console chrome identical to the architecture mockup's tab bar, containing a uniform 3-column × 2-row grid of chart tiles (CPU/Memory/Frontend hit-error, Disk/5XX/Egress), each tile ~35% width, dark background, multi-color line/bar charts, monospace axis labels.
- **Footer**: transparent background, two feature callout cards top-left (each `#1C1A28`-toned, hairline-bordered, containing a bold lead-in phrase with a violet/pink inline link and a supporting sentence + underlined link), then 5 plain link columns (Product/Compare/Contact/Resources/Company/Legal — 40 links total), two compliance badge glyphs, and a closing bar with a monospace status line (`#428A72`-toned "operational" indicator) and copyright text. All footer links are plain gray text, no button styling.

## Graphics & Effects
The hero is carried by one large hand-illustrated gradient sky/mountain/cloud scene — not a CSS mesh gradient — occupying the full top ~700–900px of the page before flattening to solid `#13111C`; color (dusty rose, teal-blue, violet) is confined entirely to this illustration band, roughly the top third of the page, and never reappears as a full-screen wash. A scrim `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.05))` sits directly over the architecture-mockup screenshot to dim it beneath the floating deploy-toast, covering that one component only. A second gradient, `linear-gradient(to top, rgb(49, 60, 60), rgba(40, 52, 52, 0))`, washes the base of a single feature-mockup card (~2% of page) to fade its lower edge into shadow. A third, `linear-gradient(rgb(24, 13, 67) 40px, rgba(24, 13, 67, 0) 100%)`, is a tiny violet top-fade on one isolated panel edge (0.1% of page). Elevation is expressed mostly through hairline borders (`#33323E`) rather than heavy shadow; one soft ambient shadow (`rgba(65, 78, 166, 0.1) 0px -12px 127px 0px…` stack) lifts a floating mockup card off the black field with an upward violet-tinted glow, and a thin inset ring (`rgba(255, 255, 255, 0.2) 0px 0px 0px 1.5px inset`) outlines glass-edge chips like the TCP status badge. A faint grid/rail pattern (dotted vertical line with small square rungs) forms the timeline spine running the full height of the feature-stage section — a subtle line-pattern texture rather than noise or grain.

## Motion
Interactions are quick and mechanical rather than springy: `transform 0.15s cubic-bezier(0.4, 0, 1, 1)` and `opacity 0.15s ease-in-out` drive button/press feedback, while a slower `transform 0.4s ease` handles larger repositioning (card floats, mockup swaps). Icon and stroke-based hovers use `transform, color, background-color, stroke, stroke-width 0.2s ease-out` for a crisp, controlled color/shape shift. Named keyframes (`delay-overflow`, `osano-load-scale`, `logos`, `tweets`, `bounce`, `flash`) drive looping marquee-style motion in the logo strip and small attention-getting bounces/flashes on status indicators. Scroll-driven CSS animations tie the vertical rail's stage indicator and illustration parallax directly to scroll position, reinforcing the pipeline narrative as the user descends the page.

## Guardrails
- Never fill the hero background edge-to-edge with a saturated CSS gradient — color lives only in the illustration band; the remainder of the page stays flat `#13111C`.
- Never render the hero primary CTA as a glass/transparent nav-style button — it is a solid violet-filled, slightly-rounded (8px) pill-adjacent rectangle, distinct from every ghost/outline button.
- Never turn the feature-stage sections into a multi-card grid — each stage is a fixed two-column split (text + one mockup), paced by the vertical rail, not a bento layout.
- Keep IBM Plex Serif exclusive to headlines; never apply it to body copy, labels, or UI chrome.
- Don't over-saturate accent usage — violet, teal, and pink each appear in only one or two specific roles; body text and structure stay grayscale.
- Preserve hairline-border elevation over heavy drop shadows; shadows, when used, stay soft and upward-glowing, not hard-edged.