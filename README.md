# Archivtter

![GitHub last commit](https://img.shields.io/github/last-commit/CoreNion/Archivtter)


このサイトでは、Twitterの検索コマンドを用いて、過去のツイートを検索できるURLを発行できます。

N予備校の「[動くWEBページコンテスト 2020夏](https://progedu.github.io/webappcontest/2020/summer/result/)」に提出した作品です。

不具合などは、Issueを立てるか、開発者へ連絡してください。

サイトはこちらです:[https://corenion.github.io/Archivtter/](https://corenion.github.io/Archivtter/)

# 技術的な説明

## 利用しているコマンドについて

Twitterの検索では、コマンドを使って検索できます。

このツールでは、sinceとuntilというコマンドを利用して、過去のツイートを検索できるようにしています。

このsinceとuntilは、sinceには検索期間の開始日の日付を、untilには検索期間の終了日の日付を以下のような形で利用します。

```TwitterSearch
XXXX(検索ワード等) since:YYYY-MM-DD until:YYYY:MM-DD
```

これで検索ができますが、手入力がやや面倒なため、ツールを作成しました。

## generateLink関数の使い方

generateLinkの引数には、アカウント名と検索開始する日付、検索終了する日付を入れます。

日付は、 yyyy-mm-ddの形である必要があります。

今後、より扱いやすいくするため、アカウント名の記述をを不要にしたり、日付の入力ををDate形式にする予定です。

## ブランチについて

Github Pagesにアップロードしているのはgh-pagesというブランチの方です。

gh-pagesとmasterの違いは、SNS用の画像のタグなどを付けているかなどの違いだけで、コアの機能には違いはありません。
