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

Clone the repository:

git clone https://github.com/your-username/forms-app.git\
cd forms-app

Install dependencies:

npm install

Run development server:

npm run dev

Open:

http://localhost:3000

Production build:

npm run build\
npm start

