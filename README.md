# StudyBadger (Campus Rating System)

A full-stack web app for UW–Madison students to find, rate and review spots on campus for studying, napping, group work or hanging out. Users browse locations on an interactive campus map, filter by activity tags, read and write reviews, and save favorites.

Built by a team of 7 for CS 506 (Software Engineering) at UW–Madison, Fall 2024, using two-week sprints, GitLab merge requests and code review. This repo mirrors the course GitLab.

## Features

- **Interactive campus map** (Google Maps) with location markers tied to search results
- **Search and filter** locations by building and activity tags (study, nap, socialize…)
- **Reviews and ratings:** create, edit and delete reviews; see aggregate ratings per location
- **Accounts:** sign up and log in with JWT authentication; favorites and a per-user review history
- **Containerized:** frontend, backend and MySQL run together with Docker Compose

## Tech

| Layer | Stack |
|---|---|
| Frontend | React, React Router, React-Bootstrap, Google Maps (`@vis.gl/react-google-maps`), Jest + React Testing Library |
| Backend | Java, Spring Boot (Web, Data JPA, Security), JWT (jjwt), Gradle |
| Data | MySQL |
| Infra | Docker, Docker Compose, GitLab CI |

Backend layout: `controllers → services → repositories (JPA) → entities`, with DTOs for auth and location payloads and a global exception handler.

## My contributions

60+ commits, mostly on the frontend and its integration with the API:

- Built the **map component** and wired it into the home page and search results through a shared `MapContext`
- Built the full **review flow**: add-review page, edit/delete, and the backend `getReviews` / reviews-by-user endpoints it calls
- Built the **locations API integration**, merging each location's tags/tasks into one payload (plus the backend endpoint for listing tasks and tags)
- Added loading states and fixed an infinite-fetch bug in `useEffect` dependencies
- Wrote the **frontend unit tests** (Jest + React Testing Library) and the team's `STYLE.md`

## Running locally

Requires Docker. One command starts MySQL, the Spring Boot API and the React app:

```sh
cp frontend/.env.example frontend/.env.local   # then add your Google Maps key
docker compose up --build
# frontend: http://localhost:3000  ·  backend: http://localhost:8080  ·  MySQL: localhost:3306
```

On first start the backend creates the tables and loads **sample data** from
[`backend/src/main/resources/data.sql`](backend/src/main/resources/data.sql). The buildings are
real UW–Madison places, but **the users and reviews are made up** for demos. Loading it again is
safe because rows use fixed ids, so restarts don't duplicate anything. Data lives in the
`mysql-data` volume; `docker compose down -v` resets it.

Demo logins (local only): `bucky@example.test` / `demo-bucky-pass`,
`alex@example.test` / `demo-alex-pass`, `sam@example.test` / `demo-sam-pass`.

### Configuration

| Variable | Where | Default | Purpose |
| --- | --- | --- | --- |
| `REACT_APP_GOOGLE_MAPS_API_KEY` | `frontend/.env.local` | — | Maps JavaScript API key (only that API is needed) |
| `REACT_APP_API_URL` | `frontend/.env.local` or shell | `http://localhost:8080` | Backend base URL (see `frontend/src/api.js`) |
| `DB_URL` | shell / `.env` | `jdbc:mysql://localhost:3306/campus_rating_system` | JDBC URL (compose points it at the `mysql` service) |
| `DB_USERNAME` / `DB_PASSWORD` | shell / `.env` | `root` / `temppassword` | Database login, dev defaults only |
| `JWT_SECRET` | shell / `.env` | dev-only placeholder | Base64 signing key; set your own, e.g. `openssl rand -base64 48` |
| `DDL_AUTO` | shell / `.env` | `update` | Hibernate schema mode |
| `SQL_INIT_MODE` | shell / `.env` | `always` | Set to `never` to skip loading sample data |

`frontend/.env.local` is gitignored and is never copied into the Docker image; compose passes it to
the container at runtime.

Distances on the study-spot cards are straight-line (haversine) distances from your browser's
location. They are hidden if you don't share your location.

### Without Docker for the app

```sh
docker compose up -d mysql                     # or any MySQL 8 on :3306
cd backend && ./gradlew bootRun                # uses the defaults above
cd frontend && yarn install && yarn start
```

## Team

Brandon Rodriguez, Jinyu Shi, Rithik Rajaram, Pranav Nair, Ethan Yang, Taehyun Kim, Zachary Ogulnick

## Docs

The original course specification (requirements, user stories, diagrams) is in [SPECIFICATION.md](SPECIFICATION.md).
