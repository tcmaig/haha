# LaunchCase cargo workbench verification

Date: 2026-11-01 (Asia/Shanghai). Status: tested_local_http.

Git base/head: 13bfd8ba088ab671978cfc5463f2626a58c6e563 / 13bfd8ba088ab671978cfc5463f2626a58c6e563. No commit or push was made, to avoid staging or committing the pre-existing and source-unknown worktree edits.

## Change and provenance

Direct human request: a large central shipping container surrounded by clickable commodities, preserving original detail steps and the shared ocean/desert homepage; remove release-tag and credential UI. This continuation replaces the initial single-character product marks with eight local SVG illustrations, adapts the arrangement at smaller widths, adds focus/reduced-motion handling and improves small number contrast. No generated/downloaded product assets.

Continuation paths: frontend/app/page.tsx (two imports and commodity artwork rendering only), new frontend/app/cargo-product.tsx, new frontend/app/cargo.css, project/state.yaml, work/active/T-012-cargo-workbench/, docs/design/cargo-workbench/.

The initial session UI/cargo implementation already existed in frontend/app/page.tsx, frontend/app/globals.css and frontend/app/api/session/route.ts. Pre-existing changes to the step tabs, frontend tests, Python file access, T-011 and local-update evidence were retained. Shared homepage and other two workbench sources were not edited.

## Exact verification

- node node_modules/typescript/bin/tsc --noEmit --incremental false: exit 0.
- node node_modules/prettier/bin/prettier.cjs --write app/cargo-product.tsx app/cargo.css app/page.tsx: exit 0; final formatting unchanged.
- node node_modules/next/dist/bin/next build: exit 0, compiled production bundle and TypeScript. Actual output in build.log.
- node node_modules/@playwright/test/cli.js test --config C:/Users/何/Documents/Codex/launchcase-cargo-20261101/playwright.config.cjs --output C:/Users/何/Documents/Codex/launchcase-cargo-20261101/test-results-full: exit 0; 3 passed (23.8 seconds). Covers 1440/390px full internal workflow with original API, fixture import, research, concept/spec review, cost handling, mock concept image, internal draft/download, and missing-session/cross-origin rejection. Actual output in workflow-test.log.
- node C:/Users/何/Documents/Codex/launchcase-cargo-20261101/capture.cjs: exit 0; eight product routes plus container Overview, 1440/980/390px screenshot and axe checks, no overflow/page errors; HttpOnly cookie. interaction-result.json records assertions.
- Same capture command with preview argument: exit 0; read-only runtime check of the actual 3310 local preview, three viewports, no credential/release-tag UI, no new project. preview-result.json and render-*.png are actual runtime evidence.
- git diff --check: exit 0. CRLF conversion warnings only.

Initial attempts were retained as failures: unprivileged Prettier failed with EPERM creating its D-drive cache; direct Edge startup under restricted system permissions ended early (2 failed, 1 proxy test passed), then the same three tests passed with normal host permissions. Before list contrast repair, the two existing case number labels measured 3.75:1; contrast-before-fix.json retains that failure. The final #526457 labels pass. Full workflow tests were before the final contrast-only CSS change; final screenshot/route/axe checks cover the final CSS.

## Isolation and limitations

The full workflow used a SQLite backup at C:/Users/何/Documents/Codex/launchcase-cargo-20261101/isolated-data and copied the existing identity. No credential was generated or replaced. The source identity is byte-identical to the copy. Synthetic workflow writes stayed on temporary 8814/3314 services. Research used Fake and image generation used Mock. No paid models, external accounts, email, publication or business approval. Local production preview remained on 127.0.0.1:3310 with API 8810.

G4/G5 handoff.spec.ts and the backend-wide suite were not rerun; their underlying business behavior was not modified here. This is not real product/model/customer validation. Visual conformance and completion acceptance remain pending human review.

New material risk: none identified within this local UI change; existing local automatic-session behavior is intended for the loopback deployment. Next action: review the live 3310 preview. External effects: none.

Cleanup: temporary 3314 and 8814 services stopped after verification. The actual 3310 preview returned HTTP 200 afterward. An elevated cleanup wrapper could not resolve Git metadata; its final diff check failed with "Not a git repository". The same git rev-parse and git diff --check commands were rerun in the normal workspace context and returned exit 0. Base/head above come from that successful workspace read. No source/test failure was hidden.
