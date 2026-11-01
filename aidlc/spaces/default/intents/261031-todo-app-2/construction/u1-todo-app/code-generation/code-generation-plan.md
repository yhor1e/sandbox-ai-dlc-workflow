# Code Generation Plan — u1-todo-app

## Summary

- React + TypeScript + Vite の TODO アプリを新規作成する。
- localStorage の失敗状態、アクセシビリティ、完了済み表示を実装する。
- Vitest、React Testing Library、axe-core、80% 行カバレッジを設定する。

## Implementation Steps

- [x] Step 1: Vite React TypeScript プロジェクト、Prettier、ESLint、Vitest、React Testing Library、axe-core、GitHub Actions を設定する。 (US1.1, NFR4.1, NFR4.2, NFR5.1, NFR5.2)
- [x] Step 2: `Todo` 型、localStorage adapter、保存データの検証、読み取り／書き込み失敗状態を実装する。 (US1.1, US1.3)
- [x] Step 3: `TodoApp`、入力検証、TODO 追加、未完了一覧、空状態を実装する。 (US1.1)
- [x] Step 4: 完了切替、完了済み表示切替、ライブ通知、キーボード対応を実装する。 (US1.2, NFR3.5)
- [x] Step 5: 保存失敗通知、再試行、再読み込み案内を実装する。 (US1.3)
- [x] Step 6: コンポーネント・ストレージ・アクセシビリティの単体／統合テストを実装して実行する。 (US1.1, US1.2, US1.3)
- [x] Step 7: 375px、768px、1280pxのレイアウトと、CI の整形、静的チェック、テスト、カバレッジ、GitHub Pages 配備を設定する。 (NFR1, NFR2, NFR4, NFR5)

## Testing Contract

```json
{
  "version": 1,
  "methodology": "test-after",
  "source": "team",
  "ordering": "各機能を実装してからテストを書き、CI で実行します。",
  "scope": "classic",
  "test_strategy": "standard",
  "project_type": "greenfield",
  "applicable_notes": [
    {
      "layer": "org",
      "text": "We treat tests as a first-class deliverable in every Bolt. The specific\nmethodology (TDD, BDD, ATDD, or classic test-after) is affirmed at\npractices-discovery and recorded in `team.md` under this heading with explicit\n`Methodology` and `Ordering` fields; Code Generation resolves those fields\nindependently from coverage, tooling, and scope notes.\n\nWhen no posture has been affirmed, our default per scope is:\n- **Methodology**: test-after\n- **Ordering**: implement each applicable testable layer, then write and run\n  that layer's tests.\n- `mvp`, `enterprise`, `feature`, `infra`, `classic` add an 80% line-coverage\n  floor and CI execution before merge.\n- `bugfix`, `security-patch` add a targeted regression for the specific\n  bug/vulnerability and require the existing suite to remain green.\n- `express` uses the Minimal strategy: requirement-driven unit tests (one per\n  requirement, with a happy-path floor per component); existing tests remain\n  green.\n- `poc`, `refactor`, `workshop` add no extra new-test floor and require the\n  existing suite to remain green.\n\nThe active `Test Strategy` still applies in every scope and determines test\nvolume/types. Scope floors are additive; they never reduce or replace the\nselected strategy.\n\nBuild and Test verifies defined coverage floors and affirmed quality targets;\nthey may not be weakened to make a step pass.\n\nAffirm a stricter posture in `team.md` if the team commits to one."
    },
    {
      "layer": "team",
      "text": "- **Methodology**: test-after\n- **Methodology evidence**: 人が、実装後にテストを書く進め方を選択しました。\n- **Ordering**: 各機能を実装してからテストを書き、CI で実行します。\n- CI は行カバレッジ 80% 以上を必須として検証します。"
    }
  ],
  "obligations": {
    "strategy": "standard",
    "strategy_volume": [
      "Five to eight tests per component.",
      "Unit tests plus integration tests for key boundaries.",
      "Add E2E, performance, or security tests when requirements demand them."
    ],
    "scope_floor": [
      "Keep the existing test suite green.",
      "This scope adds no extra new-test floor beyond the selected test strategy."
    ],
    "combination_rule": "Apply every selected-strategy obligation and every scope-floor obligation; neither replaces the other, and a targeted scope regression may add the narrowest necessary test type beyond the strategy default."
  },
  "plan_profile": {
    "methodology": "test-after",
    "runner_step": "Bootstrap the minimal test runner/configuration and record the exact unit-scoped command.",
    "runner_ready_before_first_test": true,
    "testable_layers": [
      "Data model / database behavior",
      "Repository / data access",
      "Business logic",
      "API / endpoint",
      "Frontend behavior"
    ],
    "steps": [
      "Project structure and production configuration skeleton.",
      "Bootstrap the minimal test runner/configuration and record the exact unit-scoped command.",
      "Data model / database behavior - implement.",
      "Data model / database behavior - write and run its tests after implementation.",
      "Repository / data access - implement.",
      "Repository / data access - write and run its tests after implementation.",
      "Business logic - implement.",
      "Business logic - write and run its tests after implementation.",
      "API / endpoint - implement.",
      "API / endpoint - write and run its tests after implementation.",
      "Frontend behavior - implement.",
      "Frontend behavior - write and run its tests after implementation.",
      "Environment/build configuration.",
      "Documentation and traceability."
    ]
  },
  "input_sha256": "sha256:e2b112e61559c6be8b4e56570c63d5b93615589ae9f884572093a79681b93a5d",
  "contract_sha256": "sha256:acc84b394ecccdd288edb7e548ee93b627ac1ae85ca41a5951644c280f9fe8bc"
}
```
