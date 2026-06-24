<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Repo-specific context

## Stack
- **Next.js 16.2.7** (see above), **React 19.2.7**, **TypeScript 5**, **Tailwind v4**
- **Prisma v7** with **MariaDB** (driver adapter `@prisma/adapter-mariadb`, not the old bindings)
- **Better Auth 1.6.11** (email/password auth)
- **shadcn/ui** (Radix Luma style, Remixicon icons, `radix-ui` primitives)
- **Zustand** (cart store persisted to localStorage as `skill-cart`)
- **react-hook-form** + **zod** for form validation

## Prisma v7 quirks
- Config in `prisma.config.ts` (not `prisma/schema.prisma`), loads env via `dotenv/config`
- Client generated to `../generated/prisma` — import from `@/../generated/prisma/client`
- Uses `@prisma/adapter-mariadb` — pass connection string to `PrismaMariaDb` constructor, then wrap `PrismaClient({ adapter })`
- Run `npx prisma generate` after schema changes
- `/generated/prisma` is gitignored

## Auth
- Single catch-all route: `src/app/api/auth/[...all]/route.ts` → `toNextJsHandler(auth)`
- Client: `authClient.signIn.email()` / `authClient.signUp.email()` from `@/lib/auth-client`
- Server: `auth` instance from `@/lib/auth` with `prismaAdapter`

## Route groups (no root layout)
- `(auth)` — login, signup (Prompt/Roboto/Lora fonts, `<html lang="th">`)
- `(front)` — home, about, product, course, cart (Navbar included)
- Each route group has its own `<html>`/`<body>` shell

## Commands
```
npm run dev       # next dev
npm run build     # next build
npm start         # next start
npm run lint      # eslint (no typecheck script)
```
No tests in this project.

## Database
- Local MariaDB via Docker: `docs/install_mariadb_with_docker.txt`
- Seed SQL in `docs/create_table_ecommerce.sql` and `docs/insert_data_ecom_example.sql`
- `DATABASE_URL=mysql://root:Admin_1jj395qu@localhost:3306/ecommerce?connection_limit=5&pool_timeout=30`

## Docker build
Multi-stage Dockerfile: install deps → `npx prisma generate` → `npm run build` → `.next/standalone` output.

## Aliases
- `@/*` → `./src/*` (tsconfig paths)
- shadcn aliases: `@/components`, `@/lib`, `@/hooks`, `@/components/ui`
