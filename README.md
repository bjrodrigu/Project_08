# Campus Rating System (BadgerStudy)

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

```sh
# set your Google Maps API key in frontend/src/components/app/BadgerMap.jsx
# and frontend/src/components/contexts/MapContext.jsx (left blank in this repo)
docker compose up --build
# frontend: http://localhost:3000  ·  backend: http://localhost:8080
```

## Team

Brandon Rodriguez, Jinyu Shi, Rithik Rajaram, Pranav Nair, Ethan Yang, Taehyun Kim, Zachary Ogulnick

## Docs

The original course specification (requirements, user stories, diagrams) is in [SPECIFICATION.md](SPECIFICATION.md).
