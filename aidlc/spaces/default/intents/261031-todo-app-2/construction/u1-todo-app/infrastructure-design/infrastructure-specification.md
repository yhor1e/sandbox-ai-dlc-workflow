# Infrastructure Specification — u1-todo-app

## Sources

- `nfr-design/performance-design.md`
- `nfr-design/security-design.md`
- `nfr-design/logical-components.md`
- `inception/domain-design/components.md`
- `functional-design/functional-spec.md`

## Deployment topology

The React static build is hosted on GitHub Pages. No server, database, VPC,
IAM application role, secret store, or cloud runtime is needed.

| Environment | Trigger | Destination |
|---|---|---|
| Published site | Successful `main` workflow run | GitHub Pages |

The GitHub repository is the deployment boundary. The workflow receives only
the minimum GitHub Actions permissions needed to read the repository, upload
the Pages artifact, and deploy it. The application stores no secrets.

## Failure and rollback

- A failed build or test prevents publishing.
- A failed deployment leaves the previously published Pages artifact active.
- Rollback redeploys a previously successful build artifact or commit.
