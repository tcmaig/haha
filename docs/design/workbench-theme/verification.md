# Shared workbench theme verification

Date: 2026-11-01. Status: tested_local_http.
Git base/head: 13bfd8ba088ab671978cfc5463f2626a58c6e563 / 13bfd8ba088ab671978cfc5463f2626a58c6e563, verified in the normal workspace. No staging, commit or push; pre-existing and source-unknown changes remain intact.

## Problem and change

The user accepted Product Projects but asked why other pages, especially Review Inbox, used a different background. The root theme class was conditional on screen=cases and no selected project, so navigation removed it. The current direct instruction supersedes the earlier entry-only theme decision.

frontend/app/page.tsx now uses persistent cargo-workbench and imports workbench-theme.css. frontend/app/cargo.css renames its existing shared theme selectors without altering the cargo-scene animation styles. frontend/app/workbench-theme.css adapts explicit light panels, evidence focus, research/cost summaries, selected tabs, forms, badges, notices and warnings. A 2px mobile overflow caused by the old -20px tab margin under an 18px shared inset was corrected to -18px.

Other changed records: project/state.yaml, work/active/T-014-workbench-theme/, docs/design/workbench-theme/, prior T-013 review_current invalidation. CargoScene is byte-identical; Portal homepage, other workbench sources, backend/session code and navigation/business logic were not edited.

## Actual validation

- node node_modules/prettier/bin/prettier.cjs --write app/page.tsx app/cargo.css app/workbench-theme.css: exit 0; final run unchanged.
- node node_modules/next/dist/bin/next build: exit 0, including TypeScript. Output: build.log.
- node C:/Users/何/Documents/Codex/launchcase-theme-v3/check-theme.cjs final: exit 0; 36 states across 1440/390px. All five primary sections, every project tab, and selected-project source/image/settings navigation use identical shell background/color/sidebar properties. No overflow, page errors or axe WCAG A/AA violations. Actual result: theme-results.json. Screenshots include overview and source forms.
- Same command with preview final: exit 0; 10 read-only states on actual 3310. All five navigation sections at 1440/390px use the same theme. Result: preview-results.json. projects/inbox/settings PNGs are actual preview renders.
- node node_modules/@playwright/test/cli.js test --config C:/Users/何/Documents/Codex/launchcase-cargo-20261101/playwright.config.cjs --output C:/Users/何/Documents/Codex/launchcase-theme-v3/workflow-results-final: exit 0; 3 passed in 37.9s. Includes the complete original synthetic desktop/mobile workflow and session/origin rejection. Output: workflow-final.log.
- git diff --check: exit 0, CRLF warnings only.

Initial failing evidence is retained: initial-theme-results.json and before-mobile-gutter-fix.png show mobile overview overflow; initial-workflow.log records 2 passed / 1 failed on the same overflow assertion. After the gutter fix, build, all state checks and all workflow tests passed on the final sources.

## Isolation and limits

Tests use the existing isolated SQLite copy through temporary 8814/3314 with Fake research and Mock images. The actual 3310 checks only navigate/read. No new identity, dependency, paid model call, business approval, message or external publication. External effects: none. Shared homepage remains outside the edited paths.

G4/G5 handoff.spec.ts and the backend-wide suite were not rerun because their logic is unchanged. The accepted cargo animation code was not changed and was not separately requalified here. The user accepted the product-project appearance; new subpage visual approval remains pending. Next action: refresh 3310 and switch to Review Inbox or other navigation sections.
