#!/usr/bin/env bash
# PostToolUse hook: auto-format and lint-fix edited files with Biome.
# Biome is the project's single source of truth for formatting/linting (see CLAUDE.md).
# Reads the hook payload from stdin and runs `biome check --fix` on the edited file.

input=$(cat)
file_path=$(printf '%s' "$input" | jq -r '.tool_input.file_path // empty')
[ -z "$file_path" ] && exit 0

# Only touch files Biome handles. src/index.css is excluded via biome.json config.
case "$file_path" in
  *.ts | *.tsx | *.js | *.jsx | *.mjs | *.cjs | *.json | *.jsonc | *.css) ;;
  *) exit 0 ;;
esac

cd "$CLAUDE_PROJECT_DIR" || exit 0

# --no-errors-on-unmatched: don't fail when the path is excluded (e.g. dist, index.css).
pnpm biome check --fix --no-errors-on-unmatched "$file_path" >/dev/null 2>&1

exit 0
