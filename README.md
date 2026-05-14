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
│   └── main.js      # アニメーション・インタラクション
├── images/          # 写真を追加する場合はここに
└── design.md        # デザイン仕様書
```

## カスタマイズ

- **写真を追加**: `images/` フォルダに画像を入れ、CSSの背景や `<img>` タグで参照
- **お知らせ更新**: `index.html` の `#news` セクションの `<a>` タグを編集
- **寄付先情報**: `js/main.js` の `showDonateInfo` 関数内のテキストを編集
- **Googleマップ**: `index.html` の `<iframe>` の `src` を正確な座標で更新

---

保存団体: 西方若連会
文化財指定: 三春町指定無形民俗文化財（1983年9月20日）
Instagram: [@nisikata_mizukake](https://www.instagram.com/nisikata_mizukake/)
