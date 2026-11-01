# Performance Requirements — u1-todo-app

## Sources

- `functional-design/functional-spec.md` — W1 through W5 and local-storage behaviour
- `inception/requirements-analysis/requirements.md` — NFR1, NFR2, and NFR4
- `nfr-requirements-questions.md` — React + TypeScript + Vite selection

| ID | Requirement | Measurement and acceptance target |
|---|---|---|
| NFR1.1 | Adding a valid TODO must update the visible list and initiate persistence within 1 second of form submission. | Browser interaction test on a development-class desktop; measure from activation to the changed DOM state. |
| NFR1.2 | Changing a completion checkbox must update the visible list state within 1 second of activation. | Browser interaction test on a development-class desktop; measure from activation to the changed DOM state. |
| NFR1.3 | The app must remain responsive for at least 500 stored TODOs. | Add, completion toggle, and completed-visibility actions complete within the NFR1.1/NFR1.2 target using a 500-item fixture. |
| NFR2.1 | Core operations must be usable at 375px, 768px, and 1280px viewport widths in the latest stable Chrome, Safari, and Firefox. | Manual or automated browser matrix check covers add, restore, completion toggle, and completed visibility. |
| NFR2.2 | Long TODO text must wrap without horizontal page scrolling at each supported viewport. | Visual regression or browser-layout check at the three target widths. |
| NFR4.1 | Automated unit and component tests must run in CI after implementation. | CI runs the selected test command on every pull request and `main` update. |
| NFR4.2 | CI must enforce at least 80% line coverage for the application source. | The coverage report fails CI below 80% lines. |

## Performance constraints

The application has no network request path and performs local storage reads and
writes only on initialization or mutation. It therefore has no API latency
budget, server throughput target, or client polling requirement. Large-list
behaviour beyond 500 TODOs is outside the initial release; the UI must not
silently truncate stored TODOs.

