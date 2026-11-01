# Cargo motion verification

Date: 2026-11-01 (Asia/Shanghai). Status: tested_local_http.

Git base/head: 13bfd8ba088ab671978cfc5463f2626a58c6e563 / 13bfd8ba088ab671978cfc5463f2626a58c6e563, checked in the normal workspace context. No commit or push: pre-existing and source-unknown edits remain unstaged.

## Final change and scope

Current human request authorizes making the third workbench more vivid and consistent with the first two. This supersedes the earlier cream/green entry palette. frontend/app/page.tsx delegates the existing container/product entry to a new CargoScene and applies cargo-home only on the product list entry. frontend/app/cargo-scene.tsx owns vector cargo artwork, eight unchanged step mappings, particle atmosphere, floating goods, highlighted travel routes, pointer parallax, pause control and a 380ms click transition. frontend/app/cargo.css scopes the luminous navy/cyan/violet appearance and responsive layout. Manual pause and reduced motion bypass the click delay. Effects are implemented to stop when the section is out of view or the document is hidden.

Recovery and evidence paths: project/state.yaml, work/active/T-013-cargo-motion/, docs/design/cargo-motion/, and the previous task's review_current flag. The shared Portal homepage, TradeCase/CreativeEngine, backend, session route, original detail steps and existing commodity SVG artwork were not edited. Other pre-existing changes were retained. No new dependencies or credentials.

## Commands and results

- node node_modules/prettier/bin/prettier.cjs --write app/cargo-scene.tsx app/cargo.css app/page.tsx: exit 0; final run unchanged.
- node node_modules/next/dist/bin/next build: exit 0, including TypeScript; build.log contains actual output.
- node node_modules/@playwright/test/cli.js test --config C:/Users/何/Documents/Codex/launchcase-cargo-20261101/playwright.config.cjs --output C:/Users/何/Documents/Codex/launchcase-cargo-v2/workflow-results: exit 0, 3 passed in 34.3s. Desktop and mobile complete the original synthetic workflow and session/origin protections pass. Actual output: workflow.log.
- node C:/Users/何/Documents/Codex/launchcase-cargo-v2/browser-check.cjs final: exit 0. Eight routes and Overview select the expected original step; the entry theme clears on detail screens. Floating transforms change over time, hover activates exactly one route, pause/resume works, reduced motion stops animation, and keyboard Enter opens the same step. At 1440/980/390px: no overflow, readout/button overlap or axe WCAG A/AA violation. No page errors. interaction-result.json records actual assertions.
- The same browser command with preview final: exit 0. Read-only confirmation on the actual 3310 preview, screenshots of three sizes and reduced motion, working pause/hover/float, HttpOnly session and no credential/release-label UI. preview-result.json records actual assertions.
- git diff --check: exit 0 in the workspace context; CRLF warnings only.

The initial source write was stopped before mutations because I mistyped a state-file hash; it was corrected after re-reading the unchanged state. The initial 980px browser image before-spacing-fix.png is retained as the visual defect evidence. The final spacing-only CSS fix was followed by a successful production rebuild and all final browser/motion/route checks. Full workflow tests preceded that spacing-only change.

## Boundaries and remaining limits

Tests write only to the pre-existing isolated SQLite snapshot in C:/Users/何/Documents/Codex/launchcase-cargo-20261101/isolated-data, via temporary local 8814/3314 services. They use Fake research and Mock images. Actual 3310 preview checks are read-only. No real product evidence, paid model calls, external accounts/messages/publication or business approval. external_effects: none.

G4/G5 handoff.spec.ts and the backend-wide suite were not rerun because their implementation is unchanged. Visibility/offscreen throttling is implemented and code-inspected; it is not claimed as separately browser-tested. No long-duration or broad-device performance certification is claimed. Human judgment of the final appearance remains pending.

Material behavior change: the entry click includes a 380ms visual departure; manual pause or reduced-motion mode navigates immediately. Native buttons and original workflow state remain intact. Next action: review the live 3310 workbench.
