# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `pnpm dev` — start Vite dev server with HMR
- `pnpm build` — type-check with `tsc -b` then bundle with Vite
- `pnpm lint` — run Biome check across the project
- `pnpm lint:fix` — run Biome check with auto-fix
- `pnpm preview` — preview the production build

## Tech Stack

- **React 19** with **TypeScript 5.9** (strict mode, `noUnusedLocals`, `noUnusedParameters`)
- **Vite 8** (beta) as bundler
- **Tailwind CSS v4** via `@tailwindcss/vite` plugin (CSS-first config, no `tailwind.config.js`)
- **shadcn/ui v4** (radix-vega style, zinc base color, oklch CSS variables)
- **Biome** for linting and formatting (indentStyle: tab)
- **React Compiler** enabled via `babel-plugin-react-compiler`
- **pnpm** as package manager

## Project Structure

- `src/` — application source (entry: `main.tsx`, root component: `App.tsx`)
- `src/components/ui/` — shadcn/ui components (add via `pnpm dlx shadcn@latest add <component>`)
- `src/lib/utils.ts` — `cn()` helper (clsx + tailwind-merge)
- `src/index.css` — global styles, Tailwind imports, CSS custom properties for theming

## Path Aliases

`@/*` maps to `./src/*` (configured in `tsconfig.json`, synced to Vite via `vite-tsconfig-paths`).

## Styling Conventions

- Tailwind v4 uses CSS-based configuration — theme tokens are defined in `src/index.css` via `@theme inline` and CSS custom properties
- Dark mode uses the `.dark` class strategy (`@custom-variant dark (&:is(.dark *))`)
- Font: Outfit Variable (`@fontsource-variable/outfit`)
- Use `cn()` from `@/lib/utils` to merge Tailwind classes

## Biome

- Biome v2 excludes files via `!!pattern` in `files.includes` (not a separate `ignore` field)
- `src/index.css` is excluded from Biome (Tailwind CSS-first config not well supported)
- Don't suppress lint errors with `biome-ignore` — fix the underlying issue
