# Multi-Store Stock Movement — Frontend

React (Vite) frontend for the Multi-Store Stock Movement app. Provides an admin dashboard (manage products, stores, stock) and a shopper view (browse products and stock, read-only).

Backend repo: <link to your backend repo>

## Tech Stack

- React 18 (Vite)
- React Router
- Tailwind CSS
- Axios

## Prerequisites

- Node.js v18+
- The backend must be running first — see the backend repo's README for setup.

## Setup & Run

```bash
git clone <this-repo-url>
cd multi-store-stock-frontend
npm install
cp .env.example .env
```

Set `VITE_API_BASE_URL` in `.env` to point at your running backend (see below).

```bash
npm run dev
```

Runs at `http://localhost:5173` by default.

## Environment Variables

| Variable | Description | Example |
|---|---|---|
| `VITE_API_BASE_URL` | Base URL of the backend API | `http://localhost:3002/api` |

## Roles & Routes

| Route | Access | Description |
|---|---|---|
| `/login` | Public | Login for both admin and shopper |
| `/register` | Public | Public registration (always creates a SHOPPER) |
| `/admin` | Admin only | Create products/stores, adjust stock, transfer stock |
| `/shop` | Any logged-in user | Browse products and stock, read-only |

There is no public admin signup — the one admin account is created via the backend's seed script (see backend README).

## Assumptions & Trade-offs

- Role-based UI (showing/hiding admin controls) is a UX convenience only; the backend independently enforces all authorization via JWT + role checks.
- After every create/adjust/transfer action, the dashboard refetches all data rather than optimistically patching local state, to keep the implementation simple and correctness-focused within the assignment's scope.