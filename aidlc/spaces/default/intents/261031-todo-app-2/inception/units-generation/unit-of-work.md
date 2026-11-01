# ユニット一覧

## 参照した入力

- `../domain-design/components.md` — `TodoApp` と `Todo` の所有
- `../domain-design/decisions.md` — 単一コンポーネント構成の ADR
- `../requirements-analysis/requirements.md` — FR1〜FR6、NFR1〜NFR5
- `../user-stories/stories.md` — US1.1〜US1.3
- `units-generation-questions.md` — 統合ユニットの選択

| Unit ID | Directory | Kind | Description | Deployment Model | Complexity |
|---|---|---|---|---|---|
| U1 | `u1-todo-app` | ui | 単一利用者向け TODO アプリを画面から永続化まで実装する。 | embedded | M |

## U1: u1-todo-app

### 境界

`TodoApp` の画面、TODO 状態、入力検証、ブラウザのローカルストレージ永続化、保存失敗の回復表示を一体として実装する。サーバー API、データベース、認証、共有は含めない。

### 責務

- TODO の追加、保存順の未完了一覧表示、ページ再読み込み時の復元
- 完了・未完了の切り替えと完了済み TODO の表示・非表示
- 空白入力の拒否と修正方法の表示
- ローカルストレージの読み取り・書き込み失敗の表示、操作停止、再試行・再読み込みの案内
- 幅375px・768px・1280pxでの表示と、Chrome・Safari・Firefoxでの主要操作
- WCAG 2.2 AA に必要なキーボード操作、名前、状態通知、コントラスト
- 実装後のテスト、80%以上の行カバレッジ、整形・静的チェック

### 実装上の制約

- `TodoApp` を唯一の論理コンポーネントとし、`Todo` を所有する。
- `Browser localStorage` は外部依存であり、コンポーネントや別ユニットにしない。
- 書き込み失敗時も画面上の変更と入力内容を保持する。

