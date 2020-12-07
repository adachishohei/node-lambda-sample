# node-lambda-sample

## Node.jsのLambdaをSAMを使った開発場合のサンプル

### 目的

samのtemplateを使って、各環境毎に変数を変えてlambdaを実行できるようにする

### 使用技術

- Node.js v12
- Sam
- Lambda
- ApiGateway

### 事前準備

SSMのパラメータストアで、 `/lambda/sample` の名前でデータを保存しておく

### 確かめるコマンド例

```bash
# ビルド
sam build

# 実行
sam local start-api --parameter-overrides Environment={書き換えたい環境変数}

# デプロイ 以下のコマンドを実行して、Parameter Environmentで、環境変数を指定する
sam deploy --guided

```

### 解説

ParametersとMappingsを使って、Parametersの値をキーとしてMappingsの値を取得して、それを環境変数にセットできる
対象のMappingをしてして、取得したいKey, Valueを指定すれば良い

`!FindInMap [ EnvironmentMap, !Ref Environment, SAMPLE]`
