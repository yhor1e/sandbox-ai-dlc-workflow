# ユニット・ストーリーマップ

## 参照した入力

- `../user-stories/stories.md` — US1.1〜US1.3
- `unit-of-work.md` — U1 の責務
- `unit-of-work-dependency.md` — U1 の依存関係

| Upstream ID | Unit ID | Directory | Covered scope |
|---|---|---|---|
| US1.1 | U1 | `u1-todo-app` | TODO の追加、一覧、復元、空の状態、操作可能な表示 |
| US1.2 | U1 | `u1-todo-app` | 完了・未完了の切り替え、完了済み表示、状態通知 |
| US1.3 | U1 | `u1-todo-app` | 読み取り・書き込み失敗、変更保持、回復操作の案内 |

## Unit Coverage

| Unit ID | Covered Stories |
|---|---|
| U1 | US1.1、US1.2、US1.3 |

すべてのストーリーは U1 に割り当てられ、U1 は少なくとも1つのストーリーを担う。

