# CI/CD Pipeline — u1-todo-app

## Pipeline

1. On pull requests and pushes to `main`, install dependencies from the lockfile.
2. Run Prettier check and ESLint.
3. Run Vitest with line coverage enforcement at 80% or higher.
4. Build the Vite production artifact.
5. On a successful `main` run, upload the static artifact and deploy it to
   GitHub Pages.

## Security controls

- Pin actions by immutable revision where repository policy allows.
- Use only GitHub-provided deployment credentials; do not store application
  secrets.
- Grant workflow permissions only for repository contents read, Pages artifact
  upload, and Pages deployment.
