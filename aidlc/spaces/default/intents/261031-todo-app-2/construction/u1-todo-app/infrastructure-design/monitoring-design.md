# Monitoring Design — u1-todo-app

## Scope

The local-only static client has no server-side metrics, logs, traces, or
health endpoint. GitHub Actions and GitHub Pages deployment status are the
operational signals for this release.

| Signal | Source | Response |
|---|---|---|
| Formatting, lint, test, or coverage failure | GitHub Actions check | Fix before merge or deployment. |
| Pages deployment failure | GitHub Actions deployment status | Keep the prior version active, correct the workflow or Pages configuration, and rerun. |

Browser storage failures are handled in the user interface and tests; they are
not sent to remote telemetry because the app has no network data path.
