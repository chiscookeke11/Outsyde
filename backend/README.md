# Outsyde backend

This directory contains the FastAPI API, SQLAlchemy models, Alembic migrations,
and backend tests for Outsyde.

For complete prerequisites, environment variables, PostgreSQL setup, migration,
run, test, and deployment instructions, see the [repository README](../README.md).

## Local commands

Run these from this directory after copying `.env.example` to `.env` and filling
in `DATABASE_URL` and `YOUTUBE_API_KEY`:

```bash
uv sync
uv run alembic upgrade head
uv run uvicorn app.main:app --reload
```

The development API is available at <http://127.0.0.1:8000>; its interactive
OpenAPI documentation is at <http://127.0.0.1:8000/docs>.

```bash
uv run pytest
```
