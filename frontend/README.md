# Outsyde frontend

This directory contains the Next.js weather dashboard for Outsyde. It consumes
the FastAPI service in `../backend`.

For complete prerequisites, environment variables, database setup, run, test,
and deployment instructions, see the [repository README](../README.md).

## Local commands

Run these from this directory after copying `.env.example` to `.env.local`:

```bash
npm ci
npm run dev
```

Open <http://localhost:3000> and navigate to
<http://localhost:3000/dashboard>. The default `.env.example` points the app at
the local backend (`http://127.0.0.1:8000`).

```bash
npm run lint
npm run build
```
