# タスク管理アプリ

## 概要
このアプリはタスク管理を効率化するためのWebアプリケーションです。
カテゴリごとにタスクを管理でき、緊急度や状態のアイコン表示、タスクの並び替え、編集や削除の機能を備えています。
また、保有しているタスクはグラフで進捗状況を可視化できるようにしています。(スマートフォンサイズでは表示の問題で非表示になります。)


![スクリーンショット](./images/project-screenshot.png)
![スクリーンショット](./images/project-screenshot2.png)
![スクリーンショット](./images/project-screenshot3.png)


## 今後追加検討の機能
- ユーザーの友達追加機能
- 友達になったユーザーとのタスクやカテゴリの共有
- 日付によってリマインダーを行ったりカレンダーで日付ごとにタスクを可視化できる機能

## 使用技術
- **Next.js**
- **TypeScript**
- **Prisma**:(ORM)
- **Supabase**:(データベース)
- **react-hook-form**:(フォーム管理)
- **zod**:(フォームバリデーション)
- **react-chartjs-2**:(円グラフ)
- **Tailwind CSS**:(css)
- **shadcn/ui**:(UIコンポーネント)
- **Clerk**: (ユーザー認証機能)



## デモ
以下のテスト用ユーザーでログインして機能をお試しいただけます：

- **ユーザー名**: testuser  
- **パスワード**: TESTuser  

以下のリンクからデプロイされたアプリをお試しいただけます：
[タスク管理アプリ](https://task-management-application-sable.vercel.app/)


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



