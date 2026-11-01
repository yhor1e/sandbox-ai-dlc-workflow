# Business Rules — u1-todo-app

## Source of truth

```yaml
rules:
  - id: BR1.1
    statement: A TODO may be created only from non-empty trimmed text of at most 500 characters.
    category: validation
    applies_to: Todo creation
    trigger: The user submits the add form.
    logic: IF trimmed text is empty or longer than 500 characters THEN do not create or save a TODO and retain the draft with a field-level correction message.
    violation_behaviour: No collection change; accessible validation feedback is displayed.
    source: [FR1, NFR3]
  - id: BR1.2
    statement: A newly accepted TODO is uncompleted and retains creation order.
    category: constraint
    applies_to: Todo collection
    trigger: A valid TODO is added.
    logic: IF a TODO is accepted THEN assign a unique opaque id, set completed to false, and append it to the collection.
    violation_behaviour: The TODO is not accepted unless all required fields can be created.
    source: [FR1, FR2, FR5]
  - id: BR1.3
    statement: Stored TODO data must be a valid ordered collection of Todo records.
    category: validation
    applies_to: Local storage restoration
    trigger: The application initializes.
    logic: IF the stored value is absent THEN start with an empty collection; IF it cannot be read, parsed, or structurally validated THEN enter read-failed and disable mutations.
    violation_behaviour: Do not display partial data; show an accessible recovery notice.
    source: [FR2, FR6, NFR3]
  - id: BR1.4
    statement: Every accepted TODO addition and completion-state change must persist the full current collection.
    category: policy
    applies_to: Local storage writes
    trigger: A TODO is added or its completion checkbox changes.
    logic: IF the in-memory collection changes THEN write the complete ordered collection to the application storage key.
    violation_behaviour: On a write error, keep in-memory changes and draft, enter write-failed, and offer retry or reload.
    source: [FR5, FR6]
  - id: BR1.5
    statement: Completed TODOs are hidden by default and shown only while completed visibility is enabled.
    category: policy
    applies_to: Todo list display
    trigger: Initialization or completed visibility toggle.
    logic: IF completed visibility is false THEN render only uncompleted TODOs; IF true THEN render completed TODOs in a distinct section.
    violation_behaviour: No persisted data is changed by the visibility toggle.
    source: [FR3, FR4]
  - id: BR1.6
    statement: Completion changes preserve a TODO's collection position and are announced accessibly.
    category: constraint
    applies_to: Completion state
    trigger: A TODO checkbox is activated.
    logic: IF completion changes successfully THEN update only that Todo.completed value, retain collection order, update visible list membership, and announce the new state.
    violation_behaviour: On write failure, retain the in-memory state and show recovery actions.
    source: [FR3, FR5, NFR3]
  - id: BR1.7
    statement: Retrying a failed save writes the current complete in-memory collection.
    category: policy
    applies_to: Write-failure recovery
    trigger: The user activates Retry save.
    logic: IF a retry succeeds THEN return to ready and clear the failure notice; IF it fails THEN retain all in-memory data and continue showing recovery actions.
    violation_behaviour: No in-memory change is discarded solely because a retry fails.
    source: [FR6, NFR1, NFR3]
```

## Rules summary

| Rule | Summary |
|---|---|
| BR1.1 | Validates TODO text and retains invalid input. |
| BR1.2 | Defines new TODO identity, initial state, and ordering. |
| BR1.3 | Restores only valid stored collections and fails safely. |
| BR1.4 | Persists full-collection mutations and preserves failed writes in memory. |
| BR1.5 | Controls completed-item visibility without changing data. |
| BR1.6 | Changes completion state accessibly without reordering. |
| BR1.7 | Defines retry recovery for retained unsaved changes. |

