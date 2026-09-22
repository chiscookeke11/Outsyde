# Outsyde

Outsyde is a full-stack outdoor weather companion. It lets users look up a
place, view current conditions and a short forecast, save locations, create
weather searches for a chosen date range, and download saved searches as JSON
or CSV. The browser application is built with Next.js; the API is built with
FastAPI and persists saved data in PostgreSQL.

## Features

- Search for a location and view current weather, daily forecasts, and outdoor
  conditions.
- Save locations with their coordinates.
- Create and revisit saved weather searches. A saved search can cover up to
  five days.
- Export all saved weather searches as JSON or CSV.
- Search for related YouTube videos through the API.
- Use the interactive FastAPI documentation to explore every API operation.

## Technology

| Area | Technology |
| --- | --- |
| Web application | Next.js, React, TypeScript, Tailwind CSS |
| API | FastAPI, Uvicorn, Pydantic |
| Database | PostgreSQL, SQLAlchemy, Alembic |
| External data | Open-Meteo weather and geocoding APIs; YouTube Data API |

## Repository layout

```text
.
├── backend/                 # FastAPI service, database models, migrations, and tests
│   ├── app/api/routes/      # HTTP endpoints
│   ├── app/services/        # Weather, geocoding, and video integrations
│   ├── alembic/             # PostgreSQL schema migrations
│   └── .env.example         # Backend configuration template
├── frontend/                # Next.js web application
│   └── .env.example         # Frontend configuration template
└── README.md                # This guide
```

## Prerequisites

Install the following before starting:

- **Python 3.14 or newer.** The backend's project configuration requires Python
  3.14+.
- **Node.js and npm.** npm is used below to install and run the frontend.
- **PostgreSQL.** The backend stores locations and weather searches in a
  PostgreSQL database.
- A **YouTube Data API v3 key.** The backend requires this configuration value
  at startup, including when you are not actively using the videos endpoint.
- Internet access. Weather and place search results are retrieved from
  Open-Meteo at request time.

The examples below use the `uv` Python package manager. A standard `venv` and
`pip` workflow is included as an alternative.

## Quick start

Run the backend and frontend in separate terminals. Start the backend first so
the browser app can reach it.

### 1. Get the source

```bash
git clone <your-repository-url>
cd Outsyde
```

If you already have the repository, begin from its root directory instead.

### 2. Create a PostgreSQL database

Create a local database and a user that can access it. For example, using the
PostgreSQL command-line tools:

```bash
createuser --pwprompt outsyde
createdb --owner=outsyde outsyde
```

Use the username, password, host, port, and database name you choose in the
next step. If your PostgreSQL installation is hosted elsewhere, create the
database there and use its connection details instead.

### 3. Configure and start the backend

In a first terminal, copy the backend template and set its values:

```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env` and provide a PostgreSQL SQLAlchemy URL and YouTube API
key. For the database created above, the file can look like this:

```dotenv
APP_NAME=Outsyde API
APP_VERSION=1.0.0
DEBUG=true
DATABASE_URL=postgresql+psycopg://outsyde:YOUR_DATABASE_PASSWORD@localhost:5432/outsyde
YOUTUBE_API_KEY=YOUR_YOUTUBE_DATA_API_V3_KEY
```

> Keep `.env` private. It is intentionally ignored by Git; never commit
> database passwords or API keys.

Install the backend dependencies, apply the checked-in database migration, and
run the development server:

```bash
cd backend
uv sync
uv run alembic upgrade head
uv run uvicorn app.main:app --reload
```

The API listens on `http://127.0.0.1:8000`. Leave this terminal running.

#### Backend setup without `uv`

From `backend/`, create and activate a virtual environment, then use the same
migration and server commands with the environment activated:

```bash
python3.14 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
alembic upgrade head
uvicorn app.main:app --reload
```

On Windows PowerShell, activate the environment with
`.venv\\Scripts\\Activate.ps1`.

### 4. Configure and start the frontend

In a second terminal at the repository root, copy the frontend configuration:

```bash
cp frontend/.env.example frontend/.env.local
```

The default `NEXT_PUBLIC_API_URL` already targets the local API. Change it only
if the API runs on a different host or port. Then install the locked dependency
set and start Next.js:

