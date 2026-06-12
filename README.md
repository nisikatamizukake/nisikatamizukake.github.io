# 西方水かけ祭り 公式HP

福島県三春町 三春町指定無形民俗文化財「西方水かけ祭り」の公式ウェブサイトです。

## GitHub Pages へのデプロイ手順

### 1. GitHubでリポジトリを作成

1. https://github.com/new にアクセス
2. Repository name: `nisikata-mizukake`（または任意の名前）
3. **Public** を選択
4. **README を追加しない**（ここにあるので不要）
5. 「Create repository」をクリック

### 2. リモートを追加してプッシュ

```bash
# このフォルダで実行
cd /Users/chibadaichi/Documents/Claude/プライベート/nisikata-mizukake

# リモートを追加（USERNAME を自分のGitHubユーザー名に変更）
git remote add origin https://github.com/USERNAME/nisikata-mizukake.git

# プッシュ
git branch -M main
git push -u origin main
```

### 3. GitHub Pages を有効化

1. リポジトリページ → **Settings** → **Pages**
2. Branch: **main** / folder: **/ (root)**
3. **Save** をクリック
4. 数分後に `https://USERNAME.github.io/nisikata-mizukake/` で公開されます

---

## ファイル構成

```
nisikata-mizukake/
├── index.html       # メインページ（全セクション）
├── css/
│   └── style.css    # スタイルシート
├── js/
│   ├── news-data.js # ★お知らせデータ（お知らせの編集はこのファイルだけ）
│   └── main.js      # アニメーション・インタラクション
├── images/          # 写真
├── sitemap.xml      # 検索エンジン用サイトマップ
├── robots.txt       # クローラー設定
└── design.md        # デザイン仕様書
```

## お知らせの編集方法（追加・修正・削除）

### いちばん簡単：管理ページを使う（推奨）

**https://nisikatamizukake.github.io/admin.html** を開くと、フォーム入力だけで
追加・修正・削除ができます。最後に「🚀 ホームページに反映する」を押すだけ。

- 初回のみ「かんたん設定」（GitHubの保存キー登録、画面の手順どおり3ステップ）が必要
- スマホからも操作できます
- 検索エンジンには載らない設定済み（noindex）

### そのほかの方法
- **GitHubで直接編集**: リポジトリの `js/news-data.js` を開く → 鉛筆アイコン（Edit）→ 編集して「Commit changes」→ 1〜2分で本番に反映
- **Claudeに頼む**: 「お知らせに『◯◯』を追加して」と伝えるだけでもOK

### 1件の書き方

```js
{
  date: "2026-12-20",            // 半角で 年-月-日
  category: "お知らせ",           // "祭礼" / "お知らせ" / "メディア"
  title: "ここに見出しを書く",
  url: "https://...",            // クリックで開くリンク（省略可）
},
```

- **追加** … 1件分をコピーして書き換える（並び順は日付から自動で新しい順になる）
- **修正** … 該当の行の文字を書き換える
- **削除** … 該当の `{ 〜 },` を丸ごと消す
- **NEW表示** … 日付から **30日間は自動で「NEW」バッジ** が付く（設定不要）
- **表示件数** … 最新5件まで表示。6件以上は「すべてのお知らせを見る」ボタンが自動で出る

## その他のカスタマイズ

- **写真を追加**: `images/` フォルダに画像を入れ、CSSの背景や `<img>` タグで参照
- **寄付先情報**: `js/main.js` の `showDonateInfo` 関数内のテキストを編集
- **Googleマップ**: `index.html` の `<iframe>` の `src` を正確な座標で更新

---

保存団体: 西方若連会
文化財指定: 三春町指定無形民俗文化財（1983年9月20日）
Instagram: [@nisikata_mizukake](https://www.instagram.com/nisikata_mizukake/)
