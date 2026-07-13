# Facebook-Style Login & Registration (MERN)

A full-stack clone of Facebook's login and registration UI, built with MongoDB, Express, React, and Node.js.

## What's included

- **Backend** (`/backend`): Express API with MongoDB (Mongoose), JWT authentication, and bcrypt password hashing.
- **Frontend** (`/frontend`): React (Vite) app with Login, Register, and a protected Home page, styled to closely match Facebook's real login/register pages.

## Features

- Register with first name, last name, email, password, birthday, and gender (same fields as Facebook's sign-up form)
- Passwords hashed with bcrypt before being stored
- Login issues a JWT, stored in `localStorage`
- Protected `/home` route — redirects to login if not authenticated
- Duplicate-email and invalid-login error handling

## Setup

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` and set:
- `MONGO_URI` — your MongoDB connection string (local MongoDB or a free MongoDB Atlas cluster)
- `JWT_SECRET` — any long random string

Start the server:

```bash
npm run dev
```

The API runs on `http://localhost:5000`.

### 2. Frontend

In a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The app runs on `http://localhost:3000` and proxies `/api` requests to the backend.

## Pages

- `/` — simple centered login (matches the plain "Facebook" title + card design)
- `/register` — full registration form with Meta-style branding and footer
- `/login` — the full two-column login page with the photo collage + "Find things you love" tagline (this is what Register's "I already have an account" button links to)
- `/home` — protected page shown after logging in

## Adding your own images / logos

I didn't include Meta's actual logo files or the collage photos since those are Meta's copyrighted/trademarked assets. Everything else (layout, spacing, colors, copy) is already coded to match. To finish matching the screenshots exactly, drop your own image files into `frontend/src/assets/` and update these spots:

1. **Facebook "f" logo & Meta infinity logo** — currently simple CSS/SVG recreations in `frontend/src/components/Icons.jsx` (`FacebookCircleIcon` and `MetaLogo`). Replace the `<svg>` markup with `<img src="/src/assets/facebook-logo.png" />` etc. if you have the real files.

2. **Photo collage on `/login`** — in `frontend/src/pages/LoginFull.jsx`, look for the comment block:
   ```jsx
   {/* IMAGE PLACEHOLDERS ... */}
   ```
   Each `<div className="collage-img collage-img-1">` (and `-2`, `-3`) is a positioned placeholder block. Replace the `<div>` with an `<img>` tag, e.g.:
   ```jsx
   <img src="/src/assets/collage-1.jpg" className="collage-img collage-img-1" alt="" />
   ```
   The `collage-img-*` CSS classes in `App.css` already control size/position — an `<img>` with the same class will drop right into place (add `object-fit: cover;` inline if the photo's aspect ratio doesn't match).

## Notes

- This project doesn't use Facebook's logo or any of their actual code/assets — it recreates the general layout, color scheme (Facebook blue `#1877F2`), and form fields for educational purposes only. It isn't affiliated with or endorsed by Meta/Facebook.
- For production use, you'd want to add: email verification, refresh tokens, rate limiting on login attempts, HTTPS, and input sanitization beyond what's here.
