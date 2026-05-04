# New Vishal Tailors

![Screenshot placeholder](docs/screenshot-placeholder.png)

New Vishal Tailors is a multilingual bespoke tailoring website for Janakpur Dham, Nepal. It is built as a pnpm monorepo with a React + Vite frontend, an Express API server, and shared schema/client packages.

## Tech Stack

- React 19.1.0
- Vite 7.3.2
- TypeScript 5.9.2
- Tailwind CSS 4.1.14
- TanStack Query 5.90.21
- Wouter 3.3.5
- Framer Motion 12.23.24
- Lucide React 0.545.0
- pnpm 10.14.0
- Express 5
- Pino 9
- Drizzle ORM 0.45.2

## Monorepo Structure

```text
.
├─ artifacts/
│  ├─ api-server/          # Express backend
│  └─ vishal-tailors/      # React + Vite frontend
├─ lib/
│  ├─ api-client-react/    # React API client
│  ├─ api-spec/            # OpenAPI source/spec tooling
│  ├─ api-zod/             # Shared runtime schemas
│  └─ db/                  # Shared database layer
├─ scripts/                # Workspace helper scripts
└─ package.json            # Root scripts and workspace orchestration
```

## Prerequisites

- Node.js 20 or newer
- pnpm 10 or newer

## Setup

### Mac / Linux

1. Install Node.js 20+ and pnpm 10+.
2. Clone the repository.
3. Run `pnpm install` at the repository root.
4. Start the frontend only with `pnpm run dev:frontend`.
5. Start the API only with `pnpm run dev:api`.
6. Start both with `pnpm run dev:all`.

### Windows

1. Install Node.js 20+ and pnpm 10+.
2. Clone the repository in a path without special tooling restrictions.
3. Open PowerShell in the repository root.
4. Run `pnpm install`.
5. Start the frontend with `pnpm run dev:frontend`.
6. Start the API with `pnpm run dev:api`.
7. Start both together with `pnpm run dev:all`.

## Environment Variables

Frontend: [artifacts/vishal-tailors/.env.example](artifacts/vishal-tailors/.env.example)

API server: [artifacts/api-server/.env.example](artifacts/api-server/.env.example)

## Available Scripts

- `pnpm run dev` - starts the frontend workspace.
- `pnpm run dev:frontend` - runs `@workspace/vishal-tailors` in dev mode.
- `pnpm run dev:api` - runs `@workspace/api-server` in dev mode.
- `pnpm run dev:all` - runs frontend and API concurrently.
- `pnpm run build:frontend` - builds the frontend workspace.
- `pnpm run build` - typechecks and builds all workspaces.
- `pnpm run typecheck` - runs TypeScript validation across workspaces.
- `pnpm run vercel-build` - Vercel-compatible frontend build.

## Deployment Guide for Vercel

1. Connect the repository to Vercel.
2. Set the project root to the repository root.
3. Configure the build command to `pnpm run vercel-build`.
4. Set the output directory to `artifacts/vishal-tailors/dist/public`.
5. Add the frontend environment variables from `.env.example`.
6. Deploy the frontend.
7. Deploy the API server separately if you are hosting the backend outside Vercel functions.
8. Update `VITE_API_URL` to the deployed backend URL.

## i18n Guide

- Translation strings live in [artifacts/vishal-tailors/src/lib/translations.ts](artifacts/vishal-tailors/src/lib/translations.ts).
- Add the new key to `ne`, `hi`, and `en`.
- Use `useLanguage()` and `t("your_key")` in components.
- Keep keys descriptive and stable.

## Frontend Component Structure

- [artifacts/vishal-tailors/src/pages/home.tsx](artifacts/vishal-tailors/src/pages/home.tsx) - homepage sections.
- [artifacts/vishal-tailors/src/components/Navbar.tsx](artifacts/vishal-tailors/src/components/Navbar.tsx) - adaptive navbar.
- [artifacts/vishal-tailors/src/components/EnquiryForm.tsx](artifacts/vishal-tailors/src/components/EnquiryForm.tsx) - booking/enquiry form.
- [artifacts/vishal-tailors/src/components/Testimonials.tsx](artifacts/vishal-tailors/src/components/Testimonials.tsx) - customer reviews.
- [artifacts/vishal-tailors/src/components/WhyChooseUs.tsx](artifacts/vishal-tailors/src/components/WhyChooseUs.tsx) - differentiators.
- [artifacts/vishal-tailors/src/components/FAQ.tsx](artifacts/vishal-tailors/src/components/FAQ.tsx) - FAQ accordion.
- [artifacts/vishal-tailors/src/components/GuaranteeBanner.tsx](artifacts/vishal-tailors/src/components/GuaranteeBanner.tsx) - satisfaction strip.
- [artifacts/vishal-tailors/src/components/OptimizedImage.tsx](artifacts/vishal-tailors/src/components/OptimizedImage.tsx) - image helper.
- [artifacts/vishal-tailors/src/components/ErrorBoundary.tsx](artifacts/vishal-tailors/src/components/ErrorBoundary.tsx) - render fallback.

## API Endpoints

- `GET /api/healthz` - health check.
- `POST /api/enquiry` - stores a booking enquiry and sends an email notification.

## Contributing

- Use `pnpm` only.
- Keep commits focused and descriptive.
- Prefer branch names like `feat/navbar-refresh`, `fix/enquiry-form`, or `chore/readme-update`.
- Keep TypeScript strict and avoid adding code comments unless required.

## Business Context

- Business name: New Vishal Tailors
- Location: Janaki Chowk-3, Janakpur Dham, Dhanusha, Nepal
- Primary contact: +977 980-4833357
- Secondary contact: +977 981-2097433
- Master tailor: Maulvi Mansuri
- Core services: bespoke suits, sherwani, kurta-pajama, coat-pant, safari suits, bandhgala, and alterations
- Languages: Nepali, Hindi, English

## Notes for Maintainers

- The frontend is the primary customer-facing app.
- The API server currently provides health and enquiry endpoints.
- SEO metadata and social preview tags live in [artifacts/vishal-tailors/index.html](artifacts/vishal-tailors/index.html).
