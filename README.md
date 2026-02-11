# Forms Management App

Small forms management application built with Next.js 15 (App Router).
Implements role-based access, SSR/SSG, shared validation (Zod), and REST
API via Route Handlers. No real database.

## Tech Stack

-   Next.js 15 (App Router)
-   TypeScript
-   Tailwind CSS
-   React Hook Form
-   Zod (shared client/server schema)
-   Zustand (auth + toasts)
-   Route Handlers (REST API)

## Features

### Authentication & Roles

-   /login page with email + role selection (Individual \| Admin)
-   Role stored in cookie and Zustand
-   Middleware protects:
    -   /dashboard
    -   /forms/\*

### Forms List (/forms)

-   SSR data fetching from internal API
-   Responsive table:
    -   title
    -   status (draft \| active \| archived)
    -   updatedAt
-   Sorting by updatedAt (desc)
-   Filter by status
-   Loading skeleton + error state

### CRUD (Admin only)

Routes: - /forms/new - /forms/\[id\]

Fields: - title (min 3) - description (optional) - fieldsCount (0--50) -
status (enum)

-   Validation via Zod (shared schema)
-   React Hook Form integration
-   POST / PUT / DELETE via Route Handlers
-   Toast on success + redirect to /forms

### Landing (/)

-   SSG page
-   Hero section + optimized image (next/image)
-   Metadata (SEO, OpenGraph, Twitter)

## API

GET /api/forms\
GET /api/forms/:id\
POST /api/forms (Admin)\
PUT /api/forms/:id (Admin)\
DELETE /api/forms/:id (Admin)

Persistence: in-memory singleton or local JSON seed. No database.

## Architecture Notes

-   Clear server/client separation (App Router)
-   Shared Zod schema for validation consistency
-   Middleware-based route protection
-   Minimal global state (Zustand only for auth + toasts)
-   Feature-oriented structure

## Getting Started

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.
<img width="2224" height="1077" alt="image" src="https://github.com/user-attachments/assets/cd982219-dff1-4686-905b-a627e651a710" />
<img width="2272" height="1146" alt="image" src="https://github.com/user-attachments/assets/d289bb05-a84c-4e39-8077-e231da82b0da" />
<img width="2247" height="1213" alt="image" src="https://github.com/user-attachments/assets/6300098c-2102-4718-95dd-449231302311" />


