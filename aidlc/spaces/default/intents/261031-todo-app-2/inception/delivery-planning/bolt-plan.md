# Bolt プラン

## 参照した入力

- `../units-generation/unit-of-work.md` — U1 の範囲
- `../units-generation/unit-of-work-dependency.md` — 依存関係なし
- `../units-generation/unit-of-work-story-map.md` — US1.1〜US1.3 の対応
- `../domain-design/components.md` — `TodoApp` と `Todo` の所有
- `../requirements-analysis/requirements.md` — 機能・品質要件
- `../practices-discovery/team-practices.md` — 最初の薄い通し実装
- `delivery-planning-questions.md` — 追加・表示を最初に動かす選択

## Bolt 1: TODO の追加と画面表示

- **Unit**: U1 / `u1-todo-app`
- **Scope**: US1.1 の追加、未完了一覧、空の状態、ローカルストレージへの保存と読み込み。
- **Walking skeleton**: はい。最小の通し実装として、入力から画面表示、ブラウザ内保存、再読み込み後の復元を動かす。
- **Definition of Done**: 有効な TODO を追加でき、空白入力を拒否し、保存済み TODO を復元できる。375px・768px・1280pxで操作でき、キーボードで追加できる。
- **Confidence hypothesis**: ブラウザの画面、状態、ローカルストレージを1つの `TodoApp` として統合できることを証明する。
- **Expected demo**: TODO を追加し、画面に表示されたことと、再読み込み後に復元されることを示す。

## Bolt 2: 状態管理・失敗回復・品質確認

- **Unit**: U1 / `u1-todo-app`
- **Scope**: US1.2、US1.3、WCAG 2.2 AA、対応ブラウザ・画面幅確認、テスト・カバレッジ・CI 設定。
- **Walking skeleton**: いいえ。Bolt 1 の通し実装を拡張する。
- **Definition of Done**: 完了・未完了と完了済み表示を切り替え、保存失敗時に変更を保持して回復操作を案内できる。必要なキーボード・支援技術通知、テスト、80%以上の行カバレッジ、整形・静的チェックを満たす。
- **Confidence hypothesis**: 状態変更と保存失敗を利用者に失わせず、アクセシブルに扱えることを証明する。
- **Expected demo**: TODO を完了・未完了へ切り替え、完了済み表示を開閉し、保存失敗時の通知と回復操作を示す。

## Sequencing

Bolt 1 の実行可能な最小統合結果を確認してから Bolt 2 を実施する。両方とも同じ U1 を変更するため、並行実行しない。