```bash
cd frontend
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser. The weather
dashboard is available at [http://localhost:3000/dashboard](http://localhost:3000/dashboard).

### 5. Verify the installation

With the API running, confirm that it responds:

```bash
curl http://127.0.0.1:8000/health
```

Expected response:

```json
{"status":"ok"}
```

Open [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs) to use the
interactive API documentation.

## Configuration reference

### Backend: `backend/.env`

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | Yes | SQLAlchemy PostgreSQL URL, for example `postgresql+psycopg://user:password@localhost:5432/outsyde`. |
| `YOUTUBE_API_KEY` | Yes | API key used by the `/videos/` endpoint. |
| `APP_NAME` | No | API title shown in generated documentation. Defaults to `Outsyde API`. |
| `APP_VERSION` | No | API version shown in generated documentation. Defaults to `1.0.0`. |
| `DEBUG` | No | Enables FastAPI debug mode. Defaults to `true`. Use `false` in production. |

### Frontend: `frontend/.env.local`

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | No for local development | Public base URL for the FastAPI service. It defaults to `http://127.0.0.1:8000`. |

Values prefixed with `NEXT_PUBLIC_` are exposed to browser code. Do not place
secrets in `frontend/.env.local`.

## API overview

All API paths are relative to `http://127.0.0.1:8000` during local development.
The OpenAPI UI at `/docs` is the authoritative source for request and response
schemas.

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/health` | Check whether the API is running. |
| `GET` | `/weather/?latitude={lat}&longitude={lon}` | Fetch current weather and a short forecast. |
| `GET` | `/locations/search?query={place}` | Look up one place using geocoding. |
| `GET`, `POST` | `/locations/` | List saved locations or create one. |
| `GET`, `PUT`, `DELETE` | `/locations/{location_id}` | Read, replace, or delete a saved location. |
| `GET`, `POST` | `/searches/` | List saved searches or create one from a location and date range. |
| `GET` | `/searches/{search_id}` | Retrieve a saved weather search. |
| `GET` | `/videos/?query={query}&max_results={1-10}` | Search YouTube videos. |
| `GET` | `/export/searches/json` | Download all saved searches as JSON. |
| `GET` | `/export/searches/csv` | Download all saved searches as CSV. |

To create a saved location directly through the API:

```bash
curl -X POST http://127.0.0.1:8000/locations/ \
  -H 'Content-Type: application/json' \
  -d '{"name":"Lagos","country":"Nigeria","latitude":6.5244,"longitude":3.3792}'
```

## Development commands

Run these commands from the indicated project directory after configuring the
environment.

| Directory | Command | Purpose |
| --- | --- | --- |
| `backend/` | `uv run pytest` | Run the backend test suite. |
| `backend/` | `uv run alembic upgrade head` | Apply all outstanding schema migrations. |
| `frontend/` | `npm run lint` | Lint the frontend. |
| `frontend/` | `npm run build` | Create a production frontend build. |
| `frontend/` | `npm run start` | Serve a production build after `npm run build`. |

The backend tests import the application configuration and some tests connect to
PostgreSQL, so ensure `backend/.env` points to an available database and run
the migrations before executing them.

## Common issues

### Backend fails at startup with missing settings

The backend requires both `DATABASE_URL` and `YOUTUBE_API_KEY`. Confirm that
`backend/.env` exists (not only `.env.example`) and that both values are set.
Run backend commands from `backend/` so the application can load that file.

### The frontend cannot load weather data

1. Confirm the API is running by visiting `/health` or using the `curl` command
   above.
2. Check `frontend/.env.local` has the correct `NEXT_PUBLIC_API_URL`.
3. Restart `npm run dev` after changing `NEXT_PUBLIC_API_URL`, because public
   environment variables are read when Next.js starts.
4. If the frontend runs on a different origin, add that origin to the backend
   CORS configuration before deploying it.

### Migration or database connection errors

Verify PostgreSQL is running, the database exists, and `DATABASE_URL` uses the
`postgresql+psycopg://` scheme. Re-run `uv run alembic upgrade head` after
correcting the connection string.

### YouTube video requests return an error

Check that the key is enabled for YouTube Data API v3 and that it has available
quota. The rest of the weather dashboard uses Open-Meteo and does not need a
separate weather API key.

## Deployment notes

- Set the backend environment variables in the deployment platform rather than
  committing an `.env` file.
- Run `alembic upgrade head` as part of the backend release process.
- Set `NEXT_PUBLIC_API_URL` to the publicly reachable HTTPS URL of the deployed
  API before building the frontend.
- Restrict the backend CORS allowed origins to the production frontend domain.
- Set `DEBUG=false` for production.

## License

No license file is currently included. Add one before distributing the project
or accepting external contributions under defined terms.
