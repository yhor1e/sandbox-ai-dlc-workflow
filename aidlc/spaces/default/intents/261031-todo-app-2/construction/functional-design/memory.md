<!-- INVARIANT: examples are single-line HTML comments so a fresh template parses to total=0 (MEMORY_EMPTY). Do NOT un-comment or split across lines. t100 guards this. -->
> This file is kept up to date automatically while the stage runs. Add observations at the review step, not by editing here directly.

## Interpretations
<!-- example: 2026-05-29T10:14:32Z — chose REST over GraphQL; the consuming team only needs CRUD, revisit if subscriptions land -->
- 2026-11-01T02:18:17Z [unit u1-todo-app] — treated malformed or structurally invalid local-storage data as a read failure; the requirements require failed reads to stop mutations, and silently treating corrupt data as an empty list could hide loss.

## Deviations
<!-- example: 2026-05-29T10:14:32Z — skipped the optional caching layer the stage prose suggested; the dataset is small enough that it adds risk -->

## Tradeoffs
<!-- example: 2026-05-29T10:14:32Z — picked TDD over BDD this run; the team is unit-first and the domain is well-understood -->
- 2026-11-01T02:18:17Z [unit u1-todo-app] — selected a 500-character TODO limit and a full-collection retry save; the prior requirements left a maximum length open, so a bounded, reversible limit protects narrow layouts while retrying the complete in-memory state prevents later changes from being omitted.

## Open questions
<!-- example: 2026-05-29T10:14:32Z — confirm the retention window with compliance before the next stage hardens the schema -->
