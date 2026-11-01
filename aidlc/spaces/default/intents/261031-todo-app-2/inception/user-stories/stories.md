# ユーザーストーリー

## US1.1: TODO を追加して確認する

**As a** 個人の TODO 利用者、**I want** TODO を入力して一覧に追加したい、**so that** 忘れずに作業を記録できる。

- **Priority**: Must Have
- **Requirements**: FR1, FR2, FR5, NFR1, NFR2, NFR3
- **Dependencies**: なし
- **INVEST**: 単一の追加・表示フローとして独立して実装・見積もり・検証できる。

- AC1.1.1: Given TODO 一覧が表示されている When 空白だけではないテキストを入力して追加する Then 未完了 TODO が一覧に表示され、ローカルストレージへ保存される。
- AC1.1.2: Given TODO 入力欄が空白だけである When 追加しようとする Then TODO は作成されず、修正方法が分かるメッセージが表示される。
- AC1.1.3: Given 保存済み TODO がある When ページを再読み込みする Then 保存順の未完了 TODO が復元される。
- AC1.1.4: Given 保存済み TODO がない When アプリを開く Then 空の状態と最初の TODO を追加する案内が表示される。
- AC1.1.5: Given 幅375px、768px、1280pxの各ビューポートで最新安定版 Chrome、Safari、Firefox を使う When TODO を追加する Then 操作が利用でき、キーボード操作と支援技術で必要な名前・状態を確認できる。

## US1.2: 完了状態を管理する

**As a** 個人の TODO 利用者、**I want** TODO を完了・未完了に切り替えたい、**so that** 次に取り組む作業へ集中できる。

- **Priority**: Must Have
- **Requirements**: FR3, FR4, FR5, NFR1, NFR2, NFR3
- **Dependencies**: US1.1
- **INVEST**: 状態遷移と表示切り替えを独立して実装・検証できる。

- AC1.2.1: Given 未完了 TODO が表示されている When 完了へ切り替える Then 状態が保存され、既定の未完了一覧から非表示になる。
- AC1.2.2: Given 完了 TODO が表示されている When 未完了へ切り替える Then 状態が保存され、未完了一覧に表示される。
- AC1.2.3: Given 完了済み TODO がある When 完了済みの表示を選ぶ Then 未完了 TODO と区別できる状態で表示される。
- AC1.2.4: Given 完了済み TODO の表示が有効である When 非表示を選ぶ Then 完了済み TODO は表示されない。
- AC1.2.5: Given キーボードまたは支援技術を利用している When 完了状態を切り替える Then 状態変化が操作可能で、支援技術へ通知される。

## US1.3: 保存の失敗を理解して対応する

**As a** 個人の TODO 利用者、**I want** 保存を利用できない理由と次の操作を知りたい、**so that** TODO が失われたと誤解せずに対応できる。

- **Priority**: Must Have
- **Requirements**: FR6, NFR1, NFR3
- **Dependencies**: US1.1
- **INVEST**: 保存失敗の検知・表示・再試行案内を独立して検証できる。

- AC1.3.1: Given ページ読み込み時にローカルストレージの読み取りに失敗する When アプリが初期化を完了する Then 保存済み TODO を表示せず、保存機能を利用できない理由を表示し、追加と完了状態の変更を無効にする。
- AC1.3.2: Given ローカルストレージへの書き込みに失敗する When TODO を追加または状態を変更する Then 画面上の変更と入力内容を保持し、失敗と再試行またはページ再読み込みの選択肢を表示する。
- AC1.3.3: Given 保存失敗の通知が表示されている When キーボードまたは支援技術を利用する Then 通知内容と利用可能な次の操作を取得できる。

## 対象外

編集、削除、期限、優先度、認証、共有、サーバー同期は初回リリースのストーリーに含めない。
