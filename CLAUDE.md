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
- Uses ES2022 `#` private class fields — all internal state and methods are truly private, only `scroll()`, `add()`, `remove()`, `destroy()`, `enable()`, `disable()` are public
- Uses a `Map` for config storage (`this.#config`)
- Config merge priority (highest wins): HTML `data-kaysa-*` attributes → JS config object → `Kaysa.DEFAULTS`
- On init: wraps children in `.kaysa__items` container (if not already present), creates nav buttons, attaches scroll/hover listeners

**Module:** `src/js/modules/enhanced-scrollbar.js`
- Optional custom scrollbar with drag support, instantiated only when `enhancedScrollbar: true`
- Uses `ResizeObserver` to stay responsive
- Manages `is-scrolling` CSS class on the container (1200ms timeout)

**Configuration options:** `scrollSpeed` (0.8), `gap` ('15px'), `enhancedScrollbar` (false), `prevButtonContent` ('<'), `nextButtonContent` ('>'), `onError` (null)

**Public API methods:**
- `add(element, index?)` — Adds an element to the slider. `index` optional, defaults to end
- `remove(index?)` — Removes an element from the slider. `index` optional, defaults to last item
- `scroll(direction)` — Scrolls the slider ('left' or 'right')
- `destroy()` — Full cleanup: removes listeners, observers, buttons, enhanced scrollbar, CSS classes, and config
- `enable()` — Re-enables interactions after `disable()`
- `disable()` — Temporarily disables all interactions (`scroll`, `add`, `remove` become no-ops, adds `is-disabled` class)

**Error Handling:** Merkezi `handleError(error, context)` metodu kurtarılabilir hataları yakalar. `onError` config callback'i ile dinlenebilir:

```javascript
const slider = new Kaysa({
  target: '#container',
  onError: (error, context) => {
    // context: { module, operation, element? }
    console.log(error, context);
  }
});
```

`onError` verilmezse `console.error` fallback. Sarılan noktalar: `initScrollbar`, `add()`, `remove()`.

**Auto-hide buttons:** Nav buttons are automatically hidden when content doesn't overflow (`scrollWidth <= clientWidth`). A `ResizeObserver` on the items container keeps button visibility in sync with dynamic content and layout changes. Enhanced scrollbar (when enabled) also syncs automatically via internal button update logic.

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
