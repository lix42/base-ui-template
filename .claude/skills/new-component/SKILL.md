---
name: new-component
description: >-
  Scaffold a new UI component in this project following its shadcn/ui + Tailwind
  v4 conventions. Use when the user runs /new-component or asks to add/create a
  UI component.
disable-model-invocation: true
allowed-tools: Bash(pnpm dlx shadcn@latest *), Read, Write, Edit, Glob
---

# new-component

Add a component to this project the right way. Two paths depending on what the
user wants. The `shadcn` skill holds the full ruleset — defer to it for any
detail; this skill is the quick user-facing entry point.

Project context (do not re-derive — confirmed in `components.json` / CLAUDE.md):
- shadcn/ui, base-vega style, `@base-ui/react` primitives (`base`, not `radix`),
  zinc base color, icon library `lucide`, **RTL enabled**.
- UI components live in `src/components/ui` (`@/components/ui`).
- Custom components live in `src/components` (`@/components`).
- `cn()` helper is at `@/lib/utils`. Tailwind v4, semantic tokens only.

## 1. Adding an existing shadcn/ui component

If `$ARGUMENTS` names a registry component (e.g. `dialog`, `select`, `tabs`):

1. Check it isn't already in `src/components/ui` first.
2. `pnpm dlx shadcn@latest add <name>` — use the project's pnpm runner.
3. Read the added file and verify composition against the `shadcn` skill rules
   (groups inside their parent, required `Title`/`AvatarFallback`, `data-icon`
   for button icons, semantic tokens). Fix anything off.

## 2. Creating a new custom component

If `$ARGUMENTS` describes a custom component (no matching registry item):

1. Compose from installed primitives in `src/components/ui` first; only write
   custom markup when no component fits.
2. Create the file under `src/components/<Name>.tsx` (PascalCase). Function
   component, typed props, no default export unless the file's siblings use one.
3. Conventions to follow:
   - Import primitives via `@/components/ui/*`; `cn` via `@/lib/utils`.
   - `className` for layout only; never override component colors/typography.
   - Spacing with `flex`/`grid` + `gap-*` (never `space-x/y-*`); `size-*` for
     equal width/height; `truncate` shorthand.
   - Semantic tokens (`bg-background`, `text-muted-foreground`) — no raw colors,
     no manual `dark:` overrides.
   - RTL-safe utilities: `ms-*/me-*`, `ps-*/pe-*`, `start-*/end-*`,
     `text-start/end` — not `ml/mr`, `pl/pr`, `left/right`.
   - Icons from `lucide-react`; in buttons use `data-icon`, no size classes.
4. After writing, the Biome format hook will fix style; resolve any type errors
   the type-check hook surfaces. Optionally run the `ui-reviewer` agent.

If `$ARGUMENTS` is empty, ask what component to add and whether it should come
from a registry or be custom.
