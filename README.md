# Multi-Store Stock Movement — Frontend

React (Vite) frontend for the Multi-Store Stock Movement app. Provides an admin dashboard (manage products, stores, adjust and transfer stock) and a shopper view (browse products and per-store stock, read-only).

Backend repo: https://github.com/Naveenpl1081/multi-store-stock-frontend.git

## Tech Stack

- React 18 (Vite)
- React Router DOM
- Tailwind CSS
- Axios

## Prerequisites

- Node.js v18+
- The backend must be running first, and connected to a MongoDB replica set (required for stock transfers) — see the backend repo's README for full setup.

## Setup & Run

```bash
git clone https://github.com/Naveenpl1081/multi-store-stock-frontend.git
cd multi-store-stock-frontend
npm install
cp .env.example .env
```

Set `VITE_API_BASE_URL` in `.env` to point at your running backend (see Environment Variables below).

```bash
npm run dev
```

Runs at `http://localhost:5173` by default.

## Environment Variables

`.env.example` is provided in the repo — copy it to `.env` and fill in real values. Never commit `.env`.

| Variable | Description | Example |
|---|---|---|
| `VITE_API_BASE_URL` | Base URL of the backend API (must include `/api`) | `http://localhost:3002/api` |

Note: Vite only exposes environment variables prefixed with `VITE_` to client-side code.

## Project Structure

src/
api/            # axios instance + request functions per resource (auth, product, store, stock)
components/
auth/         # LoginForm, RegisterForm (presentational)
admin/        # ProductForm, StoreForm, AdjustStockForm, TransferStockForm, StockTable
shopper/      # LowStockFilter
common/       # Navbar, ProtectedRoute
context/        # AuthContext — holds logged-in user + token, login/register/logout
constants/      # role constants (ADMIN, SHOPPER)
pages/
auth/         # LoginPage, RegisterPage
admin/        # AdminDashboardPage
user/         # ShopperDashboardPage
NotFoundPage.jsx
routes/         # AppRoutes — all route definitions
App.jsx
main.jsx


## Architecture Pattern

Forms and tables are presentational components — they only collect input and call an `onSubmit` (or similar) prop function passed down from their parent page. Pages own all state, API calls, and navigation, and pass data and callbacks down as props. This keeps form components reusable and free of any knowledge of routing or API details.

## Roles & Routes

| Route | Access | Description |
|---|---|---|
| `/login` | Public | Login for both admin and shopper |
| `/register` | Public | Public registration (always creates a SHOPPER account — role cannot be chosen by the client) |
| `/admin` | Admin only | Create products and stores, adjust stock, transfer stock between stores, view stock levels with low-stock filter |
| `/shop` | Any logged-in user | Browse products and per-store stock, read-only, with low-stock filter |

There is no public admin signup — the one admin account is created via the backend's seed script (see backend README). `ProtectedRoute` redirects unauthenticated users to `/login` and blocks users whose role isn't permitted for a given route.

## Authentication Flow

- On login/register, the backend returns a JWT and user object (`id`, `username`, `email`, `role`).
- The token and user are stored in `localStorage` and loaded into `AuthContext` on app start.
- Every API request automatically attaches the token via an axios request interceptor.
- A `401` response from the backend (invalid/expired token) automatically clears stored auth state via a response interceptor.
- Role-based UI (showing/hiding admin controls, redirecting after login) is a convenience only — the backend independently enforces all authorization via JWT verification and role checks on every protected route.

## Features

**Admin dashboard (`/admin`)**
- Create products (name, SKU)
- Create stores (name)
- Adjust stock quantity for a product at a store (positive or negative delta)
- Transfer stock between two stores
- View all stock levels with an optional low-stock threshold filter
- After every create/adjust/transfer action, all dashboard data is refetched to reflect the latest state

**Shopper dashboard (`/shop`)**
- Browse all products
- View stock levels per store, read-only
- Filter stock by low-stock threshold
- No create, adjust, or transfer controls are shown or accessible

## Assumptions & Trade-offs

- Role-based UI is a UX convenience only; all real authorization enforcement happens on the backend.
- After every mutating action (create product/store, adjust, transfer), the dashboard refetches all data rather than optimistically patching local state — simpler and more reliably correct within this assignment's scope, at the cost of extra network calls.
- Auth token is stored in `localStorage` rather than an httpOnly cookie, for simplicity given the assignment's scope.