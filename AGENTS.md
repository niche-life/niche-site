# AGENTS.md

## プロジェクト概要
- **メインユーザー**: 生物学研究者、アマチュア自然愛好家、編集委員
- **目標**: 学術的に引用可能な生物記録の蓄積と、生物多様性の魅力発信
- **特徴**: 投稿無料・全文無料公開のオンラインジャーナル
- **技術的要求**: 高速な表示、SEO対応、Cloudflareへのデプロイ

## アーキテクチャ
- `/src/pages/`: 動的ルーティング（バックナンバー、個別巻号ページ）
- `/src/content/`: Starlightコンテンツ（MDX記事、編集委員情報）
- `/src/components/`: 再利用可能コンポーネント
- `/src/data/`: 分離されたデータファイル
  - `volumes.json`: 巻情報マスター
  - `articles/volume-*.json`: 各巻の記事データ
- `/src/assets/cover/`: 表紙画像（`volume-{番号}.jpg`形式）
- `/src/utils/`: データ取得ユーティリティ

## Starlight運用原則
- 本プロジェクトのドキュメントフレームワークは **Starlight**（`@astrojs/starlight`）であり、公式ガイドラインに沿って実装する
- UI変更の優先順位は「`starlight`設定値・frontmatter・`customCss`」→「既定コンポーネントの再利用（拡張）」→「完全オーバーライド（最終手段）」とする
- `astro.config.mjs` の `components` は既存の許可範囲（`Footer`, `Hero`, `Header`, `SiteTitle`）を原則維持し、追加・置換は明示的な要件がある場合のみ行う
- レイアウト/アクセシビリティに影響の大きいオーバーライド（例: `PageFrame`, `TwoColumnContent`, `Sidebar`, `TableOfContents`, `ThemeProvider`, `Head`）は原則禁止。必要時は理由と影響範囲を記録する
- オーバーライド時は、可能な限り `@astrojs/starlight/components/*` の既定コンポーネントを import して「置換」ではなく「拡張」で実装する
- 仕様互換性の必須要件（例: `PageTitle` の `id="_top"` など）は Starlight Overrides Reference に従って保持する

## テスト手順
- `npm run build` を実行し、ビルドエラーが出た場合は原因を修正して再実行する
- ビルドが成功（exit code 0）するまで、修正と `npm run build` を繰り返す

## コーディングスタイルガイドライン
- TypeScript strict mode、`any`型は禁止
- named exportを優先（default exportは避ける）
- CSS: TailwindCSSのユーティリティクラスのみ使用
- 画像最適化: Astroの`<Image>`コンポーネントを必ず使用
- ファイル命名: kebab-case（例：`volume-detail.astro`）

## データ管理規約

- IMPORTANT: 巻データと記事データは必ず分離して管理すること
- 表紙画像は`volume-{番号}.jpg`の命名規則を厳守
- 新巻号追加時は3つのファイルを更新: 表紙画像、volumes.json、記事JSONファイル
- DOIリンクは必ずhttps形式で記録

## 重要な注意事項

- NEVER 画像の直接パスを使用しない。必ず`getCoverImage()`を経由すること
- 記事リンクは学術的引用に使用されるため、URLの変更は慎重に行う
- J-STAGEとの同期を意識したデータ構造を維持
- 表紙画像の推奨サイズ: 180×254px（縦横比1:1.41）

## 入稿ワークフロー

新巻号追加の詳細手順: @docs/submission-workflow.md
画像処理ガイドライン: @docs/image-guidelines.md
SEO最適化チェックリスト: @docs/seo-checklist.md

## サイト構造・ナビゲーション設計

サイト全体の構造設計: @docs/site-structure.md
UI/UXデザインガイドライン: @docs/ui-ux-guidelines.md
情報アーキテクチャ: @docs/information-architecture.md
メニュー改善提案: @docs/menu-improvement-proposal.md

## 方針
- 投稿フォームやお問い合わせフォームなどは自前で作らず、Google formなど外部ツールを利用する
