## Mandated

- ALWAYS レビュー後に通常の merge commit で `main` へ統合する。
- ALWAYS 最初の薄い通し実装には TODO の追加と画面表示だけを含める。
- ALWAYS 実装後にテストを書き、CI で行カバレッジ 80% 以上を検証する。
- ALWAYS `main` への統合後にステージングへ自動配備する。
- ALWAYS 本番への配備前に手動承認を得る。
- ALWAYS 標準的なフォーマッターと静的チェックを CI で実行する。

## Forbidden

- NEVER CI の行カバレッジが 80% 未満の変更を統合する。
- NEVER フォーマッターまたは静的チェックに違反した変更を統合する。
- NEVER 手動承認なしに本番へ配備する。
