# Security Requirements — u1-todo-app

## Sources

- `functional-design/functional-spec.md` — local-only storage, text rendering, and failure states
- `inception/requirements-analysis/requirements.md` — local-only constraint and NFR3
- `nfr-requirements-questions.md` — React + TypeScript + Vite selection

## Scope

This is a single-user browser application with no account, server API,
database, network synchronization, or secret. Authentication, authorization,
tenant isolation, and server-side threat controls do not apply to this release.

| ID | Requirement | Acceptance target |
|---|---|---|
| NFR3.1 | User-entered TODO text must be rendered as text, not executable markup. | Tests include markup-like input and confirm it is displayed literally without creating executable DOM content. |
| NFR3.2 | The application must use only one application-owned local-storage key and must not store credentials, tokens, or unrelated browser data. | Storage access is isolated behind the TODO storage boundary and inspected in tests. |
| NFR3.3 | Invalid, malformed, or inaccessible stored data must enter the read-failed state without partially displaying saved TODOs. | Tests cover JSON parse failure and invalid item shape; add and completion controls are disabled. |
| NFR3.4 | A failed storage write must not be presented as a successful save. | Tests cover write failure, retained in-memory state, and accessible retry/reload guidance. |
| NFR3.5 | All primary controls and status messages must meet the WCAG 2.2 AA interaction requirements already specified for this release. | Automated accessibility checks and keyboard interaction tests cover form, TODO checkbox, completed toggle, and storage notice. |

## Threat considerations

| Threat | Required mitigation |
|---|---|
| Markup-like TODO text | Render through React text nodes; do not use raw HTML rendering for TODO content. |
| Corrupt or externally modified local storage | Parse and validate the full stored collection before displaying it; fail closed on invalid data. |
| Browser storage unavailable or quota exhausted | Surface the failure, preserve in-memory changes on write failure, and offer retry or reload. |
| Accidental exposure of sensitive data | Do not collect or persist credentials, analytics identifiers, or data beyond TODO text and completion state. |

