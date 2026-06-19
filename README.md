# Terrazza di Sole 🍋

A sun-drenched, cinematic landing page + full-stack web app for **Terrazza di Sole**, a fictional boutique cliffside hotel perched above the Amalfi Coast.

> _La dolce vita, elevated._

## ✨ Features

- **Cinematic hero** — full-bleed, autoplaying, looping `<video>` (drone over the coast) with an animated golden-hour gradient + Ken-Burns fallback and a poster still.
- **Parallax storytelling** — scroll-driven feature sections (Cliffside Suites, Limonaia Spa, Cucina della Costa, Path of the Gods).
- **Authentication** — email/password via NextAuth (Auth.js) v5, Credentials provider, JWT sessions, hashed passwords (bcrypt).
- **Bookings** — pick a room, dates & guests; nightly price calc; confirmation email (nodemailer).
- **Reviews & favorites** — leave reviews, save favorite rooms.
- **Dashboards** — user profile/bookings; admin views for rooms, bookings, reviews and users (role-based).
- **Database** — Prisma 7 ORM with the SQLite **driver adapter** (`@prisma/adapter-better-sqlite3`).

## 🧱 Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS 3 · Prisma 7 + SQLite · NextAuth v5 · nodemailer

## 🚀 Getting started

```bash
# 1. Install deps
npm install

# 2. Configure env
cp .env.example .env        # then edit values (a NEXTAUTH_SECRET is required)

# 3. Create + seed the database
npx prisma db push
node --experimental-strip-types prisma/seed.ts

# 4. Run
npm run dev                 # http://localhost:3000
# or
npm run build && npm start
```

### Demo credentials (after seeding)

| Role  | Email                       | Password   |
|-------|-----------------------------|------------|
| Admin | `admin@terrazzadisole.com`  | `admin123` |
| User  | `demo@terrazzadisole.com`   | `demo123`  |

## 🎬 The hero video

The hero renders a real looping `<video>` from `public/videos/terrazza-hero.mp4`
(with a `.webm` fallback and an Amalfi still as the poster). Drop any clip at that
path and it plays automatically — no code change required. Until then it shows the
cinematic still over the animated golden-hour gradient.

## ☁️ Deployment notes

This app uses **SQLite** for zero-config local/VPS hosting. Serverless platforms
(e.g. Vercel) have an ephemeral, read-only filesystem, so for a serverless deploy
point Prisma at a hosted database (Turso/libSQL or Postgres via Neon) and set
`DATABASE_URL` accordingly. On a normal Node host (VPS/container) SQLite works as-is.

---

Built with ☀️ on the (virtual) Amalfi Coast.
