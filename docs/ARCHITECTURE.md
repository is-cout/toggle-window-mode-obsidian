# Architecture

Technical overview of how the Toggle Window Mode plugin is built. Read this before making non-trivial changes.

## Overview

Toggle Window Mode adds a ribbon icon that toggles the Obsidian window between two states in one click: compact (left sidebar collapsed, window un-maximized/restored to a smaller size) and expanded (left sidebar open, window maximized). It owns no data or file format, is desktop-only (window maximize/restore has no meaning on mobile), and makes no network calls.

## Source layout

| File | Responsibility |
|---|---|
| `src/main.ts` | Plugin entry point: `onload`/`onunload`, ribbon icon, window/sidebar toggle logic. |

<!-- Add a row per new src/*.ts file as the project grows past a single file — this
     table is the map a new contributor (or future Claude session) reads first. -->

## Build pipeline

- TypeScript (`tsconfig.json`) type-checks `src/**/*.ts` (`tsc -noEmit`) — no `.js` is emitted by `tsc` itself.
- [esbuild](https://esbuild.github.io/) (`esbuild.config.mjs`) bundles `src/main.ts` into a single CommonJS `main.js`, externalizing `obsidian`, `electron`, CodeMirror/Lezer packages (provided by the Obsidian host at runtime) and Node builtins.
- A second esbuild step bundles `src/styles/index.css` into the root `styles.css` — the file Obsidian actually loads. The root `styles.css` is generated; edit the source under `src/styles/` instead.
- `manifest.json` + `versions.json` follow the standard Obsidian plugin conventions (`minAppVersion` compatibility map).

See [DEVELOPMENT.md](DEVELOPMENT.md) for how to actually run the build.
