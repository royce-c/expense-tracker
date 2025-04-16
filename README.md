# AI Powered Expense Tracker

## Description

The AI Powered Expense Tracker helps users manage their expenses with the added functionality of AI-powered image recognition for receipts. It leverages OpenAI's vision API to automatically extract information from images, making expense tracking faster and more accurate.

## Features

- AI-powered expense extraction from receipts using OpenAI vision
- Creates a sum of all expenses and displays them in a clean dashboard
- Securely upload and retrieve receipts from Amazon S3

## Tech Stack

Frontend: Next.js, React, TypeScript
Backend: OpenAI Vision, Next.js
Storage: Amazon S3
Database: PostgreSQL
Authentication: GitHub OAuth

## Installation

Prerequisites: Node.js, PostgreSQL, Amazon S3 Account

### Steps

Clone the repository:

```bash
git clone https://github.com/royce-c/expense-tracker.git
cd expense-tracker
```

Install dependencies:

```bash
npm i
# or
yarn install
# or
pnpm i
# or
bun i
```

Setup the environment:

Create a .env.local file in the root directory and add the following:

```env
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=  
AUTH_SECRET=

MIGRATION_DATABASE_URL=  
DATABASE_URL=

AWS_ACCESS_KEY_ID=  
AWS_SECRET_ACCESS_KEY=  
AWS_BUCKET_NAME=  
AWS_BUCKET_REGION=

OPENAI_API_KEY=
```

Push schema to the database:

```bash
npx drizzle-kit push
```

Run the application:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Access the application at [http://localhost:3000](http://localhost:3000).

## Usage

Upload receipt images to the platform.
The AI-powered system will extract expense details from the images.
View and manage all your expenses in a clean and organized dashboard.
