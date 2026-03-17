# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   ├── api-server/         # Express API server
│   └── coldspace-solutions/ # ColdSpace Solutions website (React + Vite)
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts (single workspace package)
│   └── src/                # Individual .ts scripts
├── pnpm-workspace.yaml     # pnpm workspace
├── tsconfig.base.json      # Shared TS options
├── tsconfig.json           # Root TS project references
└── package.json            # Root package with hoisted devDeps
```

## ColdSpace Solutions Website

A bilingual (English/Spanish) lead-generation website for ColdSpace Solutions, an HVAC and refrigeration company in Central Valley, California.

### Features
- 5 pages: Home, Services, About, Testimonials, Contact
- Language toggle (EN/ES) in the navbar
- WhatsApp floating button (bottom right)
- Contact form connected to the backend (POST /api/contact)
- Calendly integration link for scheduling
- SEO-optimized for Central Valley CA HVAC keywords
- 24/7 Emergency service banner

### Service Area
Central Valley, California (Fresno, Bakersfield, Visalia, Modesto)

### SEO Keywords
- HVAC repair Central Valley California
- Air conditioning repair Central Valley CA
- Commercial refrigeration repair Central Valley
- HVAC maintenance Central Valley CA

### Color Palette
- Primary: Deep blue (#1B3A6B)
- Secondary: Sky blue (#29ABE2)
- Accent/CTA: Orange (#F5821F)

## Database

- `contacts` table: Stores lead form submissions (name, email, phone, service, message, language)
- Enums: `service_type` (hvac, refrigeration, maintenance, emergency, other), `language` (en, es)

## API Endpoints

- `GET /api/healthz` - Health check
- `POST /api/contact` - Submit contact/lead form

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all packages as project references.

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages that define it
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references
