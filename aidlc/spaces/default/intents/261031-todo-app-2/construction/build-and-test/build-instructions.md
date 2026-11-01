# ビルド手順

1. `npm ci`
2. `npm run format:check && npm run lint`
3. `npm run build`

ローカルで GitHub Pages と同じパスを確認する場合は、`VITE_BASE_PATH=/sandbox-ai-dlc-workflow/ npm run build` を実行する。
