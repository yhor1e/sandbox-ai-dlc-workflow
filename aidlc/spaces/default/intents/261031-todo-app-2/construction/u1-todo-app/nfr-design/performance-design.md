# Performance Design — u1-todo-app

## Sources

- `nfr-requirements/performance-requirements.md`
- `nfr-requirements/tech-stack-decisions.md`
- `functional-design/functional-spec.md`

## Design

| Requirement | Design decision |
|---|---|
| NFR1.1, NFR1.2 | Keep the TODO collection in React component state and update state synchronously from user actions before attempting local-storage persistence. |
| NFR1.3 | Render the complete list for the initial 500-item target; avoid network work, polling, and derived state that writes back to storage. |
| NFR2.1, NFR2.2 | Use a single responsive content column, wrapping text, and controls that remain operable at the three required viewport widths. |
| NFR4.1, NFR4.2 | Use Vitest and React Testing Library for interaction tests; run coverage in GitHub Actions with an 80% line threshold. |

No cache, request pool, pagination, background queue, or CDN is needed because
all data remains in one browser and has no remote request path.

