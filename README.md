# FIRE STARTER
auther nao.t  
created 20200726  
updated 20200731

# ABOUT
FIREBASEを使ったWebサイト開発環境  

# PACKAGES
npm 6.9.0, node 11.13.0にて動作確認  
gulp, pug, stylus, babel, webpack...

# HOW TO USE

## ▼firebase projectの準備

### [firebase公式](https://firebase.google.com/)からfirebaseにログイン（またはgoogleアカウントを作成してログイン）し、firebaseプロジェクト一覧ページを開く

### 「プロジェクトを追加」で、新しいプロジェクトを作成する

### プロジェクト名（任意）をつけて、「次へ」ボタンを押す

### 「Googleアナリティクス」画面で、googleアナリティクスを有効にして、「次へ」ボタンを押す

### 「Googleアナリティクスの構成」画面で、プルダウンメニューから「新しいアカウントを作成」を選択し、Googleアナリティクスアカウント名を入力

### 「アナリティクスの地域」は「日本」を選択（他の地域がメインなら、他でも。）

### 下部のチェックボックスにチェックを入れ、「プロジェクトを作成」をクリック（規約やポリシーは各自確認してください。）

### 少し待つと「新しいプロジェクトの準備ができました」と出てくるので、「続行」をクリック、firebaseコンソールに移動する

### 左のメニューから「Hosting」を選択し、「始める」ボタンを押す

<br><br>

## ▼ローカルでfirebaseを使う準備（上記「始める」ボタンで出る指示と同じ）

### （firebaseを使ったことがない場合）ターミナルで`npm install -g firebase-tools`を実行してfirebase cliをインストール

### ターミナルで`firebase login`を実行して、firebaseを紐づけているGoogleアカウントにログイン
（ログインするアカウントを間違えた場合は、`firebase logout`を実行してログアウトして、再度`firebase login`する。）

### ターミナルで開発環境をクローンしたディレクトリに移動し、`firebase init`を実行
（コンソール上での操作は後述の「ローカルでfirebase hostingを使う環境を作成」を参照）

### 「Firebase SDKの追加」ステップで、「ウェブアプリを登録」の入力欄にアプリ名（任意）を入力

### 「SDKの追加」欄に表示されるスクリプトを/develop/pug/_template.pugのbody直下に貼り付ける
（スクリプトが表示されなかったら、一度「リンクして続行」ボタンを押してから戻ると表示されるかも。）  
（このスクリプトでアナリティクスがうまく動作しなかったら、後述の別のスクリプトを導入する）

### 「Firebase Hosting へのデプロイ」ステップは、後で実行するので無視する

### 「コンソールに進む」をクリック、コンソールに戻る

<br><br>

## ▼ローカルでfirebase hostingを使う環境を作成

### ターミナルで開発環境をクローンしたディレクトリに移動し、`firebase init`を実行

### `Are you ready to proceed? (Y/n)`と出るので、`Y`を入力してEnter

### 「Which Firebase CLI features do you want ~~~」（firebaseのどの機能を使うか）を聞かれるので、上下キーでHostingの位置に移動してスペースキーでチェックし、Enter

### 「Please select an option」で、「Use an existing project（既存のプロジェクトを使う）」でEnter

### 「Select a default Firebase project for this directory」で先ほど作成したプロジェクト名の位置に合わせてEnter

### 「What do you want to use as your public directory? (public)」（公開用ディレクトリ名を指定）は何も入力せずにEnter

### 「Configure as a single-page app (rewrite all urls to /index.html)?」は`N`を入力してEnter

<br><br>

## ▼firebase hostingにサイトをデプロイする（公開作業）

### コンソールで、`npm run publish`を実行する
/develop/の中身をコンパイルし、firebase hostingにデプロイします。

### hostingのWebサイトを確認する
https:// \[プロジェクトID\] .firebaseapp.com/

**ここまでで、webサイトの実装・公開はOK**

---

**ここからFirebase Analytics（Google Analytics連携）の設定**  
（上記、「Firebase SDKの追加」でうまく計測できない場合。）

### Firebaseの「設定」>「統合」で、Google Analyticsのタイルの「有効にする」をクリック  
「管理」となっている場合は、「管理」をクリックでGoogle Analyticsの設定画面にアクセスして、「Google アナリティクスのプロパティ」の右端の三点メニュー「このプロジェクトからアナリティクスをリンク解除」をクリックで、「有効にする」になる。

### 「Googleアナリティクスの有効化」のページで、「Googleアナリティクスの構成」の、「Googleアナリティクスアカウントを選択または作成します」で、先ほど作ったアカウントを選択

### 「このアカウントに新しいプロパティを自動的に作成します。」のまま、「Googleアナリティクスを有効にする」ボタンを押す

### 少し待つと、「GoogleアナリティクスSDKの追加」の画面が開く

### 「プラットフォームを選択して説明をご覧ください。」の下の「ウェブ　（Googleアナリティクスのアカウント名）」をクリック

### 出てきたスクリプトをbody開始タグの直後に設置する

### 「ウェブの設定を完了」をクリックし、「終了」ボタンを押し、統合ページに戻る

### `npm run publish`する

### デプロイが終わったら計測開始。firebase hostingのページを開くとカウントされる

### Firebase Analyticsの「Stream View」、またはGoogle Analyticsの「リアルタイム」を開くと、計測状況が見れる
（他はデータが出てくるまで時間がかかる。）