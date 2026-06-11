#!/usr/bin/env bash
# PostToolUse hook: type-check the project after edits to .ts/.tsx files.
# tsconfig sets `noEmit: true`, so `tsc -b` is a pure type-check (no build output).
# Configured async + asyncRewake in settings.json: it runs in the background and
# wakes Claude (via exit 2) only when there are type errors, so editing never blocks.

input=$(cat)
file_path=$(printf '%s' "$input" | jq -r '.tool_input.file_path // empty')

case "$file_path" in
  *.ts | *.tsx) ;;
  *) exit 0 ;;
esac

cd "$CLAUDE_PROJECT_DIR" || exit 0

if ! out=$(pnpm exec tsc -b 2>&1); then
  printf 'TypeScript errors after editing %s:\n%s\n' "$file_path" "$out" >&2
  exit 2
fi

exit 0
