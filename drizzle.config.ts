import { defineConfig } from 'drizzle-kit'

import { env } from './src/adapters/env'

export default defineConfig({
  out: './src/adapters/database/migrations',
  schema: './src/adapters/database/schemas/index.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
})
