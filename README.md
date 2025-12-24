<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1FXVWg2bYhM2zNISV_7SjbvI042nPaUCV

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

MySQL / Postgres (server)

 - Use the included `docker-compose.yml` to start databases and the server:

```bash
docker-compose up --build
```

 - The server will be available on port `4000`. By default the compose file starts a MySQL service and the `server` service configured to use it.

 - To seed the database locally (without Docker) for MySQL:

```bash
DB_TYPE=mysql MYSQL_HOST=localhost MYSQL_USER=glow MYSQL_PASSWORD=glowpass MYSQL_DATABASE=glowtours node server/seed-run.js
```

 - For Postgres seeding (local):

```bash
node server/seed-run.js
```

See `.env.example` for environment variables you can copy to `.env` or `.env.local`.
