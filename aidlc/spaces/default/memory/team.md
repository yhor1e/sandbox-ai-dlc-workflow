# Team-Level Rules

> This team's affirmed practices and corrections. Loaded after `org.md` as
> strict-additive guidance; contradictions with broader policy are rejected.
> Populated by the practices-discovery affirmation gate. Edit at the gate,
> not directly.

## Way of Working

短命の作業ブランチを `main` から作成し、レビュー後に通常の merge commit で `main` へ統合します。

## Walking Skeleton

最初の薄い通し実装は、TODO の追加と画面表示だけを含めます。

## Testing Posture

- **Methodology**: test-after
- **Methodology evidence**: 人が、実装後にテストを書く進め方を選択しました。
- **Ordering**: 各機能を実装してからテストを書き、CI で実行します。
- CI は行カバレッジ 80% 以上を必須として検証します。

## Guard Policy

<!-- Affirmed by the team. Mode: strict, relaxed, or off. Strict here holds for every intent, whatever one person asks in chat; relaxed or off here applies to every intent whose policy came from its scope, unless project.md or the person sets another; changing this line changes it. A section under the retired Change Control heading, written by an earlier release, is still read. -->

## Deployment

`main` への統合後にステージングへ自動配備し、本番への配備は手動承認後に実行します。

## Code Style

採用言語の標準的なフォーマッターと静的チェックを設定し、CI で違反を検出した場合はマージを停止します。
## Forbidden

<!-- Team-specific forbidden patterns -->

## Mandated

<!-- Team-specific mandates -->

## Corrections

<!-- Self-learning loop appends here. -->
