# New Vishal Tailors

![Screenshot placeholder](docs/screenshot-placeholder.png)

New Vishal Tailors is a multilingual bespoke tailoring website for Janakpur Dham, Nepal. It is built as a pnpm workspace with a React + Vite app in `apps/web`, an Express API server in `apps/api`, and shared packages in `shared/`.

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

## Structure

```text
.
├─ apps/
│  ├─ api/                    # Express backend
│  └─ web/                    # React + Vite frontend
├─ shared/
│  ├─ src/api/                # Shared Zod schemas and API types
│  ├─ src/client-react/       # Generated React Query client
│  └─ openapi/                # OpenAPI source
├─ scripts/                   # Helper scripts
└─ package.json               # Root scripts and workspace orchestration
```

## Prerequisites

- Node.js 20 or newer
- pnpm 10 or newer

## Setup

### Mac / Linux

1. Install Node.js 20+ and pnpm 10+.
2. Clone the repository.
3. Run `pnpm install` at the repository root.
4. Start the web app with `pnpm run dev:web`.
5. Start the API with `pnpm run dev:api`.
6. Start both with `pnpm run dev:all`.

### Windows

1. Install Node.js 20+ and pnpm 10+.
2. Clone the repository.
3. Open PowerShell in the repository root.
4. Run `pnpm install`.
5. Start the web app with `pnpm run dev:web`.
6. Start the API with `pnpm run dev:api`.
7. Start both together with `pnpm run dev:all`.

## Environment Variables

Frontend app: [apps/web/.env.example](apps/web/.env.example)

API server: [apps/api/.env.example](apps/api/.env.example)

## Available Scripts

- `pnpm run dev` - starts the web workspace.
- `pnpm run dev:web` - runs the `apps/web` workspace in dev mode.
- `pnpm run dev:frontend` - compatibility alias for `dev:web`.
- `pnpm run dev:api` - runs the `apps/api` workspace in dev mode.
- `pnpm run dev:all` - runs web and API concurrently.
- `pnpm run build:web` - builds the `apps/web` workspace.
- `pnpm run build:frontend` - compatibility alias for `build:web`.
- `pnpm run build` - typechecks and builds the workspace.
- `pnpm run typecheck` - runs TypeScript validation.
- `pnpm run vercel-build` - Vercel-compatible build for `apps/web`.
- `pnpm run codegen:api` - regenerates shared API client and schema files.
- `pnpm run hello` - runs the sample root script.

## Deployment Guide for Vercel

1. Connect the repository to Vercel.
2. Set the project root to the repository root.
3. Configure the build command to `pnpm run vercel-build`.
4. Set the output directory to `apps/web/dist/public`.
5. Add the web app environment variables from `.env.example`.
6. Deploy the web app.
7. Deploy the API server separately if you are hosting the backend outside Vercel functions.
8. Update `VITE_API_URL` to the deployed backend URL.

## i18n Guide

- Translation strings live in [apps/web/src/lib/translations.ts](apps/web/src/lib/translations.ts).
- Add the new key to `ne`, `hi`, and `en`.
- Use `useLanguage()` and `t("your_key")` in components.
- Keep keys descriptive and stable.

## Frontend Component Structure

- [apps/web/src/pages/home.tsx](apps/web/src/pages/home.tsx) - homepage sections.
- [apps/web/src/components/Navbar.tsx](apps/web/src/components/Navbar.tsx) - adaptive navbar.
- [apps/web/src/components/EnquiryForm.tsx](apps/web/src/components/EnquiryForm.tsx) - booking/enquiry form.
- [apps/web/src/components/Testimonials.tsx](apps/web/src/components/Testimonials.tsx) - customer reviews.
- [apps/web/src/components/WhyChooseUs.tsx](apps/web/src/components/WhyChooseUs.tsx) - differentiators.
- [apps/web/src/components/FAQ.tsx](apps/web/src/components/FAQ.tsx) - FAQ accordion.
- [apps/web/src/components/GuaranteeBanner.tsx](apps/web/src/components/GuaranteeBanner.tsx) - satisfaction strip.
- [apps/web/src/components/OptimizedImage.tsx](apps/web/src/components/OptimizedImage.tsx) - image helper.
- [apps/web/src/components/ErrorBoundary.tsx](apps/web/src/components/ErrorBoundary.tsx) - render fallback.

## API Endpoints

- `GET /api/healthz` - health check.
- `POST /api/enquiry` - stores a booking enquiry and sends an email notification.

## Notes for Maintainers

- The web app is the primary customer-facing app and lives in [apps/web](apps/web).
- The API server lives in [apps/api](apps/api) and provides health and enquiry endpoints.
- Shared API code lives under [shared/src](shared/src).
- SEO metadata and social preview tags live in [apps/web/index.html](apps/web/index.html).
