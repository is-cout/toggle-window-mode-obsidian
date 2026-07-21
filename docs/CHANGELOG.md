# Changelog

Living log of significant changes to the project. This is **not** optional bookkeeping — every significant change (new feature, format change, dependency change, removed feature, policy change) gets an entry here at the time it's made. See the documentation policy in [.claude/CLAUDE.md](../.claude/CLAUDE.md).

Format: `YYYY-MM-DD — short description. Why (if not obvious). Files touched.`

## 2026-07-21 (0.2.1)

- **Fix window-mode/sidebars toggle conflict**: window mode button was reading left sidebar
  collapsed state to decide its own toggle direction, which the sidebars button also
  changes, causing wrong behavior when used together. Now decides by actual window
  maximized state instead. Files: `src/main.ts`.

## 2026-07-21 (0.2.0)

- **Sidebars ribbon toggle**: adds second ribbon icon that collapses/expands left and right
  sidebars together, independent of window mode. Files: `src/main.ts`.

## 2026-07-14 (0.1.0)

- **Initial scaffold** from the Obsidian plugin bootstrap template. Files: all.
- **Ribbon toggle**: adds a ribbon icon that collapses the left sidebar and un-maximizes the
  window (compact), or expands the sidebar and maximizes the window (expanded), in one click.
  Uses `electron.remote.getCurrentWindow()` for window state. Files: `src/main.ts`.
