# Technology Stack Decisions — u1-todo-app

## Decision

Use **React + TypeScript + Vite** for the browser client.

| Area | Selection | Rationale |
|---|---|---|
| UI | React | Supports explicit component boundaries for the form, list, status notice, and accessible interaction states. |
| Language | TypeScript | Makes the persisted `Todo` shape and storage-state transitions explicit before runtime. |
| Build and development server | Vite | Provides a lightweight, conventional client build for this learning application. |
| Unit and component tests | Vitest + React Testing Library | Covers user-visible behaviour, storage failures, and accessibility-oriented interactions without tying tests to internal implementation. |
| Accessibility checks | axe-core integration for tests | Detects common WCAG violations alongside keyboard and state-notification tests. |
| Formatting | Prettier | Provides deterministic formatting in local development and CI. |
| Static checks | ESLint with TypeScript and React rules | Detects common JavaScript, TypeScript, and React correctness issues. |
| CI | GitHub Actions | Runs formatting, linting, tests, and line-coverage enforcement on pull requests and `main`. |
| Persistence | Browser `localStorage` | Required by the approved scope; no server or database is introduced. |

## Quality-tool requirements

| ID | Requirement | Acceptance target |
|---|---|---|
| NFR5.1 | Prettier must check formatting in CI. | CI fails when application files are not formatted. |
| NFR5.2 | ESLint with TypeScript and React rules must run in CI. | CI fails on lint errors. |

## Consequences

- The application remains a static browser client and can be deployed to
  staging after `main` integration without server infrastructure.
- React escapes rendered text by default; implementation must not bypass that
  safeguard with raw HTML rendering.
- The final package versions and exact scripts are selected when the project
  scaffold is created, but they must support the requirements in
  `performance-requirements.md` and `security-requirements.md`.

## Alternatives considered

| Alternative | Decision |
|---|---|
| Vanilla TypeScript + Vite | Rejected because the selected learning path benefits from explicit React component and testing practices. |
| Vue + TypeScript + Vite | Rejected because React was selected by the user for this application. |
| Server-backed storage | Rejected because the initial release requires local-only use with browser local storage. |
