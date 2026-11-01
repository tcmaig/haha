# Consistent workbench theme

Direct user instruction: the product-project page is acceptable; other pages such as the review inbox have a different background. Align the entire cross-border workbench with the accepted product-project appearance. The previous decision to keep light detail pages is superseded by this current instruction.

The approved visual reference is the exact product-project runtime screenshot from T-013, copied to baseline-projects.png. The user's acceptance applies to the product-project page; new subpage renders remain pending human visual review.

Root cause: the cargo-home theme class was conditional on screen=cases and no current project. Use a persistent cargo-workbench shell. Rename the existing scoped theme selectors and adapt explicit light content surfaces, selected tabs, form controls, status badges and notices to dark colors. Preserve navigation, layout, case actions, backend and authentication. The container animation source and accepted cargo scene are unchanged. Shared Portal homepage and the other two workbenches remain outside scope.

Use only local data and existing identity. Browser workflow writes go to the existing isolated testing snapshot. No credentials, dependencies, paid calls, business approvals or external effects are introduced.
