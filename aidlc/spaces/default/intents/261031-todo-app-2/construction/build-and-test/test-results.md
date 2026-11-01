# テスト結果

| 種別 | コマンド | 結果 |
|---|---|---|
| ビルド | `npm run build` | PASS |
| 単体・統合 | `npm run test -- src/App.test.tsx src/storage.test.ts` | PASS: 15 tests |
| カバレッジ | `npm run test:coverage` | PASS: lines 96.04% (threshold 80%) |

実ブラウザーでの E2E と 500 件の性能測定は未実施であり、後続の性能検証で扱う。
