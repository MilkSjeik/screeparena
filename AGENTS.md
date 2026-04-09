# AGENTS.md

## Repo Map
- `src/main.ts` is the runtime entrypoint; Rollup bundles it to `dist/main.mjs`.
- `src/` is the real source tree. `tsconfig.json` sets `baseUrl: "src/"`, so imports like `"SpawnQueue"` and `"squads/BaseSquad"` resolve from `src/`.
- `src/utils/lodash-4.17.21-es/` is vendored code; avoid editing it unless you are intentionally changing the bundled dependency copy.

## Game Docs
- Screeps Arena API docs: `https://arena.screeps.com/docs`.
- Prefer the docs over guessing game API behavior.

## OpenCode
- `opencode.json` wires the local `../screeps-mcp/` server into this repo.
- Use the MCP server for docs lookup instead of pasting large doc excerpts into prompts.

## Commands
- `npm run build` runs Rollup and clears `dist/` first.
- `npm run dev` runs `bunx tsc --watch`; Bun is required for that script.
- `npm test` is a placeholder and always fails.

## Constraints
- TypeScript is strict (`strict`, `noImplicitReturns`, `allowUnreachableCode: false`, `experimentalDecorators: true`).
- Keep build output out of source edits; regenerate `dist/` instead of hand-editing it.
- There are no repo-local test or CI configs in the root, so verify changes with the build unless you add a focused check yourself.
