# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/), and this project adheres to [Semantic Versioning](https://semver.org/).

## [1.0.0] - 2026-03-11

### Added
- TypeScript definitions (`dist/kaysa.d.ts`)
- ESM build output (`dist/kaysa.esm.js`) alongside UMD
- Security section in README documenting `innerHTML` usage for button content
- `scrollbarOptions` documented in README and TypeScript definitions

### Changed
- README Script Tag examples now include copy instructions for clarity

### Fixed
- ResizeObserver memory leak in EnhancedScrollbar — `disconnect()` now called in `destroy()`

### Removed
- Unused mouseover/mouseleave event listeners
- `globalThis.Kaysa` assignment from library source (consumers are now responsible for global assignment)
