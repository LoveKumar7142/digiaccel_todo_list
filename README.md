# To-Do List

A mobile-first task manager built with React, Vite, Express, and MongoDB. It supports scheduled tasks, keyword search, priority, status updates, and Monday–Sunday summaries in IST.

## Run locally

Use Node.js 22 and a running MongoDB instance.

In the backend directory:

```powershell
npm ci
Copy-Item .env.example .env
npm run dev
```

Set `MONGO_URI` in `backend/.env` if your MongoDB connection differs from the example.

In a separate terminal, from the frontend directory:

```powershell
npm ci
npm run dev
```

Open the URL printed by Vite. The development proxy forwards `/api` to port 5000. If you use a different backend port, set `BACKEND_URL` in `frontend/.env.local`.

## Project structure

- `frontend/` contains the responsive UI, task components, and API client.
- `backend/` contains the Express routes, task services, and MongoDB model.
