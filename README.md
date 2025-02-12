# タスク管理アプリ

## 概要
このアプリはタスク管理を効率化するためのWebアプリケーションです。
カテゴリごとにタスクを管理でき、緊急度や状態のアイコン表示、タスクの並び替え、編集や削除の機能を備えています。
また、保有しているタスクはグラフで進捗状況を可視化できるようにしています。(スマートフォンサイズでは表示の問題で非表示になります。)

## 使用技術
- **Next.js**
- **TypeScript**
- **Prisma**:(ORM)
- **Supabase**:(データベース)
- **Clerk**: (ユーザー認証機能を提供するライブラリ)



## テーブルのモデル

Mermaid図をMarkdownで正しく表示するためには、コードブロックで囲み、言語指定として「mermaid」を指定する必要があります。以下が修正したREADMEの内容です：
markdownCopy# タスク管理アプリ
## 概要
このアプリはタスク管理を効率化するためのWebアプリケーションです。
カテゴリごとにタスクを管理でき、緊急度や状態のアイコン表示、タスクの並び替え、編集や削除の機能を備えています。
また、保有しているタスクはグラフで進捗状況を可視化できるようにしています。(スマートフォンサイズでは表示の問題で非表示になります。)

## 使用技術
- **Next.js**
- **TypeScript**
- **Prisma**:(ORM)
- **Supabase**:(データベース)
- **Clerk**: (ユーザー認証機能を提供するライブラリ)

## テーブルのモデル
```mermaid
erDiagram
    User ||--o{ Task : "has"
    User ||--o{ Category : "has"
    Category ||--o{ Task : "contains"

    User {
        string id PK "cuid"
        string userId UK "Clerk userId"
        datetime createdAt
        datetime updatedAt
        string name
        string img
    }

    Task {
        string id PK "cuid"
        datetime createdAt
        datetime updatedAt
        string title
        string emergency
        string status
        string description
        string userId FK
        string categoryId FK
    }

    Category {
        string id PK "cuid"
        string name
        string userId FK
    }



## デモ
以下のテスト用ユーザーでログインして機能をお試しいただけます：

- **ユーザー名**: testuser  
- **パスワード**: TESTuser  

以下のリンクからデプロイされたアプリをお試しいただけます：
[タスク管理アプリ](https://task-management-application-sable.vercel.app/)
