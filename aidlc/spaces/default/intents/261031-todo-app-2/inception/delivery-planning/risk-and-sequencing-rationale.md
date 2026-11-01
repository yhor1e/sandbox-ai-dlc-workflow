# リスクと順序の根拠

## 参照した入力

- `bolt-plan.md`
- `../practices-discovery/team-practices.md`
- `../units-generation/unit-of-work-dependency.md`

## Heuristic

walking-skeleton-first（最初に最小の動く統合結果を証明する方法）を採用する。

| Risk / Value | Bolt | Mitigation / Evidence |
|---|---|---|
| 画面、状態、ローカルストレージが統合できない | Bolt 1 | 追加、表示、保存、再読み込みを実演する。 |
| 完了状態や保存失敗で利用者の変更が失われる | Bolt 2 | 状態変更、書き込み失敗、再試行・再読み込みをテストする。 |
| 小画面・キーボード・支援技術で操作できない | Bolt 2 | 画面幅、キーボード、状態通知を検証する。 |
| 品質チェックが後回しになる | Bolt 2 | テスト、80%以上の行カバレッジ、整形・静的チェックを完了条件に含める。 |

Bolt 1 と Bolt 2 は同じ U1 を変更するため、DAG 上は1ユニットでも実装上は順番に進める。

