# インタラクション仕様

## 参照した入力

- `../user-stories/stories.md` — US1.1〜US1.3 と受け入れ条件
- `../requirements-analysis/requirements.md` — FR1〜FR6、NFR1〜NFR3
- `mockups.md` — 画面状態とレスポンシブ表示

## TodoForm

| Field | Value |
|---|---|
| Component | `TodoForm` |
| Description | TODO テキストを入力して追加するフォーム |
| Category | input |

### States

| State | Description | Trigger |
|---|---|---|
| default | 空の入力欄と有効な追加ボタン | 初期表示・追加成功後 |
| invalid | 空白のみの入力を拒否して説明を表示 | 追加操作 |
| disabled | 保存機能を使えず操作できない | 読み取り失敗 |
| error | 書き込み失敗後も入力内容を保持 | 保存失敗 |

### Props / Inputs

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| value | string | yes | — | 入力中の TODO テキスト |
| disabled | boolean | yes | false | 読み取り失敗時に操作を停止する |
| validationMessage | string | no | — | 入力欄直下に表示する説明 |

### Responsive Behaviour

| Breakpoint | Behaviour |
|---|---|
| mobile (<768px) | 入力欄と追加ボタンを縦積みにし、ボタンは全幅にする |
| tablet (768–1024px) | 入力欄を伸縮させ、追加ボタンを右側に置く |
| desktop (>1024px) | 最大幅内で横並びを維持する |

### Accessibility

| Requirement | Implementation |
|---|---|
| ARIA role | ネイティブの `form`、`input`、`button` を使う |
| Keyboard interaction | Tab で入力・追加へ移動し、Enter で追加する |
| Label / aria-label | 可視ラベル「TODO を入力」を `label` で関連付ける |
| Contrast ratio | WCAG 2.2 AA: 通常テキスト4.5:1以上、操作部品3:1以上 |
| Screen reader | エラーを `aria-describedby` で入力欄に関連付ける |
| Focus management | 追加成功後は空の入力欄へフォーカスを戻す |

## TodoList

| Field | Value |
|---|---|
| Component | `TodoList` |
| Description | 未完了 TODO と、必要時の完了済み TODO を保存順に表示する |
| Category | display |

### States

| State | Description | Trigger |
|---|---|---|
| empty | 最初の TODO を追加する案内を表示 | 保存済み TODO がない |
| default | 未完了 TODO を表示 | TODO の読み込み成功 |
| completed-visible | 完了済みセクションを追加表示 | 表示ボタンの選択 |
| storage-unavailable | 一覧と操作を停止し、理由を表示 | 読み取り失敗 |

### Props / Inputs

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| todos | Todo[] | yes | — | 保存順の TODO 配列 |
| showCompleted | boolean | yes | false | 完了済みセクションの表示状態 |
| disabled | boolean | yes | false | 保存機能が使えない状態 |

### Responsive Behaviour

| Breakpoint | Behaviour |
|---|---|
| mobile (<768px) | 1行の TODO が折り返してもチェックボックスを先頭に固定する |
| tablet (768–1024px) | TODO 項目を余白24pxのカラム内に表示する |
| desktop (>1024px) | 最大幅720pxの中央カラムに表示する |

### Accessibility

| Requirement | Implementation |
|---|---|
| ARIA role | `ul` と `li`、ネイティブチェックボックスを使う |
| Keyboard interaction | Tab、Space で各 TODO のチェックを切り替える |
| Label / aria-label | チェックボックスは TODO テキストを名前として持つ |
| Contrast ratio | 完了状態は色だけでなくチェック、取り消し線、状態テキストで示す |
| Screen reader | 切り替え後に TODO 名と新しい完了状態をライブリージョンで通知する |
| Focus management | 切り替え後も操作したチェックボックスにフォーカスを維持する |

## CompletedToggle

| Field | Value |
|---|---|
| Component | `CompletedToggle` |
| Description | 完了済み TODO セクションを表示・非表示にするボタン |
| Category | navigation |

### States

| State | Description | Trigger |
|---|---|---|
| hidden | 「完了済みを表示」を示す | 初期表示・閉じた後 |
| visible | 「完了済みを非表示」を示す | 開いた後 |
| unavailable | 表示対象がないため非表示 | 完了済み TODO がない |

### Props / Inputs

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| showCompleted | boolean | yes | false | 現在の表示状態 |
| completedCount | number | yes | 0 | 完了済み件数 |

### Responsive Behaviour

| Breakpoint | Behaviour |
|---|---|
| mobile (<768px) | 全幅に近いタップしやすいボタン |
| tablet (768–1024px) | 内容幅のボタン |
| desktop (>1024px) | 内容幅のボタン |

### Accessibility

| Requirement | Implementation |
|---|---|
| ARIA role | ネイティブ `button` |
| Keyboard interaction | Tab、Enter、Space で切り替える |
| Label / aria-label | 可視文言に現在の操作と件数を含める |
| Contrast ratio | WCAG 2.2 AA の操作部品コントラストを満たす |
| Screen reader | `aria-expanded` と完了済みセクションの関連を設定する |
| Focus management | 操作後もボタンにフォーカスを維持する |

## StorageNotice

| Field | Value |
|---|---|
| Component | `StorageNotice` |
| Description | 保存の読み取り・書き込み失敗と回復操作を示す通知 |
| Category | feedback |

### States

| State | Description | Trigger |
|---|---|---|
| hidden | 通知なし | 保存可能 |
| write-error | 変更保持と再試行・再読み込みを案内 | 書き込み失敗 |
| read-error | 保存不可と操作停止を案内 | 読み取り失敗 |

### Accessibility

| Requirement | Implementation |
|---|---|
| ARIA role | 緊急でない通知は `role="status"`、利用不能状態は `role="alert"` |
| Keyboard interaction | 再試行・再読み込みボタンをキーボード操作可能にする |
| Label / aria-label | 操作ボタンに内容を表す可視ラベルを付ける |
| Contrast ratio | WCAG 2.2 AA のテキスト・操作部品コントラストを満たす |
| Screen reader | 表示時に失敗理由と利用可能な回復操作を通知する |
| Focus management | 書き込み失敗でフォーカスを奪わない。読み取り失敗時は通知の先頭へ移す |

## 性能・互換性の検証条件

- TODO の追加、完了、未完了への切り替えは、利用者の操作開始から表示更新まで1秒以内に完了することを確認する。
- 幅375px、768px、1280pxと、最新安定版 Chrome、Safari、Firefox で、追加、切り替え、完了済み表示・非表示を検証する。
- 上記の各環境で、Tab、Enter、Space を使って主要操作を完了でき、支援技術で状態変化と保存失敗を取得できることを確認する。

