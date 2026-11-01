# チーム割り当て

## 参照した入力

- `bolt-plan.md` — 2つの Bolt と定義済みの完了条件
- `../units-generation/unit-of-work.md` — U1 の責務

classic スコープでは Team Formation を実施していないため、すべての Bolt を `aidlc-developer-agent`（AI）が担当する。

| Bolt | Owner | Supporting expertise | Collaboration |
|---|---|---|---|
| Bolt 1 | aidlc-developer-agent | aidlc-design-agent、aidlc-quality-agent | UI と保存・復元の最小統合を実装・検証する。 |
| Bolt 2 | aidlc-developer-agent | aidlc-design-agent、aidlc-quality-agent、aidlc-devsecops-agent | 状態変更、保存失敗、アクセシビリティ、テスト・CI を実装・検証する。 |

