# Security Design — u1-todo-app

## Sources

- `nfr-requirements/security-requirements.md`
- `nfr-requirements/tech-stack-decisions.md`
- `functional-design/functional-spec.md`

## Design

| Requirement | Design decision |
|---|---|
| NFR3.1 | Render TODO text through React text content only; prohibit raw HTML rendering of user input. |
| NFR3.2 | Centralize access to one named application local-storage key; never inspect or write other keys. |
| NFR3.3 | Validate the entire parsed collection before applying it to state. Invalid JSON, inaccessible storage, or an invalid item shape produces `read-failed` with mutation controls disabled. |
| NFR3.4 | Keep the current collection and draft in memory on a write exception; distinguish the failure notice from success and expose retry/reload actions. |
| NFR3.5 | Use native labelled controls, semantic checkboxes, an input-associated error message, and live status regions. Test keyboard operation and common axe-core violations. |

Authentication, authorization, transport encryption, secrets management, and
server audit logs are not designed because this unit has no server, user
identity, or network boundary.

