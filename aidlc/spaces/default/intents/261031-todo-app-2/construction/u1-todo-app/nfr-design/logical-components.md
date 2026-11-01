# Logical Components — u1-todo-app

## Component inventory

| Component | Boundary | Failure domain | NFR responsibility |
|---|---|---|---|
| React `TodoApp` | Owns UI state, validation, and interaction workflows | Rendering or state-transition defect | Fast state updates, responsive layout, keyboard access, and status notification. |
| Local-storage adapter | Owns one application storage key and full-collection serialization | Browser storage access, parsing, quota, or serialization failure | Validates restored data, fails closed on read errors, and preserves in-memory writes for retry. |
| Browser runtime | Provides DOM, accessibility tree, and local storage | Browser capability or user storage policy | Supported browser matrix and local-only data boundary. |
| GitHub Actions quality workflow | Executes checks outside the browser runtime | CI tool or configuration failure | Formatting, linting, tests, and line-coverage enforcement. |

The storage adapter is an implementation boundary within the single logical
`TodoApp` component; it is not a new domain component. Its isolation limits
storage failures to persistence while keeping the page's in-memory state
available for retry.

