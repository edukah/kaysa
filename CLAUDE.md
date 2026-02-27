# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Kaysa is a zero-dependency vanilla JavaScript horizontal slider/carousel library. It exports as a **UMD** global (`Kaysa`) and supports configuration via both JavaScript API and HTML `data-*` attributes. Part of the workbench monorepo — consumed by Dükkan and other projects via the `@kaysa` webpack alias.

## Build Commands

```bash
npm run dev      # Webpack dev server on localhost:9006 (or kaysa.dev:9006 with local SSL)
npm run build    # Production build → dist/kaysa.min.js + dist/kaysa.min.css
npm run release  # Build + copy dist/ to docs/assets/
```

No test suite exists. Validation is via ESLint (runs automatically on every build).

## Architecture

**Entry point:** `src/js/index.js` → assigns `Kaysa` class to `globalThis.Kaysa`

**Core class:** `src/js/core/kaysa.js`
- Constructor accepts an `HTMLElement` or a config object with a required `target` property
- Uses a `Map` for config storage (`this.config`)
- Config merge priority (highest wins): HTML `data-kaysa-*` attributes → JS config object → `Kaysa.DEFAULTS`
- On init: wraps children in `.kaysa__items` container (if not already present), creates nav buttons, attaches scroll/hover listeners

**Module:** `src/js/modules/enhanced-scrollbar.js`
- Optional custom scrollbar with drag support, instantiated only when `enhancedScrollbar: true`
- Uses `ResizeObserver` to stay responsive
- Manages `is-scrolling` CSS class on the container (1200ms timeout)

**Configuration options:** `scrollSpeed` (0.8), `gap` ('15px'), `enhancedScrollbar` (false), `prevButtonContent` ('<'), `nextButtonContent` ('>')

## SCSS Structure

Entry: `src/scss/main.scss` → imports base + modules.

- `base/_variables.scss` — CSS custom properties for theming (dark mode via `.dark-mode` on `<body>`)
- `base/_kaysa.scss` — Core slider styles (container, items, buttons)
- `modules/enhanced-scrollbar.scss` — Custom scrollbar track/thumb styles

**Naming convention:** rsBEM — `[folder]-[file_name]__[element]--[modifier]` (e.g., `kaysa__button--left`, `kaysa_enhanced-scrollbar__thumb-track`)

## Build System

Webpack 5 + Babel 7 + Dart Sass (modern API) + ESLint 9. Three config files:

- `webpack.common.js` — Shared: Babel transpilation, SCSS extraction, ESLint plugin, sass `loadPaths` set to parent dir for cross-project imports
- `webpack.dev.js` — Dev server with hot reload, CORS headers, optional SSL; outputs to `dev/`; UMD global name: `kaysa` (lowercase)
- `webpack.prod.js` — TerserPlugin minification (drops console, strips comments); outputs to `dist/`; UMD global name: `Kaysa`

CSS is extracted via a `.junk` entry trick — SCSS entry produces a `.junk` file that gets cleaned up post-build by CleanWebpackPlugin.

## Demo Pages

`docs/` contains demo HTML pages (`index.html`, `basic.html`, `scrollbar.html`). The `release` script copies built assets into `docs/assets/`. These pages are served by the dev server alongside `dev/`.
