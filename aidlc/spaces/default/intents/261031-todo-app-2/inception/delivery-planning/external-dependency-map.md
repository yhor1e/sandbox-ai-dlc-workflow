# 外部依存マップ

## 参照した入力

- `../requirements-analysis/requirements.md` — サーバー API、データベース、認証を使用しない制約
- `../units-generation/unit-of-work-dependency.md` — Browser localStorage への依存

| Dependency | Owner | Blocks | Lead Time | Fallback |
|---|---|---|---|---|
| Browser localStorage | 利用者のブラウザ | Bolt 1、Bolt 2 | なし | 読み取り失敗時は保存機能を停止し、書き込み失敗時は変更を保持して再試行・再読み込みを案内する。 |

外部 API、他チームの引き継ぎ、データ提供待ち、手動承認待ちは初回リリースの Bolt をブロックしない。

