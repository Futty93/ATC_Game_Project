# DENOとesbuildのインストールと使用手順

## DENOのインストール

### Linux / macOS
deno install -qAf https://deno.land/x/deno/cli.ts

### macOS (Homebrew)
brew install deno

## コンパイラのインストール

npm install --save-exact --save-dev esbuild

## index.tsをbundle.jsにコンパイルし、サーバーを立ち上げる

./node_modules/.bin/esbuild index.ts --bundle --outfile=bundle.js && deno run --allow-net --allow-read https://deno.land/std@0.59.0/http/file_server.ts

以上で、DENOとesbuildのインストール、およびindex.tsをbundle.jsにコンパイルしてサーバーを立ち上げる準備が整いました。最後のコマンドは、esbuildを使ってTypeScriptファイルをバンドルし、DENOの標準ライブラリを使用してファイルサーバーを立ち上げます。必要に応じてコマンドを実行してください。



# Go環境のセットアップとmain.goの実行手順

1. **Goのインストール**

    - [Goの公式サイト](https://golang.org/)からGoをダウンロードしてインストールします。

2. **Goの環境設定**

    - インストールが完了したら、コマンドラインで `go version` を実行し、Goが正しくインストールされていることを確認します。

3. **コマンドラインでmain.goを実行**

    - コマンドプロンプトやターミナルで以下のコマンドを実行して、`main.go` を実行します。
    - `go run main.go`

以上で、Goの環境をセットアップし、`main.go` を実行する準備が整いました。適切にインストールされている場合、`go run main.go`を実行することで、コンソールに`Hello, Go!`と表示されるはずです。