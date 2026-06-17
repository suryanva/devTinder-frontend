# DevTinder

A developer-focused networking platform — swipe, connect, and collaborate.

## Tech Stack

| Frontend              | Backend (not in this repo)  |
| --------------------- | --------------------------- |
| React 18 + Vite 5     | Node.js / Express           |
| Redux Toolkit         | MongoDB + Mongoose          |
| React Router v6       | JWT auth (httpOnly cookies) |
| TailwindCSS + DaisyUI | REST API                    |
| Axios                 |                             |
| React Toastify        |                             |

## Pre-requisites

- Node.js >= 18
- Backend server running (see [devTinder-backend](https://github.com/your-org/devTinder-backend))
- Environment variable `VITE_PUBLIC_URL` pointing to the backend (e.g. `http://localhost:7777`)

## Setup

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env
# Edit .env with your backend URL

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Features

- **Sign Up** — Register with name, email, password, age, gender, and skills
- **Login / Logout** — Session-based auth with httpOnly cookies (JWT)
- **Feed** — Browse user profiles and swipe (interested / ignore)
- **Connections** — View your accepted connections
- **Requests** — Review incoming connection requests (accept / reject)
- **Profile** — View your profile details
- **Edit Profile** — Update your photo, about, and personal info

## Project Structure

```
src/
├── App.jsx                       # Root: Router, Redux Provider, Toasts
├── main.jsx                      # Entry point
├── components/
│   ├── Body.jsx                  # Layout + auth guard for authenticated routes
│   ├── Login.jsx                 # Login page
│   ├── SignUp.jsx                # Registration page
│   ├── Logout.jsx                # Logout handler
│   ├── Feed.jsx                  # Browse users (swipe feed)
│   ├── UserCard.jsx              # Reusable user card with action buttons
│   ├── DecisionCard.jsx          # Card for reviewing connection requests
│   ├── Connections.jsx           # List of accepted connections
│   ├── Requests.jsx              # Pending connection requests
│   ├── Profile.jsx               # Read-only profile display
│   ├── EditProfile.jsx           # Editable profile form
│   ├── Navbar.jsx                # Navigation bar
│   ├── Footer.jsx                # App footer
│   └── Error.jsx                 # 404 page
└── utils/
    ├── appStore.js               # Redux store config
    └── redux/
        ├── userSlice.js          # User state
        ├── feedSlice.js          # Feed data state
        ├── connectionSlice.js    # Connections state
        └── requestsSlice.js      # Requests state
```

## Environment Variables

| Variable          | Description     | Example                 |
| ----------------- | --------------- | ----------------------- |
| `VITE_PUBLIC_URL` | Backend API URL | `http://localhost:7777` |

## Deployment (Render)

A `render.yaml` is included for SPA deployment. All routes are redirected to `index.html` for client-side routing.
