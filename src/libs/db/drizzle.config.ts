import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'postgresql',
  schema:  './src/libs/db/schemas',
  out:     './src/libs/db/migrations',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})
