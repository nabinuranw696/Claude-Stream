# Repository Hub (Phase 1: foundation)

```bash
npx create-next-app@latest repository-hub --typescript --tailwind --eslint --app
cd repository-hub
npm install prisma @prisma/client next-auth@beta bcryptjs zod framer-motion lucide-react
npm install -D tsx @types/bcryptjs
```

1. Copy these files over the generated project (merge `app/globals.css`).
2. Add to `package.json`: `"prisma": { "seed": "tsx prisma/seed.ts" }`
3. `cp .env.example .env`, then set `DATABASE_URL`, `AUTH_SECRET` (`npx auth secret`) and `ADMIN_PASSWORD`. Never commit `.env`.
4. `npx prisma migrate dev --name init && npx prisma db seed`
5. `npm run dev`

Notes: `AUTH_SECRET` is read automatically by Auth.js v5. Download tracking counts clicks, not verified downloads.
