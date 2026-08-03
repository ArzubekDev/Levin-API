# ⚡ Levin API

&gt; Zero-config mock API generator for frontend developers. Build and test your UI before the backend is ready.

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-E0234E?logo=nestjs&logoColor=white)](https://nestjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

[Live Demo](https://your-vercel-url.vercel.app) · [Documentation](https://your-vercel-url.vercel.app/docs) · [Report Bug](../../issues)

---

## ✨ Features

- **⚡ Instant Mock APIs** — Paste a JSON Schema and get a live REST endpoint in seconds.
- **🔐 OAuth 2.0** — Secure authentication via Google and GitHub (Token Exchange flow).
- **🎭 Realistic Simulation** — Configure response delays, random errors, and pagination.
- **🧪 Practice CRUD** — Perfect for juniors to practice `fetch`, `axios`, and state management.
- **🚦 Project Limits** — Free tier includes up to 2 active projects per user.
- **🎨 Beautiful Dashboard** — Dark-themed UI with glassmorphism and lightning animations.
- **📊 Request Statistics** — Track API usage for each project (prepared for leaderboard feature).

---

## 🛠 Tech Stack

### Frontend
- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **State & Data:** [TanStack Query](https://tanstack.com/query)
- **Auth:** Google Identity Services (`@react-oauth/google`)
- **Architecture:** [Feature-Sliced Design (FSD)](https://feature-sliced.design/)

### Backend
- **Framework:** [NestJS 10](https://nestjs.com/)
- **Database:** [PostgreSQL](https://www.postgresql.org/) + [TypeORM](https://typeorm.io/)
- **Auth:** JWT Access Tokens + Passport
- **Validation:** `class-validator`, `ajv` (JSON Schema)
- **Mock Engine:** `@faker-js/faker` with dynamic route generation

---

## 🏗 Architecture
