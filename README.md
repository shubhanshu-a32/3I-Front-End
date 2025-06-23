# 3I Front-End (React + Vite)

This is the front-end for the 3I (Idea Innovation Identity) MERN stack project, built with React, Vite, and Tailwind CSS.

---

## 🚀 Tech Stack

- **React** (v19)
- **Vite** (v6)
- **Tailwind CSS**
- **Axios** (API requests)
- **React Router DOM** (v7)
- **React Icons**
- **React Toastify** (notifications)
- **Framer Motion** (animations)
- **ESLint** (linting)

---

## 📁 Project Structure

- `src/` — Main source code
  - `api/` — API service modules (auth, posts)
  - `components/` — Reusable UI components
  - `context/` — React context (Auth)
  - `pages/` — Page components (Home, Login, Register, Dashboard, etc.)
  - `services/` — Additional service modules
  - `styles/` — CSS files
- `public/` — Static assets
- `.env` — Environment variables (not committed)
- `vercel.json` — Vercel SPA routing config

---

## ⚙️ Environment Variables

Create a `.env` file in the `client` directory with the following:

```
VITE_API_URL=https://your-backend-url.com
```
- **Do NOT add a trailing slash** to the URL.
- Example: `VITE_API_URL=https://3i-mern-backend-production.up.railway.app`

Your `.env` is already in `.gitignore` and will not be committed.

---

## 🛠️ Scripts

- `npm run dev` — Start local dev server

---

## 🌐 Deployment (Vercel)

1. **Set Environment Variable**
   - In Vercel dashboard, add `VITE_API_URL` (no trailing slash) in your project settings.
2. **SPA Routing Fix**
   - The included `vercel.json` ensures all routes serve `index.html`:
     ```json
     {
       "rewrites": [
         { "source": "/(.*)", "destination": "/" }
       ]
     }
     ```
   - This prevents 404 errors on page refresh or direct navigation.
3. **Deploy**
   - Push to your repo or connect Vercel to your GitHub project.

---

## 🧩 Usage Notes

- **API Endpoints:** All API requests use the base URL from `VITE_API_URL`.
- **Authentication:** JWT tokens are stored in `localStorage` and sent via `Authorization` headers.
- **Protected Routes:** Some pages require authentication and will redirect if not logged in.

---

## 🐞 Troubleshooting

- **404 on Refresh:**
  - Make sure `vercel.json` is present and correct.
- **API Errors (CORS, 404):**
  - Ensure `VITE_API_URL` is correct and matches your backend deployment.
  - Backend must allow CORS from your Vercel domain.
- **Double Slash in API URL:**
  - Remove trailing slash from `VITE_API_URL`.

---

## 📦 Dependencies

See `package.json` for full list. Key dependencies:

- react, react-dom, react-router-dom, axios, tailwindcss, react-icons, react-toastify, framer-motion, eslint, vite

---

